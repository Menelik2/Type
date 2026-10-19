/**
 * Local progress & enrollment store (Phase 2 mock).
 * Designed so it can later be replaced by Supabase without changing UI code much.
 */

export type LessonProgress = {
  lessonId: string
  completed: boolean
  completedAt?: string
}

export type CourseProgress = {
  courseId: string
  enrolledAt: string
  lastLessonId?: string
  lastAccessedAt?: string
  lessons: Record<string, LessonProgress>
}

export type UserProgress = {
  enrollments: Record<string, CourseProgress>
}

const STORAGE_KEY = 'type_user_progress'

function read(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { enrollments: {} }
    const parsed = JSON.parse(raw) as UserProgress
    if (!parsed || typeof parsed !== 'object' || !parsed.enrollments) {
      return { enrollments: {} }
    }
    return parsed
  } catch {
    return { enrollments: {} }
  }
}

function write(data: UserProgress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    /* quota / private mode */
  }
}

export function getProgress(): UserProgress {
  return read()
}

export function enrollInCourse(courseId: string): CourseProgress {
  const data = read()
  if (!data.enrollments[courseId]) {
    data.enrollments[courseId] = {
      courseId,
      enrolledAt: new Date().toISOString(),
      lessons: {},
    }
    write(data)
  }
  return data.enrollments[courseId]
}

export function isEnrolled(courseId: string): boolean {
  return !!read().enrollments[courseId]
}

export function getCourseProgress(courseId: string): CourseProgress | null {
  return read().enrollments[courseId] || null
}

export function markLessonComplete(courseId: string, lessonId: string) {
  const data = read()
  if (!data.enrollments[courseId]) {
    data.enrollments[courseId] = {
      courseId,
      enrolledAt: new Date().toISOString(),
      lessons: {},
    }
  }
  const course = data.enrollments[courseId]
  course.lessons[lessonId] = {
    lessonId,
    completed: true,
    completedAt: new Date().toISOString(),
  }
  course.lastLessonId = lessonId
  course.lastAccessedAt = new Date().toISOString()
  write(data)
  return course
}

export function setLastAccessed(courseId: string, lessonId: string) {
  const data = read()
  if (!data.enrollments[courseId]) {
    data.enrollments[courseId] = {
      courseId,
      enrolledAt: new Date().toISOString(),
      lessons: {},
    }
  }
  data.enrollments[courseId].lastLessonId = lessonId
  data.enrollments[courseId].lastAccessedAt = new Date().toISOString()
  write(data)
}

export function getCompletedLessonCount(courseId: string): number {
  const course = read().enrollments[courseId]
  if (!course) return 0
  return Object.values(course.lessons).filter((l) => l.completed).length
}

export function getProgressPercent(courseId: string, totalLessons: number): number {
  if (totalLessons <= 0) return 0
  const completed = getCompletedLessonCount(courseId)
  return Math.min(100, Math.round((completed / totalLessons) * 100))
}

export function getEnrolledCourseIds(): string[] {
  return Object.keys(read().enrollments)
}

export function unenroll(courseId: string) {
  const data = read()
  delete data.enrollments[courseId]
  write(data)
}
