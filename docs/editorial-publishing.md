# Editorial drafts and scheduled publishing

The editorial desk retains the existing article document, section identifiers, rich-text formatting, preview template, and public URL routes. Its publishing panel provides **Save as Draft**, **Schedule Publication**, and **Publish Now**. The dashboard separates Drafts, Scheduled Articles, and Published Articles.

## Saving and editing

Drafts accept unfinished fields, including empty titles and partially entered image or reference URLs. Draft changes automatically save to Netlify Database after a two-second pause in typing; the explicit save button remains available. Typing can continue during an automatic save. A failed save pauses automatic saving, preserves the editor content, and presents an error. An explicit save retries it. No article content is stored in browser local storage.

Scheduled and published articles require explicit saves so ordinary typing cannot unintentionally change a scheduled article or publish changes. Open a scheduled article to edit it, preview it, reschedule it, cancel its schedule, or publish it immediately. Cancelling converts it to a private draft. Deleting requires an explicit confirmation and is restricted to drafts. Saving a published article as a draft or scheduling it again withdraws it from public view until its next publication.

Unsaved changes still need attention before navigating away. The editor warns on browser unload and asks before switching articles or signing out; wait for the save confirmation before leaving. A save is durable only after the database acknowledges it.

## Database changes and safety

The new additive migration `20261013080034_article_publication_schedule` adds timezone-aware scheduled and publication timestamps, an error message, an attempt counter, and a last-attempt timestamp. It also adds status/schedule consistency constraints and an index for queued publications. It does not update existing rows, replace article documents, change slugs, or delete anything. The already-applied `20261009082643_create_editorial_articles` migration is unchanged.

Postgres `timestamptz` stores instants consistently. The scheduling interface explicitly interprets its date and time in **India Standard Time (IST, Asia/Kolkata)** and sends an offset-aware UTC timestamp. All dashboard publication timestamps display in IST, independently of the administrator's device timezone. Existing articles that predate publication timestamp tracking display their original article date, without inventing an exact publication time. Article dates entered in the document remain unchanged.

Netlify applies pending migrations automatically as part of a deployment. Deploy Previews use isolated database branches. Do not merge into the production branch or publish this change to production until the site owner approves the database changes. No migration has been manually applied as part of this implementation.

## Automatic publishing and operational requirements

The `publish-scheduled` Netlify Scheduled Function runs once per minute using the UTC cron expression `* * * * *`. No browser session, administrator login, API key, or external scheduling service is required. Netlify Scheduled Functions are available on all pricing plans, subject to the account's normal function usage and limits. Check usage allowances for the approximately 1,440 daily invocations before enabling it on a published site.

The job reads due scheduled articles from the database and validates their readiness. Each successful publication uses an atomic update guarded by article ID, revision, scheduled status, and due time. Repeated or overlapping job invocations cannot publish an already-published article, and a concurrent administrator edit, cancellation, or reschedule prevents an old worker snapshot from being applied. The worker only changes publishing metadata; it never rewrites article content or slugs.

The worker processes up to 25 queued articles per invocation, oldest unattempted work first, and stops starting additional work after 20 seconds to leave room within Netlify's scheduled-function execution limit. Ordinarily an article publishes at the next minute tick, not exactly at the selected second. Outages or a large queue can delay publication; remaining queued articles are considered on subsequent runs.

Failed publications stay Scheduled. The job logs the affected article ID without article content or credentials, records a safe error and attempt metadata when the database is reachable, and automatically retries on subsequent ticks. The dashboard displays errors and overdue schedules. Open the article, check its fields, and use **Retry publication now**, **Publish Now**, or **Reschedule**. If the database itself is unavailable, inspect the function logs; the queued records remain intact and are reconsidered after recovery.

The job is not a public HTTP endpoint. Netlify runs timers only for a site's published deploy. Deploy Previews and branch deploys do not automatically run cron timers; use the Netlify Functions **Run now** control to test the job there. For a true unattended end-to-end test, use a separate published test site with an isolated test database and Identity configuration. Do not publish this change to the existing production site merely to test it.

Existing Netlify Identity administrator accounts remain the authorization mechanism. Mutation requests require a valid authenticated administrator session and same-origin verification. Public article listing and slug lookup enforce `status = 'published'` in their database queries, so drafts and scheduled documents are never returned by those endpoints. Their article URLs show the existing not-found view until publication. The existing legacy published articles remain in Resources.

## Validation performed

TypeScript checking (`npx tsc --noEmit`) and whitespace validation (`git diff --check`) passed. A temporary local test harness ran 25 passing checks using the actual article handler, scheduler, validation schemas, and IST conversion functions with mocked database and Identity adapters. Checks covered incomplete draft preservation, readiness validation, timezone/day-boundary conversion, invalid dates/times, unauthorized access, cross-origin writes, public publication filters, draft creation, future/past/missing schedules, cancellation, rescheduling, revision conflicts, draft-only deletion, publication without login, repeated invocation, failure recording, and the cron expression. These were not live database or browser end-to-end tests.

A read-only check of the connected preview database found two published editorial articles. Migration status confirmed the original migration was applied and the new migration was pending. No database records were modified, and no deployment or build command was run. Live migration testing, authenticated browser flows, and automatic timer delivery still require a safe deployed environment.

## Deployment Preview acceptance checklist

1. Allow the preview deployment lifecycle to apply the new migration to its isolated database branch. Confirm both migrations remain recorded and both pre-existing published articles keep their documents and URLs. Never run migration or push commands manually.
2. Sign in as an administrator. Create an article with rich text, summary section links, sections, references, and a hero image. Save as Draft, refresh, reopen, and compare every field. Also verify auto-save after a pause in typing, including an unfinished reference.
3. In an unauthenticated session, verify the draft is absent from Resources and `/api/articles`, and its article API URL returns 404 without content. Repeat with a scheduled article. The SPA may serve its normal HTML shell at an unpublished article route, but the article view must remain not found.
4. Schedule a complete article several minutes ahead in IST. Confirm the review screen and Scheduled Articles timestamp agree. Invoke the worker with **Run now** before the due time and verify the article stays hidden.
5. Close all administrator sessions. After the due time, invoke the worker from the Netlify dashboard on the preview. Confirm status becomes Published, Resources includes it, and its original article URL renders correctly. Invoke again and confirm its revision/publication time do not change.
6. On a separate published test site, repeat scheduling with all sessions closed and no manual invocation. Confirm the platform timer publishes it automatically. This is the actual unattended delivery test; a Deploy Preview cannot establish it.
7. Edit and save a scheduled article, reschedule it later, run the worker after the original time but before the new time, and confirm it remains hidden. Cancel its schedule, refresh, and confirm it stays a draft even after its old due time.
8. Test two editor sessions: stale saves/deletions must fail with a revision conflict rather than overwrite work. Confirm anonymous and non-admin mutation requests are rejected and cross-origin mutations are refused.
9. In the isolated test environment, simulate database unavailability or an invalid queued document through approved test fixtures. Check logs, retained Scheduled status, dashboard failure details or overdue notice, automatic recovery/retries, and administrator retry. Restore the test environment afterward.

After these checks, obtain the site owner's explicit approval before merging or deploying to production. Production setup then consists of the normal approved deployment, confirming the scheduled function appears enabled in Netlify, and checking its logs and usage. No external scheduler setup is necessary.
