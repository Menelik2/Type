/**
 * Browser TTS — English + Amharic.
 * Priority: native SpeechSynthesis (same user-gesture stack) → multi-source audio fallbacks.
 * Avoid awaiting before synth.speak() — Chrome requires user activation.
 *
 * Amharic: very few devices ship an am-ET voice. Online Google Translate TTS is used as
 * the free fallback (short chunks). For production quality, later add recorded audio or
 * a dedicated Amharic TTS provider (e.g. Addis AI).
 */

export type VoiceLang = 'en' | 'am'

const LANG_TAG: Record<VoiceLang, string> = {
  en: 'en-US',
  am: 'am-ET',
}

let cachedVoices: SpeechSynthesisVoice[] = []
let voicesHooked = false
let speakToken = 0
let currentAudio: HTMLAudioElement | null = null

export function isTtsAvailable(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

function refreshVoiceCache() {
  if (!isTtsAvailable()) return
  try {
    const list = window.speechSynthesis.getVoices()
    if (list.length) cachedVoices = list
  } catch {
    /* ignore */
  }
}

export function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  if (!isTtsAvailable()) return Promise.resolve([])
  refreshVoiceCache()
  if (cachedVoices.length > 0) return Promise.resolve(cachedVoices)

  return new Promise((resolve) => {
    const synth = window.speechSynthesis
    const finish = () => {
      refreshVoiceCache()
      resolve(cachedVoices)
    }
    if (!voicesHooked) {
      voicesHooked = true
      synth.addEventListener('voiceschanged', () => refreshVoiceCache())
    }
    const onVoices = () => {
      synth.removeEventListener('voiceschanged', onVoices)
      finish()
    }
    synth.addEventListener('voiceschanged', onVoices)
    // Kick Chrome to populate voices
    try {
      synth.getVoices()
    } catch {
      /* ignore */
    }
    window.setTimeout(finish, 400)
  })
}

export function warmUpVoices() {
  if (!isTtsAvailable()) return
  refreshVoiceCache()
  void loadVoices()
  // Chrome: empty utterance unlocks the engine after a user gesture
  try {
    const u = new SpeechSynthesisUtterance('')
    u.volume = 0
    window.speechSynthesis.speak(u)
    window.speechSynthesis.cancel()
  } catch {
    /* ignore */
  }
}

function haltMedia() {
  if (isTtsAvailable()) {
    try {
      window.speechSynthesis.cancel()
    } catch {
      /* ignore */
    }
  }
  if (currentAudio) {
    try {
      currentAudio.onended = null
      currentAudio.onerror = null
      currentAudio.oncanplaythrough = null
      currentAudio.pause()
      currentAudio.removeAttribute('src')
      currentAudio.load()
    } catch {
      /* ignore */
    }
    currentAudio = null
  }
}

export function stopSpeaking() {
  speakToken += 1
  haltMedia()
}

export function pickVoice(
  lang: VoiceLang | string,
  voices?: SpeechSynthesisVoice[]
): SpeechSynthesisVoice | null {
  const list =
    voices && voices.length
      ? voices
      : cachedVoices.length
        ? cachedVoices
        : isTtsAvailable()
          ? window.speechSynthesis.getVoices()
          : []
  if (!list.length) return null

  const tag =
    typeof lang === 'string' && lang.includes('-')
      ? lang.toLowerCase()
      : (LANG_TAG[(lang as VoiceLang) || 'en'] || 'en-US').toLowerCase()
  const prefix = tag.split('-')[0]

  const byExact = list.find((v) => v.lang.toLowerCase() === tag)
  if (byExact) return byExact
  const byPrefix = list.find((v) => v.lang.toLowerCase().startsWith(prefix + '-'))
  if (byPrefix) return byPrefix
  const byName =
    prefix === 'am'
      ? list.find(
          (v) =>
            /amharic|ethiopic|አማርኛ|am-et|am_et/i.test(v.name + ' ' + v.lang) ||
            v.lang.toLowerCase().startsWith('am')
        )
      : null
  if (byName) return byName
  // English fallback: prefer local high-quality
  if (prefix === 'en') {
    return (
      list.find((v) => /en-US/i.test(v.lang) && v.localService) ||
      list.find((v) => /^en/i.test(v.lang) && v.localService) ||
      list.find((v) => /^en/i.test(v.lang)) ||
      null
    )
  }
  return null
}

export async function hasAmharicVoice(): Promise<boolean> {
  const voices = await loadVoices()
  return !!pickVoice('am', voices)
}

function toTl(lang: VoiceLang | string): string {
  if (typeof lang === 'string' && lang.includes('-')) {
    return lang.split('-')[0].toLowerCase()
  }
  return lang === 'am' ? 'am' : 'en'
}

