import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { acceptInvite, AuthError, getSettings, getUser, handleAuthCallback, login, logout, MissingIdentityError, onAuthChange, updateUser, type User } from '@netlify/identity';
import { ArrowLeft, FileText, LogOut, Plus, ShieldCheck } from 'lucide-react';
import { fetchLegacyBlogs } from '../services/blogService';
import { adminRequest, AdminRequestError, type AdminArticle } from '../services/adminService';

function blankArticle(): AdminArticle {
  return { slug: '', title: '', date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), author: '', category: '', coverImage: '', summary: '', content: '', status: 'draft' };
}

function errorMessage(error: unknown): string {
  if (error instanceof MissingIdentityError) return 'Netlify Identity is not enabled for this deployment. Ask the site owner to enable it in Netlify.';
  if (error instanceof AuthError) {
    if ([400, 401].includes(error.status || 0)) return 'Sign-in failed. Check your email and password, and confirm that your invitation has been accepted.';
    if (error.status === 404) return 'Netlify Identity is unavailable on this deployment. Check the Identity configuration in Netlify.';
    return error.message || 'Authentication failed. Please try again.';
  }
  return error instanceof Error ? error.message : 'The request failed. Please try again.';
}

const inputClass = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-600 disabled:opacity-60';
const primaryClass = 'inline-flex items-center justify-center gap-2 rounded-lg bg-green-800 px-5 py-3 font-bold text-white hover:bg-green-900 disabled:opacity-50';

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [authorized, setAuthorized] = useState(false);
  const [booting, setBooting] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [articles, setArticles] = useState<AdminArticle[]>([]);
  const [filter, setFilter] = useState<'all' | 'draft' | 'published'>('all');
  const [editor, setEditor] = useState<AdminArticle | null>(null);
  const [editingExisting, setEditingExisting] = useState(false);
  const [callback, setCallback] = useState<{ type: 'invite'; token: string } | { type: 'recovery' } | null>(null);
  const mounted = useRef(false);
  const sessionVersion = useRef(0);
  const initializationVersion = useRef(0);

  async function checkSession(current: User | null) {
    const version = ++sessionVersion.current;
    setUser(current);
    setAuthorized(false);
    setArticles([]);
    setEditor(null);
    if (!current) return;
    try {
      const data = await adminRequest();
      const existing = await fetchLegacyBlogs();
      if (!mounted.current || version !== sessionVersion.current) return;
      const managed = data.articles || [];
      const managedSlugs = new Set(managed.map(article => article.slug));
      setArticles([...managed, ...existing.filter(article => !managedSlugs.has(article.slug)).map(article => ({ ...article, status: 'published' as const }))]);
      setAuthorized(true);
      setError('');
    } catch (failure) {
      if (!mounted.current || version !== sessionVersion.current) return;
      if (failure instanceof AdminRequestError && failure.status === 401) setUser(null);
      setError(errorMessage(failure));
    }
  }

  useEffect(() => {
    mounted.current = true;
    const version = ++initializationVersion.current;
    let initializing = true;
    const unsubscribe = onAuthChange((event, current) => {
      if (!mounted.current || initializing || event === 'recovery' || event === 'token_refresh') return;
      void checkSession(current);
    });
    async function initialize() {
      try {
        try {
          await getSettings();
        } catch {
          throw new Error('Netlify Identity configuration could not be loaded. Confirm Identity is enabled for this deployment and try again.');
        }
        if (!mounted.current || version !== initializationVersion.current) return;
        const result = await handleAuthCallback();
        if (!mounted.current || version !== initializationVersion.current) return;
        if (result?.type === 'invite') setCallback({ type: 'invite', token: result.token });
        else if (result?.type === 'recovery') setCallback({ type: 'recovery' });
        else await checkSession(await getUser());
      } catch (failure) {
        if (mounted.current && version === initializationVersion.current) setError(errorMessage(failure));
      } finally {
        initializing = false;
        if (mounted.current && version === initializationVersion.current) setBooting(false);
      }
    }
    void initialize();
    return () => { mounted.current = false; initializationVersion.current++; sessionVersion.current++; unsubscribe(); };
  }, []);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    setBusy(true);
    setError('');
    try {
      await checkSession(await login(String(fields.get('email')).trim(), String(fields.get('password'))));
    } catch (failure) {
      setError(errorMessage(failure));
    } finally { setBusy(false); }
  }

  async function setPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const password = String(fields.get('password'));
    if (password !== fields.get('confirmation')) { setError('The passwords do not match.'); return; }
    setBusy(true);
    setError('');
    try {
      let current: User | null;
      if (callback?.type === 'invite') {
        const invited = await acceptInvite(callback.token, password);
        setCallback(null);
        setNotice('Invitation accepted. Sign in with your new password if automatic sign-in does not complete.');
        if (!invited.email) throw new Error('Invitation accepted. Please sign in with your invited email address.');
        current = await login(invited.email, password);
      } else {
        await updateUser({ password });
        current = await getUser();
      }
      setCallback(null);
      setNotice('Your password has been saved.');
      await checkSession(current);
    } catch (failure) { setError(errorMessage(failure)); }
    finally { setBusy(false); }
  }

  async function signOut() {
    setBusy(true);
    setError('');
    try {
      await logout();
      await checkSession(null);
      setNotice('You have signed out.');
    } catch (failure) { setError(errorMessage(failure)); }
    finally { setBusy(false); }
  }

  async function saveArticle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editor) return;
    if (!editingExisting && articles.some(article => article.slug === editor.slug)) {
      setError('An article with this slug already exists. Choose a different slug.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      await adminRequest(editingExisting ? 'PUT' : 'POST', editor);
      setArticles(current => [editor, ...current.filter(article => article.slug !== editor.slug)]);
      setEditor(null);
      setNotice(editor.status === 'published' ? 'Article published. It is now available on Resources.' : 'Draft saved. It is not visible to public visitors.');
    } catch (failure) {
      if (failure instanceof AdminRequestError && [401, 403].includes(failure.status)) {
        setAuthorized(false);
        setArticles([]);
        setEditor(null);
        if (failure.status === 401) setUser(null);
      }
      setError(errorMessage(failure));
    } finally { setBusy(false); }
  }

  const visibleArticles = articles.filter(article => filter === 'all' || article.status === filter);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Helmet><title>Administration | SeymoScholars</title><meta name="robots" content="noindex,nofollow" /></Helmet>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <div className="flex items-center gap-3"><ShieldCheck className="h-7 w-7 text-green-800" /><div><p className="text-lg font-bold">SeymoScholars</p><p className="text-sm text-slate-600">Article administration</p></div></div>
          <div className="flex items-center gap-5"><Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-green-800"><ArrowLeft size={16} /> Website</Link>{user && <button onClick={signOut} disabled={busy} className="inline-flex items-center gap-2 text-sm font-bold"><LogOut size={16} /> Logout</button>}</div>
        </div>
      </header>
      <main className={`mx-auto px-6 py-12 ${authorized ? 'max-w-6xl' : 'max-w-lg'}`}>
        {error && <div role="alert" className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-900">{error}</div>}
        {notice && <div role="status" className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-900">{notice}</div>}
        {booting ? <p role="status">Checking administrator session…</p> : callback ? (
          <section className="rounded-2xl border border-slate-200 bg-white p-8">
            <h1 className="mb-2 text-2xl font-bold">{callback.type === 'invite' ? 'Accept administrator invitation' : 'Reset your password'}</h1>
            <p className="mb-6 text-slate-600">Set a password to continue. The site owner must assign the admin role before dashboard access is granted.</p>
            <form onSubmit={setPassword} className="space-y-5">
              <label className="block font-bold">New password<input className={`${inputClass} mt-2`} type="password" name="password" autoComplete="new-password" minLength={8} required disabled={busy} /></label>
              <label className="block font-bold">Confirm password<input className={`${inputClass} mt-2`} type="password" name="confirmation" autoComplete="new-password" minLength={8} required disabled={busy} /></label>
              <button className={`${primaryClass} w-full`} disabled={busy}>{busy ? 'Saving…' : 'Save password'}</button>
            </form>
          </section>
        ) : !user ? (
          <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-green-800">Restricted access</p>
            <h1 className="mb-3 text-3xl font-bold">Administrator login</h1>
            <p className="mb-7 text-slate-600">Sign in with your invited Netlify Identity account to manage Resources articles.</p>
            <form onSubmit={signIn} className="space-y-5">
              <label className="block font-bold">Email<input className={`${inputClass} mt-2`} type="email" name="email" autoComplete="username" required disabled={busy} /></label>
              <label className="block font-bold">Password<input className={`${inputClass} mt-2`} type="password" name="password" autoComplete="current-password" required disabled={busy} /></label>
              <button className={`${primaryClass} w-full`} disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
            </form>
            <p className="mt-6 text-sm text-slate-600">Access is invitation-only. Contact the site owner if you need an account or the administrator role.</p>
          </section>
        ) : !authorized ? (
          <section><h1 className="mb-4 text-2xl font-bold">Administrator access</h1><p className="mb-5">Checking access for {user.email}. Only accounts with the server-assigned admin role can manage articles.</p><button className={primaryClass} onClick={() => void checkSession(user)} disabled={busy}>Retry access check</button></section>
        ) : (
          <>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div><p className="mb-2 text-sm text-slate-600">Signed in as {user.email}</p><h1 className="text-3xl font-bold">Article dashboard</h1></div>
              <button className={primaryClass} disabled={busy} onClick={() => { setEditor(blankArticle()); setEditingExisting(false); setError(''); setNotice(''); }}><Plus size={18} /> Add Article</button>
            </div>
            <nav aria-label="Article filters" className="mb-8 flex flex-wrap gap-2 border-b border-slate-300 pb-4">
              {([['all', 'Manage Articles'], ['draft', 'Drafts'], ['published', 'Published Articles']] as const).map(([value, label]) => <button key={value} aria-pressed={filter === value} disabled={busy} onClick={() => { setFilter(value); setEditor(null); }} className={`rounded-lg px-4 py-2 font-bold ${filter === value ? 'bg-green-800 text-white' : 'bg-white text-slate-700'}`}>{label} ({articles.filter(article => value === 'all' || article.status === value).length})</button>)}
            </nav>
            {editor ? (
              <form onSubmit={saveArticle} className="rounded-xl border border-slate-200 bg-white p-6 md:p-8">
                <h2 className="mb-6 text-2xl font-bold">{editingExisting ? 'Edit article' : 'Add article'}</h2>
                <fieldset disabled={busy} className="grid gap-5 md:grid-cols-2">
                  {([['title', 'Title', 250], ['slug', 'URL slug', 160], ['author', 'Author', 160], ['date', 'Display date', 80], ['category', 'Category', 100], ['coverImage', 'Cover image URL', 2048]] as const).map(([field, label, limit]) => <label key={field} className="block font-bold">{label}<input className={`${inputClass} mt-2`} value={editor[field]} maxLength={limit} required pattern={field === 'slug' ? '[a-z0-9]+(-[a-z0-9]+)*' : undefined} disabled={field === 'slug' && editingExisting} onChange={event => setEditor({ ...editor, [field]: event.target.value })} /></label>)}
                  <label className="block font-bold md:col-span-2">Summary<textarea className={`${inputClass} mt-2`} rows={3} maxLength={2000} required value={editor.summary} onChange={event => setEditor({ ...editor, summary: event.target.value })} /></label>
                  <div className="md:col-span-2"><label className="block font-bold" htmlFor="article-content">Article content</label><textarea id="article-content" aria-describedby="article-content-help" className={`${inputClass} mt-2`} rows={14} maxLength={100000} required value={editor.content} onChange={event => setEditor({ ...editor, content: event.target.value })} /><p id="article-content-help" className="text-sm text-slate-600">Plain text; paragraph breaks are preserved.</p></div>
                  <div><label className="block font-bold" htmlFor="article-status">Status</label><select id="article-status" className={`${inputClass} mt-2`} value={editor.status} onChange={event => setEditor({ ...editor, status: event.target.value as AdminArticle['status'] })}><option value="draft">Draft — private</option><option value="published">Published — visible on Resources</option></select></div>
                </fieldset>
                <div className="mt-7 flex gap-4"><button className={primaryClass} disabled={busy}>{busy ? 'Saving…' : editor.status === 'published' ? 'Publish article' : 'Save draft'}</button><button type="button" disabled={busy} onClick={() => setEditor(null)} className="px-4 font-bold">Cancel</button></div>
              </form>
            ) : visibleArticles.length ? (
              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white"><table className="w-full text-left"><thead className="border-b border-slate-200 bg-slate-100 text-sm"><tr><th scope="col" className="px-5 py-4">Article</th><th scope="col" className="px-5 py-4">Status</th><th scope="col" className="px-5 py-4">Action</th></tr></thead><tbody>{visibleArticles.map(article => <tr key={article.slug} className="border-b border-slate-200 last:border-0"><td className="px-5 py-5"><p className="font-bold">{article.title}</p><p className="mt-1 text-sm text-slate-600">{article.author} · {article.date}</p></td><td className="px-5 py-5"><span className="rounded-full bg-slate-100 px-3 py-1 text-sm capitalize">{article.status}</span></td><td className="px-5 py-5"><button disabled={busy} className="font-bold text-green-800 underline" aria-label={`Edit ${article.title}`} onClick={() => { setEditor({ ...article }); setEditingExisting(true); setNotice(''); setError(''); }}>Edit</button></td></tr>)}</tbody></table></div>
            ) : <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center"><FileText className="mx-auto mb-3 text-green-800" /><h2 className="text-xl font-bold">No {filter === 'all' ? '' : filter} articles yet</h2><p className="mt-2 text-slate-600">Use Add Article to create a draft or publish a new resource.</p></div>}
          </>
        )}
      </main>
    </div>
  );
}
