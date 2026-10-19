# Deployment

## Prerequisites

1. Supabase project created
2. Run `supabase/migrations/001_initial_schema.sql` in the SQL editor
3. Create storage bucket `lesson-audio` (optional for Phase 5 real audio)
4. Copy project URL + **anon** key (never ship the service role key to the browser)

## Environment variables

| Variable | Where |
|----------|--------|
| `VITE_SUPABASE_URL` | Vercel + local `.env.local` |
| `VITE_SUPABASE_ANON_KEY` | Vercel + local `.env.local` |

Local:

```bash
cp .env.example .env.local
# fill values
npm run dev
```

## Vercel

1. Import the GitHub repo
2. Framework: Vite
3. Build command: `npm run build`
4. Output: `dist`
5. Set the two env vars above
6. Deploy

`vercel.json` rewrites all routes to `index.html` for React Router.

## First admin user

1. Register via the app (creates `auth.users` + `profiles` with role `student`)
2. In Supabase SQL:

```sql
update public.profiles
set role = 'admin'
where email = 'you@example.com';
```

Do **not** expose a client-side role elevation in production.

## Smoke checklist after deploy

- [ ] Landing loads in EN and አማርኛ
- [ ] Login / register
- [ ] Enroll + complete a lesson (progress persists after refresh when Supabase wired)
- [ ] `/admin` blocked for students
- [ ] Published courses visible; drafts hidden to public
