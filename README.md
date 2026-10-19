# Type — Bilingual English & Amharic Learning Platform

## Getting Started

```bash
git clone https://github.com/Menelik2/Type.git
cd Type
npm install
npm run dev
```

## Progress

| Phase | Status |
|-------|--------|
| 0 Foundation | ✅ |
| 1 Public pages & i18n | ✅ |
| 2 Dashboard & progress | ✅ |
| 3 English MVP | ✅ |
| 4 Amharic Fidel MVP | ✅ |
| 5 Audio & listening | ✅ |
| 6 Administration | ✅ |
| 7 Production (Supabase, tests, deploy) | 🔜 |

### Phase 6 — Admin
- **Staff guard** (`/admin/*`) — login + editor/admin role
- **Dashboard** — course counts, recent audit
- **Courses** — draft / published / archived + audit on change
- **Users & roles** — local role switcher (dev only; production needs RLS)
- **Translation completeness** — EN/AM field checklist with publish warnings
- **Audit log** — last 100 admin actions

**Try admin:** Log in → open `/admin` → set role to **admin** on the access screen → Manage courses.

## Security notes
- Roles are localStorage mocks until Supabase `profiles.role` + RLS
- Never allow self-elevation in production from the client alone

## License

Private / All rights reserved for now.
