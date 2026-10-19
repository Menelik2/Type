/** Additional vocabulary entries merged into the main bank. */
import type { VocabEntry } from './vocabulary'

export const vocabExtra: VocabEntry[] = [
  // English — body
  { id: 'en-head', lang: 'en', term: 'head', meaning: 'ራስ', example: 'My head hurts.', tags: ['body', 'beginner'] },
  { id: 'en-hand', lang: 'en', term: 'hand', meaning: 'እጅ', example: 'Raise your hand.', tags: ['body', 'beginner'] },
  { id: 'en-eye', lang: 'en', term: 'eye', meaning: 'ዓይን', example: 'She has brown eyes.', tags: ['body', 'beginner'] },
  { id: 'en-ear', lang: 'en', term: 'ear', meaning: 'ጆሮ', example: 'Listen with your ears.', tags: ['body', 'beginner'] },
  { id: 'en-mouth', lang: 'en', term: 'mouth', meaning: 'አፍ', example: 'Open your mouth.', tags: ['body', 'beginner'] },
  { id: 'en-foot', lang: 'en', term: 'foot', meaning: 'እግር', example: 'My left foot is tired.', tags: ['body', 'beginner'] },

  // English — travel & places
  { id: 'en-city', lang: 'en', term: 'city', meaning: 'ከተማ', example: 'Addis Ababa is a big city.', tags: ['travel', 'beginner'] },
  { id: 'en-road', lang: 'en', term: 'road', meaning: 'መንገድ', example: 'This road leads to the school.', tags: ['travel', 'beginner'] },
  { id: 'en-market', lang: 'en', term: 'market', meaning: 'ገበያ', example: 'We buy food at the market.', tags: ['travel', 'beginner'] },
  { id: 'en-hospital', lang: 'en', term: 'hospital', meaning: 'ሆስፒታል', example: 'He works in a hospital.', tags: ['travel', 'beginner'] },
  { id: 'en-church', lang: 'en', term: 'church', meaning: 'ቤተ ክርስቲያን', example: 'They go to church on Sunday.', tags: ['travel', 'beginner'] },
  { id: 'en-home', lang: 'en', term: 'home', meaning: 'ቤት / መኖሪያ', example: 'I am going home.', tags: ['travel', 'beginner'] },
  { id: 'en-door', lang: 'en', term: 'door', meaning: 'በር', example: 'Please close the door.', tags: ['everyday', 'beginner'] },
  { id: 'en-window', lang: 'en', term: 'window', meaning: 'መስኮት', example: 'Open the window.', tags: ['everyday', 'beginner'] },

  // English — work & verbs
  { id: 'en-work', lang: 'en', term: 'work', meaning: 'ሥራ / መስራት', example: 'I work in an office.', tags: ['work', 'verbs', 'beginner'] },
  { id: 'en-job', lang: 'en', term: 'job', meaning: 'ሥራ', example: 'She has a new job.', tags: ['work', 'beginner'] },
  { id: 'en-help', lang: 'en', term: 'help', meaning: 'መርዳት', example: 'Can you help me?', tags: ['verbs', 'beginner'] },
  { id: 'en-go', lang: 'en', term: 'go', meaning: 'መሄድ', example: 'I go to school.', tags: ['verbs', 'beginner'] },
  { id: 'en-come', lang: 'en', term: 'come', meaning: 'መምጣት', example: 'Please come here.', tags: ['verbs', 'beginner'] },
  { id: 'en-see', lang: 'en', term: 'see', meaning: 'ማየት', example: 'I see the teacher.', tags: ['verbs', 'beginner'] },
  { id: 'en-hear', lang: 'en', term: 'hear', meaning: 'መስማት', example: 'I can hear the music.', tags: ['verbs', 'beginner'] },
  { id: 'en-speak', lang: 'en', term: 'speak', meaning: 'መናገር', example: 'Do you speak English?', tags: ['verbs', 'beginner'] },
  { id: 'en-know', lang: 'en', term: 'know', meaning: 'ማወቅ', example: 'I know the answer.', tags: ['verbs', 'beginner'] },
  { id: 'en-want', lang: 'en', term: 'want', meaning: 'መፈለግ', example: 'I want water.', tags: ['verbs', 'beginner'] },
  { id: 'en-need', lang: 'en', term: 'need', meaning: 'መፈለግ / ፍላጎት', example: 'I need a pen.', tags: ['verbs', 'beginner'] },
  { id: 'en-love', lang: 'en', term: 'love', meaning: 'መውደድ', example: 'I love my family.', tags: ['verbs', 'beginner'] },

  // English — days & more numbers
  { id: 'en-monday', lang: 'en', term: 'Monday', meaning: 'ሰኞ', tags: ['time', 'beginner'] },
  { id: 'en-sunday', lang: 'en', term: 'Sunday', meaning: 'እሁድ', tags: ['time', 'beginner'] },
  { id: 'en-week', lang: 'en', term: 'week', meaning: 'ሳምንት', example: 'See you next week.', tags: ['time', 'beginner'] },
  { id: 'en-month', lang: 'en', term: 'month', meaning: 'ወር', example: 'This month is October.', tags: ['time', 'beginner'] },
  { id: 'en-year', lang: 'en', term: 'year', meaning: 'ዓመት', example: 'Happy New Year!', tags: ['time', 'beginner'] },
  { id: 'en-six', lang: 'en', term: 'six', meaning: 'ስድስት', tags: ['numbers', 'beginner'] },
  { id: 'en-seven', lang: 'en', term: 'seven', meaning: 'ሰባት', tags: ['numbers', 'beginner'] },
  { id: 'en-eight', lang: 'en', term: 'eight', meaning: 'ስምንት', tags: ['numbers', 'beginner'] },
  { id: 'en-nine', lang: 'en', term: 'nine', meaning: 'ዘጠኝ', tags: ['numbers', 'beginner'] },
  { id: 'en-hundred', lang: 'en', term: 'hundred', meaning: 'መቶ', tags: ['numbers', 'beginner'] },

  // English — phrases
  { id: 'en-how-much', lang: 'en', term: 'How much is it?', meaning: 'ስንት ነው?', tags: ['phrases', 'beginner'] },
  { id: 'en-where-is', lang: 'en', term: 'Where is…?', meaning: '… የት ነው?', example: 'Where is the market?', tags: ['phrases', 'beginner'] },
  { id: 'en-i-dont-understand', lang: 'en', term: "I don't understand", meaning: 'አልገባኝም', tags: ['phrases', 'beginner'] },
  { id: 'en-repeat', lang: 'en', term: 'Please repeat', meaning: 'እባክህ ድገም', tags: ['phrases', 'beginner'] },
  { id: 'en-speak-slowly', lang: 'en', term: 'Speak slowly', meaning: 'በዝግታ ተናገር', tags: ['phrases', 'beginner'] },
  { id: 'en-what-is-name', lang: 'en', term: 'What is your name?', meaning: 'ስምህ ማን ነው?', tags: ['phrases', 'greetings', 'beginner'] },
  { id: 'en-nice-day', lang: 'en', term: 'Have a nice day', meaning: 'መልካም ቀን', tags: ['phrases', 'greetings', 'beginner'] },

  // Amharic — body
  { id: 'am-head', lang: 'am', term: 'ራስ', meaning: 'Head', translit: 'ras', tags: ['body', 'beginner'] },
  { id: 'am-hand', lang: 'am', term: 'እጅ', meaning: 'Hand', translit: 'əǧǧ', tags: ['body', 'beginner'] },
  { id: 'am-eye', lang: 'am', term: 'ዓይን', meaning: 'Eye', translit: 'ayn', tags: ['body', 'beginner'] },
  { id: 'am-ear', lang: 'am', term: 'ጆሮ', meaning: 'Ear', translit: 'ǧoro', tags: ['body', 'beginner'] },
  { id: 'am-mouth', lang: 'am', term: 'አፍ', meaning: 'Mouth', translit: 'af', tags: ['body', 'beginner'] },
  { id: 'am-foot', lang: 'am', term: 'እግር', meaning: 'Foot / leg', translit: 'əgər', tags: ['body', 'beginner'] },

  // Amharic — places
  { id: 'am-city', lang: 'am', term: 'ከተማ', meaning: 'City', translit: 'kätäma', tags: ['travel', 'beginner'] },
  { id: 'am-road', lang: 'am', term: 'መንገድ', meaning: 'Road / way', translit: 'mängäd', tags: ['travel', 'beginner'] },
  { id: 'am-market', lang: 'am', term: 'ገበያ', meaning: 'Market', translit: 'gäbäya', tags: ['travel', 'beginner'] },
  { id: 'am-hospital', lang: 'am', term: 'ሆስፒታል', meaning: 'Hospital', translit: 'hospital', tags: ['travel', 'beginner'] },
  { id: 'am-church', lang: 'am', term: 'ቤተ ክርስቲያን', meaning: 'Church', translit: 'betä krəstiyan', tags: ['travel', 'beginner'] },
  { id: 'am-door', lang: 'am', term: 'በር', meaning: 'Door', translit: 'bär', tags: ['everyday', 'beginner'] },
  { id: 'am-window', lang: 'am', term: 'መስኮት', meaning: 'Window', translit: 'mäskot', tags: ['everyday', 'beginner'] },

  // Amharic — verbs & work
  { id: 'am-work', lang: 'am', term: 'ሥራ', meaning: 'Work / job', translit: 'səra', tags: ['work', 'beginner'] },
  { id: 'am-to-go', lang: 'am', term: 'መሄድ', meaning: 'To go', translit: 'mähéd', tags: ['verbs', 'beginner'] },
  { id: 'am-to-come', lang: 'am', term: 'መምጣት', meaning: 'To come', translit: 'mämṭat', tags: ['verbs', 'beginner'] },
  { id: 'am-to-eat', lang: 'am', term: 'መብላት', meaning: 'To eat', translit: 'mäblat', tags: ['verbs', 'food', 'beginner'] },
  { id: 'am-to-drink', lang: 'am', term: 'መጠጣት', meaning: 'To drink', translit: 'mäṭäṭat', tags: ['verbs', 'food', 'beginner'] },
  { id: 'am-to-read', lang: 'am', term: 'ማንበብ', meaning: 'To read', translit: 'manbäb', tags: ['verbs', 'school', 'beginner'] },
  { id: 'am-to-write', lang: 'am', term: 'መጻፍ', meaning: 'To write', translit: 'mäṣaf', tags: ['verbs', 'school', 'beginner'] },
  { id: 'am-to-speak', lang: 'am', term: 'መናገር', meaning: 'To speak', translit: 'mänagär', tags: ['verbs', 'beginner'] },
  { id: 'am-to-see', lang: 'am', term: 'ማየት', meaning: 'To see', translit: 'mayät', tags: ['verbs', 'beginner'] },
  { id: 'am-to-hear', lang: 'am', term: 'መስማት', meaning: 'To hear', translit: 'mäsmat', tags: ['verbs', 'beginner'] },
  { id: 'am-to-want', lang: 'am', term: 'መፈለግ', meaning: 'To want / need', translit: 'mäfälläg', tags: ['verbs', 'beginner'] },
  { id: 'am-to-love', lang: 'am', term: 'መውደድ', meaning: 'To love / like', translit: 'mäwdäd', tags: ['verbs', 'beginner'] },

  // Amharic — numbers & time
  { id: 'am-six', lang: 'am', term: 'ስድስት', meaning: 'Six', translit: 'sədəst', tags: ['numbers', 'beginner'] },
  { id: 'am-seven', lang: 'am', term: 'ሰባት', meaning: 'Seven', translit: 'säbat', tags: ['numbers', 'beginner'] },
  { id: 'am-eight', lang: 'am', term: 'ስምንት', meaning: 'Eight', translit: 'səmmənt', tags: ['numbers', 'beginner'] },
  { id: 'am-nine', lang: 'am', term: 'ዘጠኝ', meaning: 'Nine', translit: 'zäṭäñ', tags: ['numbers', 'beginner'] },
  { id: 'am-hundred', lang: 'am', term: 'መቶ', meaning: 'Hundred', translit: 'mäto', tags: ['numbers', 'beginner'] },
  { id: 'am-monday', lang: 'am', term: 'ሰኞ', meaning: 'Monday', translit: 'säño', tags: ['time', 'beginner'] },
  { id: 'am-sunday', lang: 'am', term: 'እሁድ', meaning: 'Sunday', translit: 'əhud', tags: ['time', 'beginner'] },
  { id: 'am-week', lang: 'am', term: 'ሳምንት', meaning: 'Week', translit: 'samənt', tags: ['time', 'beginner'] },
  { id: 'am-year', lang: 'am', term: 'ዓመት', meaning: 'Year', translit: 'amät', tags: ['time', 'beginner'] },

  // Amharic — phrases
  { id: 'am-what-name', lang: 'am', term: 'ስምህ ማን ነው?', meaning: 'What is your name? (m)', translit: 'səməh man näw?', tags: ['phrases', 'greetings', 'beginner'] },
  { id: 'am-how-much', lang: 'am', term: 'ስንት ነው?', meaning: 'How much is it?', translit: 'sənt näw?', tags: ['phrases', 'beginner'] },
  { id: 'am-where', lang: 'am', term: 'የት ነው?', meaning: 'Where is it?', translit: 'yät näw?', tags: ['phrases', 'beginner'] },
  { id: 'am-dont-understand', lang: 'am', term: 'አልገባኝም', meaning: "I don't understand", translit: 'algäbaññəm', tags: ['phrases', 'beginner'] },
  { id: 'am-repeat', lang: 'am', term: 'እባክህ ድገም', meaning: 'Please repeat (m)', translit: 'əbakəh dəgäm', tags: ['phrases', 'beginner'] },
  { id: 'am-slowly', lang: 'am', term: 'በዝግታ', meaning: 'Slowly', translit: 'bäzəgta', tags: ['phrases', 'beginner'] },
  { id: 'am-i-want-water', lang: 'am', term: 'ውሃ እፈልጋለሁ', meaning: 'I want water', translit: 'wəha əfälləgallähu', tags: ['phrases', 'food', 'beginner'] },
  { id: 'am-god-willing', lang: 'am', term: 'እግዚአብሔር ያድርግ', meaning: 'God willing / May God do it', translit: 'əgziabher yadrəg', tags: ['phrases', 'beginner'] },
  { id: 'am-peace-to-you', lang: 'am', term: 'ሰላም ለአንተ', meaning: 'Peace to you', translit: 'sälam läʾantä', tags: ['phrases', 'greetings', 'beginner'] },
]
