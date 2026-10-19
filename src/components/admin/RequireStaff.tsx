import { useState } from 'react'
import { Navigate, Outlet, Link } from 'react-router-dom'
import { isStaff, getRole, setRole, type UserRole } from '../../lib/admin'
import { useAuth } from '../../hooks/useAuth'

/**
 * Guards /admin/* routes. Requires login + editor/admin role (local mock).
 * Includes a dev-only role switcher so the first admin can bootstrap access.
 */
export default function RequireStaff() {
  const { user, loading } = useAuth()
  const [, setTick] = useState(0)

  if (loading) {
    return <div className="py-20 text-center text-gray-500">Loading…</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!isStaff()) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <h1 className="text-xl font-semibold text-gray-900">Staff access required</h1>
        <p className="mt-2 text-sm text-gray-600">
          Your role is <strong className="capitalize">{getRole()}</strong>. Editors and admins only.
        </p>

        <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50 p-4 text-left text-sm text-amber-900">
          <p className="font-medium">Local testing only</p>
          <p className="mt-1 text-xs">
            Grant yourself editor/admin in this browser. Production must use server-side roles + RLS.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {(['student', 'editor', 'admin'] as UserRole[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setRole(r)
                  setTick((t) => t + 1)
                }}
                className="rounded-lg border border-amber-200 bg-white px-3 py-1.5 text-xs font-medium capitalize text-amber-900 hover:bg-amber-100"
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <Link
          to="/dashboard"
          className="mt-6 inline-block rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white"
        >
          Back to dashboard
        </Link>
      </div>
    )
  }

  return <Outlet />
}
