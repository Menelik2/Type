/**
 * Amharic (አማርኛ) lesson content — Phase 4 Fidel MVP.
 */

export type FidelChar = {
  char: string
  translit: string
  name_am?: string
}

export type FidelFamily = {
  base: string
  name: string
  name_am: string
  chars: FidelChar[]
}

export type AmharicExercise =
  | {
      type: 'fidel_recognize'
      prompt: string
      prompt_am?: string
      options: string[]
      correctIndex: number
    }
  | {
      type: 'fidel_match'
      prompt: string
      pairs: { char: string; translit: string }[]
    }
  | {
      type: 'multiple_choice'
      question: string
      question_am?: string
      options: string[]
      correctIndex: number
      explanation?: string
    }
  | {
      type: 'fill_blank'
      sentence: string
      answer: string
      hint?: string
    }
  | {
      type: 'type_char'
      prompt: string
      target: string
      hint?: string
    }

export type AmharicLessonContent =
  | {
      type: 'fidel_intro'
      title: string
      title_am: string
      body: string
      body_am: string
      exercises?: AmharicExercise[]
    }
  | {
      type: 'fidel_family'
      title: string
      title_am: string
      intro: string
      intro_am: string
      family: FidelFamily
      exercises: AmharicExercise[]
    }
  | {
      type: 'reading'
      title: string
      title_am: string
      intro: string
      passage: string
      passage_en?: string
      exercises: AmharicExercise[]
    }
  | {
      type: 'vocab'
      title: string
      title_am: string
      intro: string
      items: { word: string; translit: string; meaning_en: string; example?: string }[]
      exercises: AmharicExercise[]
    }

/** Core Fidel families used in beginner lessons */
export const FIDEL_FAMILIES: Record<string, FidelFamily> = {
  ha: {
    base: 'ሀ',
    name: 'Ha family',
    name_am: 'ሀ ቤተሰብ',
    chars: [
      { char: 'ሀ', translit: 'hä' },
      { char: 'ሁ', translit: 'hu' },
      { char: 'ሂ', translit: 'hi' },
      { char: 'ሃ', translit: 'ha' },
      { char: 'ሄ', translit: 'he' },
      { char: 'ህ', translit: 'hə' },
      { char: 'ሆ', translit: 'ho' },
    ],
  },
  la: {
    base: 'ለ',
    name: 'La family',
    name_am: 'ለ ቤተሰብ',
    chars: [
      { char: 'ለ', translit: 'lä' },
      { char: 'ሉ', translit: 'lu' },
      { char: 'ሊ', translit: 'li' },
      { char: 'ላ', translit: 'la' },
      { char: 'ሌ', translit: 'le' },
      { char: 'ል', translit: 'lə' },
      { char: 'ሎ', translit: 'lo' },
    ],
  },
  hha: {
    base: 'ሐ',
    name: 'Ḥa family',
    name_am: 'ሐ ቤተሰብ',
    chars: [
      { char: 'ሐ', translit: 'ḥä' },
      { char: 'ሑ', translit: 'ḥu' },
      { char: 'ሒ', translit: 'ḥi' },
      { char: 'ሓ', translit: 'ḥa' },
      { char: 'ሔ', translit: 'ḥe' },
      { char: 'ሕ', translit: 'ḥə' },
      { char: 'ሖ', translit: 'ḥo' },
    ],
  },
  ma: {
    base: 'መ',
    name: 'Ma family',
    name_am: 'መ ቤተሰብ',
    chars: [
      { char: 'መ', translit: 'mä' },
      { char: 'ሙ', translit: 'mu' },
      { char: 'ሚ', translit: 'mi' },
      { char: 'ማ', translit: 'ma' },
      { char: 'ሜ', translit: 'me' },
      { char: 'ም', translit: 'mə' },
      { char: 'ሞ', translit: 'mo' },
    ],
  },
  sa: {
    base: 'ሰ',
    name: 'Sa family',
    name_am: 'ሰ ቤተሰብ',
    chars: [
      { char: 'ሰ', translit: 'sä' },
      { char: 'ሱ', translit: 'su' },
      { char: 'ሲ', translit: 'si' },
      { char: 'ሳ', translit: 'sa' },
      { char: 'ሴ', translit: 'se' },
      { char: 'ስ', translit: 'sə' },
      { char: 'ሶ', translit: 'so' },
    ],
  },
}

