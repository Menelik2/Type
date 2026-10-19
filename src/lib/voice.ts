/**
 * Robust browser TTS helper.
 * Works around Chrome bugs: empty getVoices(), cancel-then-speak race, paused synth.
 */

export type VoiceLang = 'en' | 'am'

const LANG_TAG: Record<VoiceLang, string> = {
  en: 'en-US',
  am: 'am-ET',
}

let voicesReady: Promise<SpeechSynthesisVoice[]> | null = null
let speakToken = 0

export function isTtsAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.speechSynthesis !== 'undefined'
}

/** Load voices (Chrome returns [] until voiceschanged). */
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

      // Fallback if event never fires (Safari / some Android)
      window.setTimeout(() => {
        synth.removeEventListener('voiceschanged', onVoices)
        done()
      }, 500)
    })
  }
  return voicesReady
}

/** Warm up voices on first user gesture (call from app shell if needed). */
export function warmUpVoices() {
  void loadVoices()
}

export function stopSpeaking() {
  if (!isTtsAvailable()) return
  speakToken += 1
  try {
    window.speechSynthesis.cancel()
    // Chrome can stay in a paused state after cancel
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume()
    }
  } catch {
    /* ignore */
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
    // Prefer a local English voice over nothing
    (prefix === 'en'
      ? list.find((v) => /en/i.test(v.lang) && v.localService) ||
        list.find((v) => /en/i.test(v.lang))
      : null) ||
    null
  )
}

function normalizeRate(rate: number) {
  // SpeechSynthesis rate is typically 0.1–10; keep a safe range
  return Math.min(2, Math.max(0.5, rate))
}

export type SpeakOptions = {
  lang?: VoiceLang | string
  rate?: number
  onStart?: () => void
  onEnd?: () => void
  onError?: (msg: string) => void
}

/**
 * Speak text. Always call from a user gesture (click).
 * Returns a promise that resolves when utterance ends or fails.
 */
export async function speak(text: string, opts: SpeakOptions = {}): Promise<boolean> {
  const trimmed = text?.trim()
  if (!trimmed) {
    opts.onError?.('Nothing to speak.')
    return false
  }

  if (!isTtsAvailable()) {
    opts.onError?.('Speech is not supported in this browser. Try Chrome or Edge.')
    return false
  }

  const synth = window.speechSynthesis
  const token = ++speakToken

  // Cancel any ongoing speech, then wait — Chrome drops the next speak() if immediate
  try {
    synth.cancel()
  } catch {
    /* ignore */
  }

  await new Promise((r) => setTimeout(r, 60))

  if (token !== speakToken) return false

  const voices = await loadVoices()
  if (token !== speakToken) return false

  // Unstick Chrome if it thinks it's paused
  try {
    if (synth.paused) synth.resume()
  } catch {
    /* ignore */
  }

  const langOpt = opts.lang || 'en'
  const langTag =
    typeof langOpt === 'string' && langOpt.includes('-')
      ? langOpt
      : LANG_TAG[(langOpt as VoiceLang) || 'en'] || 'en-US'

  const isAm = langTag.toLowerCase().startsWith('am')
  const voice = pickVoice(langTag, voices)

  // Amharic with no voice: fall back to English voice still reading Amharic text
  // is often silent/broken — warn but still attempt with lang tag
  if (isAm && !voice) {
    // still try — some systems synthesize without a listed voice
  }

  return new Promise((resolve) => {
    if (token !== speakToken) {
      resolve(false)
      return
    }

    const u = new SpeechSynthesisUtterance(trimmed)
    u.lang = langTag
    u.rate = normalizeRate(opts.rate ?? 1)
    u.pitch = 1
    u.volume = 1
    if (voice) {
      u.voice = voice
      // Keep lang aligned with the voice when possible
      if (voice.lang) u.lang = voice.lang
    }

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
      // "interrupted" / "canceled" is expected when we stop or re-trigger
      const type = (ev as SpeechSynthesisErrorEvent).error
      if (type === 'interrupted' || type === 'canceled') {
        finish(false)
        return
      }
      finish(
        false,
        isAm
          ? 'Amharic voice may not be installed on this device. English should still work. Try Chrome/Edge, or install an Amharic TTS voice.'
          : 'Could not play speech. Check that your device is not muted and try Chrome or Edge.'
      )
    }

    try {
      synth.speak(u)
      // Chrome bug: speech sometimes does not start until resume is called
      if (synth.paused) synth.resume()

      // Another Chrome bug: long pauses — poke resume periodically while speaking
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

      // Safety timeout so UI never stays on "Playing…" forever
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
      finish(false, 'Speech failed to start.')
    }
  })
}

export function ttsLangTag(lang: VoiceLang): string {
  return LANG_TAG[lang]
}

/** Map BCP-47 or short code to VoiceLang for speak(). */
export function toVoiceLang(tag?: string): VoiceLang {
  if (!tag) return 'en'
  return tag.toLowerCase().startsWith('am') ? 'am' : 'en'
}
