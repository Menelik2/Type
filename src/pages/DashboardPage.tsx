import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BookOpen, Clock, Flame, Target, ArrowRight } from 'lucide-react'
import { sampleCourses } from '../data/sampleCourses'
import { cn } from '../lib/utils'

export default function DashboardPage() {
  const { t, i18n } = useTranslation()
  const interfaceLang = (i18n.language === 'am' ? 'am' : 'en') as 'en' | 'am'

  // Mock user from localStorage (Phase 1)
  const mockUser = (() => {
    try {
      return JSON.parse(localStorage.getItem('mockUser') || 'null')
    } catch {
      return null
    }
  })()

  const displayName = mockUser?.name || 'Learner'

  // Mock enrolled courses (first two for demo)
  const enrolled = sampleCourses.slice(0, 2)

  return (
    <div className="mx-auto max-w-6xl">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          {t('dashboard.welcome')}, {displayName}
        </h1>
        <p className="mt-1 text-gray-600">Continue your learning journey</p>
      </div>

      {/* Stats row */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Flame} label="Day streak" value="3" accent="text-orange-500" />
        <StatCard icon={Clock} label="Study time" value="2.5h" accent="text-indigo-500" />
        <StatCard icon={BookOpen} label="Lessons done" value="12" accent="text-emerald-500" />
        <StatCard icon={Target} label="Daily goal" value="80%" accent="text-purple-500" />
      </div>

      {/* Continue Learning */}
      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">{t('dashboard.continueLearning')}</h2>
          <Link to="/my-courses" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
            View all
          </Link>
        </div>

        {enrolled.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white py-14 text-center">
            <BookOpen className="mx-auto h-10 w-10 text-gray-300" />
            <p className="mt-4 text-gray-600">{t('dashboard.noCourses')}</p>
            <Link
              to="/courses"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
            >
              {t('dashboard.startExploring')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {enrolled.map((course) => {
              const title = course.title[interfaceLang] || course.title.en
              // Mock progress
              const progress = course.id === 'en-beginner-1' ? 35 : 12
              return (
                <div
                  key={course.id}
                  className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
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
                      <h3 className="mt-2 font-semibold text-gray-900">{title}</h3>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="mb-1.5 flex justify-between text-xs text-gray-500">
                      <span>{progress}% complete</span>
                      <span>
                        {Math.round((progress / 100) * course.lessonsCount)} / {course.lessonsCount}{' '}
                        lessons
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-indigo-500 transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <Link
                    to={`/learn/${course.slug}`}
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-50 py-2.5 text-sm font-medium text-indigo-700 transition hover:bg-indigo-100"
                  >
                    {t('common.continue')}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* Recommended */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Recommended for you</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sampleCourses.slice(2).map((course) => {
            const title = course.title[interfaceLang] || course.title.en
            return (
              <Link
                key={course.id}
                to={`/courses/${course.slug}`}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
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
                <h3 className="mt-2 font-semibold text-gray-900">{title}</h3>
                <p className="mt-1 text-sm text-gray-500">{course.lessonsCount} lessons</p>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}

function StatCard({
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
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={cn('rounded-xl bg-gray-50 p-2.5', accent)}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  )
}
