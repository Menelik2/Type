import { Link } from 'react-router-dom'
import { getAuditLog } from '../../lib/admin'

export default function AdminAudit() {
  const log = getAuditLog()

  return (
    <div className="mx-auto max-w-4xl">
      <Link to="/admin" className="text-sm text-gray-500 hover:text-gray-800">
        ← Admin
      </Link>
      <h1 className="mt-1 text-2xl font-bold text-gray-900">Audit log</h1>
      <p className="mt-1 text-sm text-gray-600">Recent administrative actions (local, last 100)</p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {log.length === 0 ? (
          <p className="p-8 text-center text-sm text-gray-500">No events recorded yet.</p>
        ) : (
          <ul className="divide-y divide-gray-50">
            {log.map((e) => (
              <li key={e.id} className="px-4 py-3 sm:px-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-medium text-gray-900">{e.action}</p>
                  <time className="text-xs text-gray-400">
                    {new Date(e.at).toLocaleString()}
                  </time>
                </div>
                <p className="mt-0.5 text-sm text-gray-600">{e.detail}</p>
                <p className="mt-0.5 text-xs text-gray-400">Actor: {e.actor}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
