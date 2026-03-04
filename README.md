# Meal Exchange Community (Knoshr)

Community-first meal sharing app built with React + Vite + TypeScript + Tailwind.

## What works now

- Browse and search meal tables.
- Join table flow with persistent membership state (stored in browser local storage).
- Auth screens and protected routes.
- Core profile/settings/notifications UI.
- Supabase-ready client with local mock fallback when env vars are not configured.

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env template:
   ```bash
   cp .env.example .env
   ```
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` values.
4. Start the app:
   ```bash
   npm run dev
   ```

## Build

```bash
npm run build
```

## Supabase mode vs mock mode

- If both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set, the app uses Supabase.
- If either is missing, the app falls back to a local in-memory mock client so the UI still runs.

## Next priorities to launch this for real users

1. Replace mock table/user data with real Supabase tables and policies.
2. Add server-side enforcement for membership, invitations, and table capacity.
3. Add message threads and reliable notifications (email/push) with a backend worker.
4. Add integration tests for auth, join flow, and profile updates.
