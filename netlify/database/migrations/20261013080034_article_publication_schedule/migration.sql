ALTER TABLE "editorial_articles" ADD COLUMN "scheduled_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "editorial_articles" ADD COLUMN "published_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "editorial_articles" ADD COLUMN "publication_error" text;--> statement-breakpoint
ALTER TABLE "editorial_articles" ADD COLUMN "publication_attempts" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "editorial_articles" ADD COLUMN "last_publication_attempt_at" timestamp with time zone;--> statement-breakpoint
CREATE INDEX "editorial_articles_due_idx" ON "editorial_articles" ("scheduled_at") WHERE "status" = 'scheduled';--> statement-breakpoint
ALTER TABLE "editorial_articles" ADD CONSTRAINT "editorial_articles_status_check" CHECK ("status" IN ('draft', 'scheduled', 'published'));--> statement-breakpoint
ALTER TABLE "editorial_articles" ADD CONSTRAINT "editorial_articles_schedule_check" CHECK ("status" <> 'scheduled' OR "scheduled_at" IS NOT NULL);