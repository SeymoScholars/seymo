import { getDatabase } from '@netlify/database';
import { getIdentityConfig, verifyRequestOrigin } from '@netlify/identity';

function reply(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

async function requireAdmin(request: Request) {
  const authorization = request.headers.get('authorization');
  const cookie = request.headers.get('cookie')?.split(';').map(value => value.trim()).find(value => value.startsWith('nf_jwt='));
  let token: string | undefined;
  try {
    token = authorization?.startsWith('Bearer ') ? authorization.slice(7) : cookie ? decodeURIComponent(cookie.slice(7)) : undefined;
  } catch {
    return reply({ error: 'Invalid session. Please sign in again.' }, 401);
  }
  if (!token) return reply({ error: 'Sign in to access the administrator dashboard.' }, 401);
  const identity = getIdentityConfig();
  if (!identity?.url) return reply({ error: 'Netlify Identity is not configured for this deployment.' }, 503);
  try {
    const response = await fetch(`${identity.url.replace(/\/$/, '')}/user`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(10000),
    });
    if (response.status === 401 || response.status === 403) return reply({ error: 'Your session has expired. Please sign in again.' }, 401);
    if (!response.ok) return reply({ error: 'The authentication service is unavailable. Please try again.' }, 503);
    const user = await response.json();
    if (!user.id || !Array.isArray(user.app_metadata?.roles) || !user.app_metadata.roles.includes('admin')) {
      return reply({ error: 'Administrator access is required. Ask the site owner to assign the admin role in Netlify Identity.' }, 403);
    }
    return { id: String(user.id) };
  } catch {
    return reply({ error: 'The authentication service is unavailable. Please try again.' }, 503);
  }
}

function validateArticle(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const article = value as Record<string, unknown>;
  const limits = { slug: 160, title: 250, date: 80, author: 160, category: 100, coverImage: 2048, summary: 2000, content: 100000 };
  for (const [field, limit] of Object.entries(limits)) {
    if (typeof article[field] !== 'string' || !(article[field] as string).trim() || (article[field] as string).length > limit) return null;
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug as string)) return null;
  if (article.status !== 'draft' && article.status !== 'published') return null;
  const image = article.coverImage as string;
  if (!/^https:\/\//i.test(image) && !/^\/(?!\/)[^\\]*$/.test(image)) return null;
  return article as Record<keyof typeof limits, string> & { status: 'draft' | 'published' };
}

export default async (request: Request) => {
  const adminScope = new URL(request.url).searchParams.get('scope') === 'admin';
  if (!['GET', 'POST', 'PUT'].includes(request.method)) {
    return new Response(null, { status: 405, headers: { Allow: 'GET, POST, PUT', 'Cache-Control': 'no-store' } });
  }
  let administrator: { id: string } | undefined;
  if (adminScope || request.method !== 'GET') {
    const result = await requireAdmin(request);
    if (result instanceof Response) return result;
    administrator = result;
  }
  if (request.method !== 'GET') {
    try {
      verifyRequestOrigin(request);
    } catch {
      return reply({ error: 'This request must originate from the administrator page on this site.' }, 403);
    }
  }
  try {
    const database = getDatabase();
    if (request.method === 'GET') {
      const articles = await database.sql`
        SELECT slug, title, date, author, category, cover_image AS "coverImage", summary, content, status
        FROM admin_articles WHERE status = 'published' OR ${adminScope}
        ORDER BY updated_at DESC
      `;
      if (adminScope) return reply({ articles });
      const managed = await database.sql`SELECT slug FROM admin_articles`;
      return reply({ articles, managedSlugs: managed.map(article => article.slug) });
    }
    if (!request.headers.get('content-type')?.includes('application/json')) return reply({ error: 'Send article data as JSON.' }, 415);
    let input: unknown;
    try {
      const text = await request.text();
      if (text.length > 120000) return reply({ error: 'The article is too large.' }, 413);
      input = JSON.parse(text);
    } catch {
      return reply({ error: 'The article data is not valid JSON.' }, 400);
    }
    const article = validateArticle(input);
    if (!article) return reply({ error: 'Complete every article field, use a lowercase hyphenated slug, and provide an HTTPS or site-relative cover image. Check field lengths.' }, 400);
    if (request.method === 'POST') {
      const inserted = await database.sql`
        INSERT INTO admin_articles (slug, title, date, author, category, cover_image, summary, content, status, updated_by)
        VALUES (${article.slug}, ${article.title}, ${article.date}, ${article.author}, ${article.category}, ${article.coverImage}, ${article.summary}, ${article.content}, ${article.status}, ${administrator!.id})
        ON CONFLICT (slug) DO NOTHING RETURNING slug
      `;
      if (!inserted.length) return reply({ error: 'An article with this slug already exists. Choose a different slug.' }, 409);
    } else {
      await database.sql`
        INSERT INTO admin_articles (slug, title, date, author, category, cover_image, summary, content, status, updated_by)
        VALUES (${article.slug}, ${article.title}, ${article.date}, ${article.author}, ${article.category}, ${article.coverImage}, ${article.summary}, ${article.content}, ${article.status}, ${administrator!.id})
        ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, date = EXCLUDED.date, author = EXCLUDED.author,
          category = EXCLUDED.category, cover_image = EXCLUDED.cover_image, summary = EXCLUDED.summary,
          content = EXCLUDED.content, status = EXCLUDED.status, updated_by = EXCLUDED.updated_by, updated_at = NOW()
      `;
    }
    return reply({ saved: true }, request.method === 'POST' ? 201 : 200);
  } catch {
    return reply({ error: 'Article storage is unavailable. Confirm Netlify Database is enabled and the admin_articles migration has been applied to this deployment.' }, 503);
  }
};
