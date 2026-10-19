import type { TypingLang } from '../lib/typing'

export type TypingPassage = {
  id: string
  lang: TypingLang
  title: string
  title_am?: string
  text: string
  level: 'beginner' | 'intermediate'
}

export const typingPassages: TypingPassage[] = [
  {
    id: 'en-hello',
    lang: 'en',
    title: 'Greetings',
    text: 'Hello! How are you today? I am fine, thank you.',
    level: 'beginner',
  },
  {
    id: 'en-family',
    lang: 'en',
    title: 'Family',
    text: 'My mother and father live in a small house near the school.',
    level: 'beginner',
  },
  {
    id: 'en-city',
    lang: 'en',
    title: 'City life',
    text: 'The city is busy in the morning. People walk to work and children go to school.',
    level: 'intermediate',
  },
  {
    id: 'en-learn',
    lang: 'en',
    title: 'Learning English',
    text: 'Practice every day. Read simple books and listen carefully to native speakers.',
    level: 'intermediate',
  },
  {
    id: 'am-selam',
    lang: 'am',
    title: 'ሰላምታ',
    title_am: 'Greetings',
    text: 'ሰላም። እንደምን አደርክ? ደህና ነኝ አመሰግናለሁ።',
    level: 'beginner',
  },
  {
    id: 'am-home',
    lang: 'am',
    title: 'ቤት',
    title_am: 'Home',
    text: 'ቤቴ ውብ ነው። ውሃ እና መጽሐፍ አለኝ።',
    level: 'beginner',
  },
  {
    id: 'am-school',
    lang: 'am',
    title: 'ትምህርት ቤት',
    title_am: 'School',
    text: 'እኔ ተማሪ ነኝ። በትምህርት ቤት እንግሊዝኛ እና አማርኛ እማራለሁ።',
    level: 'intermediate',
  },
  {
    id: 'am-fidel',
    lang: 'am',
    title: 'ፊደል',
    title_am: 'Fidel',
    text: 'ሀ ሁ ሂ ሃ ሄ ህ ሆ ለ ሉ ሊ ላ ሌ ል ሎ',
    level: 'beginner',
  },
]

export function getPassages(lang: TypingLang): TypingPassage[] {
  return typingPassages.filter((p) => p.lang === lang)
}

export function getPassage(id: string): TypingPassage | undefined {
  return typingPassages.find((p) => p.id === id)
}
