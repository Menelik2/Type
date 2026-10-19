/**
 * Browser voice helper with strong Amharic support.
 *
 * Strategy:
 * 1. Prefer SpeechSynthesis when a matching voice is installed
 * 2. For Amharic (and as EN fallback), play Google Translate TTS audio
 *    (works without API keys; suitable for learning MVP)
 * 3. Later: replace with Supabase Storage recordings via AudioPlayer `src`
 */

export type VoiceLang = 'en' | 'am'

const LANG_TAG: Record<VoiceLang, string> = {
  en: 'en-US',
  am: 'am-ET',
}

let voicesReady: Promise<SpeechSynthesisVoice[]> | null = null
let speakToken = 0
let currentAudio: HTMLAudioElement | null = null

export function isTtsAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.speechSynthesis !== 'undefined'
}

export function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  if (!isTtsAvailable()) return Promise.resolve([])

  if (!voicesReady) {
    voicesReady = new Promise((resolve) => {
      const synth = window.speechSynthesis
      const done = () => resolve(synth.getVoices())

      const existing = synth.getVoices()
      if (existing.length > 0) {
        resolve(existing)
        return
      }

      const onVoices = () => {
        synth.removeEventListener('voiceschanged', onVoices)
        done()
      }
      synth.addEventListener('voiceschanged', onVoices)
      window.setTimeout(() => {
        synth.removeEventListener('voiceschanged', onVoices)
        done()
      }, 600)
    })
  }
  return voicesReady
}

export function warmUpVoices() {
  void loadVoices()
}

export function stopSpeaking() {
  speakToken += 1
  if (isTtsAvailable()) {
    try {
      window.speechSynthesis.cancel()
      if (window.speechSynthesis.paused) window.speechSynthesis.resume()
    } catch {
      /* ignore */
    }
  }
  if (currentAudio) {
    try {
      currentAudio.pause()
      currentAudio.removeAttribute('src')
      currentAudio.load()
    } catch {
      /* ignore */
    }
    currentAudio = null
  }
}

export function pickVoice(
  lang: VoiceLang | string,
  voices?: SpeechSynthesisVoice[]
): SpeechSynthesisVoice | null {
  const list = voices ?? (isTtsAvailable() ? window.speechSynthesis.getVoices() : [])
  if (list.length === 0) return null

  const tag =
    typeof lang === 'string' && lang.includes('-')
      ? lang.toLowerCase()
      : (LANG_TAG[(lang as VoiceLang) || 'en'] || 'en-US').toLowerCase()
  const prefix = tag.split('-')[0]

  return (
    list.find((v) => v.lang.toLowerCase() === tag) ||
    list.find((v) => v.lang.toLowerCase().startsWith(prefix + '-')) ||
    list.find((v) => v.lang.toLowerCase().startsWith(prefix)) ||
    null
  )
}

/** True when the device lists an Amharic (or Ethiopic-script) voice. */
export async function hasAmharicVoice(): Promise<boolean> {
  const voices = await loadVoices()
  return voices.some((v) => {
    const l = v.lang.toLowerCase()
    return l.startsWith('am') || l.includes('ethiopic') || /amharic/i.test(v.name)
  })
}

function toTl(lang: VoiceLang | string): string {
  if (typeof lang === 'string' && lang.includes('-')) {
    return lang.split('-')[0].toLowerCase()
  }
  return lang === 'am' ? 'am' : 'en'
}

/** Split text into short chunks for Translate TTS length limits. */
function chunkText(text: string, maxLen = 160): string[] {
  const cleaned = text.replace(/\s+/g, ' ').trim()
  if (cleaned.length <= maxLen) return [cleaned]

  const parts: string[] = []
  // Prefer sentence boundaries (Latin + Ethiopic)
  const sentences = cleaned.split(/(?<=[.!?።፧])\s+/)
  let buf = ''
  for (const s of sentences) {
    if ((buf + ' ' + s).trim().length <= maxLen) {
      buf = (buf + ' ' + s).trim()
    } else {
      if (buf) parts.push(buf)
      if (s.length <= maxLen) {
        buf = s
      } else {
        // Hard-split long segment
        for (let i = 0; i < s.length; i += maxLen) {
          parts.push(s.slice(i, i + maxLen))
        }
        buf = ''
      }
    }
  }
  if (buf) parts.push(buf)
  return parts.filter(Boolean)
}

/**
 * Google Translate TTS audio URL (no API key).
 * Used primarily so Amharic works when the OS has no am-ET voice.
 */
export function translateTtsUrl(text: string, lang: VoiceLang | string): string {
  const tl = toTl(lang)
  const q = encodeURIComponent(text)
  // client=tw-ob is the most widely compatible public endpoint
  return `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${tl}&q=${q}`
}

