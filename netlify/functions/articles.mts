import type { Config, Context } from '@netlify/functions';
import { and, desc, eq, sql } from 'drizzle-orm';
import { z } from 'zod';
import { database } from '../../db/index';
import { articles } from '../../db/schema';
import { articleSchema, draftSchema, publicationProblem, slugify } from '../../src/editorial/model';
import { authorize } from './lib/authorization';

export default async (request: Request, context: Context) => {
  const headers = { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' };
  const reply = (body: unknown, status = 200) => Response.json(body, { status, headers });
  try {
    const isAdmin = new URL(request.url).pathname.startsWith('/api/admin/');
    if (isAdmin) {
      const denied = await authorize(request);
      if (denied) return denied;
    } else if (request.method !== 'GET') {
      return reply({ error: 'Method not allowed.' }, 405);
    }
    const db = database();
    if (request.method === 'GET') {
      if (context.params.slug) {
        const [article] = await db.select().from(articles).where(and(eq(articles.slug, context.params.slug), eq(articles.status, 'published'))).limit(1);
        return article ? reply(article) : reply({ error: 'Article not found.' }, 404);
      }
      if (isAdmin && context.params.id) {
        if (!z.string().uuid().safeParse(context.params.id).success) return reply({ error: 'Invalid article ID.' }, 400);
        const [article] = await db.select().from(articles).where(eq(articles.id, context.params.id)).limit(1);
        return article ? reply(article) : reply({ error: 'Article not found.' }, 404);
      }
      const records = await db.select().from(articles).where(isAdmin ? undefined : eq(articles.status, 'published')).orderBy(desc(articles.updatedAt)).limit(500);
      return reply(records);
    }
    if (request.method === 'DELETE') {
      if (!z.string().uuid().safeParse(context.params.id).success) return reply({ error: 'Invalid article ID.' }, 400);
      const { revision } = z.object({ revision: z.number().int().positive() }).parse(await request.json());
      const [deleted] = await db.delete(articles).where(and(eq(articles.id, context.params.id), eq(articles.revision, revision), eq(articles.status, 'draft'))).returning({ id: articles.id });
      return deleted ? reply({ deleted: true }) : reply({ error: 'Only an unchanged draft can be deleted. Refresh the list first.' }, 409);
    }
    if (!['POST', 'PUT'].includes(request.method) || (request.method === 'POST' && context.params.id)) return reply({ error: 'Method not allowed.' }, 405);
    const raw = await request.text();
    if (raw.length > 1_000_000) return reply({ error: 'Article is too large.' }, 413);
    const input = z.object({ document: draftSchema, status: z.enum(['draft', 'scheduled', 'published']), revision: z.number().int().positive().optional(), scheduledAt: z.iso.datetime({ offset: true }).optional() }).parse(JSON.parse(raw));
    const problem = input.status !== 'draft' ? publicationProblem(input.document) : null;
    if (problem) return reply({ error: problem }, 400);
    const document = input.status === 'draft' ? input.document : articleSchema.parse(input.document);
    const scheduledAt = input.status === 'scheduled' && input.scheduledAt ? new Date(input.scheduledAt) : null;
    if (input.status === 'scheduled' && (!scheduledAt || scheduledAt.getTime() <= Date.now())) return reply({ error: 'Choose a future publication date and time in IST.' }, 400);
    const publication = { scheduledAt, publicationError: null, publicationAttempts: 0, lastPublicationAttemptAt: null };
    if (request.method === 'POST') {
      const baseSlug = slugify(input.document.title) || 'article';
      const reserved = ['importance-of-stem-subjects', 'future-of-robotics-and-ai', 'mastering-the-kua-framework'];
      const exists = await db.select({ id: articles.id }).from(articles).where(eq(articles.slug, baseSlug)).limit(1);
      const slug = exists.length || reserved.includes(baseSlug) ? `${baseSlug}-${crypto.randomUUID().slice(0, 8)}` : baseSlug;
      const [record] = await db.insert(articles).values({ slug, document, status: input.status, ...publication, publishedAt: input.status === 'published' ? new Date() : null }).returning();
      return reply(record, 201);
    }
    if (!z.string().uuid().safeParse(context.params.id).success || !input.revision) return reply({ error: 'Invalid article ID or revision.' }, 400);
    const [record] = await db.update(articles).set({ document, status: input.status, ...publication, publishedAt: input.status === 'published' ? sql`CASE WHEN ${articles.status} = 'published' THEN COALESCE(${articles.publishedAt}, now()) ELSE now() END` : null, revision: sql`${articles.revision} + 1`, updatedAt: new Date() }).where(and(eq(articles.id, context.params.id), eq(articles.revision, input.revision))).returning();
    return record ? reply(record) : reply({ error: 'This article changed in another session. Reload it before saving.' }, 409);
  } catch (error) {
    if (error instanceof z.ZodError) return reply({ error: error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`).join('; ') }, 400);
    if (error instanceof SyntaxError) return reply({ error: 'Invalid article data.' }, 400);
    console.error('Article service failed', { method: request.method });
    return reply({ error: 'The article service is unavailable. Please retry; your editor content has not been cleared.' }, 503);
  }
};

export const config: Config = { path: ['/api/articles', '/api/articles/:slug', '/api/admin/articles', '/api/admin/articles/:id'] };
