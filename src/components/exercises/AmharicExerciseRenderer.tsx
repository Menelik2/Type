import { useState } from 'react'
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react'
import type { AmharicExercise } from '../../data/amharicLessons'
import AmharicKeyboard from '../keyboard/AmharicKeyboard'
import { graphemes } from '../../lib/typing'
import { cn } from '../../lib/utils'

type Props = {
  exercise: AmharicExercise
  index: number
  familyChars?: string[]
}

function matchesTarget(typed: string, target: string) {
  return typed.trim() === target.trim()
}

export default function AmharicExerciseRenderer({ exercise, index, familyChars }: Props) {
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

  const submit = (isCorrect: boolean) => {
    setCorrect(isCorrect)
    setAnswered(true)
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
          ልምምድ {index + 1}
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

      {exercise.type === 'fidel_recognize' && (
        <>
          <p className="mb-1 font-medium text-gray-900">{exercise.prompt}</p>
          {exercise.prompt_am && (
            <p className="mb-4 text-sm text-gray-500">{exercise.prompt_am}</p>
          )}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
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
                    'flex h-14 items-center justify-center rounded-xl border text-2xl font-medium transition',
                    style
                  )}
                >
                  {opt}
                </button>
              )
            })}
          </div>
        </>
      )}

      {exercise.type === 'multiple_choice' && (
        <>
          <p className="mb-1 font-medium text-gray-900">{exercise.question}</p>
          {exercise.question_am && (
            <p className="mb-4 text-sm text-gray-500">{exercise.question_am}</p>
          )}
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
          </div>
          {answered && exercise.explanation && (
            <p className="mt-3 text-sm text-gray-600">{exercise.explanation}</p>
          )}
        </>
      )}

      {exercise.type === 'type_char' && (
        <>
          <p className="mb-1 font-medium text-gray-900">{exercise.prompt}</p>
          {exercise.hint && !answered && (
            <p className="mb-3 text-xs text-gray-500">Hint: {exercise.hint}</p>
          )}

          <div className="mb-4 flex min-h-[3rem] items-center justify-center rounded-xl border-2 border-dashed border-indigo-200 bg-indigo-50/50 px-4 text-3xl tracking-wider">
            {typed || <span className="text-gray-300 text-lg">…</span>}
          </div>

          {!answered ? (
            <>
              <AmharicKeyboard
                activeFamily={familyChars}
                onKey={(c) => setTyped((t) => t + c)}
                onBackspace={() =>
                  setTyped((t) => graphemes(t).slice(0, -1).join(''))
                }
                onSpace={() => setTyped((t) => t + ' ')}
              />
              <button
                disabled={!typed.trim()}
                onClick={() => submit(matchesTarget(typed, exercise.target))}
                className="mt-3 w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-40"
              >
                Check
              </button>
            </>
          ) : (
            <p className="text-sm text-gray-600">
              Correct: <span className="text-2xl font-medium">{exercise.target}</span>
            </p>
          )}
        </>
      )}

      {exercise.type === 'fill_blank' && (
        <>
          <p className="mb-4 font-medium text-gray-900">{exercise.sentence}</p>
          {!answered ? (
            <div className="flex gap-2">
              <input
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500"
                placeholder="Type answer…"
              />
              <button
                disabled={!typed.trim()}
                onClick={() => submit(matchesTarget(typed, exercise.answer))}
                className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-40"
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
              <CheckCircle2 className="h-4 w-4" /> ትክክል! Correct!
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4" /> እንደገና ይሞክሩ — Try again
            </>
          )}
        </div>
      )}
    </div>
  )
}
