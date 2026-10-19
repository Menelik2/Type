import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  BookOpen,
  Menu,
  X,
} from 'lucide-react'
import { getCourseBySlug, type Course } from '../data/sampleCourses'
import {
  enrollInCourse,
  getCourseProgress,
  markLessonComplete,
  setLastAccessed,
  getProgressPercent,
  isEnrolled,
} from '../lib/progress'
import { cn } from '../lib/utils'

export default function CoursePlayerPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const interfaceLang = (i18n.language === 'am' ? 'am' : 'en') as 'en' | 'am'

  const course = slug ? getCourseBySlug(slug) : undefined

  // Flatten all lessons for navigation
  const allLessons = useMemo(() => {
    if (!course) return []
    return course.chapters.flatMap((ch) =>
      ch.lessons.map((l) => ({
        ...l,
        chapterId: ch.id,
        chapterTitle: ch.title,
      }))
    )
  }, [course])

  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [progressTick, setProgressTick] = useState(0) // force re-render after progress changes

  // Initialize / resume
  useEffect(() => {
    if (!course) return

    // Auto-enroll on first open
    if (!isEnrolled(course.id)) {
      enrollInCourse(course.id)
    }

    const progress = getCourseProgress(course.id)
    const resumeId =
      progress?.lastLessonId && allLessons.some((l) => l.id === progress.lastLessonId)
        ? progress.lastLessonId
        : allLessons[0]?.id || null

    setCurrentLessonId(resumeId)
  }, [course, allLessons])

  // Track last accessed
  useEffect(() => {
    if (course && currentLessonId) {
      setLastAccessed(course.id, currentLessonId)
    }
  }, [course, currentLessonId])

  if (!course) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-xl font-semibold">Course not found</h1>
        <Link to="/courses" className="mt-4 inline-block text-indigo-600">
          ← Back to courses
        </Link>
      </div>
    )
  }

  const currentIndex = allLessons.findIndex((l) => l.id === currentLessonId)
  const currentLesson = currentIndex >= 0 ? allLessons[currentIndex] : null
  const progress = getCourseProgress(course.id)
  const percent = getProgressPercent(course.id, course.lessonsCount)
  const isCurrentComplete = currentLessonId
    ? !!progress?.lessons[currentLessonId]?.completed
    : false

  const goToLesson = (lessonId: string) => {
    setCurrentLessonId(lessonId)
    setSidebarOpen(false)
  }

  const handleComplete = () => {
    if (!currentLessonId) return
    markLessonComplete(course.id, currentLessonId)
    setProgressTick((t) => t + 1)

    // Auto-advance to next incomplete lesson if available
    const next = allLessons[currentIndex + 1]
    if (next) {
      setTimeout(() => setCurrentLessonId(next.id), 400)
    }
  }

  const title = course.title[interfaceLang] || course.title.en

  return (
    <div className="-m-4 flex h-[calc(100vh-4rem)] flex-col lg:-m-6">
      {/* Top bar */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link
            to={`/courses/${course.slug}`}
            className="hidden items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 sm:flex"
          >
            <ArrowLeft className="h-4 w-4" />
            {title}
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 text-sm text-gray-600 sm:flex">
            <span>{percent}%</span>
            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-indigo-500 transition-all"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-sm text-gray-500 hover:text-gray-800"
          >
            Exit
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar – chapters & lessons */}
        <aside
          className={cn(
            'absolute inset-y-0 left-0 z-30 w-72 shrink-0 overflow-y-auto border-r border-gray-200 bg-white transition-transform lg:static lg:translate-x-0',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="p-4">
            <h2 className="mb-1 text-sm font-semibold text-gray-900">{title}</h2>
            <p className="mb-4 text-xs text-gray-500">
              {getProgressPercent(course.id, course.lessonsCount)}% complete
            </p>

            {course.chapters.map((chapter, chIdx) => (
              <div key={chapter.id} className="mb-4">
                <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  {chIdx + 1}. {chapter.title[interfaceLang] || chapter.title.en}
                </h3>
                <ul className="space-y-0.5">
                  {chapter.lessons.map((lesson) => {
                    const done = !!progress?.lessons[lesson.id]?.completed
                    const active = lesson.id === currentLessonId
                    return (
                      <li key={lesson.id}>
                        <button
                          onClick={() => goToLesson(lesson.id)}
                          className={cn(
                            'flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition',
                            active
                              ? 'bg-indigo-50 font-medium text-indigo-700'
                              : 'text-gray-700 hover:bg-gray-50'
                          )}
                        >
                          {done ? (
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                          ) : (
                            <Circle className="h-4 w-4 shrink-0 text-gray-300" />
                          )}
                          <span className="line-clamp-2">
                            {lesson.title[interfaceLang] || lesson.title.en}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main lesson content */}
        <main className="flex flex-1 flex-col overflow-y-auto bg-gray-50">
          {currentLesson ? (
            <>
              <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-8">
                <div className="mb-2 text-sm text-gray-500">
                  {currentLesson.chapterTitle[interfaceLang] || currentLesson.chapterTitle.en}
                </div>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  {currentLesson.title[interfaceLang] || currentLesson.title.en}
                </h1>

                {/* Lesson body – placeholder content for Phase 2 */}
                <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
                  <div className="prose prose-indigo max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      This is a placeholder for the interactive lesson content.
                      In later phases this area will contain vocabulary cards,
                      Fidel character practice, reading passages, typing exercises,
                      audio players, and quizzes.
                    </p>
                    <p className="mt-4 text-gray-600">
                      For now, mark the lesson as complete to track your progress
                      and unlock the next lesson.
                    </p>

                    {course.learningLanguage === 'am' && (
                      <div className="mt-6 rounded-xl bg-amber-50 p-4 text-amber-900">
                        <p className="font-medium">አማርኛ ትምህርት</p>
                        <p className="mt-1 text-sm">
                          ይህ የአማርኛ ትምህርት ቦታ ነው። በሚቀጥሉት ደረጃዎች ፊደላት፣ ንባብ እና ልምምዶች ይጨመራሉ።
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom navigation */}
              <div className="sticky bottom-0 border-t border-gray-200 bg-white px-4 py-4 sm:px-8">
                <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
                  <button
                    disabled={currentIndex <= 0}
                    onClick={() => goToLesson(allLessons[currentIndex - 1].id)}
                    className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-40"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    {t('common.previous')}
                  </button>

                  <div className="flex items-center gap-3">
                    {!isCurrentComplete ? (
                      <button
                        onClick={handleComplete}
                        className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        {t('common.complete')}
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                        <CheckCircle2 className="h-4 w-4" />
                        Completed
                      </span>
                    )}

                    <button
                      disabled={currentIndex >= allLessons.length - 1}
                      onClick={() => goToLesson(allLessons[currentIndex + 1].id)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-40"
                    >
                      {t('common.next')}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <BookOpen className="h-10 w-10 text-gray-300" />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
