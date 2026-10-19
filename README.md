# Type — Bilingual English & Amharic Learning Platform

## Getting Started

```bash
git clone https://github.com/Menelik2/Type.git
cd Type
npm install
cp .env.example .env.local
npm run dev
```

## Phases

| Phase | Status |
|-------|--------|
| 0–7 Foundation → production readiness | ✅ |
| 8 Shared typing engine | ✅ |
| 9 Vocabulary & progress insights | ✅ |
| 10 Settings & profile | ✅ |

### Phase 10

- **`/settings`** — interface language, preferred learning language, reduce motion, Amharic keyboard default, clear learning / all data
- **`/profile`** — display name, role, sign out
- Header avatar shows your initial
- Settings apply interface language + `reduce-motion` on save

Local-first MVP is feature-complete. Next major step: connect Supabase (see `docs/DEPLOY.md`).

## License

Private / All rights reserved for now.
