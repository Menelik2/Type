import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  getManagedCourses,
  updateCourseStatus,
  type ContentStatus,
  type ManagedCourse,
} from '../../lib/admin'
import { useAuth } from '../../hooks/useAuth'
import { cn } from '../../lib/utils'

const statuses: ContentStatus[] = ['draft', 'published', 'archived']

export default function AdminCourses() {
  const { user } = useAuth()
  const actor = user?.email || 'admin'
  const [tick, setTick] = useState(0)
  const courses = useMemo(() => getManagedCourses(), [tick])
  const [filter, setFilter] = useState<'all' | ContentStatus>('all')

  const filtered =
    filter === 'all' ? courses : courses.filter((c) => c.status === filter)

  const setStatus = (id: string, status: ContentStatus) => {
    updateCourseStatus(id, status, actor)
    setTick((t) => t + 1)
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link to="/admin" className="text-sm text-gray-500 hover:text-gray-800">
            ← Admin
          </Link>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">Courses</h1>
          <p className="text-sm text-gray-600">Publish, draft, or archive courses</p>
        </div>
        <div className="flex gap-1 rounded-xl border border-gray-200 bg-white p-1">
          {(['all', ...statuses] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition',
                filter === s ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-100 bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Course</th>
              <th className="px-4 py-3 font-medium">Language</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Lessons</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <CourseRow key={c.id} course={c} onStatus={setStatus} />
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-gray-500">
                  No courses in this filter
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-gray-400">
        Status changes are stored locally and logged to the audit trail. Incomplete lessons should not be marked published in production without translation checks.
      </p>
    </div>
  )
}

function CourseRow({
  course,
  onStatus,
}: {
  course: ManagedCourse
  onStatus: (id: string, s: ContentStatus) => void
}) {
  return (
    <tr className="border-b border-gray-50 last:border-0">
      <td className="px-4 py-3">
        <p className="font-medium text-gray-900">{course.title.en}</p>
        <p className="text-xs text-gray-500">{course.title.am}</p>
      </td>
      <td className="px-4 py-3">
        <span
          className={cn(
            'rounded-full px-2 py-0.5 text-xs font-medium',
            course.learningLanguage === 'en'
              ? 'bg-indigo-100 text-indigo-700'
              : 'bg-amber-100 text-amber-800'
          )}
        >
          {course.learningLanguage === 'en' ? 'English' : 'አማርኛ'}
        </span>
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={course.status} />
      </td>
      <td className="px-4 py-3 text-gray-600">{course.lessonsCount}</td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {statuses
            .filter((s) => s !== course.status)
            .map((s) => (
              <button
                key={s}
                onClick={() => onStatus(course.id, s)}
                className="rounded-lg border border-gray-200 px-2 py-1 text-xs font-medium capitalize text-gray-600 hover:bg-gray-50"
              >
                {s}
              </button>
            ))}
        </div>
      </td>
    </tr>
  )
}

function StatusBadge({ status }: { status: ContentStatus }) {
  return (
    <span
      className={cn(
        'rounded-full px-2 py-0.5 text-xs font-medium capitalize',
        status === 'published' && 'bg-emerald-100 text-emerald-800',
        status === 'draft' && 'bg-amber-100 text-amber-800',
        status === 'archived' && 'bg-gray-100 text-gray-600'
      )}
    >
      {status}
    </span>
  )
}
