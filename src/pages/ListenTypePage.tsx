import { useCallback, useEffect, useMemo, useState } from 'react'
import { Headphones, Eye, EyeOff, RotateCcw, Check, ChevronRight } from 'lucide-react'
import { getListenItems, type ListenItem } from '../data/listenTypeItems'
import { speak, stopSpeaking, type VoiceLang } from '../lib/voice'
import AudioPlayer from '../components/audio/AudioPlayer'
import AmharicKeyboard from '../components/keyboard/AmharicKeyboard'
import { graphemes } from '../lib/typing'
import { cn } from '../lib/utils'

type Level = 'easy' | 'medium' | 'hard' | 'all'

function normalize(s: string, lang: VoiceLang) {
  const t = s.trim().replace(/\s+/g, ' ')
  if (lang === 'en') {
    return t.toLowerCase().replace(/[.,!?;:'"]/g, '')
  }
  return t.replace(/[።፣፧]/g, '').trim()
}

export default function ListenTypePage() {
  const [lang, setLang] = useState<VoiceLang>('en')
  const [level, setLevel] = useState<Level>('easy')
  const [support, setSupport] = useState(false)
  const [index, setIndex] = useState(0)
  const [typed, setTyped] = useState('')
  const [checked, setChecked] = useState(false)
  const [ok, setOk] = useState(false)
  const [showKeyboard, setShowKeyboard] = useState(true)
  const [streak, setStreak] = useState(0)

  const items = useMemo(
    () => getListenItems({ lang, level }),
    [lang, level]
  )

  // Keep index in range when filter changes
  const safeIndex = items.length === 0 ? 0 : Math.min(index, items.length - 1)
  const item: ListenItem | undefined = items[safeIndex]

  useEffect(() => {
    setIndex(0)
    setTyped('')
    setChecked(false)
    setOk(false)
    stopSpeaking()
  }, [lang, level])

  useEffect(() => {
    stopSpeaking()
    setTyped('')
    setChecked(false)
    setOk(false)
  }, [safeIndex])

  useEffect(() => {
    return () => stopSpeaking()
  }, [])

  const goNext = useCallback(() => {
    setTyped('')
    setChecked(false)
    setOk(false)
    stopSpeaking()
    setIndex((i) => (items.length === 0 ? 0 : (i + 1) % items.length))
  }, [items.length])

  const check = () => {
    if (!item || !typed.trim()) return
    const match = normalize(typed, lang) === normalize(item.text, lang)
    setOk(match)
    setChecked(true)
    setStreak((s) => (match ? s + 1 : 0))
  }

  const replay = () => {
    if (!item) return
    void speak(item.text, {
      lang,
      rate: level === 'hard' ? 1 : level === 'medium' ? 0.95 : 0.85,
    })
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <Headphones className="mx-auto h-10 w-10 text-gray-300" />
        <p className="mt-4 text-gray-600">No items for this language and level.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
          <Headphones className="h-6 w-6 text-indigo-600" />
          Listen · Type · Remember
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          YouType-style audio practice · browser voice (TTS)
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {(['en', 'am'] as VoiceLang[]).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            className={cn(
              'rounded-full px-3 py-1.5 text-sm font-medium',
              lang === l
                ? 'bg-indigo-600 text-white'
                : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
            )}
          >
            {l === 'en' ? 'English' : 'አማርኛ'}
          </button>
        ))}
        <span className="self-center text-gray-300">|</span>
        {(['easy', 'medium', 'hard', 'all'] as Level[]).map((lv) => (
          <button
            key={lv}
            type="button"
            onClick={() => setLevel(lv)}
            className={cn(
              'rounded-full px-3 py-1.5 text-xs font-medium capitalize',
              level === lv
                ? 'bg-gray-900 text-white'
                : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
            )}
          >
            {lv}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setSupport((s) => !s)}
          className={cn(
            'ml-auto inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium',
            support
              ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
              : 'border-gray-200 text-gray-600'
          )}
        >
          {support ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
          Support text
        </button>
      </div>

      <div className="mb-3 flex justify-between text-xs text-gray-500">
        <span>
          {safeIndex + 1} / {items.length}
        </span>
        <span>Streak: {streak}</span>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
          Listen carefully, then type what you hear
        </p>

        {item && (
          <AudioPlayer
            key={item.id}
            ttsText={item.text}
            ttsLang={lang === 'am' ? 'am-ET' : 'en-US'}
            label="Audio"
            className="mb-4"
          />
        )}

        {support && item && (
          <div className="mb-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <p className="font-medium">{item.text}</p>
            {item.support && (
              <p className="mt-1 text-xs text-amber-800/80">{item.support}</p>
            )}
          </div>
        )}

        {!checked ? (
          <>
            <textarea
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  check()
                }
              }}
              rows={2}
              className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              placeholder={lang === 'am' ? 'የሰማኸውን ጻፍ…' : 'Type what you hear…'}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              lang={lang === 'am' ? 'am' : 'en'}
            />

            {lang === 'am' && (
              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => setShowKeyboard((v) => !v)}
                  className="mb-2 text-xs font-medium text-indigo-600 hover:underline"
                >
                  {showKeyboard ? 'Hide keyboard' : 'Show Amharic keyboard'}
                </button>
                {showKeyboard && (
                  <AmharicKeyboard
                    onKey={(c) => setTyped((t) => t + c)}
                    onBackspace={() =>
                      setTyped((t) => graphemes(t).slice(0, -1).join(''))
                    }
                    onSpace={() => setTyped((t) => t + ' ')}
                  />
                )}
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={check}
                disabled={!typed.trim()}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-40"
              >
                <Check className="h-4 w-4" />
                Check
              </button>
              <button
                type="button"
                onClick={replay}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <RotateCcw className="h-4 w-4" />
                Replay
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div
              className={cn(
                'rounded-xl px-4 py-3 text-sm font-medium',
                ok ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
              )}
            >
              {ok ? 'Correct!' : 'Not quite — compare below and try the next one.'}
            </div>
            <div className="grid gap-2 text-sm sm:grid-cols-2">
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                <p className="text-xs text-gray-400">You typed</p>
                <p className="mt-1 font-medium text-gray-900">{typed || '—'}</p>
              </div>
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3">
                <p className="text-xs text-gray-400">Answer</p>
                <p className="mt-1 font-medium text-gray-900">{item?.text}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={goNext}
              className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <p className="mt-6 text-center text-xs text-gray-400">
        English uses browser TTS. Amharic uses a system voice if installed, otherwise online audio
        (needs network).
      </p>
    </div>
  )
}
