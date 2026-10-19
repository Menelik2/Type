# Type — Bilingual English & Amharic Learning Platform

## Getting Started

```bash
git clone https://github.com/Menelik2/Type.git
cd Type
npm install
cp .env.example .env.local
npm run dev
```

```bash
npm run test:run && npm run build
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
| 9 Vocabulary hub & progress insights | ✅ |

### Phase 9

- **`/vocabulary`** — bilingual word bank, search, tags, flip cards, TTS, mark as known
- **`/progress`** — enrolled courses %, vocab mastery, typing best WPM + recent runs

Still localStorage-backed until Supabase is connected (`docs/DEPLOY.md`).

## License

Private / All rights reserved for now.
