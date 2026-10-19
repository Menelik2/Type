# Type — Bilingual English & Amharic Learning Platform

**Type** is a professional bilingual learning app inspired by [YouType](https://youtype.app): courses, vocabulary, typing practice, listen-and-type audio mode, progress tracking, and admin tools — with full **English ↔ Amharic** UI and content.

| | |
|---|---|
| **Repo** | https://github.com/Menelik2/Type |
| **Branch** | `root` (active development) |
| **Stack** | React 19 · TypeScript · Vite · Tailwind CSS v4 · i18next · localStorage MVP |
| **Deploy** | Vercel-ready static frontend (see `docs/DEPLOY.md`) |

---

## Features

### Learn
- **Courses** — English and Amharic curricula (text, vocab, grammar, reading, listening)
- **Course player** — sequential lessons with mock progress
- **Vocabulary hub** — searchable bank with **Beginner / Intermediate / Pro** levels, topic tags, flip cards, TTS, mark-as-known
- **Fidel lessons** — Amharic character families with audio

### Practice
- **Typing** — shared engine for English & Amharic (grapheme-aware), WPM / accuracy, virtual Amharic keyboard, **Hear passage** voice
- **Listen · Type · Remember** (`/practice/audio`) — YouType-style audio dictation (EN/AM, easy → hard)
- **Listening exercises** — listen & choose, dictation

### Voice
- Browser TTS for English
- Amharic: native `am-ET` voice when installed, otherwise **online Amharic audio fallback**
- Speed controls (where supported)

### App shell
- **i18n** — independent UI language (English / አማርኛ)
- **Auth (mock)** — login / register via localStorage
- **Dashboard & progress** — enrollments, stats, known vocab count
- **Settings & profile** — language prefs, reduce motion, Amharic keyboard default, clear data
- **Admin** — staff role, courses / users / audit / translations placeholders

### Backend readiness
- Supabase client + schema migration stubs (mock mode without keys)
- `vercel.json` for static deploy

---

## Quick start

```bash
git clone https://github.com/Menelik2/Type.git
cd Type
git checkout root

npm install
cp .env.example .env.local   # optional; works offline without Supabase
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run test` | Vitest (watch) |
| `npm run test:run` | Vitest once |
| `npm run test:e2e` | Playwright e2e |

---

## Main routes

| Path | Page |
|------|------|
| `/` | Landing |
| `/login`, `/register` | Auth |
| `/dashboard` | Continue learning |
| `/courses`, `/courses/:slug` | Explore & course detail |
| `/learn/:slug` | Course player |
| `/vocabulary` | Vocabulary (levels + tags) |
| `/practice/audio` | Listen & Type |
| `/typing` | Typing practice |
| `/progress` | Progress insights |
| `/settings`, `/profile` | Preferences |
| `/admin/*` | Staff tools |

---

## Project structure (high level)

```
src/
  components/     # AudioPlayer, exercises, layout, keyboard, admin
  data/           # Lessons, vocabulary (core + extra + pro), typing & listen banks
  lib/            # typing engine, voice/TTS, progress, auth, settings
  pages/          # Routes including ListenTypePage, VocabularyPage, TypingPage
  i18n/           # en.json, am.json
supabase/         # Schema migrations (future)
docs/             # Deploy notes
```

---

## Voice notes

1. Prefer **Chrome or Edge** for TTS.
2. Unmute the browser tab and device.
3. **English** uses the system speech engine.
4. **Amharic** uses a device Amharic voice if available; otherwise an online audio fallback (needs network).
5. Production path later: upload recorded files to storage and pass `src` into `AudioPlayer`.

---

## Development phases

| Phase | Status |
|-------|--------|
| 0–7 Foundation → production readiness | Done |
| 8 Shared typing engine | Done |
| 9 Vocabulary & progress | Done |
| 10 Settings & profile | Done |
| Voice + Listen/Type + Amharic TTS | Done |
| Pro intermediate/advanced vocab | Done |
| Supabase live keys | Pending |

Local-first MVP is feature-complete without Supabase keys. Connect Supabase when ready (`docs/DEPLOY.md`).

---

## Environment

Copy `.env.example` → `.env.local`. Without Supabase URL/keys the app stays in **mock mode** (localStorage).

---

## Deploy (Vercel)

1. Import this GitHub repo in Vercel.
2. Framework: Vite · Build: `npm run build` · Output: `dist`.
3. Set the production branch to **`root`** if that is not the default.
4. Optional: add Supabase env vars when integrating the backend.

---

## License

Private / All rights reserved for now.
