import { useMemo, useState } from 'react'
import { BookOpen, Search, Check } from 'lucide-react'
import {
  allTags,
  filterVocabulary,
  vocabularyBank,
  type VocabEntry,
} from '../data/vocabulary'
import {
  getKnownCount,
  isVocabKnown,
  toggleVocabKnown,
} from '../lib/vocabProgress'
import AudioPlayer from '../components/audio/AudioPlayer'
import { cn } from '../lib/utils'

export default function VocabularyPage() {
  const [lang, setLang] = useState<'all' | 'en' | 'am'>('all')
  const [tag, setTag] = useState<string>('')
  const [q, setQ] = useState('')
  const [flipped, setFlipped] = useState<Record<string, boolean>>({})
  const [, setTick] = useState(0)

  const tags = useMemo(() => allTags(), [])
  const items = useMemo(
    () => filterVocabulary({ lang, tag: tag || undefined, q }),
    [lang, tag, q]
  )
  const known = getKnownCount()

  const toggleFlip = (id: string) =>
    setFlipped((p) => ({ ...p, [id]: !p[id] }))

  const onKnown = (id: string) => {
    toggleVocabKnown(id)
    setTick((t) => t + 1)
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
            <BookOpen className="h-6 w-6 text-indigo-600" />
            Vocabulary
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            {vocabularyBank.length} words · {known} marked known
          </p>
        </div>
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search…"
            className="w-full rounded-xl border border-gray-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {(['all', 'en', 'am'] as const).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            className={cn(
              'rounded-full px-3 py-1 text-xs font-medium capitalize transition',
              lang === l
                ? 'bg-indigo-600 text-white'
                : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
            )}
          >
            {l === 'all' ? 'All' : l === 'en' ? 'English' : 'አማርኛ'}
          </button>
        ))}
        <span className="mx-1 text-gray-300">|</span>
        <button
          type="button"
          onClick={() => setTag('')}
          className={cn(
            'rounded-full px-3 py-1 text-xs font-medium transition',
            !tag
              ? 'bg-gray-900 text-white'
              : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
          )}
        >
          All tags
        </button>
        {tags.map((tg) => (
          <button
            key={tg}
            type="button"
            onClick={() => setTag(tg)}
            className={cn(
              'rounded-full px-3 py-1 text-xs font-medium capitalize transition',
              tag === tg
                ? 'bg-gray-900 text-white'
                : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
            )}
          >
            {tg}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="py-16 text-center text-gray-500">No words match your filters.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((entry) => (
            <VocabCard
              key={entry.id}
              entry={entry}
              flipped={!!flipped[entry.id]}
              known={isVocabKnown(entry.id)}
              onFlip={() => toggleFlip(entry.id)}
              onKnown={() => onKnown(entry.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function VocabCard({
  entry,
  flipped,
  known,
  onFlip,
  onKnown,
}: {
  entry: VocabEntry
  flipped: boolean
  known: boolean
  onFlip: () => void
  onKnown: () => void
}) {
  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm',
        known ? 'border-emerald-200' : 'border-gray-100'
      )}
    >
      <button
        type="button"
        onClick={onFlip}
        className="flex min-h-[120px] flex-1 flex-col items-center justify-center p-4 text-center hover:bg-gray-50"
      >
        {!flipped ? (
          <>
            <span className="text-xs uppercase text-gray-400">
              {entry.lang === 'en' ? 'English' : 'አማርኛ'}
            </span>
            <span className="mt-1 text-xl font-semibold text-gray-900">{entry.term}</span>
            {entry.translit && (
              <span className="mt-1 text-xs text-gray-400">{entry.translit}</span>
            )}
            <span className="mt-3 text-xs text-gray-400">Tap to reveal</span>
          </>
        ) : (
          <>
            <span className="text-lg font-medium text-indigo-700">{entry.meaning}</span>
            {entry.example && (
              <p className="mt-2 text-sm text-gray-600">{entry.example}</p>
            )}
            {entry.example_am && (
              <p className="mt-1 text-xs text-gray-400">{entry.example_am}</p>
            )}
          </>
        )}
      </button>
      <div className="flex items-center gap-1 border-t border-gray-50 px-2 pb-2">
        <div className="min-w-0 flex-1">
          <AudioPlayer
            ttsText={entry.term}
            ttsLang={entry.lang === 'am' ? 'am-ET' : 'en-US'}
            className="border-0 shadow-none"
          />
        </div>
        <button
          type="button"
          onClick={onKnown}
          className={cn(
            'flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium transition',
            known
              ? 'bg-emerald-100 text-emerald-800'
              : 'text-gray-500 hover:bg-gray-100'
          )}
          aria-label={known ? 'Marked known' : 'Mark as known'}
        >
          <Check className="h-3.5 w-3.5" />
          {known ? 'Known' : 'Know'}
        </button>
      </div>
    </div>
  )
}
