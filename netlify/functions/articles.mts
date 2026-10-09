import type { Config, Context } from '@netlify/functions';
import { and, desc, eq, sql } from 'drizzle-orm';
import { z } from 'zod';
import { database } from '../../db/index';
import { articles } from '../../db/schema';
import { articleSchema, brokenSummarySectionLinks, hasContent, slugify } from '../../src/editorial/model';
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
      const records = await db.select().from(articles).where(isAdmin ? undefined : eq(articles.status, 'published')).orderBy(desc(articles.updatedAt)).limit(500);
      return reply(records);
    }
    if (!['POST', 'PUT'].includes(request.method)) return reply({ error: 'Method not allowed.' }, 405);
    const raw = await request.text();
    if (raw.length > 1_000_000) return reply({ error: 'Article is too large.' }, 413);
    const input = z.object({ document: articleSchema, status: z.enum(['draft', 'published']), revision: z.number().int().positive().optional() }).parse(JSON.parse(raw));
    if (input.status === 'published' && brokenSummarySectionLinks(input.document).length) {
      return reply({ error: 'Fix the broken summary section links before publishing.' }, 400);
    }
    if (input.status === 'published' && (!input.document.heroImage || !input.document.heroAlt || !hasContent(input.document.introduction))) {
      return reply({ error: 'Publishing requires a hero image, image description, and introduction.' }, 400);
    }
    if (request.method === 'POST') {
      const baseSlug = slugify(input.document.title) || 'article';
      const reserved = ['importance-of-stem-subjects', 'future-of-robotics-and-ai', 'mastering-the-kua-framework'];
      const exists = await db.select({ id: articles.id }).from(articles).where(eq(articles.slug, baseSlug)).limit(1);
      const slug = exists.length || reserved.includes(baseSlug) ? `${baseSlug}-${crypto.randomUUID().slice(0, 8)}` : baseSlug;
      const [record] = await db.insert(articles).values({ slug, document: input.document, status: input.status }).returning();
      return reply(record, 201);
    }
    if (!z.string().uuid().safeParse(context.params.id).success || !input.revision) return reply({ error: 'Invalid article ID or revision.' }, 400);
    const [record] = await db.update(articles).set({ document: input.document, status: input.status, revision: sql`${articles.revision} + 1`, updatedAt: new Date() }).where(and(eq(articles.id, context.params.id), eq(articles.revision, input.revision))).returning();
    return record ? reply(record) : reply({ error: 'This article changed in another session. Reload it before saving.' }, 409);
  } catch (error) {
    if (error instanceof z.ZodError) return reply({ error: error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`).join('; ') }, 400);
    if (error instanceof SyntaxError) return reply({ error: 'Invalid article data.' }, 400);
    return reply({ error: 'The article service is unavailable. Please retry; your editor content has not been cleared.' }, 503);
  }
};

export const config: Config = { path: ['/api/articles', '/api/articles/:slug', '/api/admin/articles', '/api/admin/articles/:id'] };