function playAudioUrl(url: string, token: number): Promise<boolean> {
  return new Promise((resolve) => {
    if (token !== speakToken) {
      resolve(false)
      return
    }
    const audio = new Audio()
    currentAudio = audio
    audio.preload = 'auto'

    const cleanup = () => {
      if (currentAudio === audio) currentAudio = null
    }

    audio.onended = () => {
      cleanup()
      resolve(token === speakToken)
    }
    audio.onerror = () => {
      cleanup()
      resolve(false)
    }

    // Must set src after handlers
    audio.src = url
    const p = audio.play()
    if (p && typeof p.then === 'function') {
      p.catch(() => {
        cleanup()
        resolve(false)
      })
    }
  })
}

async function speakViaTranslate(
  text: string,
  lang: VoiceLang | string,
  token: number,
  onStart?: () => void
): Promise<boolean> {
  const chunks = chunkText(text)
  let started = false
  for (const chunk of chunks) {
    if (token !== speakToken) return false
    const url = translateTtsUrl(chunk, lang)
    if (!started) {
      started = true
      onStart?.()
    }
    const ok = await playAudioUrl(url, token)
    if (!ok) return false
  }
  return token === speakToken
}

function normalizeRate(rate: number) {
  return Math.min(2, Math.max(0.5, rate))
}

export type SpeakOptions = {
  lang?: VoiceLang | string
  rate?: number
  /** Force Translate audio even if a native voice exists */
  forceTranslate?: boolean
  onStart?: () => void
  onEnd?: () => void
  onError?: (msg: string) => void
}

export async function speak(text: string, opts: SpeakOptions = {}): Promise<boolean> {
  const trimmed = text?.trim()
  if (!trimmed) {
    opts.onError?.('Nothing to speak.')
    return false
  }

  const token = ++speakToken
  stopSpeaking()
  // stopSpeaking increments token — restore ours
  speakToken = token

  await new Promise((r) => setTimeout(r, 40))
  if (token !== speakToken) return false

  const langOpt = opts.lang || 'en'
  const isAm =
    (typeof langOpt === 'string' && langOpt.toLowerCase().startsWith('am')) ||
    langOpt === 'am'

  const voices = await loadVoices()
  if (token !== speakToken) return false

  const nativeVoice = pickVoice(langOpt, voices)
  const useNative =
    !opts.forceTranslate &&
    isTtsAvailable() &&
    !!nativeVoice &&
    // Prefer native for English always; for Amharic only if voice is real am-*
    (!isAm || nativeVoice.lang.toLowerCase().startsWith('am'))

  // —— Native SpeechSynthesis path ——
  if (useNative && nativeVoice) {
    return new Promise((resolve) => {
      if (token !== speakToken) {
        resolve(false)
        return
      }
      const synth = window.speechSynthesis
      try {
        if (synth.paused) synth.resume()
      } catch {
        /* ignore */
      }

      const u = new SpeechSynthesisUtterance(trimmed)
      u.voice = nativeVoice
      u.lang = nativeVoice.lang || (isAm ? 'am-ET' : 'en-US')
      u.rate = normalizeRate(opts.rate ?? 1)
      u.pitch = 1
      u.volume = 1

      let finished = false
      const finish = (ok: boolean, err?: string) => {
        if (finished) return
        finished = true
        if (err) opts.onError?.(err)
        if (ok) opts.onEnd?.()
        resolve(ok)
      }

      u.onstart = () => opts.onStart?.()
      u.onend = () => finish(true)
      u.onerror = (ev) => {
        const type = (ev as SpeechSynthesisErrorEvent).error
        if (type === 'interrupted' || type === 'canceled') {
          finish(false)
          return
        }
        // Fall through to Translate on native failure
        void speakViaTranslate(trimmed, langOpt, token, opts.onStart).then((ok) => {
          if (ok) {
            opts.onEnd?.()
            resolve(true)
          } else {
            finish(
              false,
              isAm
                ? 'Could not play Amharic audio. Check your network connection.'
                : 'Could not play speech.'
            )
          }
        })
      }

      try {
        synth.speak(u)
        if (synth.paused) synth.resume()
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
        }, 1000)
        const maxMs = Math.min(60000, Math.max(4000, trimmed.length * 120))
        window.setTimeout(() => {
          clearInterval(poke)
          if (!finished && token === speakToken) {
            try {
              synth.cancel()
            } catch {
              /* ignore */
            }
            finish(true)
          }
        }, maxMs)
      } catch {
        void speakViaTranslate(trimmed, langOpt, token, opts.onStart).then((ok) => {
          if (ok) {
            opts.onEnd?.()
            resolve(true)
          } else {
            finish(false, 'Speech failed to start.')
          }
        })
      }
    })
  }

  // —— Amharic (and any missing native voice): Translate TTS audio ——
  opts.onStart?.()
  const ok = await speakViaTranslate(trimmed, langOpt, token)
  if (token !== speakToken) return false
  if (ok) {
    opts.onEnd?.()
    return true
  }
  opts.onError?.(
    isAm
      ? 'Amharic audio failed. Allow network access or try again on Wi‑Fi.'
      : 'Speech failed. Try Chrome/Edge and unmute the tab.'
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
