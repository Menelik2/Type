# Type — Bilingual English & Amharic Learning Platform

Professional full-stack language learning platform for English and Amharic (አማርኛ).

## Features (MVP Roadmap)

- Bilingual interface (English / አማርኛ)
- Independent learning language selection
- Course catalog & My Courses dashboard
- English learning path (vocabulary, grammar, reading, writing, typing, listening)
- Amharic learning path (ፊደላት, ንባብ, ጽሕፈት, ቃላት, ሰዋሰው, ማዳመጥ)
- Shared Unicode-safe typing engine
- Progress tracking & Supabase backend
- Admin tools

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS + Lucide
- **Routing & Data**: React Router + TanStack Query
- **i18n**: i18next + react-i18next
- **Backend**: Supabase (Auth, PostgreSQL, Storage) — ready to connect
- **Testing**: Vitest + React Testing Library + Playwright
- **Deploy**: Vercel + GitHub

## Getting Started

```bash
git clone https://github.com/Menelik2/Type.git
cd Type
npm install
cp .env.example .env.local
# Supabase keys optional for now (mock auth + local progress work without them)
npm run dev
```

Open http://localhost:5173

## Current Progress

### ✅ Phase 0 — Foundation
- Vite + React + TypeScript + Tailwind v4
- i18next with full English & Amharic resources
- Language switcher (persists preference)
- Responsive layout + mobile navigation
- Ethiopic font support (Noto Sans Ethiopic)

### ✅ Phase 1 — Public pages & localization
- Landing page (bilingual)
- Login & Register (mock auth)
- Course catalog with search + filters
- Course details page
- Sample bilingual course data

### ✅ Phase 2 — Student dashboard & progress
- Local progress & enrollment store (`src/lib/progress.ts`)
- Course Player with sidebar, lesson navigation, complete button
- Auto-enroll on first open + resume last lesson
- Dashboard shows real enrolled courses & progress percentages
- Start / Continue Learning buttons reflect actual state
- Progress persists in localStorage (ready to swap to Supabase)

### 🔜 Next (Phase 3+)
- English MVP learning modules
- Amharic Fidel interactive lessons
- Typing engine
- Real Supabase Auth + database

## License

Private / All rights reserved for now.