function isAmharicLang(lang: VoiceLang | string): boolean {
  if (lang === 'am') return true
  if (typeof lang === 'string') return lang.toLowerCase().startsWith('am')
  return false
}

/** Split text for TTS. Amharic needs shorter chunks — Google TTS is flaky on long Ethiopic. */
function chunkText(text: string, maxLen = 140): string[] {
  const cleaned = text.replace(/\s+/g, ' ').trim()
  if (!cleaned) return []
  if (cleaned.length <= maxLen) return [cleaned]

  const parts: string[] = []
  // Amharic sentence ends: ። ፧ ! ? and common Latin punctuation
  const sentences = cleaned.split(/(?<=[.!?።፧፡,،])\s+/)
  let buf = ''
  for (const s of sentences) {
    if ((buf + ' ' + s).trim().length <= maxLen) {
      buf = (buf + ' ' + s).trim()
    } else {
      if (buf) parts.push(buf)
      if (s.length <= maxLen) {
        buf = s
      } else {
        // Hard split long runs (rare for Amharic words, but safe)
        for (let i = 0; i < s.length; i += maxLen) parts.push(s.slice(i, i + maxLen))
        buf = ''
      }
    }
  }
  if (buf) parts.push(buf)
  return parts.filter(Boolean)
}

/** Candidate audio TTS URLs (tried in order). Amharic = tl=am. */
function buildAudioUrls(text: string, lang: VoiceLang | string): string[] {
  const tl = toTl(lang)
  const q = encodeURIComponent(text)
  // Multiple clients / hosts — unofficial Google Translate TTS; order by historical reliability
  return [
    `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${tl}&q=${q}`,
    `https://translate.googleapis.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${tl}&q=${q}`,
    `https://translate.google.com/translate_tts?ie=UTF-8&client=gtx&tl=${tl}&q=${q}`,
    `https://translate.google.com/translate_tts?ie=UTF-8&client=t&tl=${tl}&q=${q}`,
    `https://translate.googleapis.com/translate_tts?ie=UTF-8&client=gtx&tl=${tl}&q=${q}`,
  ]
}

function playAudioUrl(url: string, token: number, timeoutMs = 12000): Promise<boolean> {
  return new Promise((resolve) => {
    if (token !== speakToken) {
      resolve(false)
      return
    }
    const audio = new Audio()
    currentAudio = audio
    let settled = false

    const done = (ok: boolean) => {
      if (settled) return
      settled = true
      if (currentAudio === audio) currentAudio = null
      resolve(ok && token === speakToken)
    }

    audio.preload = 'auto'
    // Do NOT set crossOrigin — that forces CORS and breaks translate_tts

    const timeout = window.setTimeout(() => done(false), timeoutMs)

    audio.onended = () => {
      clearTimeout(timeout)
      done(true)
    }
    audio.onerror = () => {
      clearTimeout(timeout)
      done(false)
    }

    try {
      audio.src = url
      const p = audio.play()
      if (p && typeof p.then === 'function') {
        p.catch(() => {
          clearTimeout(timeout)
          done(false)
        })
      }
    } catch {
      clearTimeout(timeout)
      done(false)
    }
  })
}

async function playFirstWorkingUrl(
  urls: string[],
  token: number,
  timeoutMs = 12000
): Promise<boolean> {
  for (const url of urls) {
    if (token !== speakToken) return false
    haltMedia()
    // tiny yield so previous audio fully releases
    await new Promise((r) => setTimeout(r, 40))
    if (token !== speakToken) return false
    const ok = await playAudioUrl(url, token, timeoutMs)
    if (ok) return true
  }
  return false
}

async function speakViaAudio(
  text: string,
  lang: VoiceLang | string,
  token: number,
  onStart?: () => void
): Promise<boolean> {
  const isAm = isAmharicLang(lang)
  // Amharic: keep chunks short so Google TTS is less likely to reject / timeout
  const maxLen = isAm ? 90 : 140
  const chunks = chunkText(text, maxLen)
  if (!chunks.length) return false
  const timeoutMs = isAm ? 16000 : 12000
  let started = false
  for (const chunk of chunks) {
    if (token !== speakToken) return false
    if (!started) {
      started = true
      onStart?.()
    }
    const urls = buildAudioUrls(chunk, lang)
    const ok = await playFirstWorkingUrl(urls, token, timeoutMs)
    if (!ok) return false
  }
  return token === speakToken
}

function normalizeRate(rate: number) {
  return Math.min(1.8, Math.max(0.6, rate))
}

