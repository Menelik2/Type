/**
 * English lesson content for Phase 3 MVP.
 * Each lesson has a type and structured content the Course Player can render.
 */

export type ExerciseType =
  | 'multiple_choice'
  | 'fill_blank'
  | 'flashcard'
  | 'matching'
  | 'true_false'
  | 'spelling'

export type VocabItem = {
  word: string
  translation_am: string
  example: string
  example_am: string
  phonetic?: string
}

export type MultipleChoiceQ = {
  type: 'multiple_choice'
  question: string
  options: string[]
  correctIndex: number
  explanation?: string
}

export type FillBlankQ = {
  type: 'fill_blank'
  sentence: string // use ___ for blank
  answer: string
  hint?: string
}

export type TrueFalseQ = {
  type: 'true_false'
  statement: string
  correct: boolean
  explanation?: string
}

export type SpellingQ = {
  type: 'spelling'
  word: string
  prompt: string
}

export type Exercise =
  | MultipleChoiceQ
  | FillBlankQ
  | TrueFalseQ
  | SpellingQ

export type LessonContent =
  | {
      type: 'vocab'
      title: string
      intro: string
      items: VocabItem[]
      exercises: Exercise[]
    }
  | {
      type: 'grammar'
      title: string
      intro: string
      rules: { title: string; body: string; examples: string[] }[]
      exercises: Exercise[]
    }
  | {
      type: 'reading'
      title: string
      intro: string
      passage: string
      vocabulary?: VocabItem[]
      exercises: Exercise[]
    }
  | {
      type: 'text'
      title: string
      body: string
      exercises?: Exercise[]
    }

