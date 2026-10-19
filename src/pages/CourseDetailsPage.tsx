import { Link, useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, BookOpen, Clock, CheckCircle2 } from 'lucide-react'
import { getCourseBySlug } from '../data/sampleCourses'
import {
  enrollInCourse,
  isEnrolled,
  getProgressPercent,
  getCompletedLessonCount,
} from '../lib/progress'
import { cn } from '../lib/utils'

export default function CourseDetailsPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const interfaceLang = (i18n.language === 'am' ? 'am' : 'en') as 'en' | 'am'

  const course = slug ? getCourseBySlug(slug) : undefined

  if (!course) {
    return (
      <div className="mx-auto max-w-3xl py-16 text-center">
        <h1 className="text-xl font-semibold text-gray-900">Course not found</h1>
        <Link to="/courses" className="mt-4 inline-block text-indigo-600 hover:underline">
          ← Back to courses
        </Link>
      </div>
    )
  }

  const title = course.title[interfaceLang] || course.title.en
  const description = course.description[interfaceLang] || course.description.en
  const objectives = course.objectives[interfaceLang] || course.objectives.en
  const enrolled = isEnrolled(course.id)
  const percent = getProgressPercent(course.id, course.lessonsCount)
  const completedCount = getCompletedLessonCount(course.id)

  const handleStart = () => {
    enrollInCourse(course.id)
    navigate(`/learn/${course.slug}`)
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        to="/courses"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('nav.explore')}
      </Link>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div
          className={cn(
            'px-6 py-10 sm:px-10',
            course.learningLanguage === 'en' ? 'bg-indigo-50' : 'bg-amber-50'
          )}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                'rounded-full px-3 py-1 text-xs font-medium',
                course.learningLanguage === 'en'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-amber-100 text-amber-800'
              )}
            >
              {course.learningLanguage === 'en' ? 'English' : 'አማርኛ'}
            </span>
            <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium capitalize text-gray-700">
              {course.difficulty}
            </span>
            <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-gray-700">
              {course.category}
            </span>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-gray-700">{description}</p>

          <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-600">
            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" />
              {course.lessonsCount} lessons
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              ~{Math.round(course.durationMinutes / 60)} hours
            </span>
          </div>

          {enrolled && percent > 0 && (
            <div className="mt-6 max-w-xs">
              <div className="mb-1.5 flex justify-between text-sm text-gray-600">
                <span>{percent}% complete</span>
                <span>
                  {completedCount}/{course.lessonsCount}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/60">
                <div
                  className="h-full rounded-full bg-indigo-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          )}

          <div className="mt-8">
            <button
              onClick={handleStart}
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
            >
              {enrolled && percent > 0 ? t('common.continue') : t('common.start')} Learning
            </button>
          </div>
        </div>

        <div className="border-t border-gray-100 px-6 py-8 sm:px-10">
          <h2 className="text-lg font-semibold text-gray-900">Learning objectives</h2>
          <ul className="mt-4 space-y-2">
            {objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-gray-100 px-6 py-8 sm:px-10">
          <h2 className="text-lg font-semibold text-gray-900">Course outline</h2>
          <div className="mt-4 space-y-4">
            {course.chapters.map((chapter, idx) => (
              <div key={chapter.id} className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
                <h3 className="font-medium text-gray-900">
                  {idx + 1}. {chapter.title[interfaceLang] || chapter.title.en}
                </h3>
                <ul className="mt-2 space-y-1 pl-4">
                  {chapter.lessons.map((lesson) => (
                    <li key={lesson.id} className="text-sm text-gray-600">
                      • {lesson.title[interfaceLang] || lesson.title.en}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