export const amharicLessonContent: Record<string, AmharicLessonContent> = {
  l1: {
    type: 'fidel_intro',
    title: 'What is Fidel?',
    title_am: 'ፊደል ምንድን ነው?',
    body: `Fidel (ፊደል) is the name of the Ethiopic writing system used for Amharic, Tigrinya, and other languages of Ethiopia and Eritrea.

Unlike the English alphabet, each Fidel character represents a **syllable** (consonant + vowel), not a single letter.

There are about 33 base consonants. Each has 7 forms for the 7 vowel orders:
1. ä (as in "about")
2. u
3. i
4. a
5. e
6. ə (or silent)
7. o

Learning Fidel family by family is the traditional and most effective way.`,
    body_am: `ፊደል የኢትዮጵያና የኤርትራ ቋንቋዎች የሚጻፍበት የጽሕፈት ስርዓት ነው።

ከእንግሊዝኛ ፊደል በተለየ እያንዳንዱ የፊደል ቅርጽ አንድ **የድምፅ ክፍለ ቃል** (ተነባቢ + አናባቢ) ይወክላል።

በግምት 33 መሰረታዊ ተነባቢዎች አሉ። እያንዳንዱ 7 የአናባቢ ቅርጾች አሉት።

ፊደልን በቤተሰብ በቤተሰብ መማር ባህላዊ እና ውጤታማ መንገድ ነው።`,
    exercises: [
      {
        type: 'multiple_choice',
        question: 'What does each Fidel character represent?',
        question_am: 'እያንዳንዱ የፊደል ቅርጽ ምን ይወክላል?',
        options: ['A single letter', 'A syllable (consonant + vowel)', 'Only a vowel', 'Only a consonant'],
        correctIndex: 1,
        explanation: 'Each Fidel character is a syllabary symbol — consonant + vowel together.',
      },
      {
        type: 'multiple_choice',
        question: 'How many vowel orders does each Fidel family have?',
        options: ['5', '6', '7', '8'],
        correctIndex: 2,
        explanation: 'There are 7 traditional vowel orders in each family.',
      },
    ],
  },

  l2: {
    type: 'fidel_family',
    title: 'The First Family (ሀ)',
    title_am: 'የመጀመሪያው ቤተሰብ (ሀ)',
    intro: 'The ሀ (hä) family is often the first taught. Learn all seven forms.',
    intro_am: 'ሀ ቤተሰብ ብዙ ጊዜ የመጀመሪያው የሚማረው ነው። ሰባቱንም ቅርጾች ይማሩ።',
    family: FIDEL_FAMILIES.ha,
    exercises: [
      {
        type: 'fidel_recognize',
        prompt: 'Which character is "hu"?',
        prompt_am: 'የትኛው "ሁ" ነው?',
        options: ['ሀ', 'ሁ', 'ሂ', 'ሃ'],
        correctIndex: 1,
      },
      {
        type: 'fidel_recognize',
        prompt: 'Which character is "ha" (4th order)?',
        options: ['ሀ', 'ሁ', 'ሃ', 'ሆ'],
        correctIndex: 2,
      },
      {
        type: 'type_char',
        prompt: 'Type the character for "hi" (3rd order of ሀ)',
        target: 'ሂ',
        hint: 'Third form of the ha family',
      },
      {
        type: 'multiple_choice',
        question: 'How many characters are in the ሀ family?',
        options: ['5', '6', '7', '8'],
        correctIndex: 2,
      },
    ],
  },

  l3: {
    type: 'fidel_family',
    title: 'ሀ Family Practice',
    title_am: 'ሀ ቤተሰብ ልምምድ',
    intro: 'Review and practice the full ሀ family again with more exercises.',
    intro_am: 'ሀ ቤተሰብን እንደገና ይለማመዱ።',
    family: FIDEL_FAMILIES.ha,
    exercises: [
      {
        type: 'fidel_recognize',
        prompt: 'Find "he" (5th order)',
        options: ['ሄ', 'ህ', 'ሆ', 'ሁ'],
        correctIndex: 0,
      },
      {
        type: 'fidel_recognize',
        prompt: 'Find "ho"',
        options: ['ሀ', 'ሂ', 'ሆ', 'ሃ'],
        correctIndex: 2,
      },
      {
        type: 'type_char',
        prompt: 'Type "hä" (1st order of ሀ)',
        target: 'ሀ',
      },
      {
        type: 'type_char',
        prompt: 'Type "hə" (6th order)',
        target: 'ህ',
      },
    ],
  },

  l4: {
    type: 'fidel_family',
    title: 'ለ Family',
    title_am: 'ለ ቤተሰብ',
    intro: 'The ለ (lä) family. Same seven vowel orders as ሀ.',
    intro_am: 'ለ ቤተሰብ። እንደ ሀ ሰባት የአናባቢ ቅርጾች አሉት።',
    family: FIDEL_FAMILIES.la,
    exercises: [
      {
        type: 'fidel_recognize',
        prompt: 'Which is "lu"?',
        options: ['ለ', 'ሉ', 'ሊ', 'ላ'],
        correctIndex: 1,
      },
      {
        type: 'fidel_recognize',
        prompt: 'Which is "la"?',
        options: ['ለ', 'ሉ', 'ላ', 'ሎ'],
        correctIndex: 2,
      },
      {
        type: 'type_char',
        prompt: 'Type "li"',
        target: 'ሊ',
      },
      {
        type: 'multiple_choice',
        question: 'The base character of this family is…',
        options: ['ሀ', 'ለ', 'መ', 'ሰ'],
        correctIndex: 1,
      },
    ],
  },

  l5: {
    type: 'fidel_family',
    title: 'ሐ Family',
    title_am: 'ሐ ቤተሰብ',
    intro: 'The ሐ (ḥa) family — a distinct h-sound from ሀ. Important to distinguish.',
    intro_am: 'ሐ ቤተሰብ — ከሀ የተለየ የሀ ድምፅ። መለየት አስፈላጊ ነው።',
    family: FIDEL_FAMILIES.hha,
    exercises: [
      {
        type: 'fidel_recognize',
        prompt: 'Which is "ḥu"?',
        options: ['ሐ', 'ሑ', 'ሒ', 'ሓ'],
        correctIndex: 1,
      },
      {
        type: 'fidel_recognize',
        prompt: 'Which belongs to the ሐ family (not ሀ)?',
        options: ['ሁ', 'ሑ', 'ሂ', 'ሆ'],
        correctIndex: 1,
      },
      {
        type: 'type_char',
        prompt: 'Type "ḥa" (4th order of ሐ)',
        target: 'ሓ',
      },
    ],
  },
}

