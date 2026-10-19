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
- **Backend**: Supabase (Auth, PostgreSQL, Storage, Edge Functions) — wired later
- **Testing**: Vitest + React Testing Library + Playwright
- **Deploy**: Vercel + GitHub

## Getting Started

```bash
git clone https://github.com/Menelik2/Type.git
cd Type
npm install
cp .env.example .env.local
# Supabase keys optional for Phase 1 (mock auth works without them)
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
- Login & Register (mock auth via localStorage)
- Course catalog with search + language + difficulty filters
- Course details page with objectives & outline
- My Courses / Dashboard with progress cards
- Sample bilingual course data (English + Amharic)

### 🔜 Next (Phase 2+)
- Real Supabase Auth + profiles
- Course player & lesson completion
- Persistent progress
- English & Amharic learning modules
- Typing engine

## License

Private / All rights reserved for now.
