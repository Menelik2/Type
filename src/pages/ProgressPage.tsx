import { Link } from 'react-router-dom'
import {
  BarChart3,
  BookOpen,
  Keyboard,
  GraduationCap,
  Trophy,
} from 'lucide-react'
import { sampleCourses } from '../data/sampleCourses'
import { vocabularyBank } from '../data/vocabulary'
import {
  getEnrolledCourseIds,
  getProgressPercent,
  getCompletedLessonCount,
  getCourseProgress,
} from '../lib/progress'
import { getKnownCount } from '../lib/vocabProgress'
import { bestWpm, getTypingResults } from '../lib/typing'
import { cn } from '../lib/utils'

export default function ProgressPage() {
  const enrolledIds = getEnrolledCourseIds()
  const enrolled = sampleCourses.filter((c) => enrolledIds.includes(c.id))
  const totalLessonsDone = enrolled.reduce(
    (sum, c) => sum + getCompletedLessonCount(c.id),
    0
  )
  const totalLessons = enrolled.reduce((sum, c) => sum + c.lessonsCount, 0)
  const knownVocab = getKnownCount()
  const typing = getTypingResults()
  const bestEn = bestWpm('en')
  const bestAm = bestWpm('am')

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
          <BarChart3 className="h-6 w-6 text-indigo-600" />
          Progress
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Courses, vocabulary, and typing at a glance
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric
          icon={GraduationCap}
          label="Courses enrolled"
          value={String(enrolled.length)}
          accent="text-indigo-600"
        />
        <Metric
          icon={BookOpen}
          label="Lessons completed"
          value={`${totalLessonsDone}${totalLessons ? ` / ${totalLessons}` : ''}`}
          accent="text-emerald-600"
        />
        <Metric
          icon={BookOpen}
          label="Vocab known"
          value={`${knownVocab} / ${vocabularyBank.length}`}
          accent="text-purple-600"
        />
        <Metric
          icon={Keyboard}
          label="Typing runs"
          value={String(typing.length)}
          accent="text-amber-600"
        />
      </div>

      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Courses</h2>
          <Link to="/courses" className="text-sm text-indigo-600 hover:underline">
            Browse courses
          </Link>
        </div>
        {enrolled.length === 0 ? (
          <Empty
            message="No courses enrolled yet."
            action={{ to: '/courses', label: 'Explore courses' }}
          />
        ) : (
          <ul className="space-y-3">
            {enrolled.map((c) => {
              const pct = getProgressPercent(c.id, c.lessonsCount)
              const done = getCompletedLessonCount(c.id)
              const progress = getCourseProgress(c.id)
              return (
                <li
                  key={c.id}
                  className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-gray-900">{c.title.en}</p>
                      <p className="text-xs text-gray-500">
                        {c.learningLanguage === 'en' ? 'English' : 'አማርኛ'} · {done}/
                        {c.lessonsCount} lessons
                        {progress?.lastAccessedAt &&
                          ` · last ${new Date(progress.lastAccessedAt).toLocaleDateString()}`}
                      </p>
                    </div>
                    <Link
                      to={`/learn/${c.slug}`}
                      className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-100"
                    >
                      Continue
                    </Link>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all',
                        pct === 100 ? 'bg-emerald-500' : 'bg-indigo-500'
                      )}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="mt-1 text-right text-xs text-gray-500">{pct}%</p>
                </li>
              )
            })}
          </ul>
        )}
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Vocabulary</h2>
            <Link to="/vocabulary" className="text-sm text-indigo-600 hover:underline">
              Practice
            </Link>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Mastery</span>
              <span className="font-medium">
                {knownVocab} / {vocabularyBank.length}
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-purple-500"
                style={{
                  width: `${vocabularyBank.length ? Math.round((knownVocab / vocabularyBank.length) * 100) : 0}%`,
                }}
              />
            </div>
            <p className="mt-3 text-xs text-gray-500">
              Mark words as known on the Vocabulary page to track mastery.
            </p>
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Typing</h2>
            <Link to="/typing" className="text-sm text-indigo-600 hover:underline">
              Practice
            </Link>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-gray-50 p-3 text-center">
                <Trophy className="mx-auto h-4 w-4 text-amber-500" />
                <p className="mt-1 text-xs text-gray-500">Best EN WPM</p>
                <p className="text-xl font-bold text-gray-900">{bestEn || '—'}</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-3 text-center">
                <Trophy className="mx-auto h-4 w-4 text-amber-500" />
                <p className="mt-1 text-xs text-gray-500">Best አማ WPM</p>
                <p className="text-xl font-bold text-gray-900">{bestAm || '—'}</p>
              </div>
            </div>
            {typing.length > 0 ? (
              <ul className="mt-4 space-y-2 border-t border-gray-50 pt-3">
                {typing.slice(0, 3).map((r) => (
                  <li
                    key={r.id}
                    className="flex justify-between text-xs text-gray-600"
                  >
                    <span>
                      {r.lang === 'en' ? 'EN' : 'አማ'} · {r.wpm} WPM · {r.accuracy}%
                    </span>
                    <span className="text-gray-400">
                      {new Date(r.at).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-xs text-gray-500">No typing sessions yet.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

function Metric({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ElementType
  label: string
  value: string
  accent: string
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className={cn('mb-2 inline-flex rounded-lg bg-gray-50 p-2', accent)}>
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  )
}

function Empty({
  message,
  action,
}: {
  message: string
  action: { to: string; label: string }
}) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-200 bg-white py-12 text-center">
      <p className="text-sm text-gray-500">{message}</p>
      <Link
        to={action.to}
        className="mt-3 inline-block text-sm font-medium text-indigo-600 hover:underline"
      >
        {action.label}
      </Link>
    </div>
  )
}
