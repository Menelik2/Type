import { useState } from 'react'
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react'
import type { Exercise } from '../../data/englishLessons'
import { cn } from '../../lib/utils'

type Props = {
  exercise: Exercise
  index: number
  onResult?: (correct: boolean) => void
}

export default function ExerciseRenderer({ exercise, index, onResult }: Props) {
  const [answered, setAnswered] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)
  const [textAnswer, setTextAnswer] = useState('')
  const [tfChoice, setTfChoice] = useState<boolean | null>(null)

  const reset = () => {
    setAnswered(false)
    setCorrect(false)
    setSelected(null)
    setTextAnswer('')
    setTfChoice(null)
  }

  const submit = (isCorrect: boolean) => {
    setCorrect(isCorrect)
    setAnswered(true)
    onResult?.(isCorrect)
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Exercise {index + 1}
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

      {/* Multiple choice */}
      {exercise.type === 'multiple_choice' && (
        <>
          <p className="mb-4 font-medium text-gray-900">{exercise.question}</p>
          <div className="space-y-2">
            {exercise.options.map((opt, i) => {
              let style = 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
              if (answered) {
                if (i === exercise.correctIndex) style = 'border-emerald-400 bg-emerald-50 text-emerald-800'
                else if (i === selected) style = 'border-red-300 bg-red-50 text-red-700'
                else style = 'border-gray-100 opacity-50'
              } else if (selected === i) {
                style = 'border-indigo-500 bg-indigo-50'
              }
              return (
                <button
                  key={i}
                  disabled={answered}
                  onClick={() => {
                    setSelected(i)
                    if (!answered) submit(i === exercise.correctIndex)
                  }}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition',
                    style
                  )}
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium">
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

      {/* Fill in the blank */}
      {exercise.type === 'fill_blank' && (
        <>
          <p className="mb-4 font-medium text-gray-900">
            {exercise.sentence.split('___').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="mx-1 inline-block min-w-[4rem] border-b-2 border-indigo-300 text-center">
                    {answered ? (
                      <span className={correct ? 'text-emerald-600' : 'text-red-600'}>
                        {textAnswer || '___'}
                      </span>
                    ) : (
                      '___'
                    )}
                  </span>
                )}
              </span>
            ))}
          </p>
          {exercise.hint && !answered && (
            <p className="mb-3 text-xs text-gray-500">Hint: {exercise.hint}</p>
          )}
          {!answered ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && textAnswer.trim()) {
                    submit(
                      textAnswer.trim().toLowerCase() === exercise.answer.toLowerCase()
                    )
                  }
                }}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                placeholder="Type your answer…"
              />
              <button
                disabled={!textAnswer.trim()}
                onClick={() =>
                  submit(textAnswer.trim().toLowerCase() === exercise.answer.toLowerCase())
                }
                className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-40"
              >
                Check
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-600">
              Correct answer: <strong>{exercise.answer}</strong>
            </p>
          )}
        </>
      )}

      {/* True / False */}
      {exercise.type === 'true_false' && (
        <>
          <p className="mb-4 font-medium text-gray-900">{exercise.statement}</p>
          <div className="flex gap-3">
            {[true, false].map((val) => {
              let style = 'border-gray-200 hover:border-indigo-300'
              if (answered) {
                if (val === exercise.correct) style = 'border-emerald-400 bg-emerald-50 text-emerald-800'
                else if (val === tfChoice) style = 'border-red-300 bg-red-50 text-red-700'
                else style = 'opacity-40'
              } else if (tfChoice === val) {
                style = 'border-indigo-500 bg-indigo-50'
              }
              return (
                <button
                  key={String(val)}
                  disabled={answered}
                  onClick={() => {
                    setTfChoice(val)
                    submit(val === exercise.correct)
                  }}
                  className={cn(
                    'flex-1 rounded-xl border py-3 text-sm font-medium transition',
                    style
                  )}
                >
                  {val ? 'True' : 'False'}
                </button>
              )
            })}
          </div>
          {answered && exercise.explanation && (
            <p className="mt-3 text-sm text-gray-600">{exercise.explanation}</p>
          )}
        </>
      )}

      {/* Spelling */}
      {exercise.type === 'spelling' && (
        <>
          <p className="mb-4 font-medium text-gray-900">{exercise.prompt}</p>
          {!answered ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && textAnswer.trim()) {
                    submit(
                      textAnswer.trim().toLowerCase() === exercise.word.toLowerCase()
                    )
                  }
                }}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                placeholder="Type the word…"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
              <button
                disabled={!textAnswer.trim()}
                onClick={() =>
                  submit(textAnswer.trim().toLowerCase() === exercise.word.toLowerCase())
                }
                className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-40"
              >
                Check
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-600">
              The word is: <strong>{exercise.word}</strong>
            </p>
          )}
        </>
      )}

      {/* Result badge */}
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
              <XCircle className="h-4 w-4" /> Not quite — try again
            </>
          )}
        </div>
      )}
    </div>
  )
}
