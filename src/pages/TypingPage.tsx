import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Keyboard, RotateCcw, Trophy } from 'lucide-react'
import { getPassages, type TypingPassage } from '../data/typingPassages'
import {
  bestWpm,
  calcAccuracy,
  calcWpm,
  compareInput,
  getTypingResults,
  graphemes,
  saveTypingResult,
  type TypingLang,
} from '../lib/typing'
import AmharicKeyboard from '../components/keyboard/AmharicKeyboard'
import { cn } from '../lib/utils'

type Phase = 'idle' | 'running' | 'done'

export default function TypingPage() {
  const { t } = useTranslation()
  const [lang, setLang] = useState<TypingLang>('en')
  const passages = useMemo(() => getPassages(lang), [lang])
  const [passageId, setPassageId] = useState(passages[0]?.id || '')
  const passage: TypingPassage | undefined =
    passages.find((p) => p.id === passageId) || passages[0]

  const [input, setInput] = useState('')
  const [phase, setPhase] = useState<Phase>('idle')
  const [startedAt, setStartedAt] = useState<number | null>(null)
  const [endedAt, setEndedAt] = useState<number | null>(null)
  const [liveMs, setLiveMs] = useState(0)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [, setTick] = useState(0)

  useEffect(() => {
    setPassageId(getPassages(lang)[0]?.id || '')
    reset()
  }, [lang])

  useEffect(() => {
    if (phase !== 'running' || !startedAt) return
    const id = window.setInterval(() => setLiveMs(Date.now() - startedAt), 100)
    return () => clearInterval(id)
  }, [phase, startedAt])

  const target = passage?.text || ''
  const { statuses, correct, errors } = compareInput(target, input)
  const targetLen = graphemes(target).length
  const inputLen = graphemes(input).length
  const done = inputLen >= targetLen && targetLen > 0 && phase === 'running'

  useEffect(() => {
    if (!done || !startedAt || !passage) return
    const end = Date.now()
    setEndedAt(end)
    setPhase('done')
    const durationMs = end - startedAt
    saveTypingResult({
      lang,
      passageId: passage.id,
      wpm: calcWpm(correct, durationMs),
      accuracy: calcAccuracy(correct, correct + errors),
      correctChars: correct,
      totalTyped: correct + errors,
      durationMs,
    })
    setTick((x) => x + 1)
  }, [done, startedAt, passage, lang, correct, errors])

  const durationMs =
    phase === 'done' && startedAt && endedAt
      ? endedAt - startedAt
      : phase === 'running' && startedAt
        ? liveMs
        : 0

  const wpm = calcWpm(correct, durationMs || 1)
  const accuracy = calcAccuracy(correct, correct + errors)

  const reset = useCallback(() => {
    setInput('')
    setPhase('idle')
    setStartedAt(null)
    setEndedAt(null)
    setLiveMs(0)
    inputRef.current?.focus()
  }, [])

  const onChange = (value: string) => {
    if (phase === 'done') return
    if (phase === 'idle' && value.length > 0) {
      setPhase('running')
      setStartedAt(Date.now())
    }
    setInput(value)
  }

  const results = getTypingResults().slice(0, 5)
  const best = bestWpm(lang)

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
            <Keyboard className="h-6 w-6 text-indigo-600" />
            {t('nav.typing')}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            English & Amharic · WPM and accuracy
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-1">
          {(['en', 'am'] as TypingLang[]).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-sm font-medium transition',
                lang === l
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              {l === 'en' ? 'English' : 'አማርኛ'}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {passages.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => {
              setPassageId(p.id)
              reset()
            }}
            className={cn(
              'rounded-full border px-3 py-1 text-xs font-medium transition',
              passage?.id === p.id
                ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            )}
          >
            {p.title}
          </button>
        ))}
      </div>

      <div className="mb-4 grid grid-cols-3 gap-3">
        <Stat label="WPM" value={phase === 'idle' ? '—' : String(wpm)} />
        <Stat label="Accuracy" value={phase === 'idle' ? '—' : `${accuracy}%`} />
        <Stat
          label="Best (this lang)"
          value={best > 0 ? String(best) : '—'}
          icon
        />
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div
          className="mb-4 min-h-[4.5rem] text-lg leading-relaxed tracking-wide text-gray-800 sm:text-xl"
          aria-label="Passage to type"
        >
          {graphemes(target).map((ch, idx) => {
            const st = statuses[idx] || 'pending'
            return (
              <span
                key={idx}
                className={cn(
                  st === 'correct' && 'text-emerald-600',
                  st === 'incorrect' && 'bg-red-100 text-red-700',
                  st === 'current' && 'border-b-2 border-indigo-500',
                  st === 'pending' && 'text-gray-400'
                )}
              >
                {ch === ' ' ? '\u00a0' : ch}
              </span>
            )
          })}
        </div>

        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => onChange(e.target.value)}
          disabled={phase === 'done'}
          rows={3}
          className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:bg-gray-50"
          placeholder={lang === 'am' ? 'እዚህ ይጻፉ…' : 'Start typing here…'}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          lang={lang === 'am' ? 'am' : 'en'}
        />

        {lang === 'am' && phase !== 'done' && (
          <div className="mt-4">
            <AmharicKeyboard
              onKey={(c) => onChange(input + c)}
              onBackspace={() => onChange(graphemes(input).slice(0, -1).join(''))}
              onSpace={() => onChange(input + ' ')}
            />
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            {phase === 'idle' && 'Typing starts the timer.'}
            {phase === 'running' && `${Math.round(durationMs / 1000)}s · keep going`}
            {phase === 'done' && 'Finished — result saved.'}
          </p>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>

        {phase === 'done' && (
          <div className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            <strong>{wpm} WPM</strong> · {accuracy}% accuracy ·{' '}
            {Math.round(durationMs / 1000)}s
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Recent results
          </h2>
          <ul className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100 bg-white">
            {results.map((r) => (
              <li
                key={r.id}
                className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm"
              >
                <span className="text-gray-700">
                  {r.lang === 'en' ? 'EN' : 'አማ'} · {r.wpm} WPM · {r.accuracy}%
                </span>
                <time className="text-xs text-gray-400">
                  {new Date(r.at).toLocaleString()}
                </time>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function Stat({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon?: boolean
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white px-3 py-3 text-center shadow-sm">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-0.5 flex items-center justify-center gap-1 text-xl font-bold text-gray-900">
        {icon && <Trophy className="h-4 w-4 text-amber-500" />}
        {value}
      </p>
    </div>
  )
}
