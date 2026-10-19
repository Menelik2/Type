import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Search, Filter } from 'lucide-react'
import { sampleCourses, type Course } from '../data/sampleCourses'
import { cn } from '../lib/utils'

const difficulties = ['all', 'beginner', 'intermediate', 'advanced'] as const

export default function CoursesPage() {
  const { t, i18n } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')

  const langFilter = (searchParams.get('lang') as 'en' | 'am' | null) || 'all'
  const difficulty = (searchParams.get('difficulty') as typeof difficulties[number]) || 'all'

  const interfaceLang = i18n.language as 'en' | 'am'

  const filtered = useMemo(() => {
    return sampleCourses.filter((c) => {
      if (langFilter !== 'all' && c.learningLanguage !== langFilter) return false
      if (difficulty !== 'all' && c.difficulty !== difficulty) return false
      if (search) {
        const q = search.toLowerCase()
        const title = c.title[interfaceLang] || c.title.en
        const desc = c.description[interfaceLang] || c.description.en
        if (!title.toLowerCase().includes(q) && !desc.toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [langFilter, difficulty, search, interfaceLang])

  const setFilter = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value === 'all') next.delete(key)
    else next.set(key, value)
    setSearchParams(next)
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t('nav.explore')}</h1>
        <p className="mt-1 text-gray-600">Browse English and Amharic courses</p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 rounded-xl border border-gray-200 bg-white p-1">
            {(['all', 'en', 'am'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setFilter('lang', l)}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-sm font-medium transition',
                  langFilter === l
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                {l === 'all' ? 'All' : l === 'en' ? 'English' : 'አማርኛ'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 rounded-xl border border-gray-200 bg-white p-1">
            {difficulties.map((d) => (
              <button
                key={d}
                onClick={() => setFilter('difficulty', d)}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition',
                  difficulty === d
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Course grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white py-16 text-center">
          <Filter className="mx-auto h-10 w-10 text-gray-300" />
          <p className="mt-4 text-gray-500">No courses match your filters</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} interfaceLang={interfaceLang} />
          ))}
        </div>
      )}
    </div>
  )
}

function CourseCard({ course, interfaceLang }: { course: Course; interfaceLang: 'en' | 'am' }) {
  const title = course.title[interfaceLang] || course.title.en
  const description = course.description[interfaceLang] || course.description.en

  return (
    <Link
      to={`/courses/${course.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
    >
      <div
        className={cn(
          'flex h-36 items-center justify-center',
          course.learningLanguage === 'en' ? 'bg-indigo-50' : 'bg-amber-50'
        )}
      >
        <span className="text-4xl font-bold opacity-20">
          {course.learningLanguage === 'en' ? 'EN' : 'አማ'}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2">
          <span
            className={cn(
              'rounded-full px-2.5 py-0.5 text-xs font-medium',
              course.learningLanguage === 'en'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-amber-100 text-amber-800'
            )}
          >
            {course.learningLanguage === 'en' ? 'English' : 'አማርኛ'}
          </span>
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium capitalize text-gray-600">
            {course.difficulty}
          </span>
        </div>
        <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600">{title}</h3>
        <p className="mt-1 line-clamp-2 flex-1 text-sm text-gray-600">{description}</p>
        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
          <span>{course.lessonsCount} lessons</span>
          <span>{Math.round(course.durationMinutes / 60)}h</span>
        </div>
      </div>
    </Link>
  )
}
