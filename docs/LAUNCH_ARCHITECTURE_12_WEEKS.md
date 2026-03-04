# Knoshr 12-Week Launch Architecture

## Goals
- Launch safely with real users and real payments.
- Keep architecture simple now and migration-friendly later.
- Eliminate mock/demo behavior in production paths.

## Target Architecture (v1)
- Frontend: React + Vite app (this repo).
- Auth/Data/Storage/Realtime: Supabase.
- Server-side logic: Supabase Edge Functions.
- Payments: Stripe Checkout + webhook fulfillment.
- Email: transactional provider (Resend or Postmark).
- Observability: Sentry + structured logs + uptime checks.

## Core Data Model (Supabase)
- `user_profiles`
  - `id` (uuid, PK, references `auth.users.id`)
  - `display_name`, `phone`, `bio`, `city`, `avatar_url`
- `meal_tables`
  - `id` (uuid, PK)
  - `name`, `description`, `cuisine_type`, `location`
  - `meeting_day`, `meeting_time`, `max_members`, `cost_per_meal`
  - `invite_code` (unique), `requires_approval`, `is_private`
  - `created_by` (uuid FK), timestamps
- `table_memberships`
  - `id` (uuid), `table_id`, `user_id`, `role` (`owner|member`)
  - `status` (`active|pending|rejected|left`), unique (`table_id`,`user_id`)
- `table_invites`
  - `id`, `table_id`, `invite_code`, `expires_at`, `max_uses`, `uses`
- `table_reviews`
  - `id`, `table_id`, `user_id`, ratings fields, `comment`, timestamps
- `notifications`
  - `id`, `user_id`, `type`, `priority`, `payload`, `read_at`, timestamps
- `orders`
  - `id`, `user_id`, `stripe_session_id` (unique), `status`, totals, timestamps
- `order_items`
  - `id`, `order_id`, `sku`, `name`, `unit_price`, `qty`

## Security and Policies
- Enable RLS on all user tables.
- Policy pattern:
  - Owner can manage their tables.
  - Members can read joined-table content.
  - Users can only update their own profile/preferences.
  - Orders readable only by the owning user/admin service role.
- Never trust client-only checks for membership, invite, or capacity.

## Edge Functions (must-have)
- `join-table-by-invite`
  - Validates invite, capacity, and membership status transactionally.
- `create-checkout-session`
  - Validates cart server-side and creates Stripe session.
- `stripe-webhook`
  - Verifies Stripe signature and writes `orders` atomically.
- `send-notification`
  - Persists in-app notifications and optionally sends email.

## 12-Week Delivery Plan

### Weeks 1-2: Production Safety Foundation
- Remove silent production mock/demo paths.
- Add environment validation and deployment guards.
- Set up Sentry and log correlation IDs.
- Define DB schema and generate TypeScript types.

### Weeks 3-4: Auth + Profiles + Table CRUD
- Implement profile read/write with RLS.
- Move dashboard/search to live `meal_tables`.
- Add table creation with validated `invite_code` uniqueness.
- Add owner/member roles.

### Weeks 5-6: Join and Membership Enforcement
- Build `join-table-by-invite` edge function.
- Add membership requests + approval workflow.
- Enforce capacity and duplicate membership server-side.
- Replace localStorage membership source with DB.

### Weeks 7-8: Reviews + Notifications
- Store reviews in DB and compute rating aggregates.
- Replace simulated notification generator with real events.
- Add notification center persistence + unread counts.

### Weeks 9-10: Payments and Orders
- Production Stripe checkout session flow.
- Webhook-driven order finalization and idempotency.
- Remove demo order fallback in production.
- Build order history and receipt retrieval.

### Weeks 11-12: Reliability + Launch Readiness
- E2E smoke tests (auth, join invite, review, checkout).
- Rate limits and abuse controls on public endpoints.
- Performance pass (images, bundle, query tuning).
- Incident runbook, backups, and launch checklist.

## Migration-Friendly Design Rules
- Keep business logic in edge functions, not UI.
- Keep SQL migrations versioned and reversible.
- Use repository-style wrappers around Supabase queries in app code.
- Keep external integrations behind small service modules.

## Launch Gates (must pass)
- No mock backend in production unless explicitly enabled.
- No successful order confirmation without webhook-confirmed payment.
- Join-table flow enforced on server side.
- RLS enabled and tested for all user data.
- Error monitoring and alerting active in production.
