/**
 * Admin helpers (Phase 6 mock).
 * Roles and content drafts live in localStorage until Supabase is connected.
 */

import { sampleCourses, type Course } from '../data/sampleCourses'

export type UserRole = 'student' | 'editor' | 'admin'

export type ContentStatus = 'draft' | 'published' | 'archived'

export type ManagedCourse = Course & {
  status: ContentStatus
  updatedAt: string
  createdAt: string
}

export type AuditEntry = {
  id: string
  action: string
  detail: string
  actor: string
  at: string
}

const ROLE_KEY = 'type_user_role'
const COURSES_KEY = 'type_admin_courses'
const AUDIT_KEY = 'type_admin_audit'

function notifyRoleChange() {
  try {
    window.dispatchEvent(new Event('storage'))
  } catch {
    /* ignore */
  }
}

export function getRole(): UserRole {
  try {
    const r = localStorage.getItem(ROLE_KEY) as UserRole | null
    if (r === 'admin' || r === 'editor' || r === 'student') return r
  } catch {
    /* ignore */
  }
  return 'student'
}

export function setRole(role: UserRole) {
  localStorage.setItem(ROLE_KEY, role)
  logAudit('role_change', `Role set to ${role}`, 'system')
  notifyRoleChange()
}

export function isStaff(): boolean {
  const r = getRole()
  return r === 'admin' || r === 'editor'
}

export function isAdmin(): boolean {
  return getRole() === 'admin'
}

function seedCourses(): ManagedCourse[] {
  const now = new Date().toISOString()
  return sampleCourses.map((c) => ({
    ...c,
    status: 'published' as ContentStatus,
    createdAt: now,
    updatedAt: now,
  }))
}

export function getManagedCourses(): ManagedCourse[] {
  try {
    const raw = localStorage.getItem(COURSES_KEY)
    if (raw) return JSON.parse(raw) as ManagedCourse[]
  } catch {
    /* ignore */
  }
  const seeded = seedCourses()
  localStorage.setItem(COURSES_KEY, JSON.stringify(seeded))
  return seeded
}

export function saveManagedCourses(courses: ManagedCourse[]) {
  localStorage.setItem(COURSES_KEY, JSON.stringify(courses))
}

export function updateCourseStatus(courseId: string, status: ContentStatus, actor: string) {
  const courses = getManagedCourses()
  const idx = courses.findIndex((c) => c.id === courseId)
  if (idx < 0) return null
  courses[idx] = {
    ...courses[idx],
    status,
    updatedAt: new Date().toISOString(),
  }
  saveManagedCourses(courses)
  logAudit('course_status', `${courseId} → ${status}`, actor)
  return courses[idx]
}

export function upsertCourse(course: ManagedCourse, actor: string) {
  const courses = getManagedCourses()
  const idx = courses.findIndex((c) => c.id === course.id)
  const next = { ...course, updatedAt: new Date().toISOString() }
  if (idx >= 0) {
    courses[idx] = next
    logAudit('course_update', course.id, actor)
  } else {
    courses.push({ ...next, createdAt: new Date().toISOString() })
    logAudit('course_create', course.id, actor)
  }
  saveManagedCourses(courses)
  return next
}

export function logAudit(action: string, detail: string, actor: string) {
  const entry: AuditEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    action,
    detail,
    actor,
    at: new Date().toISOString(),
  }
  try {
    const raw = localStorage.getItem(AUDIT_KEY)
    const list: AuditEntry[] = raw ? JSON.parse(raw) : []
    list.unshift(entry)
    localStorage.setItem(AUDIT_KEY, JSON.stringify(list.slice(0, 100)))
  } catch {
    /* ignore */
  }
}

export function getAuditLog(): AuditEntry[] {
  try {
    const raw = localStorage.getItem(AUDIT_KEY)
    return raw ? (JSON.parse(raw) as AuditEntry[]) : []
  } catch {
    return []
  }
}

export function getAdminStats() {
  const courses = getManagedCourses()
  const published = courses.filter((c) => c.status === 'published').length
  const drafts = courses.filter((c) => c.status === 'draft').length
  const archived = courses.filter((c) => c.status === 'archived').length
  const en = courses.filter((c) => c.learningLanguage === 'en').length
  const am = courses.filter((c) => c.learningLanguage === 'am').length
  return { total: courses.length, published, drafts, archived, en, am }
}
