export type Course = {
  id: string
  slug: string
  title: { en: string; am: string }
  description: { en: string; am: string }
  learningLanguage: 'en' | 'am'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: string
  lessonsCount: number
  durationMinutes: number
  image?: string
  objectives: { en: string[]; am: string[] }
  chapters: {
    id: string
    title: { en: string; am: string }
    lessons: { id: string; title: { en: string; am: string } }[]
  }[]
}

export const sampleCourses: Course[] = [
  {
    id: 'en-beginner-1',
    slug: 'english-for-beginners',
    title: {
      en: 'English for Beginners',
      am: 'ለጀማሪዎች እንግሊዝኛ',
    },
    description: {
      en: 'Start your English journey with essential vocabulary, basic grammar, reading and typing practice.',
      am: 'በአስፈላጊ ቃላት፣ መሰረታዊ ሰዋሰው፣ ንባብ እና የቁልፍ ሰሌዳ ልምምድ የእንግሊዝኛ ጉዞዎን ይጀምሩ።',
    },
    learningLanguage: 'en',
    difficulty: 'beginner',
    category: 'General',
    lessonsCount: 24,
    durationMinutes: 480,
    objectives: {
      en: [
        'Learn the English alphabet and pronunciation',
        'Master 200+ everyday vocabulary words',
        'Form simple sentences',
        'Practice basic typing accuracy',
      ],
      am: [
        'የእንግሊዝኛ ፊደላትን እና አጠራር ይማሩ',
        'ከ200+ በላይ የዕለት ተዕለት ቃላት ይቆጣጠሩ',
        'ቀላል ዓረፍተ ነገሮች ይፍጠሩ',
        'መሰረታዊ የቁልፍ ሰሌዳ ትክክለኛነት ይለማመዱ',
      ],
    },
    chapters: [
      {
        id: 'ch1',
        title: { en: 'Alphabet & Sounds', am: 'ፊደላት እና ድምፆች' },
        lessons: [
          { id: 'l1', title: { en: 'English Alphabet', am: 'የእንግሊዝኛ ፊደላት' } },
          { id: 'l2', title: { en: 'Vowels & Consonants', am: 'አናባቢዎች እና ተነባቢዎች' } },
          { id: 'l3', title: { en: 'Basic Pronunciation', am: 'መሰረታዊ አጠራር' } },
        ],
      },
      {
        id: 'ch2',
        title: { en: 'Greetings & Introductions', am: 'ሰላምታዎች እና መተዋወቅ' },
        lessons: [
          { id: 'l4', title: { en: 'Hello & Goodbye', am: 'ሰላም እና ደህና ሁን' } },
          { id: 'l5', title: { en: 'Introducing Yourself', am: 'ራስዎን ማስተዋወቅ' } },
        ],
      },
    ],
  },
  {
    id: 'am-fidel-1',
    slug: 'amharic-fidel-basics',
    title: {
      en: 'Amharic Fidel Basics',
      am: 'የአማርኛ ፊደላት መሰረታዊ',
    },
    description: {
      en: 'Learn the Ethiopic script (Fidel) step by step — character families, reading and writing practice.',
      am: 'የኢትዮጵያ ፊደል (ፊደላት)ን ደረጃ በደረጃ ይማሩ — የቤተሰብ ፊደሎች፣ ንባብ እና ጽሕፈት ልምምድ።',
    },
    learningLanguage: 'am',
    difficulty: 'beginner',
    category: 'Script',
    lessonsCount: 32,
    durationMinutes: 640,
    objectives: {
      en: [
        'Recognize all Fidel character families',
        'Read simple Amharic words',
        'Write basic characters accurately',
        'Build confidence with the Ethiopic script',
      ],
      am: [
        'ሁሉንም የፊደል ቤተሰቦች ይለዩ',
        'ቀላል የአማርኛ ቃላት ያንብቡ',
        'መሰረታዊ ፊደሎችን በትክክል ይጻፉ',
        'በኢትዮጵያ ፊደል ላይ በራስ መተማመን ይገንቡ',
      ],
    },
    chapters: [
      {
        id: 'ch1',
        title: { en: 'Introduction to Fidel', am: 'ወደ ፊደል መግቢያ' },
        lessons: [
          { id: 'l1', title: { en: 'What is Fidel?', am: 'ፊደል ምንድን ነው?' } },
          { id: 'l2', title: { en: 'The First Family (ሀ)', am: 'የመጀመሪያው ቤተሰብ (ሀ)' } },
        ],
      },
      {
        id: 'ch2',
        title: { en: 'Character Families 1-5', am: 'የፊደል ቤተሰቦች 1-5' },
        lessons: [
          { id: 'l3', title: { en: 'ሀ Family', am: 'ሀ ቤተሰብ' } },
          { id: 'l4', title: { en: 'ለ Family', am: 'ለ ቤተሰብ' } },
          { id: 'l5', title: { en: 'ሐ Family', am: 'ሐ ቤተሰብ' } },
        ],
      },
    ],
  },
  {
    id: 'en-vocab-daily',
    slug: 'everyday-english-vocabulary',
    title: {
      en: 'Everyday English Vocabulary',
      am: 'የዕለት ተዕለት እንግሊዝኛ ቃላት',
    },
    description: {
      en: 'Build practical vocabulary for family, food, travel, work and daily conversations.',
      am: 'ለቤተሰብ፣ ምግብ፣ ጉዞ፣ ሥራ እና የዕለት ተዕለት ውይይቶች ተግባራዊ ቃላት ይገንቡ።',
    },
    learningLanguage: 'en',
    difficulty: 'beginner',
    category: 'Vocabulary',
    lessonsCount: 18,
    durationMinutes: 360,
    objectives: {
      en: ['Master 300+ high-frequency words', 'Use words in real sentences', 'Improve listening recognition'],
      am: ['ከ300+ በላይ ከፍተኛ ተደጋጋሚ ቃላት ይቆጣጠሩ', 'ቃላትን በእውነተኛ ዓረፍተ ነገሮች ይጠቀሙ', 'የማዳመጥ ማወቅ ያሻሽሉ'],
    },
    chapters: [
      {
        id: 'ch1',
        title: { en: 'Family & People', am: 'ቤተሰብ እና ሰዎች' },
        lessons: [
          { id: 'l1', title: { en: 'Family Members', am: 'የቤተሰብ አባላት' } },
          { id: 'l2', title: { en: 'Describing People', am: 'ሰዎችን መግለጽ' } },
        ],
      },
    ],
  },
  {
    id: 'am-reading-1',
    slug: 'amharic-reading-practice',
    title: {
      en: 'Amharic Reading Practice',
      am: 'የአማርኛ ንባብ ልምምድ',
    },
    description: {
      en: 'Progress from short words and sentences to dialogues and simple stories in Amharic.',
      am: 'ከአጭር ቃላት እና ዓረፍተ ነገሮች ወደ ውይይቶች እና ቀላል ታሪኮች በአማርኛ ይሂዱ።',
    },
    learningLanguage: 'am',
    difficulty: 'intermediate',
    category: 'Reading',
    lessonsCount: 20,
    durationMinutes: 400,
    objectives: {
      en: ['Read Amharic sentences fluently', 'Understand short dialogues', 'Build reading comprehension'],
      am: ['የአማርኛ ዓረፍተ ነገሮችን በፍጥነት ያንብቡ', 'አጭር ውይይቶችን ይረዱ', 'የንባብ ግንዛቤ ይገንቡ'],
    },
    chapters: [
      {
        id: 'ch1',
        title: { en: 'Words & Short Sentences', am: 'ቃላት እና አጭር ዓረፍተ ነገሮች' },
        lessons: [
          { id: 'l1', title: { en: 'Common Words', am: 'የተለመዱ ቃላት' } },
          { id: 'l2', title: { en: 'Simple Sentences', am: 'ቀላል ዓረፍተ ነገሮች' } },
        ],
      },
    ],
  },
]

export function getCourseBySlug(slug: string) {
  return sampleCourses.find((c) => c.slug === slug)
}

export function getCoursesByLanguage(lang?: 'en' | 'am') {
  if (!lang) return sampleCourses
  return sampleCourses.filter((c) => c.learningLanguage === lang)
}
