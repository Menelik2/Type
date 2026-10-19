/**
 * Unified vocabulary bank — English & Amharic.
 */

import { vocabExtra } from './vocabExtra'

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

const coreBank: VocabEntry[] = [
  // English greetings
  { id: 'en-hello', lang: 'en', term: 'Hello', meaning: 'ሰላም / ሀሎ', example: 'Hello! How are you?', example_am: 'ሰላም! እንደምን አለህ/አለሽ?', tags: ['greetings', 'beginner'] },
  { id: 'en-hi', lang: 'en', term: 'Hi', meaning: 'ሃይ', example: 'Hi, my name is Sara.', tags: ['greetings', 'beginner'] },
  { id: 'en-good-morning', lang: 'en', term: 'Good morning', meaning: 'እንደምን አደርክ/አደርሽ', example: 'Good morning, everyone!', tags: ['greetings', 'beginner'] },
  { id: 'en-good-afternoon', lang: 'en', term: 'Good afternoon', meaning: 'እንደምን ዋልክ/ዋልሽ', example: 'Good afternoon, teacher.', tags: ['greetings', 'beginner'] },
  { id: 'en-good-evening', lang: 'en', term: 'Good evening', meaning: 'እንደምን አመሸህ/አመሸሽ', example: 'Good evening, friends.', tags: ['greetings', 'beginner'] },
  { id: 'en-good-night', lang: 'en', term: 'Good night', meaning: 'መልካም ሌሊት', example: 'Good night! Sleep well.', tags: ['greetings', 'beginner'] },
  { id: 'en-goodbye', lang: 'en', term: 'Goodbye', meaning: 'ደህና ሁን / ደህና ሁኚ', example: 'Goodbye! See you tomorrow.', tags: ['greetings', 'beginner'] },
  { id: 'en-thank-you', lang: 'en', term: 'Thank you', meaning: 'አመሰግናለሁ', example: 'Thank you for your help.', tags: ['greetings', 'beginner'] },
  { id: 'en-please', lang: 'en', term: 'Please', meaning: 'እባክህ / እባክሽ', example: 'Please sit down.', tags: ['greetings', 'beginner'] },
  { id: 'en-sorry', lang: 'en', term: 'Sorry', meaning: 'ይቅርታ', example: 'I am sorry I am late.', tags: ['greetings', 'beginner'] },
  { id: 'en-yes', lang: 'en', term: 'Yes', meaning: 'አዎ', example: 'Yes, I understand.', tags: ['greetings', 'beginner'] },
  { id: 'en-no', lang: 'en', term: 'No', meaning: 'አይ', example: 'No, thank you.', tags: ['greetings', 'beginner'] },
  { id: 'en-nice-meet', lang: 'en', term: 'Nice to meet you', meaning: 'ደስ ብሎኛል', example: 'Nice to meet you, Anna.', tags: ['greetings', 'beginner'] },
  { id: 'en-welcome', lang: 'en', term: 'Welcome', meaning: 'እንኳን ደህና መጣህ/መጣሽ', example: 'Welcome to our school!', tags: ['greetings', 'beginner'] },

  // English family
  { id: 'en-mother', lang: 'en', term: 'mother', meaning: 'እናት', example: 'My mother is a teacher.', tags: ['family', 'beginner'] },
  { id: 'en-father', lang: 'en', term: 'father', meaning: 'አባት', example: 'My father works in a bank.', tags: ['family', 'beginner'] },
  { id: 'en-brother', lang: 'en', term: 'brother', meaning: 'ወንድም', example: 'I have one brother.', tags: ['family', 'beginner'] },
  { id: 'en-sister', lang: 'en', term: 'sister', meaning: 'እህት', example: 'My sister is younger than me.', tags: ['family', 'beginner'] },
  { id: 'en-family', lang: 'en', term: 'family', meaning: 'ቤተሰብ', example: 'I love my family.', tags: ['family', 'beginner'] },
  { id: 'en-child', lang: 'en', term: 'child', meaning: 'ልጅ', example: 'The child is sleeping.', tags: ['family', 'beginner'] },
  { id: 'en-son', lang: 'en', term: 'son', meaning: 'ወንድ ልጅ', example: 'Their son is five years old.', tags: ['family', 'beginner'] },
  { id: 'en-daughter', lang: 'en', term: 'daughter', meaning: 'ሴት ልጅ', example: 'Her daughter goes to school.', tags: ['family', 'beginner'] },
  { id: 'en-friend', lang: 'en', term: 'friend', meaning: 'ጓደኛ', example: 'He is my best friend.', tags: ['family', 'beginner'] },

  // English adjectives
  { id: 'en-tall', lang: 'en', term: 'tall', meaning: 'ረጅም', example: 'He is tall.', tags: ['adjectives', 'beginner'] },
  { id: 'en-short', lang: 'en', term: 'short', meaning: 'አጭር', example: 'She is short.', tags: ['adjectives', 'beginner'] },
  { id: 'en-friendly', lang: 'en', term: 'friendly', meaning: 'ወዳጅ', example: 'They are very friendly.', tags: ['adjectives', 'beginner'] },
  { id: 'en-kind', lang: 'en', term: 'kind', meaning: 'ደግ', example: 'She is a kind person.', tags: ['adjectives', 'beginner'] },
  { id: 'en-happy', lang: 'en', term: 'happy', meaning: 'ደስተኛ', example: 'I am happy today.', tags: ['adjectives', 'beginner'] },
  { id: 'en-sad', lang: 'en', term: 'sad', meaning: 'የተከዘ', example: 'Why are you sad?', tags: ['adjectives', 'beginner'] },
  { id: 'en-big', lang: 'en', term: 'big', meaning: 'ትልቅ', example: 'This is a big house.', tags: ['adjectives', 'beginner'] },
  { id: 'en-small', lang: 'en', term: 'small', meaning: 'ትንሽ', example: 'I have a small bag.', tags: ['adjectives', 'beginner'] },
  { id: 'en-new', lang: 'en', term: 'new', meaning: 'አዲስ', example: 'This is a new book.', tags: ['adjectives', 'beginner'] },
  { id: 'en-old', lang: 'en', term: 'old', meaning: 'አሮጌ / አዛውንት', example: 'The old man smiled.', tags: ['adjectives', 'beginner'] },

  // English school & food
  { id: 'en-school', lang: 'en', term: 'school', meaning: 'ትምህርት ቤት', example: 'I go to school every day.', tags: ['school', 'beginner'] },
  { id: 'en-teacher', lang: 'en', term: 'teacher', meaning: 'መምህር', example: 'Our teacher is kind.', tags: ['school', 'beginner'] },
  { id: 'en-student', lang: 'en', term: 'student', meaning: 'ተማሪ', example: 'She is a good student.', tags: ['school', 'beginner'] },
  { id: 'en-book', lang: 'en', term: 'book', meaning: 'መጽሐፍ', example: 'Please open your book.', tags: ['school', 'beginner'] },
  { id: 'en-pen', lang: 'en', term: 'pen', meaning: 'ብዕር', example: 'I need a pen.', tags: ['school', 'beginner'] },
  { id: 'en-read', lang: 'en', term: 'read', meaning: 'ማንበብ', example: 'I read every evening.', tags: ['school', 'verbs', 'beginner'] },
  { id: 'en-write', lang: 'en', term: 'write', meaning: 'መጻፍ', example: 'Write your name here.', tags: ['school', 'verbs', 'beginner'] },
  { id: 'en-learn', lang: 'en', term: 'learn', meaning: 'መማር', example: 'We learn English and Amharic.', tags: ['school', 'verbs', 'beginner'] },
  { id: 'en-water', lang: 'en', term: 'water', meaning: 'ውሃ', example: 'I drink water every day.', tags: ['food', 'beginner'] },
  { id: 'en-bread', lang: 'en', term: 'bread', meaning: 'ዳቦ', example: 'We eat bread for breakfast.', tags: ['food', 'beginner'] },
  { id: 'en-coffee', lang: 'en', term: 'coffee', meaning: 'ቡና', example: 'Would you like coffee?', tags: ['food', 'beginner'] },
  { id: 'en-tea', lang: 'en', term: 'tea', meaning: 'ሻይ', example: 'I prefer tea in the morning.', tags: ['food', 'beginner'] },
  { id: 'en-milk', lang: 'en', term: 'milk', meaning: 'ወተት', example: 'Children drink milk.', tags: ['food', 'beginner'] },
  { id: 'en-food', lang: 'en', term: 'food', meaning: 'ምግብ', example: 'The food is delicious.', tags: ['food', 'beginner'] },
  { id: 'en-eat', lang: 'en', term: 'eat', meaning: 'መብላት', example: 'We eat lunch at noon.', tags: ['food', 'verbs', 'beginner'] },
  { id: 'en-drink', lang: 'en', term: 'drink', meaning: 'መጠጣት', example: 'Please drink some water.', tags: ['food', 'verbs', 'beginner'] },

  // English numbers colors time
  { id: 'en-one', lang: 'en', term: 'one', meaning: 'አንድ', tags: ['numbers', 'beginner'] },
  { id: 'en-two', lang: 'en', term: 'two', meaning: 'ሁለት', tags: ['numbers', 'beginner'] },
  { id: 'en-three', lang: 'en', term: 'three', meaning: 'ሦስት', tags: ['numbers', 'beginner'] },
  { id: 'en-four', lang: 'en', term: 'four', meaning: 'አራት', tags: ['numbers', 'beginner'] },
  { id: 'en-five', lang: 'en', term: 'five', meaning: 'አምስት', tags: ['numbers', 'beginner'] },
  { id: 'en-ten', lang: 'en', term: 'ten', meaning: 'አስር', tags: ['numbers', 'beginner'] },
  { id: 'en-red', lang: 'en', term: 'red', meaning: 'ቀይ', tags: ['colors', 'beginner'] },
  { id: 'en-blue', lang: 'en', term: 'blue', meaning: 'ሰማያዊ', tags: ['colors', 'beginner'] },
  { id: 'en-green', lang: 'en', term: 'green', meaning: 'አረንጓዴ', tags: ['colors', 'beginner'] },
  { id: 'en-today', lang: 'en', term: 'today', meaning: 'ዛሬ', tags: ['time', 'beginner'] },
  { id: 'en-tomorrow', lang: 'en', term: 'tomorrow', meaning: 'ነገ', tags: ['time', 'beginner'] },
  { id: 'en-yesterday', lang: 'en', term: 'yesterday', meaning: 'ትናንት', tags: ['time', 'beginner'] },

  // Amharic core
  { id: 'am-selam', lang: 'am', term: 'ሰላም', meaning: 'Hello / Peace', translit: 'sälam', tags: ['greetings', 'beginner'] },
  { id: 'am-thanks', lang: 'am', term: 'አመሰግናለሁ', meaning: 'Thank you', translit: 'amäsägənalähu', tags: ['greetings', 'beginner'] },
  { id: 'am-please', lang: 'am', term: 'እባክህ', meaning: 'Please (to a man)', translit: 'əbakəh', tags: ['greetings', 'beginner'] },
  { id: 'am-sorry', lang: 'am', term: 'ይቅርታ', meaning: 'Sorry / Excuse me', translit: 'yəqərta', tags: ['greetings', 'beginner'] },
  { id: 'am-ok', lang: 'am', term: 'እሺ', meaning: 'OK / Alright', translit: 'əšši', tags: ['greetings', 'beginner'] },
  { id: 'am-yes', lang: 'am', term: 'አዎ', meaning: 'Yes', translit: 'awo', tags: ['greetings', 'beginner'] },
  { id: 'am-no', lang: 'am', term: 'አይ', meaning: 'No', translit: 'ay', tags: ['greetings', 'beginner'] },
  { id: 'am-how-are-you', lang: 'am', term: 'እንደምን አደርክ?', meaning: 'How are you? (to a man)', translit: 'əndämən adärək?', tags: ['greetings', 'beginner'] },
  { id: 'am-i-am-fine', lang: 'am', term: 'ደህና ነኝ', meaning: 'I am fine', translit: 'dähna näñ', tags: ['greetings', 'beginner'] },
  { id: 'am-goodbye', lang: 'am', term: 'ደህና ሁን', meaning: 'Goodbye (to a man)', translit: 'dähna hun', tags: ['greetings', 'beginner'] },
  { id: 'am-welcome', lang: 'am', term: 'እንኳን ደህና መጣህ', meaning: 'Welcome (to a man)', translit: 'ənkʷan dähna mäṭṭah', tags: ['greetings', 'beginner'] },
  { id: 'am-water', lang: 'am', term: 'ውሃ', meaning: 'Water', translit: 'wəha', tags: ['everyday', 'food', 'beginner'] },
  { id: 'am-house', lang: 'am', term: 'ቤት', meaning: 'House / Home', translit: 'bet', tags: ['everyday', 'beginner'] },
  { id: 'am-book', lang: 'am', term: 'መጽሐፍ', meaning: 'Book', translit: 'mäṣḥaf', tags: ['everyday', 'school', 'beginner'] },
  { id: 'am-school', lang: 'am', term: 'ትምህርት ቤት', meaning: 'School', translit: 'təmhərt bet', tags: ['school', 'beginner'] },
  { id: 'am-teacher', lang: 'am', term: 'መምህር', meaning: 'Teacher', translit: 'mämhər', tags: ['school', 'beginner'] },
  { id: 'am-student', lang: 'am', term: 'ተማሪ', meaning: 'Student', translit: 'tämari', tags: ['school', 'beginner'] },
  { id: 'am-bread', lang: 'am', term: 'ዳቦ', meaning: 'Bread', translit: 'dabo', tags: ['food', 'beginner'] },
  { id: 'am-coffee', lang: 'am', term: 'ቡና', meaning: 'Coffee', translit: 'buna', tags: ['food', 'beginner'] },
  { id: 'am-tea', lang: 'am', term: 'ሻይ', meaning: 'Tea', translit: 'šay', tags: ['food', 'beginner'] },
  { id: 'am-milk', lang: 'am', term: 'ወተት', meaning: 'Milk', translit: 'wätät', tags: ['food', 'beginner'] },
  { id: 'am-food', lang: 'am', term: 'ምግብ', meaning: 'Food', translit: 'məgəb', tags: ['food', 'beginner'] },
  { id: 'am-injera', lang: 'am', term: 'እንጀራ', meaning: 'Injera', translit: 'ənǧära', tags: ['food', 'beginner'] },
  { id: 'am-mother', lang: 'am', term: 'እናት', meaning: 'Mother', translit: 'ənat', tags: ['family', 'beginner'] },
  { id: 'am-father', lang: 'am', term: 'አባት', meaning: 'Father', translit: 'abat', tags: ['family', 'beginner'] },
  { id: 'am-brother', lang: 'am', term: 'ወንድም', meaning: 'Brother', translit: 'wändəm', tags: ['family', 'beginner'] },
  { id: 'am-sister', lang: 'am', term: 'እህት', meaning: 'Sister', translit: 'əhət', tags: ['family', 'beginner'] },
  { id: 'am-child', lang: 'am', term: 'ልጅ', meaning: 'Child', translit: 'ləǧ', tags: ['family', 'beginner'] },
  { id: 'am-friend', lang: 'am', term: 'ጓደኛ', meaning: 'Friend', translit: 'gʷadäñña', tags: ['family', 'beginner'] },
  { id: 'am-name', lang: 'am', term: 'ስም', meaning: 'Name', translit: 'səm', tags: ['everyday', 'beginner'] },
  { id: 'am-one', lang: 'am', term: 'አንድ', meaning: 'One', translit: 'and', tags: ['numbers', 'beginner'] },
  { id: 'am-two', lang: 'am', term: 'ሁለት', meaning: 'Two', translit: 'hulät', tags: ['numbers', 'beginner'] },
  { id: 'am-three', lang: 'am', term: 'ሦስት', meaning: 'Three', translit: 'sost', tags: ['numbers', 'beginner'] },
  { id: 'am-four', lang: 'am', term: 'አራት', meaning: 'Four', translit: 'arat', tags: ['numbers', 'beginner'] },
  { id: 'am-five', lang: 'am', term: 'አምስት', meaning: 'Five', translit: 'amməst', tags: ['numbers', 'beginner'] },
  { id: 'am-ten', lang: 'am', term: 'አስር', meaning: 'Ten', translit: 'assər', tags: ['numbers', 'beginner'] },
  { id: 'am-good', lang: 'am', term: 'ጥሩ', meaning: 'Good', translit: 'ṭəru', tags: ['adjectives', 'beginner'] },
  { id: 'am-beautiful', lang: 'am', term: 'ውብ', meaning: 'Beautiful', translit: 'wəb', tags: ['adjectives', 'beginner'] },
  { id: 'am-big', lang: 'am', term: 'ትልቅ', meaning: 'Big', translit: 'tələq', tags: ['adjectives', 'beginner'] },
  { id: 'am-small', lang: 'am', term: 'ትንሽ', meaning: 'Small', translit: 'tənnəš', tags: ['adjectives', 'beginner'] },
  { id: 'am-today', lang: 'am', term: 'ዛሬ', meaning: 'Today', translit: 'zare', tags: ['time', 'beginner'] },
  { id: 'am-tomorrow', lang: 'am', term: 'ነገ', meaning: 'Tomorrow', translit: 'nägä', tags: ['time', 'beginner'] },
  { id: 'am-yesterday', lang: 'am', term: 'ትናንት', meaning: 'Yesterday', translit: 'tənant', tags: ['time', 'beginner'] },
  { id: 'am-red', lang: 'am', term: 'ቀይ', meaning: 'Red', translit: 'qäy', tags: ['colors', 'beginner'] },
  { id: 'am-green', lang: 'am', term: 'አረንጓዴ', meaning: 'Green', translit: 'arängʷade', tags: ['colors', 'beginner'] },
  { id: 'am-i', lang: 'am', term: 'እኔ', meaning: 'I / me', translit: 'əne', tags: ['everyday', 'beginner'] },
  { id: 'am-you-m', lang: 'am', term: 'አንተ', meaning: 'You (m)', translit: 'antä', tags: ['everyday', 'beginner'] },
  { id: 'am-you-f', lang: 'am', term: 'አንቺ', meaning: 'You (f)', translit: 'anči', tags: ['everyday', 'beginner'] },
]

export const vocabularyBank: VocabEntry[] = [...coreBank, ...vocabExtra]

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