export type SpeakOptions = {
  lang?: VoiceLang | string
  rate?: number
  forceTranslate?: boolean
  onStart?: () => void
  onEnd?: () => void
  onError?: (msg: string) => void
}

/**
 * Speak text. Call from a click/tap handler when possible.
 * Native TTS runs synchronously after cancel so Chrome keeps user activation.
 */
export async function speak(text: string, opts: SpeakOptions = {}): Promise<boolean> {
  const trimmed = text?.trim()
  if (!trimmed) {
    opts.onError?.('Nothing to speak.')
    return false
  }

  // New generation — invalidate in-flight work once
  const token = ++speakToken
  haltMedia()

  const langOpt = opts.lang || 'en'
  const isAm = isAmharicLang(langOpt)

  refreshVoiceCache()
  if (isTtsAvailable() && cachedVoices.length === 0) {
    try {
      cachedVoices = window.speechSynthesis.getVoices()
    } catch {
      /* ignore */
    }
  }

  const nativeVoice = pickVoice(langOpt, cachedVoices)
  // Amharic: only use native if we truly have an am voice
  // English: use any en voice, or default system voice
  const canNative =
    !opts.forceTranslate &&
    isTtsAvailable() &&
    (isAm
      ? !!nativeVoice && nativeVoice.lang.toLowerCase().startsWith('am')
      : true)

  if (canNative) {
    const okNative = await new Promise<boolean>((resolve) => {
      if (token !== speakToken) {
        resolve(false)
        return
      }
      const synth = window.speechSynthesis
      try {
        // Ensure not stuck paused (Chrome bug)
        synth.resume()
      } catch {
        /* ignore */
      }

      const u = new SpeechSynthesisUtterance(trimmed)
      if (nativeVoice) {
        u.voice = nativeVoice
        u.lang = nativeVoice.lang
      } else {
        u.lang = isAm ? 'am-ET' : 'en-US'
      }
      u.rate = normalizeRate(opts.rate ?? 1)
      u.pitch = 1
      u.volume = 1

      let finished = false
      const finish = (ok: boolean) => {
        if (finished) return
        finished = true
        resolve(ok)
      }

      u.onstart = () => {
        if (token === speakToken) opts.onStart?.()
      }
      u.onend = () => {
        if (token === speakToken) opts.onEnd?.()
        finish(true)
      }
      u.onerror = (ev) => {
        const err = (ev as SpeechSynthesisErrorEvent).error
        // interrupted/canceled = we stopped it on purpose or StrictMode remount
        if (err === 'interrupted' || err === 'canceled') {
          finish(false)
          return
        }
        finish(false)
      }

      try {
        // CRITICAL: speak in this same turn — no await before this line
        synth.speak(u)
        try {
          synth.resume()
        } catch {
          /* ignore */
        }

        // Chrome sometimes freezes the queue — poke resume
        const poke = window.setInterval(() => {
          if (token !== speakToken || finished) {
            clearInterval(poke)
            return
          }
          try {
            if (synth.paused) synth.resume()
          } catch {
            /* ignore */
          }
        }, 800)

        const maxMs = Math.min(45000, Math.max(3500, trimmed.length * 90))
        window.setTimeout(() => {
          clearInterval(poke)
          if (!finished) {
            // Treat timeout as soft success if still same token (utterance may have finished without event)
            if (token === speakToken) {
              try {
                synth.cancel()
              } catch {
                /* ignore */
              }
              opts.onEnd?.()
              finish(true)
            } else {
              finish(false)
            }
          }
        }, maxMs)
      } catch {
        finish(false)
      }
    })

    if (okNative) return true
    if (token !== speakToken) return false
    // Fall through to audio if native failed (not canceled)
  }

  // —— Audio fallback (esp. Amharic without system voice) ——
  if (token !== speakToken) return false
  const okAudio = await speakViaAudio(trimmed, langOpt, token, opts.onStart)
  if (token !== speakToken) return false
  if (okAudio) {
    opts.onEnd?.()
    return true
  }

  opts.onError?.(
    isAm
      ? 'Amharic speech failed. Install an Amharic system voice, or check network (online audio). · የአማርኛ ድምፅ አልተሳካም። የአማርኛ ድምፅ ይጫኑ ወይም ኢንተርኔት ይፈትሹ።'
      : 'Speech failed. Use Chrome or Edge, unmute the tab, and try again.'
  )
  return false
}

export function ttsLangTag(lang: VoiceLang): string {
  return LANG_TAG[lang]
}

export function toVoiceLang(tag?: string): VoiceLang {
  if (!tag) return 'en'
  return tag.toLowerCase().startsWith('am') ? 'am' : 'en'
}
