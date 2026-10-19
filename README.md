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
npm run test:run
npm run build
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
| 8 Shared typing engine | ✅ |

### Phase 8 — Typing

- **Unicode-safe** engine (grapheme-aware for Ethiopic)
- Live **WPM** + **accuracy**
- English & Amharic passages (beginner → intermediate)
- **Virtual Amharic keyboard** on Amharic mode
- Results saved locally (last 50) + best WPM per language
- Route: `/typing`

Auth/progress still mock until Supabase keys are connected. Schema is ready in `supabase/migrations/`.

## Docs

- [docs/DEPLOY.md](docs/DEPLOY.md)
- [docs/SECURITY.md](docs/SECURITY.md)

## License

Private / All rights reserved for now.
