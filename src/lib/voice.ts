/**
 * Shared browser TTS helper (YouType-style voice).
 * Uses SpeechSynthesis; real audio files can replace via `src` later.
 */

export type VoiceLang = 'en' | 'am'

const LANG_TAG: Record<VoiceLang, string> = {
  en: 'en-US',
  am: 'am-ET',
}

export function isTtsAvailable(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

export function stopSpeaking() {
  if (isTtsAvailable()) window.speechSynthesis.cancel()
}

/** Pick a matching voice if the browser has one installed. */
export function pickVoice(lang: VoiceLang): SpeechSynthesisVoice | null {
  if (!isTtsAvailable()) return null
  const voices = window.speechSynthesis.getVoices()
  const tag = LANG_TAG[lang].toLowerCase()
  const prefix = lang === 'am' ? 'am' : 'en'
  return (
    voices.find((v) => v.lang.toLowerCase() === tag) ||
    voices.find((v) => v.lang.toLowerCase().startsWith(prefix)) ||
    null
  )
}

export function speak(
  text: string,
  opts: {
    lang?: VoiceLang
    rate?: number
    onEnd?: () => void
    onError?: (msg: string) => void
  } = {}
): boolean {
  if (!text.trim()) return false
  if (!isTtsAvailable()) {
    opts.onError?.('Speech synthesis is not available in this browser.')
    return false
  }

  stopSpeaking()
  const lang = opts.lang || 'en'
  const u = new SpeechSynthesisUtterance(text)
  u.lang = LANG_TAG[lang]
  u.rate = opts.rate ?? 1
  const voice = pickVoice(lang)
  if (voice) u.voice = voice
  u.onend = () => opts.onEnd?.()
  u.onerror = () =>
    opts.onError?.(
      lang === 'am'
        ? 'Amharic voice may not be installed on this device. Try Chrome/Edge or upload real audio later.'
        : 'Could not play speech.'
    )
  window.speechSynthesis.speak(u)
  return true
}

export function ttsLangTag(lang: VoiceLang): string {
  return LANG_TAG[lang]
}
