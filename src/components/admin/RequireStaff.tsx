import { Navigate, Outlet } from 'react-router-dom'
import { isStaff, getRole } from '../../lib/admin'
import { useAuth } from '../../hooks/useAuth'
import { Link } from 'react-router-dom'

/**
 * Guards /admin/* routes. Requires login + editor/admin role (local mock).
 */
export default function RequireStaff() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">Loading…</div>
    )
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
        <p className="mt-4 text-sm text-gray-500">
          For local testing, set role on{' '}
          <Link to="/admin/users" className="text-indigo-600 hover:underline">
            Users & roles
          </Link>{' '}
          (or open that page after granting access).
        </p>
        <Link
          to="/dashboard"
          className="mt-6 inline-block rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white"
        >
          Back to dashboard
        </Link>
        {/* Allow reaching users page once: bootstrap path for first admin */}
        <div className="mt-4">
          <Link to="/admin/users" className="text-sm text-gray-500 underline">
            Open role switcher (dev)
          </Link>
        </div>
      </div>
    )
  }

  return <Outlet />
}
