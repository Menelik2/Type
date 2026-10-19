import type { VoiceLang } from '../lib/voice'

export type ListenItem = {
  id: string
  lang: VoiceLang
  text: string
  support?: string
  level: 'easy' | 'medium' | 'hard'
}

export const listenTypeItems: ListenItem[] = [
  // English easy
  { id: 'en-e1', lang: 'en', text: 'Hello, how are you?', support: 'Greeting', level: 'easy' },
  { id: 'en-e2', lang: 'en', text: 'I am fine, thank you.', level: 'easy' },
  { id: 'en-e3', lang: 'en', text: 'My name is Sara.', level: 'easy' },
  { id: 'en-e4', lang: 'en', text: 'Good morning, everyone.', level: 'easy' },
  { id: 'en-e5', lang: 'en', text: 'See you tomorrow.', level: 'easy' },
  { id: 'en-e6', lang: 'en', text: 'Please sit down.', level: 'easy' },
  { id: 'en-e7', lang: 'en', text: 'I am a student.', level: 'easy' },
  { id: 'en-e8', lang: 'en', text: 'This is my book.', level: 'easy' },
  { id: 'en-e9', lang: 'en', text: 'Where is the school?', level: 'easy' },
  { id: 'en-e10', lang: 'en', text: 'I like coffee and tea.', level: 'easy' },
  { id: 'en-e11', lang: 'en', text: 'What is your name?', level: 'easy' },
  { id: 'en-e12', lang: 'en', text: 'I need water.', level: 'easy' },
  { id: 'en-e13', lang: 'en', text: 'Open the door.', level: 'easy' },
  { id: 'en-e14', lang: 'en', text: 'Have a nice day.', level: 'easy' },
  { id: 'en-e15', lang: 'en', text: 'I love my family.', level: 'easy' },

  // English medium
  { id: 'en-m1', lang: 'en', text: 'She is reading a book in the library.', level: 'medium' },
  { id: 'en-m2', lang: 'en', text: 'We go to school every morning.', level: 'medium' },
  { id: 'en-m3', lang: 'en', text: 'I have lived here for three years.', level: 'medium' },
  { id: 'en-m4', lang: 'en', text: 'Can you help me with this exercise?', level: 'medium' },
  { id: 'en-m5', lang: 'en', text: 'My family lives in a small house.', level: 'medium' },
  { id: 'en-m6', lang: 'en', text: 'Yesterday I learned ten new words.', level: 'medium' },
  { id: 'en-m7', lang: 'en', text: 'The teacher asked a difficult question.', level: 'medium' },
  { id: 'en-m8', lang: 'en', text: 'How much is this bread?', level: 'medium' },
  { id: 'en-m9', lang: 'en', text: 'Please speak slowly.', level: 'medium' },
  { id: 'en-m10', lang: 'en', text: 'I do not understand this word.', level: 'medium' },

  // English hard
  { id: 'en-h1', lang: 'en', text: 'By the time he arrived, the meeting had already started.', level: 'hard' },
  { id: 'en-h2', lang: 'en', text: 'If I had known about the test, I would have studied more.', level: 'hard' },
  { id: 'en-h3', lang: 'en', text: 'Learning a new language takes practice every day.', level: 'hard' },
  { id: 'en-h4', lang: 'en', text: 'Could you tell me the way to the market?', level: 'hard' },

  // Amharic easy
  { id: 'am-e1', lang: 'am', text: 'ሰላም', support: 'Hello / Peace', level: 'easy' },
  { id: 'am-e2', lang: 'am', text: 'አመሰግናለሁ', support: 'Thank you', level: 'easy' },
  { id: 'am-e3', lang: 'am', text: 'እንደምን አደርክ?', support: 'How are you? (m)', level: 'easy' },
  { id: 'am-e4', lang: 'am', text: 'ደህና ነኝ', support: 'I am fine', level: 'easy' },
  { id: 'am-e5', lang: 'am', text: 'ስሜ ሳራ ነው', support: 'My name is Sara', level: 'easy' },
  { id: 'am-e6', lang: 'am', text: 'አዎ', support: 'Yes', level: 'easy' },
  { id: 'am-e7', lang: 'am', text: 'አይ', support: 'No', level: 'easy' },
  { id: 'am-e8', lang: 'am', text: 'እሺ', support: 'OK', level: 'easy' },
  { id: 'am-e9', lang: 'am', text: 'ውሃ', support: 'Water', level: 'easy' },
  { id: 'am-e10', lang: 'am', text: 'መጽሐፍ', support: 'Book', level: 'easy' },
  { id: 'am-e11', lang: 'am', text: 'ቤት', support: 'House', level: 'easy' },
  { id: 'am-e12', lang: 'am', text: 'እናት', support: 'Mother', level: 'easy' },
  { id: 'am-e13', lang: 'am', text: 'አባት', support: 'Father', level: 'easy' },
  { id: 'am-e14', lang: 'am', text: 'ቡና', support: 'Coffee', level: 'easy' },
  { id: 'am-e15', lang: 'am', text: 'ስምህ ማን ነው?', support: 'What is your name?', level: 'easy' },
  { id: 'am-e16', lang: 'am', text: 'ይቅርታ', support: 'Sorry', level: 'easy' },

  // Amharic medium
  { id: 'am-m1', lang: 'am', text: 'ቤቴ ውብ ነው', support: 'My house is beautiful', level: 'medium' },
  { id: 'am-m2', lang: 'am', text: 'እኔ ተማሪ ነኝ', support: 'I am a student', level: 'medium' },
  { id: 'am-m3', lang: 'am', text: 'ውሃ እፈልጋለሁ', support: 'I want water', level: 'medium' },
  { id: 'am-m4', lang: 'am', text: 'መምህር ደግ ነው', support: 'The teacher is kind', level: 'medium' },
  { id: 'am-m5', lang: 'am', text: 'ቡና ትወዳለህ?', support: 'Do you like coffee?', level: 'medium' },
  { id: 'am-m6', lang: 'am', text: 'ዛሬ ትምህርት ቤት እሄዳለሁ', support: 'Today I go to school', level: 'medium' },
  { id: 'am-m7', lang: 'am', text: 'አባቴ በባንክ ይሰራል', support: 'My father works in a bank', level: 'medium' },
  { id: 'am-m8', lang: 'am', text: 'ስንት ነው?', support: 'How much is it?', level: 'medium' },
  { id: 'am-m9', lang: 'am', text: 'አልገባኝም', support: "I don't understand", level: 'medium' },
  { id: 'am-m10', lang: 'am', text: 'እባክህ ድገም', support: 'Please repeat', level: 'medium' },

  // Amharic hard
  {
    id: 'am-h1',
    lang: 'am',
    text: 'በየቀኑ እንግሊዝኛ እና አማርኛ እለማመዳለሁ',
    support: 'I practice English and Amharic every day',
    level: 'hard',
  },
  {
    id: 'am-h2',
    lang: 'am',
    text: 'ጓደኛዬ መጽሐፍ አንብቦኛል',
    support: 'My friend read a book to me',
    level: 'hard',
  },
  {
    id: 'am-h3',
    lang: 'am',
    text: 'ገበያ የት ነው?',
    support: 'Where is the market?',
    level: 'hard',
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
