import type { AmharicLessonContent, FidelFamily } from '../../data/amharicLessons'
import AmharicExerciseRenderer from '../exercises/AmharicExerciseRenderer'
import AudioPlayer from '../audio/AudioPlayer'

type Props = {
  content: AmharicLessonContent
}

export default function AmharicLessonRenderer({ content }: Props) {
  const familyChars =
    content.type === 'fidel_family'
      ? content.family.chars.map((c) => c.char)
      : undefined

  return (
    <div className="space-y-8">
      {'intro' in content && (
        <div>
          <p className="text-lg text-gray-700">{content.intro}</p>
          {'intro_am' in content && content.intro_am && (
            <p className="mt-2 text-base text-gray-600">{content.intro_am}</p>
          )}
        </div>
      )}

      {content.type === 'fidel_intro' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-gray-100 bg-white p-5 leading-relaxed text-gray-700">
            {content.body.split('\n\n').map((p, i) => (
              <p key={i} className="mb-3 last:mb-0 whitespace-pre-line">
                {renderBold(p)}
              </p>
            ))}
          </div>
          <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-5 leading-relaxed text-amber-950">
            {content.body_am.split('\n\n').map((p, i) => (
              <p key={i} className="mb-3 last:mb-0 whitespace-pre-line">
                {renderBold(p)}
              </p>
            ))}
          </div>
        </div>
      )}

      {content.type === 'fidel_family' && <FidelFamilyGrid family={content.family} />}

      {content.type === 'vocab' && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
            >
              <div className="p-4 text-center">
                <div className="text-2xl font-medium text-gray-900">{item.word}</div>
                <div className="mt-1 text-xs text-gray-400">{item.translit}</div>
                <div className="mt-2 text-sm font-medium text-indigo-700">{item.meaning_en}</div>
              </div>
              <div className="border-t border-gray-50 px-2 pb-2">
                <AudioPlayer
                  ttsText={item.word}
                  ttsLang="am-ET"
                  className="border-0 shadow-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {content.type === 'reading' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-gray-100 bg-white p-6 text-xl leading-loose text-gray-900">
            {content.passage.split('\n').map((line, i) => (
              <p key={i} className="mb-2 last:mb-0">
                {line}
              </p>
            ))}
          </div>
          <AudioPlayer
            ttsText={content.passage.replace(/\n/g, ' ')}
            ttsLang="am-ET"
            label="Listen to the passage (browser TTS if available)"
          />
          {content.passage_en && (
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-600">
              <p className="mb-1 text-xs font-medium uppercase text-gray-400">English</p>
              {content.passage_en.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          )}
        </div>
      )}

      {'exercises' in content && content.exercises && content.exercises.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">ልምምድ · Practice</h3>
          {content.exercises.map((ex, i) => (
            <AmharicExerciseRenderer
              key={i}
              exercise={ex}
              index={i}
              familyChars={familyChars}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function FidelFamilyGrid({ family }: { family: FidelFamily }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">{family.name}</h3>
          <p className="text-sm text-gray-500">{family.name_am}</p>
        </div>
        <span className="text-3xl">{family.base}</span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
        {family.chars.map((c) => (
          <div
            key={c.char}
            className="flex flex-col items-center rounded-xl border border-gray-100 bg-gray-50 py-3 transition hover:border-indigo-200 hover:bg-indigo-50"
          >
            <span className="text-2xl font-medium text-gray-900">{c.char}</span>
            <span className="mt-1 text-xs text-gray-500">{c.translit}</span>
            <div className="mt-1 scale-90">
              <AudioPlayer ttsText={c.char} ttsLang="am-ET" className="border-0 p-1 shadow-none" />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-xs text-gray-400">
        7 orders: ä · u · i · a · e · ə · o · Audio uses browser TTS when Amharic voice is installed
      </p>
    </div>
  )
}

function renderBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return <span key={i}>{part}</span>
  })
}
