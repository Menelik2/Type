/**
 * User preferences (Phase 10) — local until Supabase profiles.
 */

export type AppSettings = {
  displayName: string
  interfaceLang: 'en' | 'am'
  learningLang: 'en' | 'am' | ''
  reduceMotion: boolean
  showAmharicKeyboardDefault: boolean
}

const SETTINGS_KEY = 'type_user_settings'

const defaults: AppSettings = {
  displayName: '',
  interfaceLang: 'en',
  learningLang: '',
  reduceMotion: false,
  showAmharicKeyboardDefault: true,
}

export function getSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    if (!raw) return { ...defaults }
    return { ...defaults, ...(JSON.parse(raw) as Partial<AppSettings>) }
  } catch {
    return { ...defaults }
  }
}

export function saveSettings(partial: Partial<AppSettings>): AppSettings {
  const next = { ...getSettings(), ...partial }
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(next))
  return next
}

/** Keys used by Type mocks — for "clear my data" */
export const DATA_KEYS = [
  'type_user_progress',
  'type_typing_results',
  'type_vocab_known',
  'type_admin_courses',
  'type_admin_audit',
  'type_user_role',
  'type_auth_user',
] as const

export function clearLearningData(): void {
  for (const k of DATA_KEYS) {
    if (k === 'type_auth_user') continue // keep session unless full reset
    localStorage.removeItem(k)
  }
}

export function clearAllLocalData(): void {
  for (const k of DATA_KEYS) {
    localStorage.removeItem(k)
  }
  localStorage.removeItem(SETTINGS_KEY)
}
