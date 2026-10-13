import { pgTable, uuid, text, jsonb, integer, timestamp, check, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import type { ArticleContent } from '../src/editorial/model';

export const articles = pgTable('editorial_articles', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  status: text('status').$type<'draft' | 'scheduled' | 'published'>().notNull().default('draft'),
  document: jsonb('document').$type<ArticleContent>().notNull(),
  revision: integer('revision').notNull().default(1),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  scheduledAt: timestamp('scheduled_at', { withTimezone: true }),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  publicationError: text('publication_error'),
  publicationAttempts: integer('publication_attempts').notNull().default(0),
  lastPublicationAttemptAt: timestamp('last_publication_attempt_at', { withTimezone: true }),
}, table => [
  check('editorial_articles_status_check', sql`${table.status} IN ('draft', 'scheduled', 'published')`),
  check('editorial_articles_schedule_check', sql`${table.status} <> 'scheduled' OR ${table.scheduledAt} IS NOT NULL`),
  index('editorial_articles_due_idx').on(table.scheduledAt).where(sql`${table.status} = 'scheduled'`),
]);
