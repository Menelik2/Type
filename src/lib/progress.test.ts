import { describe, it, expect, beforeEach } from 'vitest'
import {
  enrollInCourse,
  isEnrolled,
  markLessonComplete,
  getProgressPercent,
  getCompletedLessonCount,
  unenroll,
  getEnrolledCourseIds,
} from './progress'

beforeEach(() => {
  localStorage.clear()
})

describe('progress store', () => {
  it('enrolls a user in a course', () => {
    enrollInCourse('c1')
    expect(isEnrolled('c1')).toBe(true)
    expect(getEnrolledCourseIds()).toContain('c1')
  })

  it('marks lessons complete and computes percent', () => {
    enrollInCourse('c1')
    markLessonComplete('c1', 'l1')
    markLessonComplete('c1', 'l2')
    expect(getCompletedLessonCount('c1')).toBe(2)
    expect(getProgressPercent('c1', 4)).toBe(50)
    expect(getProgressPercent('c1', 0)).toBe(0)
  })

  it('unenrolls and clears course progress', () => {
    enrollInCourse('c1')
    markLessonComplete('c1', 'l1')
    unenroll('c1')
    expect(isEnrolled('c1')).toBe(false)
    expect(getCompletedLessonCount('c1')).toBe(0)
  })
})
