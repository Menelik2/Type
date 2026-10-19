/**
 * Unified vocabulary bank (Phase 9).
 * Aggregates words from English and Amharic lesson content.
 */

export type VocabEntry = {
  id: string
  lang: 'en' | 'am'
  term: string
  meaning: string
  translit?: string
  example?: string
  example_am?: string
  tags: string[]
}

export const vocabularyBank: VocabEntry[] = [
  // English — greetings
  {
    id: 'en-hello',
    lang: 'en',
    term: 'Hello',
    meaning: 'ሰላም / ሀሎ',
    example: 'Hello! How are you?',
    example_am: 'ሰላም! እንደምን አለህ/አለሽ?',
    tags: ['greetings', 'beginner'],
  },
  {
    id: 'en-hi',
    lang: 'en',
    term: 'Hi',
    meaning: 'ሃይ',
    example: 'Hi, my name is Sara.',
    tags: ['greetings', 'beginner'],
  },
  {
    id: 'en-good-morning',
    lang: 'en',
    term: 'Good morning',
    meaning: 'እንደምን አደርክ/አደርሽ',
    example: 'Good morning, everyone!',
    tags: ['greetings', 'beginner'],
  },
  {
    id: 'en-goodbye',
    lang: 'en',
    term: 'Goodbye',
    meaning: 'ደህና ሁን / ደህና ሁኚ',
    example: 'Goodbye! See you tomorrow.',
    tags: ['greetings', 'beginner'],
  },
  {
    id: 'en-thank-you',
    lang: 'en',
    term: 'Thank you',
    meaning: 'አመሰግናለሁ',
    example: 'Thank you for your help.',
    tags: ['greetings', 'beginner'],
  },
  {
    id: 'en-nice-meet',
    lang: 'en',
    term: 'Nice to meet you',
    meaning: 'ደስ ብሎኛል',
    example: 'Nice to meet you, Anna.',
    tags: ['greetings', 'beginner'],
  },
  // English — family
  {
    id: 'en-mother',
    lang: 'en',
    term: 'mother',
    meaning: 'እናት',
    example: 'My mother is a teacher.',
    tags: ['family', 'beginner'],
  },
  {
    id: 'en-father',
    lang: 'en',
    term: 'father',
    meaning: 'አባት',
    example: 'My father works in a bank.',
    tags: ['family', 'beginner'],
  },
  {
    id: 'en-brother',
    lang: 'en',
    term: 'brother',
    meaning: 'ወንድም',
    example: 'I have one brother.',
    tags: ['family', 'beginner'],
  },
  {
    id: 'en-sister',
    lang: 'en',
    term: 'sister',
    meaning: 'እህት',
    example: 'My sister is younger than me.',
    tags: ['family', 'beginner'],
  },
  {
    id: 'en-family',
    lang: 'en',
    term: 'family',
    meaning: 'ቤተሰብ',
    example: 'I love my family.',
    tags: ['family', 'beginner'],
  },
  // English — people
  {
    id: 'en-tall',
    lang: 'en',
    term: 'tall',
    meaning: 'ረጅም',
    example: 'He is tall.',
    tags: ['adjectives', 'beginner'],
  },
  {
    id: 'en-short',
    lang: 'en',
    term: 'short',
    meaning: 'አጭር',
    example: 'She is short.',
    tags: ['adjectives', 'beginner'],
  },
  {
    id: 'en-friendly',
    lang: 'en',
    term: 'friendly',
    meaning: 'ወዳጅ',
    example: 'They are very friendly.',
    tags: ['adjectives', 'beginner'],
  },
  {
    id: 'en-kind',
    lang: 'en',
    term: 'kind',
    meaning: 'ደግ',
    example: 'She is a kind person.',
    tags: ['adjectives', 'beginner'],
  },
  // Amharic essentials
  {
    id: 'am-selam',
    lang: 'am',
    term: 'ሰላም',
    meaning: 'Hello / Peace',
    translit: 'sälam',
    tags: ['greetings', 'beginner'],
  },
  {
    id: 'am-thanks',
    lang: 'am',
    term: 'አመሰግናለሁ',
    meaning: 'Thank you',
    translit: 'amäsägənalähu',
    tags: ['greetings', 'beginner'],
  },
  {
    id: 'am-ok',
    lang: 'am',
    term: 'እሺ',
    meaning: 'OK / Alright',
    translit: 'əšši',
    tags: ['greetings', 'beginner'],
  },
  {
    id: 'am-water',
    lang: 'am',
    term: 'ውሃ',
    meaning: 'Water',
    translit: 'wəha',
    tags: ['everyday', 'beginner'],
  },
  {
    id: 'am-house',
    lang: 'am',
    term: 'ቤት',
    meaning: 'House / Home',
    translit: 'bet',
    tags: ['everyday', 'beginner'],
  },
  {
    id: 'am-book',
    lang: 'am',
    term: 'መጽሐፍ',
    meaning: 'Book',
    translit: 'mäṣḥaf',
    tags: ['everyday', 'beginner'],
  },
]

export function filterVocabulary(opts: {
  lang?: 'en' | 'am' | 'all'
  tag?: string
  q?: string
}): VocabEntry[] {
  const q = opts.q?.trim().toLowerCase() || ''
  return vocabularyBank.filter((e) => {
    if (opts.lang && opts.lang !== 'all' && e.lang !== opts.lang) return false
    if (opts.tag && !e.tags.includes(opts.tag)) return false
    if (!q) return true
    return (
      e.term.toLowerCase().includes(q) ||
      e.meaning.toLowerCase().includes(q) ||
      (e.translit?.toLowerCase().includes(q) ?? false)
    )
  })
}

export function allTags(): string[] {
  return [...new Set(vocabularyBank.flatMap((e) => e.tags))].sort()
}
