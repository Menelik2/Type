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
  try {
    window.dispatchEvent(new Event('storage'))
  } catch {
    /* ignore */
  }
  return next
}

/** Progress / practice only */
export const LEARNING_DATA_KEYS = [
  'type_user_progress',
  'type_typing_results',
  'type_vocab_known',
] as const

/** Everything local (including account + admin mock) */
export const DATA_KEYS = [
  ...LEARNING_DATA_KEYS,
  'type_admin_courses',
  'type_admin_audit',
  'type_user_role',
  'mockUser',
] as const

/** Clear progress & practice; keep login, settings, role. */
export function clearLearningData(): void {
  for (const k of LEARNING_DATA_KEYS) {
    localStorage.removeItem(k)
  }
}

export function clearAllLocalData(): void {
  for (const k of DATA_KEYS) {
    localStorage.removeItem(k)
  }
  localStorage.removeItem(SETTINGS_KEY)
}
