/**
 * English lesson content — includes Phase 5 listening support.
 */

export type VocabItem = {
  word: string
  translation_am: string
  example: string
  example_am: string
  phonetic?: string
  /** Optional remote audio URL; TTS used when missing */
  audioSrc?: string
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
  sentence: string
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

export type ListenChooseQ = {
  type: 'listen_choose'
  prompt: string
  audioText: string
  audioLang?: string
  audioSrc?: string
  options: string[]
  correctIndex: number
  explanation?: string
}

export type DictationQ = {
  type: 'dictation'
  prompt: string
  audioText: string
  audioLang?: string
  audioSrc?: string
  answer: string
  acceptAlternatives?: string[]
  hint?: string
}

export type Exercise =
  | MultipleChoiceQ
  | FillBlankQ
  | TrueFalseQ
  | SpellingQ
  | ListenChooseQ
  | DictationQ

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
      type: 'listening'
      title: string
      intro: string
      exercises: (ListenChooseQ | DictationQ)[]
    }
  | {
      type: 'text'
      title: string
      body: string
      /** Optional full-lesson audio (TTS or file) */
      audioText?: string
      exercises?: Exercise[]
    }

export const englishLessonContent: Record<string, LessonContent> = {
  l1: {
    type: 'text',
    title: 'English Alphabet',
    audioText: 'The English alphabet has twenty-six letters. A B C D E F G H I J K L M N O P Q R S T U V W X Y Z.',
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
      {
        type: 'listen_choose',
        prompt: 'Listen and choose the word you hear.',
        audioText: 'Apple',
        options: ['April', 'Apple', 'Apply', 'Able'],
        correctIndex: 1,
      },
    ],
  },

  l2: {
    type: 'text',
    title: 'Vowels & Consonants',
    audioText: 'Vowels are a, e, i, o, and u. Sometimes y is also a vowel.',
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
      {
        type: 'dictation',
        prompt: 'Listen and type the sentence.',
        audioText: 'The cat is on the mat.',
        answer: 'The cat is on the mat.',
        acceptAlternatives: ['the cat is on the mat'],
        hint: 'A short sentence about a cat',
      },
    ],
  },

  l3: {
    type: 'listening',
    title: 'Basic Pronunciation',
    intro:
      'Listen carefully. English spelling and sound often differ. Use the player, then answer.',
    exercises: [
      {
        type: 'listen_choose',
        prompt: 'Which word do you hear?',
        audioText: 'knife',
        options: ['night', 'knife', 'life', 'nine'],
        correctIndex: 1,
        explanation: 'Knife has a silent k.',
      },
      {
        type: 'listen_choose',
        prompt: 'Which word do you hear?',
        audioText: 'think',
        options: ['thing', 'sink', 'think', 'thick'],
        correctIndex: 2,
      },
      {
        type: 'dictation',
        prompt: 'Type the word you hear.',
        audioText: 'hello',
        answer: 'hello',
      },
      {
        type: 'dictation',
        prompt: 'Type the phrase you hear.',
        audioText: 'Good morning',
        answer: 'Good morning',
        acceptAlternatives: ['good morning'],
      },
    ],
  },

  l4: {
    type: 'vocab',
    title: 'Hello & Goodbye',
    intro: 'Learn the most common greetings and farewells. Tap a card, then listen.',
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
        type: 'listen_choose',
        prompt: 'Listen and choose the greeting.',
        audioText: 'Good morning',
        options: ['Good night', 'Good morning', 'Goodbye', 'Thank you'],
        correctIndex: 1,
      },
      {
        type: 'dictation',
        prompt: 'Type the farewell you hear.',
        audioText: 'Goodbye',
        answer: 'Goodbye',
        acceptAlternatives: ['goodbye', 'good bye'],
      },
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
        type: 'listen_choose',
        prompt: 'What question do you hear?',
        audioText: 'How are you?',
        options: ['How are you?', 'Where are you from?', 'What is your name?', 'Nice to meet you'],
        correctIndex: 0,
      },
      {
        type: 'dictation',
        prompt: 'Type the phrase.',
        audioText: 'Nice to meet you',
        answer: 'Nice to meet you',
        acceptAlternatives: ['nice to meet you'],
      },
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

  'vocab-l1': {
    type: 'vocab',
    title: 'Family Members',
    intro: 'Essential words for talking about family. Listen to each word.',
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
        type: 'listen_choose',
        prompt: 'Which family word do you hear?',
        audioText: 'mother',
        options: ['father', 'mother', 'brother', 'sister'],
        correctIndex: 1,
      },
      {
        type: 'dictation',
        prompt: 'Type the word you hear.',
        audioText: 'family',
        answer: 'family',
      },
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
        type: 'listen_choose',
        prompt: 'Which adjective do you hear?',
        audioText: 'friendly',
        options: ['family', 'friendly', 'finally', 'funny'],
        correctIndex: 1,
      },
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

export function getEnglishContent(lessonId: string): LessonContent | null {
  return englishLessonContent[lessonId] || null
}
