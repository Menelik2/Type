import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getRole, setRole, type UserRole, isAdmin } from '../../lib/admin'
import { useAuth } from '../../hooks/useAuth'
import { cn } from '../../lib/utils'

const roles: UserRole[] = ['student', 'editor', 'admin']

/**
 * Mock user/role management.
 * In production: never allow self-elevation via the client; enforce on Supabase RLS.
 */
export default function AdminUsers() {
  const { user } = useAuth()
  const [role, setRoleState] = useState<UserRole>(getRole())
  const [msg, setMsg] = useState('')

  const changeRole = (r: UserRole) => {
    // Demo only: allow switching for testing. Real backend must reject unauthorized elevation.
    setRole(r)
    setRoleState(r)
    setMsg(`Your local role is now "${r}". Refresh admin pages if needed.`)
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link to="/admin" className="text-sm text-gray-500 hover:text-gray-800">
        ← Admin
      </Link>
      <h1 className="mt-1 text-2xl font-bold text-gray-900">Users & roles</h1>
      <p className="mt-1 text-sm text-gray-600">
        Demo role switcher for this browser. Production must enforce roles on the server.
      </p>

      <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-gray-900">Current session</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-500">Name</dt>
            <dd className="font-medium">{user?.name || '—'}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Email</dt>
            <dd className="font-medium">{user?.email || '—'}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Role</dt>
            <dd className="font-medium capitalize">{role}</dd>
          </div>
        </dl>

        <div className="mt-6">
          <p className="mb-2 text-sm font-medium text-gray-700">Set local role (testing only)</p>
          <div className="flex flex-wrap gap-2">
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => changeRole(r)}
                className={cn(
                  'rounded-xl px-4 py-2 text-sm font-medium capitalize transition',
                  role === r
                    ? 'bg-indigo-600 text-white'
                    : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                )}
              >
                {r}
              </button>
            ))}
          </div>
          {msg && <p className="mt-3 text-sm text-emerald-700">{msg}</p>}
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50 p-4 text-sm text-amber-900">
        <strong>Security note:</strong> Students must never be able to grant themselves admin.
        When Supabase is connected, roles live in <code className="text-xs">profiles.role</code> and
        RLS policies — this UI will only display role, not assign it without server checks.
      </div>

      {!isAdmin() && (
        <p className="mt-4 text-sm text-gray-500">
          You need the admin role to use all management tools. Switch to admin above for local testing.
        </p>
      )}
    </div>
  )
}