export const amharicReadingContent: Record<string, AmharicLessonContent> = {
  l1: {
    type: 'vocab',
    title: 'Common Words',
    title_am: 'የተለመዱ ቃላት',
    intro: 'Essential everyday Amharic words.',
    items: [
      { word: 'ሰላም', translit: 'sälam', meaning_en: 'Hello / Peace' },
      { word: 'አመሰግናለሁ', translit: 'amäsägənalähu', meaning_en: 'Thank you' },
      { word: 'እሺ', translit: 'əšši', meaning_en: 'OK / Alright' },
      { word: 'ውሃ', translit: 'wəha', meaning_en: 'Water' },
      { word: 'ቤት', translit: 'bet', meaning_en: 'House / Home' },
      { word: 'መጽሐፍ', translit: 'mäṣḥaf', meaning_en: 'Book' },
    ],
    exercises: [
      {
        type: 'multiple_choice',
        question: 'What does "ሰላም" mean?',
        options: ['Thank you', 'Hello / Peace', 'Water', 'Book'],
        correctIndex: 1,
      },
      {
        type: 'multiple_choice',
        question: 'What is the Amharic word for "Water"?',
        options: ['ቤት', 'ውሃ', 'መጽሐፍ', 'እሺ'],
        correctIndex: 1,
      },
      {
        type: 'type_char',
        prompt: 'Type the Amharic word for "Hello"',
        target: 'ሰላም',
        hint: 'sälam',
      },
    ],
  },
  l2: {
    type: 'reading',
    title: 'Simple Sentences',
    title_am: 'ቀላል ዓረፍተ ነገሮች',
    intro: 'Read short Amharic sentences and check your understanding.',
    passage: 'ሰላም። ስሜ አበበ ነው።
እኔ ተማሪ ነኝ።
ውሃ እፈልጋለሁ።
መጽሐፍ አለኝ።',
    passage_en: 'Hello. My name is Abebe.
I am a student.
I want water.
I have a book.',
    exercises: [
      {
        type: 'multiple_choice',
        question: "What is the speaker's name?",
        options: ['Sara', 'Abebe', 'Daniel', 'Hanna'],
        correctIndex: 1,
      },
      {
        type: 'multiple_choice',
        question: 'What does the speaker want?',
        options: ['A book', 'Water', 'Food', 'Home'],
        correctIndex: 1,
      },
      {
        type: 'multiple_choice',
        question: 'Is the speaker a teacher?',
        options: ['Yes', 'No'],
        correctIndex: 1,
        explanation: 'The speaker says "እኔ ተማሪ ነኝ" — I am a student.',
      },
    ],
  },
}

export function getAmharicContent(
  lessonId: string,
  courseSlug?: string
): AmharicLessonContent | null {
  if (courseSlug === 'amharic-reading-practice') {
    return amharicReadingContent[lessonId] || null
  }
  return amharicLessonContent[lessonId] || null
}
