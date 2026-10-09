import { pgTable, uuid, text, jsonb, integer, timestamp } from 'drizzle-orm/pg-core';
import type { ArticleContent } from '../src/editorial/model';

export const articles = pgTable('editorial_articles', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  status: text('status').notNull().default('draft'),
  document: jsonb('document').$type<ArticleContent>().notNull(),
  revision: integer('revision').notNull().default(1),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