export const englishLessonContent: Record<string, LessonContent> = {
  // ── English for Beginners ──────────────────────────────────────
  l1: {
    type: 'text',
    title: 'English Alphabet',
    body: `The English alphabet has 26 letters.

**Uppercase:** A B C D E F G H I J K L M N O P Q R S T U V W X Y Z

**Lowercase:** a b c d e f g h i j k l m n o p q r s t u v w x y z

There are 5 vowels: **a, e, i, o, u** (sometimes y).

The rest are consonants.

Practice saying each letter out loud.`,
    exercises: [
      {
        type: 'multiple_choice',
        question: 'How many letters are in the English alphabet?',
        options: ['24', '25', '26', '28'],
        correctIndex: 2,
        explanation: 'The English alphabet has 26 letters.',
      },
      {
        type: 'multiple_choice',
        question: 'Which of these is a vowel?',
        options: ['b', 'c', 'e', 'd'],
        correctIndex: 2,
        explanation: 'The vowels are a, e, i, o, u.',
      },
      {
        type: 'true_false',
        statement: 'The letter "y" is sometimes used as a vowel.',
        correct: true,
        explanation: 'Yes — in words like "my" or "happy", y acts as a vowel.',
      },
    ],
  },

  l2: {
    type: 'text',
    title: 'Vowels & Consonants',
    body: `**Vowels** are sounds made with an open mouth: a, e, i, o, u.

**Consonants** are made by blocking air with the tongue, teeth or lips.

Every English word needs at least one vowel sound.

Examples:
- cat → a is the vowel
- book → oo is the vowel sound
- sky → y is the vowel sound`,
    exercises: [
      {
        type: 'multiple_choice',
        question: 'Which word has a vowel sound made by "y"?',
        options: ['cat', 'book', 'sky', 'pen'],
        correctIndex: 2,
      },
      {
        type: 'fill_blank',
        sentence: 'The five main vowels are a, e, i, o and ___.',
        answer: 'u',
        hint: 'The last vowel in the list a e i o ?',
      },
    ],
  },

  l3: {
    type: 'text',
    title: 'Basic Pronunciation',
    body: `English pronunciation can be tricky because the same letter can make different sounds.

Common patterns:
- **a** in "cat" vs "cake"
- **th** in "the" (voiced) vs "think" (unvoiced)
- Silent letters: the "k" in "know", the "b" in "lamb"

Tip: Listen carefully and repeat. Focus on sounds, not just spelling.`,
    exercises: [
      {
        type: 'true_false',
        statement: 'The letter "k" is always pronounced in English words.',
        correct: false,
        explanation: 'In words like "know" and "knife" the k is silent.',
      },
      {
        type: 'multiple_choice',
        question: 'Which word has a silent letter?',
        options: ['cat', 'dog', 'knife', 'pen'],
        correctIndex: 2,
      },
    ],
  },

  l4: {
    type: 'vocab',
    title: 'Hello & Goodbye',
    intro: 'Learn the most common greetings and farewells in English.',
    items: [
      {
        word: 'Hello',
        translation_am: 'ሰላም / ሀሎ',
        example: 'Hello! How are you?',
        example_am: 'ሰላም! እንደምን አለህ/አለሽ?',
      },
      {
        word: 'Hi',
        translation_am: 'ሃይ',
        example: 'Hi, my name is Sara.',
        example_am: 'ሃይ፣ ስሜ ሳራ ነው።',
      },
      {
        word: 'Good morning',
        translation_am: 'እንደምን አደርክ/አደርሽ',
        example: 'Good morning, everyone!',
        example_am: 'እንደምን አደራችሁ!',
      },
      {
        word: 'Goodbye',
        translation_am: 'ደህና ሁን / ደህና ሁኚ',
        example: 'Goodbye! See you tomorrow.',
        example_am: 'ደህና ሁን! ነገ እንገናኛለን።',
      },
      {
        word: 'See you later',
        translation_am: 'በኋላ እንገናኛለን',
        example: 'I have to go. See you later!',
        example_am: 'መሄድ አለብኝ። በኋላ እንገናኛለን!',
      },
      {
        word: 'Thank you',
        translation_am: 'አመሰግናለሁ',
        example: 'Thank you for your help.',
        example_am: 'ለእርዳታህ አመሰግናለሁ።',
      },
    ],
    exercises: [
      {
        type: 'multiple_choice',
        question: 'What do you say in the morning?',
        options: ['Good night', 'Good morning', 'Goodbye', 'See you'],
        correctIndex: 1,
      },
      {
        type: 'fill_blank',
        sentence: '___ you for your help.',
        answer: 'Thank',
        hint: 'A polite word of gratitude',
      },
      {
        type: 'spelling',
        word: 'Goodbye',
        prompt: 'Type the word for farewell:',
      },
    ],
  },

  l5: {
    type: 'vocab',
    title: 'Introducing Yourself',
    intro: 'Learn how to say your name and ask others about themselves.',
    items: [
      {
        word: 'My name is…',
        translation_am: 'ስሜ … ነው',
        example: 'My name is Daniel.',
        example_am: 'ስሜ ዳንኤል ነው።',
      },
      {
        word: 'I am…',
        translation_am: 'እኔ … ነኝ',
        example: 'I am a student.',
        example_am: 'እኔ ተማሪ ነኝ።',
      },
      {
        word: 'Nice to meet you',
        translation_am: 'ደስ ብሎኛል',
        example: 'Nice to meet you, Anna.',
        example_am: 'አና፣ ደስ ብሎኛል።',
      },
      {
        word: 'Where are you from?',
        translation_am: 'ከየት ነህ/ነሽ?',
        example: 'Where are you from? I am from Ethiopia.',
        example_am: 'ከየት ነህ? ከኢትዮጵያ ነኝ።',
      },
      {
        word: 'How are you?',
        translation_am: 'እንደምን አለህ/አለሽ?',
        example: 'How are you? I am fine, thank you.',
        example_am: 'እንደምን አለህ? ደህና ነኝ፣ አመሰግናለሁ።',
      },
    ],
    exercises: [
      {
        type: 'multiple_choice',
        question: 'How do you ask someone their origin?',
        options: ['How are you?', 'Where are you from?', 'Nice to meet you', 'My name is'],
        correctIndex: 1,
      },
      {
        type: 'fill_blank',
        sentence: 'My ___ is Sara.',
        answer: 'name',
        hint: 'What people call you',
      },
      {
        type: 'true_false',
        statement: '"Nice to meet you" is used when you first meet someone.',
        correct: true,
      },
    ],
  },

  // ── Everyday English Vocabulary ────────────────────────────────
  // (mapped to the second English course lessons)
  'vocab-l1': {
    type: 'vocab',
    title: 'Family Members',
    intro: 'Essential words for talking about family.',
    items: [
      { word: 'mother', translation_am: 'እናት', example: 'My mother is a teacher.', example_am: 'እናቴ መምህር ነች።' },
      { word: 'father', translation_am: 'አባት', example: 'My father works in a bank.', example_am: 'አባቴ በባንክ ይሰራል።' },
      { word: 'brother', translation_am: 'ወንድም', example: 'I have one brother.', example_am: 'አንድ ወንድም አለኝ።' },
      { word: 'sister', translation_am: 'እህት', example: 'My sister is younger than me.', example_am: 'እህቴ ከእኔ ታናሽ ናት።' },
      { word: 'child', translation_am: 'ልጅ', example: 'They have two children.', example_am: 'ሁለት ልጆች አሏቸው።' },
      { word: 'family', translation_am: 'ቤተሰብ', example: 'I love my family.', example_am: 'ቤተሰቤን እወዳለሁ።' },
    ],
    exercises: [
      {
        type: 'multiple_choice',
        question: 'What is the English word for "እናት"?',
        options: ['father', 'mother', 'sister', 'brother'],
        correctIndex: 1,
      },
      {
        type: 'spelling',
        word: 'family',
        prompt: 'Spell the word for ቤተሰብ:',
      },
      {
        type: 'fill_blank',
        sentence: 'My ___ is a teacher. (female parent)',
        answer: 'mother',
      },
    ],
  },

  'vocab-l2': {
    type: 'vocab',
    title: 'Describing People',
    intro: 'Adjectives to describe appearance and personality.',
    items: [
      { word: 'tall', translation_am: 'ረጅም', example: 'He is tall.', example_am: 'ረጅም ነው።' },
      { word: 'short', translation_am: 'አጭር', example: 'She is short.', example_am: 'አጭር ናት።' },
      { word: 'friendly', translation_am: 'ወዳጅ', example: 'They are very friendly.', example_am: 'በጣም ወዳጆች ናቸው።' },
      { word: 'kind', translation_am: 'ደግ', example: 'She is a kind person.', example_am: 'ደግ ሰው ናት።' },
      { word: 'young', translation_am: 'ወጣት', example: 'He is young.', example_am: 'ወጣት ነው።' },
      { word: 'old', translation_am: 'አሮጌ / ሽማግሌ', example: 'My grandfather is old.', example_am: 'አያቴ ሽማግሌ ነው።' },
    ],
    exercises: [
      {
        type: 'multiple_choice',
        question: 'Opposite of "tall"?',
        options: ['kind', 'short', 'young', 'friendly'],
        correctIndex: 1,
      },
      {
        type: 'true_false',
        statement: '"Friendly" describes someone who is nice to others.',
        correct: true,
      },
    ],
  },
}

/** Map course lesson IDs to content keys when they differ */
export function getEnglishContent(lessonId: string): LessonContent | null {
  return englishLessonContent[lessonId] || null
}
