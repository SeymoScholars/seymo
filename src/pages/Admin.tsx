import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { acceptInvite, getUser, handleAuthCallback, login, logout, requestPasswordRecovery, updateUser, type User } from '@netlify/identity';
import ArticleTemplate from '../editorial/ArticleTemplate';
import RichTextEditor from '../editorial/RichTextEditor';
import { listArticles, saveArticle, uploadImage } from '../editorial/api';
import { articleSchema, articleSectionTargets, brokenSummarySectionLinks, emptyDocument, newArticle, richTextToPlainText, summaryDocumentFor, type ArticleContent, type ArticleRecord, type RichNode } from '../editorial/model';
import '../editorial/admin.css';

function Field({ label, value, onChange, type = 'text', required = false, multiline = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean; multiline?: boolean }) {
  return <label className="admin-field"><span>{label}{required ? ' *' : ''}</span>{multiline ? <textarea value={value} onChange={event => onChange(event.target.value)} rows={3} /> : <input type={type} required={required} value={value} onChange={event => onChange(event.target.value)} />}</label>;
}

function ImageFields({ image, alt, caption, onChange, onBusy }: { image: string; alt: string; caption: string; onChange: (fields: { image?: string; alt?: string; caption?: string }) => void; onBusy: (busy: boolean) => void }) {
  const [error, setError] = useState('');
  async function upload(file?: File) {
    if (!file) return;
    onBusy(true);
    setError('');
    try { onChange({ image: await uploadImage(file) }); }
    catch (failure) { setError(failure instanceof Error ? failure.message : 'Image upload failed.'); }
    finally { onBusy(false); }
  }
  return <div className="admin-image-fields">
    <Field label="Image URL" value={image} onChange={value => onChange({ image: value })} />
    <label className="admin-upload">Upload PNG, JPEG or WebP (up to 4 MB)<input type="file" accept="image/png,image/jpeg,image/webp" onChange={event => { void upload(event.target.files?.[0]); event.target.value = ''; }} /></label>
    {error && <p className="admin-error" role="alert">{error}</p>}
    <Field label="Image description (alt text)" value={alt} onChange={value => onChange({ alt: value })} />
    <Field label="Caption / image credit" value={caption} onChange={value => onChange({ caption: value })} />
  </div>;
}

function RichField({ label, value, onChange }: { label: string; value: RichNode; onChange: (value: RichNode) => void }) {
  return <div className="admin-field"><span>{label}</span><RichTextEditor label={label} value={value} onChange={onChange} /></div>;
}

function isAdministrator(user: User | null): boolean {
  const authorization = user?.appMetadata?.authorization as { roles?: string[] } | undefined;
  return Boolean(user?.roles?.includes('admin') || authorization?.roles?.includes('admin'));
}

