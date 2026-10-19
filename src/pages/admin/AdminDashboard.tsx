import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  BookOpen,
  FileEdit,
  Archive,
  Languages,
  Users,
  ScrollText,
  Shield,
} from 'lucide-react'
import { getAdminStats, getAuditLog, getRole } from '../../lib/admin'
import { cn } from '../../lib/utils'

export default function AdminDashboard() {
  const { t } = useTranslation()
  const stats = getAdminStats()
  const audit = getAuditLog().slice(0, 8)
  const role = getRole()

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Admin</h1>
          <p className="mt-1 text-gray-600">
            Content & platform overview · role: <span className="font-medium capitalize">{role}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/admin/courses"
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Manage courses
          </Link>
          <Link
            to="/admin/audit"
            className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Audit log
          </Link>
        </div>
      </div>

      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={BookOpen} label="Total courses" value={stats.total} accent="text-indigo-600" />
        <Stat icon={FileEdit} label="Published" value={stats.published} accent="text-emerald-600" />
        <Stat icon={Archive} label="Drafts" value={stats.drafts} accent="text-amber-600" />
        <Stat icon={Languages} label="EN / አማ" value={`${stats.en} / ${stats.am}`} accent="text-purple-600" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 font-semibold text-gray-900">
            <Shield className="h-4 w-4 text-indigo-600" />
            Quick links
          </h2>
          <ul className="space-y-2">
            {[
              { to: '/admin/courses', label: 'Courses & publishing' },
              { to: '/admin/users', label: 'Users & roles' },
              { to: '/admin/audit', label: 'Audit log' },
              { to: '/admin/translations', label: 'Translation completeness' },
            ].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-gray-700 transition hover:bg-indigo-50 hover:text-indigo-700"
                >
                  {item.label}
                  <span className="text-gray-400">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 font-semibold text-gray-900">
            <ScrollText className="h-4 w-4 text-indigo-600" />
            Recent activity
          </h2>
          {audit.length === 0 ? (
            <p className="text-sm text-gray-500">No audit events yet.</p>
          ) : (
            <ul className="space-y-3">
              {audit.map((e) => (
                <li key={e.id} className="border-b border-gray-50 pb-2 last:border-0">
                  <p className="text-sm font-medium text-gray-800">{e.action}</p>
                  <p className="text-xs text-gray-500">
                    {e.detail} · {e.actor} · {new Date(e.at).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <p className="mt-8 text-xs text-gray-400">
        Phase 6 uses localStorage for roles and course status. Connect Supabase + RLS before production.
      </p>
    </div>
  )
}

function Stat({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ElementType
  label: string
  value: string | number
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
