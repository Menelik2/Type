import { Link } from 'react-router-dom'
import { getManagedCourses } from '../../lib/admin'
import { cn } from '../../lib/utils'

/**
 * Simple translation completeness checklist based on bilingual course fields.
 */
export default function AdminTranslations() {
  const courses = getManagedCourses()

  const rows = courses.map((c) => {
    const checks = [
      { key: 'Title EN', ok: !!c.title.en?.trim() },
      { key: 'Title AM', ok: !!c.title.am?.trim() },
      { key: 'Description EN', ok: !!c.description.en?.trim() },
      { key: 'Description AM', ok: !!c.description.am?.trim() },
      { key: 'Objectives EN', ok: (c.objectives.en?.length || 0) > 0 },
      { key: 'Objectives AM', ok: (c.objectives.am?.length || 0) > 0 },
      {
        key: 'Chapter titles AM',
        ok: c.chapters.every((ch) => !!ch.title.am?.trim()),
      },
      {
        key: 'Lesson titles AM',
        ok: c.chapters.every((ch) => ch.lessons.every((l) => !!l.title.am?.trim())),
      },
    ]
    const complete = checks.filter((x) => x.ok).length
    const total = checks.length
    return { course: c, checks, complete, total, pct: Math.round((complete / total) * 100) }
  })

  return (
    <div className="mx-auto max-w-4xl">
      <Link to="/admin" className="text-sm text-gray-500 hover:text-gray-800">
        ← Admin
      </Link>
      <h1 className="mt-1 text-2xl font-bold text-gray-900">Translation completeness</h1>
      <p className="mt-1 text-sm text-gray-600">
        Warn before publishing when Amharic or English fields are missing
      </p>

      <div className="mt-6 space-y-4">
        {rows.map(({ course, checks, pct }) => (
          <div
            key={course.id}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="font-semibold text-gray-900">{course.title.en}</h2>
                <p className="text-sm text-gray-500">{course.title.am}</p>
              </div>
              <span
                className={cn(
                  'rounded-full px-3 py-1 text-sm font-medium',
                  pct === 100
                    ? 'bg-emerald-100 text-emerald-800'
                    : pct >= 70
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800'
                )}
              >
                {pct}% complete
              </span>
            </div>
            <ul className="mt-4 grid gap-1 sm:grid-cols-2">
              {checks.map((ch) => (
                <li
                  key={ch.key}
                  className={cn(
                    'text-sm',
                    ch.ok ? 'text-emerald-700' : 'text-red-600'
                  )}
                >
                  {ch.ok ? '✓' : '✗'} {ch.key}
                </li>
              ))}
            </ul>
            {pct < 100 && course.status === 'published' && (
              <p className="mt-3 text-sm text-amber-700">
                Warning: this course is published but translations are incomplete.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
