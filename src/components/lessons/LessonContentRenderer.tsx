import { useState } from 'react'
import type { LessonContent, VocabItem, Exercise } from '../../data/englishLessons'
import ExerciseRenderer from '../exercises/ExerciseRenderer'
import ListeningExercise from '../exercises/ListeningExercise'
import AudioPlayer from '../audio/AudioPlayer'
import { cn } from '../../lib/utils'

type Props = {
  content: LessonContent
}

function isListeningExercise(
  ex: Exercise
): ex is Extract<Exercise, { type: 'listen_choose' | 'dictation' }> {
  return ex.type === 'listen_choose' || ex.type === 'dictation'
}

export default function LessonContentRenderer({ content }: Props) {
  return (
    <div className="space-y-8">
      {'intro' in content && content.intro && (
        <p className="text-lg text-gray-700">{content.intro}</p>
      )}

      {content.type === 'text' && (
        <div className="space-y-4">
          {content.audioText && (
            <AudioPlayer ttsText={content.audioText} ttsLang="en-US" label="Listen to this lesson" />
          )}
          <div className="prose prose-indigo max-w-none">
            {content.body.split('\n\n').map((para, i) => (
              <p key={i} className="mb-4 whitespace-pre-line text-gray-700 leading-relaxed">
                {renderMarkdownLite(para)}
              </p>
            ))}
          </div>
        </div>
      )}

      {content.type === 'vocab' && <VocabSection items={content.items} />}

      {content.type === 'grammar' && (
        <div className="space-y-6">
          {content.rules.map((rule, i) => (
            <div key={i} className="rounded-xl border border-gray-100 bg-white p-5">
              <h3 className="font-semibold text-gray-900">{rule.title}</h3>
              <p className="mt-2 text-gray-700">{rule.body}</p>
              {rule.examples.length > 0 && (
                <ul className="mt-3 space-y-1 border-l-2 border-indigo-200 pl-4">
                  {rule.examples.map((ex, j) => (
                    <li key={j} className="text-sm text-gray-600 italic">
                      {ex}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {content.type === 'reading' && (
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-100 bg-white p-6 leading-relaxed text-gray-800">
            {content.passage.split('\n\n').map((p, i) => (
              <p key={i} className="mb-4 last:mb-0">
                {p}
              </p>
            ))}
          </div>
          {content.vocabulary && content.vocabulary.length > 0 && (
            <VocabSection items={content.vocabulary} compact />
          )}
        </div>
      )}

      {content.type === 'listening' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Listening practice</h3>
          {content.exercises.map((ex, i) => (
            <ListeningExercise key={i} exercise={ex} index={i} />
          ))}
        </div>
      )}

      {'exercises' in content &&
        content.exercises &&
        content.exercises.length > 0 &&
        content.type !== 'listening' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Practice</h3>
            {content.exercises.map((ex, i) =>
              isListeningExercise(ex) ? (
                <ListeningExercise key={i} exercise={ex} index={i} />
              ) : (
                <ExerciseRenderer key={i} exercise={ex} index={i} />
              )
            )}
          </div>
        )}
    </div>
  )
}

function VocabSection({ items, compact }: { items: VocabItem[]; compact?: boolean }) {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({})

  const toggle = (i: number) => setFlipped((prev) => ({ ...prev, [i]: !prev[i] }))

  return (
    <div className={cn('grid gap-3', compact ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3')}>
      {items.map((item, i) => (
        <div
          key={i}
          className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
        >
          <button
            onClick={() => toggle(i)}
            className="flex min-h-[100px] flex-1 flex-col items-center justify-center p-4 text-center transition hover:bg-gray-50"
          >
            {!flipped[i] ? (
              <>
                <span className="text-lg font-semibold text-gray-900">{item.word}</span>
                {item.phonetic && (
                  <span className="mt-1 text-xs text-gray-400">{item.phonetic}</span>
                )}
                <span className="mt-2 text-xs text-gray-400">Tap to reveal</span>
              </>
            ) : (
              <>
                <span className="text-base font-medium text-indigo-700">{item.translation_am}</span>
                <p className="mt-2 text-sm text-gray-600">{item.example}</p>
                <p className="mt-1 text-xs text-gray-400">{item.example_am}</p>
              </>
            )}
          </button>
          <div className="border-t border-gray-50 px-2 pb-2">
            <AudioPlayer
              src={item.audioSrc}
              ttsText={item.word}
              ttsLang="en-US"
              className="border-0 shadow-none"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function renderMarkdownLite(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-gray-900">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return <span key={i}>{part}</span>
  })
}
