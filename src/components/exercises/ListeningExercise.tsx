import { useState } from 'react'
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react'
import AudioPlayer from '../audio/AudioPlayer'
import { cn } from '../../lib/utils'

export type ListeningExerciseData =
  | {
      type: 'listen_choose'
      prompt: string
      audioText: string
      audioLang?: string
      audioSrc?: string
      options: string[]
      correctIndex: number
      explanation?: string
    }
  | {
      type: 'dictation'
      prompt: string
      audioText: string
      audioLang?: string
      audioSrc?: string
      answer: string
      acceptAlternatives?: string[]
      hint?: string
    }

type Props = {
  exercise: ListeningExerciseData
  index: number
}

export default function ListeningExercise({ exercise, index }: Props) {
  const [answered, setAnswered] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)
  const [typed, setTyped] = useState('')

  const reset = () => {
    setAnswered(false)
    setCorrect(false)
    setSelected(null)
    setTyped('')
  }

  const submit = (ok: boolean) => {
    setCorrect(ok)
    setAnswered(true)
  }

  const normalize = (s: string) =>
    s.trim().toLowerCase().replace(/[.,!?]/g, '')

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Listening {index + 1}
        </span>
        {answered && (
          <button
            onClick={reset}
            className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800"
          >
            <RotateCcw className="h-3 w-3" /> Retry
          </button>
        )}
      </div>

      <p className="mb-4 font-medium text-gray-900">{exercise.prompt}</p>

      <AudioPlayer
        src={exercise.audioSrc}
        ttsText={exercise.audioText}
        ttsLang={exercise.audioLang || 'en-US'}
        label="Listen"
        className="mb-4"
      />

      {exercise.type === 'listen_choose' && (
        <div className="space-y-2">
          {exercise.options.map((opt, i) => {
            let style = 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
            if (answered) {
              if (i === exercise.correctIndex)
                style = 'border-emerald-400 bg-emerald-50 text-emerald-800'
              else if (i === selected) style = 'border-red-300 bg-red-50 text-red-700'
              else style = 'opacity-40'
            } else if (selected === i) {
              style = 'border-indigo-500 bg-indigo-50'
            }
            return (
              <button
                key={i}
                disabled={answered}
                onClick={() => {
                  setSelected(i)
                  submit(i === exercise.correctIndex)
                }}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition',
                  style
                )}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs">
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            )
          })}
          {answered && exercise.explanation && (
            <p className="mt-2 text-sm text-gray-600">{exercise.explanation}</p>
          )}
        </div>
      )}

      {exercise.type === 'dictation' && (
        <>
          {exercise.hint && !answered && (
            <p className="mb-2 text-xs text-gray-500">Hint: {exercise.hint}</p>
          )}
          {!answered ? (
            <div className="flex gap-2">
              <input
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && typed.trim()) {
                    const n = normalize(typed)
                    const ok =
                      n === normalize(exercise.answer) ||
                      (exercise.acceptAlternatives || []).some(
                        (a) => normalize(a) === n
                      )
                    submit(ok)
                  }
                }}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                placeholder="Type what you hear…"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
              <button
                disabled={!typed.trim()}
                onClick={() => {
                  const n = normalize(typed)
                  const ok =
                    n === normalize(exercise.answer) ||
                    (exercise.acceptAlternatives || []).some((a) => normalize(a) === n)
                  submit(ok)
                }}
                className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-40"
              >
                Check
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-600">
              Answer: <strong>{exercise.answer}</strong>
            </p>
          )}
        </>
      )}

      {answered && (
        <div
          className={cn(
            'mt-4 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium',
            correct ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
          )}
        >
          {correct ? (
            <>
              <CheckCircle2 className="h-4 w-4" /> Correct!
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4" /> Not quite — listen again
            </>
          )}
        </div>
      )}
    </div>
  )
}
