# Security

## Current (mock) vs production

| Area | Mock (Phases 0–6) | Production target |
|------|-------------------|-------------------|
| Auth | localStorage user | Supabase Auth |
| Roles | localStorage | `profiles.role` + RLS |
| Progress | localStorage | `enrollments` / `lesson_progress` |
| Admin | Client guard only | RLS + server role |

## Hard rules

1. **Never** put the Supabase **service role** key in Vite/`VITE_*` env.
2. **Never** trust `localStorage` role for authorization once Supabase is live.
3. All tables must have **RLS enabled** (see migration).
4. Students cannot update `profiles.role` — use SQL or a secure Edge Function for promotions.
5. Audio uploads only via staff policies on `lesson-audio` bucket.

## XSS / content

- Prefer React text nodes over `dangerouslySetInnerHTML`.
- Lesson JSON from the DB should be treated as untrusted until sanitized if rich HTML is added later.

## Accessibility (baseline)

- Interactive controls use buttons with labels / `aria-label` where icon-only.
- Language switcher updates `document.documentElement.lang`.
- Keyboard focus should remain visible (Tailwind focus rings on form controls).

## Dependency hygiene

- Run `npm audit` before major releases.
- Pin CI to `npm ci` for reproducible installs.