export default function Admin() {
  const initialized = useRef(false);
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invite, setInvite] = useState('');
  const [recovery, setRecovery] = useState(false);
  const [authBusy, setAuthBusy] = useState(false);
  const [records, setRecords] = useState<ArticleRecord[]>([]);
  const [listError, setListError] = useState('');
  const [record, setRecord] = useState<ArticleRecord | null>(null);
  const [article, setArticle] = useState<ArticleContent>(newArticle);
  const [saved, setSaved] = useState(() => JSON.stringify(article));
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [view, setView] = useState<'split' | 'edit' | 'preview'>('split');
  const [mobilePreview, setMobilePreview] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const dirty = saved !== JSON.stringify(article);
  const busy = saving || uploading;

  async function refreshList() {
    setListError('');
    try { setRecords(await listArticles(true)); }
    catch (failure) { setListError(failure instanceof Error ? failure.message : 'Unable to load articles.'); }
  }

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    async function initialize() {
      try {
        const callback = await handleAuthCallback();
        if (callback?.type === 'invite') setInvite(callback.token || '');
        if (callback?.type === 'recovery') setRecovery(true);
        const current = await getUser();
        setUser(current);
        if (isAdministrator(current)) await refreshList();
      } catch { setError('Unable to initialize sign-in. Check that Netlify Identity is enabled, then retry.'); }
      finally { setReady(true); }
    }
    void initialize();
  }, []);

  useEffect(() => {
    const beforeUnload = (event: BeforeUnloadEvent) => { if (dirty) event.preventDefault(); };
    window.addEventListener('beforeunload', beforeUnload);
    return () => window.removeEventListener('beforeunload', beforeUnload);
  }, [dirty]);

  function switchArticle(action: () => void) {
    if (dirty) setPendingAction(() => action);
    else action();
  }

  function openArticle(next: ArticleRecord | null) {
    const document = next?.document || newArticle();
    setRecord(next);
    setArticle(document);
    setSaved(JSON.stringify(document));
    setError('');
    setNotice('');
  }

  function change<Key extends keyof ArticleContent>(key: Key, value: ArticleContent[Key]) {
    setArticle(current => ({ ...current, [key]: value }));
    setNotice('');
  }

  function changeSection(id: string, update: Partial<ArticleContent['sections'][number]>) {
    setArticle(current => ({ ...current, sections: current.sections.map(section => section.id === id ? { ...section, ...update } : section) }));
  }

  function reorder(index: number, direction: number) {
    setArticle(current => {
      const sections = [...current.sections];
      const target = index + direction;
      if (target < 0 || target >= sections.length) return current;
      [sections[index], sections[target]] = [sections[target], sections[index]];
      return { ...current, sections };
    });
  }

  async function persist(status: ArticleRecord['status']) {
    setError('');
    setNotice('');
    if (status === 'published' && brokenSummarySectionLinks(article).length) {
      setError('Fix the broken summary section links before publishing. Choose a replacement section or remove each broken link.');
      return;
    }
    const validation = articleSchema.safeParse(article);
    if (!validation.success) {
      setError(validation.error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`).join('; '));
      return;
    }
    setSaving(true);
    try {
      const next = await saveArticle(validation.data, status, record);
      setRecord(next);
      setArticle(next.document);
      setSaved(JSON.stringify(next.document));
      setRecords(current => [next, ...current.filter(item => item.id !== next.id)]);
      setNotice(status === 'published' ? 'Published. This article is now available on Resources.' : record?.status === 'published' ? 'Unpublished. The article is retained as a draft.' : 'Draft saved. It is not visible to readers.');
    } catch (failure) { setError(failure instanceof Error ? failure.message : 'Unable to save. Your content remains in the editor.'); }
    finally { setSaving(false); }
  }

  async function authenticate(event: FormEvent) {
    event.preventDefault();
    setAuthBusy(true);
    setError('');
    try {
      const current = invite ? await acceptInvite(invite, password) : recovery ? await updateUser({ password }) : await login(email, password);
      setUser(current);
      setInvite('');
      setRecovery(false);
      setPassword('');
      if (isAdministrator(current)) await refreshList();
    } catch { setError('Sign-in failed. Check your details or request a new invitation or password reset.'); }
    finally { setAuthBusy(false); }
  }

  async function forgotPassword() {
    setError('');
    setAuthBusy(true);
    try { await requestPasswordRecovery(email); setNotice('Check your email for the password reset link.'); }
    catch { setError('Unable to send a reset email. Please retry.'); }
    finally { setAuthBusy(false); }
  }

  async function signOut() {
    try { await logout(); setUser(null); setRecords([]); openArticle(null); }
    catch { setError('Unable to sign out. Please retry.'); }
  }

  const admin = isAdministrator(user);
  return <div className="seymo-admin">
    <Helmet><title>Editorial Desk | Seymo Scholars</title><meta name="robots" content="noindex,nofollow" /></Helmet>
    <header className="admin-heading"><p className="admin-eyebrow">SEYMO • EDITORIAL DESK</p><h1>Resources publishing</h1><p>Create, preview and publish in the Seymo editorial format.</p></header>
    {!ready ? <p className="admin-loading" role="status">Checking your session…</p> : !admin || invite || recovery ? <div className="admin-auth">
      <h2>{invite ? 'Accept your invitation' : recovery ? 'Set a new password' : user ? 'Administrator access required' : 'Administrator sign-in'}</h2>
      <p>Publishing is restricted to Netlify Identity accounts with the <strong>admin</strong> role. Ask the site owner to invite you and assign that role.</p>
      {(!user || invite || recovery) && <form onSubmit={authenticate}>
        {!invite && !recovery && <Field label="Email" type="email" value={email} onChange={setEmail} required />}
        <label className="admin-field"><span>{invite || recovery ? 'New password (at least 10 characters)' : 'Password'}</span><input type="password" autoComplete={invite || recovery ? 'new-password' : 'current-password'} minLength={invite || recovery ? 10 : undefined} required value={password} onChange={event => setPassword(event.target.value)} /></label>
        <button className="admin-primary" disabled={authBusy}>{authBusy ? 'Please wait…' : invite || recovery ? 'Set password' : 'Sign in'}</button>
        {!invite && !recovery && <button type="button" disabled={authBusy || !email} onClick={() => void forgotPassword()}>Send password reset</button>}
      </form>}
      {user && !invite && !recovery && <button type="button" onClick={() => void signOut()}>Sign out</button>}
      {error && <p className="admin-error" role="alert">{error}</p>}{notice && <p role="status">{notice}</p>}
    </div> : <>
      <div className="admin-actions">
        <div className="admin-view-controls" aria-label="Workspace view">{(['edit', 'split', 'preview'] as const).map(option => <button key={option} type="button" aria-pressed={view === option} onClick={() => setView(option)}>{option === 'split' ? 'Editor + preview' : option === 'edit' ? 'Editor' : 'Preview'}</button>)}</div>
        <span className="admin-status">{uploading ? 'Uploading image…' : dirty ? 'Unsaved changes' : record?.status === 'published' ? 'Published' : 'Draft'}</span>
        <button type="button" disabled={busy} onClick={() => void persist(record?.status || 'draft')}>{saving ? 'Saving…' : record?.status === 'published' ? 'Save published changes' : 'Save draft'}</button>
        {record?.status === 'published' ? <button type="button" disabled={busy} onClick={() => void persist('draft')}>Unpublish</button> : <button type="button" className="admin-primary" disabled={busy} onClick={() => void persist('published')}>Publish article</button>}
        <button type="button" disabled={busy} onClick={() => switchArticle(() => { void signOut(); })}>Sign out</button>
      </div>
      {error && <p className="admin-error" role="alert">{error}</p>}
      {notice && <p className="admin-notice" role="status">{notice}</p>}
      {record && <p className="admin-url">Article URL: <Link to={`/resources/${record.slug}`}>/resources/{record.slug}</Link>{record.status === 'draft' && ' (available publicly after publishing)'}</p>}
      <div className="admin-library">
        <button type="button" disabled={busy} onClick={() => switchArticle(() => openArticle(null))}>+ New article</button>
        <label>Saved articles <select aria-label="Open a saved article" disabled={busy} value={record?.id || ''} onChange={event => { const next = records.find(item => item.id === event.target.value); if (next) switchArticle(() => openArticle(next)); }}><option value="">Choose an article</option>{records.map(item => <option key={item.id} value={item.id}>{item.document.title} — {item.status}</option>)}</select></label>
        <button type="button" disabled={busy} onClick={() => void refreshList()}>Refresh list</button>
        {listError && <p className="admin-error" role="alert">{listError}</p>}
      </div>
      <div className={`admin-workspace admin-view-${view}`}>
        {view !== 'preview' && <fieldset className="admin-editor" disabled={busy}>
          <legend className="sr-only">Article content</legend>
          <section className="admin-panel"><h2>01 / Article header</h2>
            <Field label="Category" value={article.category} onChange={value => change('category', value)} required />
            <Field label="Topic / region (e.g. INDIA & KOLKATA)" value={article.topic} onChange={value => change('topic', value)} />
            <Field label="Article title" value={article.title} onChange={value => change('title', value)} required />
            <div className="admin-field admin-summary-field"><h3>Article Summary</h3><RichTextEditor label="Article Summary" value={summaryDocumentFor(article)} summary sectionTargets={articleSectionTargets(article)} onChange={value => { setArticle(current => ({ ...current, summaryContent: value, summary: richTextToPlainText(value) })); setNotice(''); }} /><p className="admin-summary-help">Up to 1,500 characters. Select a phrase and choose Link to Article Section to jump to a heading in this article.</p>{brokenSummarySectionLinks(article).length > 0 && <div className="admin-error" role="alert"><strong>Broken summary section links</strong><p>Fix these destinations before publishing. Drafts can still be saved.</p><ul>{brokenSummarySectionLinks(article).map(item => <li key={item.href}>“{item.text}” — destination section was removed or is unavailable. Select the phrase and edit or remove its link.</li>)}</ul></div>}</div>
            <div className="admin-field-row"><Field label="Author" value={article.author} onChange={value => change('author', value)} required /><Field label="Last-updated date" type="date" value={article.date} onChange={value => change('date', value)} required /></div>
          </section>
          <section className="admin-panel"><h2>02 / Hero &amp; introduction</h2>
            <ImageFields image={article.heroImage} alt={article.heroAlt} caption={article.heroCaption} onBusy={setUploading} onChange={fields => setArticle(current => ({ ...current, heroImage: fields.image ?? current.heroImage, heroAlt: fields.alt ?? current.heroAlt, heroCaption: fields.caption ?? current.heroCaption }))} />
            <Field label="Introduction heading" value={article.introductionHeading} onChange={value => change('introductionHeading', value)} />
            <RichField label="Opening paragraphs" value={article.introduction} onChange={value => change('introduction', value)} />
            <Field label="Sidebar callout heading" value={article.sidebarHeading} onChange={value => change('sidebarHeading', value)} />
            <RichField label="Sidebar context (optional)" value={article.sidebarContent} onChange={value => change('sidebarContent', value)} />
          </section>
          <section className="admin-panel"><h2>03 / Main article sections</h2><p>Add sections, subheadings, explanatory callouts and images. Use the formatting toolbar for emphasis, lists and links.</p>
            {article.sections.map((section, index) => <div className="admin-section-card" key={section.id}>
              <div className="admin-section-controls"><strong>Section {index + 1}</strong><button type="button" aria-label={`Move section ${index + 1} up`} disabled={index === 0} onClick={() => reorder(index, -1)}>↑ Up</button><button type="button" aria-label={`Move section ${index + 1} down`} disabled={index === article.sections.length - 1} onClick={() => reorder(index, 1)}>↓ Down</button><button type="button" onClick={() => change('sections', article.sections.filter(item => item.id !== section.id))}>Remove</button></div>
              <label className="admin-field"><span>Presentation</span><select value={section.kind} onChange={event => changeSection(section.id, { kind: event.target.value as 'section' | 'callout' })}><option value="section">Editorial section</option><option value="callout">Highlighted callout</option></select></label>
              <Field label="Optional label (WHAT / WHY / WHICH)" value={section.label} onChange={value => changeSection(section.id, { label: value })} />
              <Field label="Section heading" value={section.heading} onChange={value => changeSection(section.id, { heading: value })} />
              <Field label="Orange subheading" value={section.subheading} onChange={value => changeSection(section.id, { subheading: value })} />
              <RichField label={`Section ${index + 1} content`} value={section.content} onChange={value => changeSection(section.id, { content: value })} />
              <details><summary>Optional section image &amp; caption</summary><ImageFields image={section.image} alt={section.imageAlt} caption={section.caption} onBusy={setUploading} onChange={fields => setArticle(current => ({ ...current, sections: current.sections.map(item => item.id === section.id ? { ...item, image: fields.image ?? item.image, imageAlt: fields.alt ?? item.imageAlt, caption: fields.caption ?? item.caption } : item) }))} /></details>
            </div>)}
            <button type="button" disabled={article.sections.length >= 100} onClick={() => change('sections', [...article.sections, { id: crypto.randomUUID(), heading: '', subheading: '', label: '', kind: 'section', content: emptyDocument(), image: '', imageAlt: '', caption: '' }])}>+ Add section</button>
          </section>
          <section className="admin-panel"><h2>04 / Conclusion &amp; community</h2>
            <Field label="Conclusion heading" value={article.conclusionHeading} onChange={value => change('conclusionHeading', value)} />
            <RichField label="Conclusion (optional)" value={article.conclusion} onChange={value => change('conclusion', value)} />
            <Field label="Community invitation / call to action" value={article.ctaText} onChange={value => change('ctaText', value)} />
            <Field label="Call-to-action URL (optional)" value={article.ctaUrl} onChange={value => change('ctaUrl', value)} />
          </section>
          <section className="admin-panel"><h2>05 / References &amp; editorial note</h2><p>Sources are numbered automatically in their displayed order. Cite them in article text as [1], [2], and so on.</p>
            {article.references.map((reference, index) => <div className="admin-reference" key={reference.id}><strong>[{index + 1}]</strong><Field label="Source title" value={reference.title} onChange={value => change('references', article.references.map(item => item.id === reference.id ? { ...item, title: value } : item))} /><Field label="Official source URL" value={reference.url} onChange={value => change('references', article.references.map(item => item.id === reference.id ? { ...item, url: value } : item))} /><div className="admin-section-controls"><button type="button" disabled={index === 0} aria-label={`Move reference ${index + 1} up`} onClick={() => { const references = [...article.references]; [references[index], references[index - 1]] = [references[index - 1], references[index]]; change('references', references); }}>↑ Up</button><button type="button" disabled={index === article.references.length - 1} aria-label={`Move reference ${index + 1} down`} onClick={() => { const references = [...article.references]; [references[index], references[index + 1]] = [references[index + 1], references[index]]; change('references', references); }}>↓ Down</button><button type="button" onClick={() => change('references', article.references.filter(item => item.id !== reference.id))}>Remove source</button></div></div>)}
            <button type="button" disabled={article.references.length >= 100} onClick={() => change('references', [...article.references, { id: crypto.randomUUID(), title: '', url: '' }])}>+ Add reference</button>
            <Field label="Editorial note (optional)" value={article.editorialNote} onChange={value => change('editorialNote', value)} multiline />
          </section>
        </fieldset>}
        {view !== 'edit' && <section className="admin-preview-panel" aria-label="Live article preview"><div className="admin-preview-heading"><h2>Live preview</h2><button type="button" aria-pressed={mobilePreview} onClick={() => setMobilePreview(!mobilePreview)}>{mobilePreview ? 'Desktop width' : 'Mobile width'}</button><p>The same template renders the published article.</p></div><div className={`admin-preview-frame${mobilePreview ? ' admin-preview-mobile' : ''}`}><ArticleTemplate article={article} preview /></div></section>}
      </div>
    </>}
    {pendingAction && <div className="admin-modal-backdrop"><div className="admin-modal" role="alertdialog" aria-modal="true" aria-labelledby="discard-heading"><h2 id="discard-heading">Discard unsaved changes?</h2><p>Your saved article remains unchanged. Edits since your last save are lost if you continue.</p><button type="button" autoFocus onClick={() => setPendingAction(null)}>Keep editing</button><button type="button" onClick={() => { pendingAction(); setPendingAction(null); }}>Discard and continue</button></div></div>}
  </div>;
}
