# Type — Bilingual English & Amharic Learning Platform

## Getting Started

```bash
git clone https://github.com/Menelik2/Type.git
cd Type
npm install
cp .env.example .env.local   # optional until Supabase is connected
npm run dev
```

```bash
npm run test:run   # unit tests
npm run build      # production build
```

## Progress

| Phase | Status |
|-------|--------|
| 0–2 Foundation, public pages, dashboard | ✅ |
| 3 English MVP | ✅ |
| 4 Amharic Fidel MVP | ✅ |
| 5 Audio & listening | ✅ |
| 6 Administration | ✅ |
| 7 Production readiness | ✅ |

### Phase 7 includes

- **Supabase schema** — `supabase/migrations/001_initial_schema.sql` (profiles, courses, chapters, lessons, enrollments, progress, audit + RLS)
- **Vitest** — `src/lib/utils.test.ts`, `src/lib/progress.test.ts`
- **CI** — `.github/workflows/ci.yml` (install, test, build)
- **Vercel** — `vercel.json` SPA rewrites
- **Docs** — [docs/DEPLOY.md](docs/DEPLOY.md), [docs/SECURITY.md](docs/SECURITY.md)

App still runs fully on **localStorage mocks** until you set real Supabase keys and swap auth/progress clients.

## Deploy

See [docs/DEPLOY.md](docs/DEPLOY.md).

## License

Private / All rights reserved for now.
