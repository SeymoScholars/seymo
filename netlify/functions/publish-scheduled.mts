import type { Config } from '@netlify/functions';
import { and, asc, eq, lte, sql } from 'drizzle-orm';
import { database } from '../../db/index';
import { articles } from '../../db/schema';
import { publicationProblem } from '../../src/editorial/model';

export default async () => {
  const startedAt = Date.now();
  try {
    const db = database();
    const due = await db.select().from(articles).where(and(eq(articles.status, 'scheduled'), lte(articles.scheduledAt, sql`now()`)))
      .orderBy(sql`${articles.lastPublicationAttemptAt} ASC NULLS FIRST`, asc(articles.scheduledAt)).limit(25);
    for (const article of due) {
      if (Date.now() - startedAt > 20_000) break;
      const unchanged = and(eq(articles.id, article.id), eq(articles.revision, article.revision), eq(articles.status, 'scheduled'), lte(articles.scheduledAt, sql`now()`));
      try {
        if (publicationProblem(article.document)) throw new Error('Publication validation failed');
        const published = await db.update(articles).set({ status: 'published', publishedAt: sql`now()`, updatedAt: sql`now()`, revision: sql`${articles.revision} + 1`, publicationError: null, publicationAttempts: sql`${articles.publicationAttempts} + 1`, lastPublicationAttemptAt: sql`now()` })
          .where(unchanged).returning({ id: articles.id });
        if (published.length) console.info('Scheduled article published', { articleId: article.id });
      } catch {
        console.error('Scheduled article publication failed', { articleId: article.id });
        try {
          await db.update(articles).set({ publicationError: 'Automatic publication failed. Open the article to check its fields, then retry publication or reschedule. Automatic retries continue every minute.', publicationAttempts: sql`${articles.publicationAttempts} + 1`, lastPublicationAttemptAt: sql`now()` }).where(unchanged);
        } catch {
          console.error('Unable to record publication failure; scheduled article remains queued', { articleId: article.id });
        }
      }
    }
  } catch {
    console.error('Scheduled publishing database check failed; due articles remain queued for the next run');
    throw new Error('Scheduled publishing database check failed');
  }
};

export const config: Config = { schedule: '* * * * *' };
