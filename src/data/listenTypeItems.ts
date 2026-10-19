import type { VoiceLang } from '../lib/voice'

export type ListenItem = {
  id: string
  lang: VoiceLang
  text: string
  /** Shown when support is on */
  support?: string
  level: 'easy' | 'medium' | 'hard'
}

/**
 * Practice bank for Listen → Type mode (mode=audio).
 * Mirrors YouType "Listen. Type. Remember."
 */
export const listenTypeItems: ListenItem[] = [
  // English easy
  {
    id: 'en-e1',
    lang: 'en',
    text: 'Hello, how are you?',
    support: 'A simple greeting',
    level: 'easy',
  },
  {
    id: 'en-e2',
    lang: 'en',
    text: 'I am fine, thank you.',
    level: 'easy',
  },
  {
    id: 'en-e3',
    lang: 'en',
    text: 'My name is Sara.',
    level: 'easy',
  },
  {
    id: 'en-e4',
    lang: 'en',
    text: 'Good morning, everyone.',
    level: 'easy',
  },
  {
    id: 'en-e5',
    lang: 'en',
    text: 'See you tomorrow.',
    level: 'easy',
  },
  // English medium
  {
    id: 'en-m1',
    lang: 'en',
    text: 'She is reading a book in the library.',
    level: 'medium',
  },
  {
    id: 'en-m2',
    lang: 'en',
    text: 'We go to school every morning.',
    level: 'medium',
  },
  {
    id: 'en-m3',
    lang: 'en',
    text: 'I have lived here for three years.',
    level: 'medium',
  },
  {
    id: 'en-m4',
    lang: 'en',
    text: 'Can you help me with this exercise?',
    level: 'medium',
  },
  // English hard
  {
    id: 'en-h1',
    lang: 'en',
    text: 'By the time he arrived, the meeting had already started.',
    level: 'hard',
  },
  {
    id: 'en-h2',
    lang: 'en',
    text: 'If I had known about the test, I would have studied more.',
    level: 'hard',
  },
  // Amharic easy
  {
    id: 'am-e1',
    lang: 'am',
    text: 'ሰላም',
    support: 'Hello / Peace',
    level: 'easy',
  },
  {
    id: 'am-e2',
    lang: 'am',
    text: 'አመሰግናለሁ',
    support: 'Thank you',
    level: 'easy',
  },
  {
    id: 'am-e3',
    lang: 'am',
    text: 'እንደምን አደርክ?',
    support: 'How are you? (to a man)',
    level: 'easy',
  },
  {
    id: 'am-e4',
    lang: 'am',
    text: 'ደህና ነኝ',
    support: 'I am fine',
    level: 'easy',
  },
  {
    id: 'am-e5',
    lang: 'am',
    text: 'ስሜ ሳራ ነው',
    support: 'My name is Sara',
    level: 'easy',
  },
  // Amharic medium
  {
    id: 'am-m1',
    lang: 'am',
    text: 'ቤቴ ውብ ነው',
    support: 'My house is beautiful',
    level: 'medium',
  },
  {
    id: 'am-m2',
    lang: 'am',
    text: 'እኔ ተማሪ ነኝ',
    support: 'I am a student',
    level: 'medium',
  },
  {
    id: 'am-m3',
    lang: 'am',
    text: 'ውሃ እፈልጋለሁ',
    support: 'I want water',
    level: 'medium',
  },
]

export function getListenItems(opts: {
  lang: VoiceLang
  level?: 'easy' | 'medium' | 'hard' | 'all'
}): ListenItem[] {
  return listenTypeItems.filter((item) => {
    if (item.lang !== opts.lang) return false
    if (opts.level && opts.level !== 'all' && item.level !== opts.level) return false
    return true
  })
}
