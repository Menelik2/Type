# Type — Bilingual English & Amharic Learning Platform

Professional full-stack language learning platform for English and Amharic (አማርኛ).

## Getting Started

```bash
git clone https://github.com/Menelik2/Type.git
cd Type
npm install
npm run dev
```

Open http://localhost:5173

## Current Progress

### ✅ Phase 0–2 — Foundation, public pages, dashboard & progress
### ✅ Phase 3 — English MVP (vocab, exercises)
### ✅ Phase 4 — Amharic Fidel MVP (families, recognition, virtual keyboard)
### ✅ Phase 5 — Audio & listening
- **AudioPlayer** — HTML5 audio when a file URL exists; **browser TTS fallback** otherwise
- Playback rate (0.75x / 1x / 1.25x), replay, honest error states
- **Listen & choose** and **dictation** exercises
- English lessons: alphabet, vowels, pronunciation, greetings, family — with listening practice
- Amharic: optional TTS on Fidel characters, vocab, and reading passages (`am-ET` when the OS provides a voice)
- Designed so real uploads via Supabase Storage plug in via `audioSrc` without UI changes

### Limitations (documented)
- No proprietary recorded Amharic studio audio is bundled yet — TTS quality depends on the browser/OS
- English TTS is widely available; Amharic TTS is not installed on every device
- Pronunciation is **not** auto-scored

### 🔜 Next
Shared typing engine · Supabase Auth + DB · Admin tools

## License

Private / All rights reserved for now.
