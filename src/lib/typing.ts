/**
 * Shared typing engine (Phase 8).
 * Works for English and Amharic (Unicode graphemes).
 */

export type TypingLang = 'en' | 'am'

export type TypingResult = {
  id: string
  lang: TypingLang
  passageId: string
  wpm: number
  accuracy: number
  correctChars: number
  totalTyped: number
  durationMs: number
  at: string
}

const RESULTS_KEY = 'type_typing_results'

/** Split into user-perceived characters (handles Ethiopic code points). */
export function graphemes(text: string): string[] {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    try {
      const seg = new Intl.Segmenter(undefined, { granularity: 'grapheme' })
      return [...seg.segment(text)].map((s) => s.segment)
    } catch {
      /* fall through */
    }
  }
  return Array.from(text)
}

export function calcAccuracy(correct: number, totalTyped: number): number {
  if (totalTyped <= 0) return 100
  return Math.max(0, Math.min(100, Math.round((correct / totalTyped) * 100)))
}

/**
 * Net WPM: (correct characters / 5) / minutes
 * Standard word length = 5 characters.
 */
export function calcWpm(correctChars: number, durationMs: number): number {
  if (durationMs <= 0 || correctChars <= 0) return 0
  const minutes = durationMs / 60000
  if (minutes <= 0) return 0
  return Math.max(0, Math.round(correctChars / 5 / minutes))
}

export type CharStatus = 'pending' | 'correct' | 'incorrect' | 'current'

export function compareInput(
  target: string,
  input: string
): { statuses: CharStatus[]; correct: number; errors: number } {
  const t = graphemes(target)
  const i = graphemes(input)
  const statuses: CharStatus[] = t.map((_, idx) => {
    if (idx < i.length) {
      return i[idx] === t[idx] ? 'correct' : 'incorrect'
    }
    if (idx === i.length) return 'current'
    return 'pending'
  })
  let correct = 0
  let errors = 0
  for (let idx = 0; idx < i.length; idx++) {
    if (idx >= t.length) {
      errors++
      continue
    }
    if (i[idx] === t[idx]) correct++
    else errors++
  }
  return { statuses, correct, errors }
}

export function saveTypingResult(result: Omit<TypingResult, 'id' | 'at'>) {
  const entry: TypingResult = {
    ...result,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    at: new Date().toISOString(),
  }
  try {
    const raw = localStorage.getItem(RESULTS_KEY)
    const list: TypingResult[] = raw ? JSON.parse(raw) : []
    list.unshift(entry)
    localStorage.setItem(RESULTS_KEY, JSON.stringify(list.slice(0, 50)))
  } catch {
    /* ignore */
  }
  return entry
}

export function getTypingResults(): TypingResult[] {
  try {
    const raw = localStorage.getItem(RESULTS_KEY)
    return raw ? (JSON.parse(raw) as TypingResult[]) : []
  } catch {
    return []
  }
}

export function bestWpm(lang?: TypingLang): number {
  const list = getTypingResults().filter((r) => (lang ? r.lang === lang : true))
  if (list.length === 0) return 0
  return Math.max(...list.map((r) => r.wpm))
}
