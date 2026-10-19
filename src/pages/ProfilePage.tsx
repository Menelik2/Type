import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, LogOut, Save } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { getSettings, saveSettings } from '../lib/settings'
import { getRole } from '../lib/admin'

export default function ProfilePage() {
  const { user, logout, login, loading } = useAuth()
  const navigate = useNavigate()
  const settings = getSettings()
  const [name, setName] = useState(settings.displayName || user?.name || '')
  const [msg, setMsg] = useState('')

  if (loading) {
    return <div className="py-20 text-center text-gray-500">Loading…</div>
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <h1 className="text-xl font-semibold text-gray-900">Not signed in</h1>
        <p className="mt-2 text-sm text-gray-600">Sign in to manage your profile.</p>
        <Link
          to="/login"
          className="mt-6 inline-block rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white"
        >
          Log in
        </Link>
      </div>
    )
  }

  const onSave = () => {
    const trimmed = name.trim()
    saveSettings({ displayName: trimmed })
    login(user.email, trimmed || user.email.split('@')[0])
    setMsg('Profile updated.')
  }

  const onLogout = () => {
    logout()
    navigate('/login')
  }

  const initial = (name || user.name || user.email || 'U').charAt(0).toUpperCase()
  const role = getRole()

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
        <User className="h-6 w-6 text-indigo-600" />
        Profile
      </h1>
      <p className="mt-1 text-sm text-gray-600">Your account on this device</p>

      <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-xl font-semibold text-indigo-700">
            {initial}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{name || user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="mt-0.5 text-xs capitalize text-gray-400">Role: {role}</p>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700" htmlFor="displayName">
            Display name
          </label>
          <input
            id="displayName"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setMsg('')
            }}
            className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            placeholder="Your name"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onSave}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            <Save className="h-4 w-4" />
            Save
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>

        {msg && <p className="mt-3 text-sm text-emerald-600">{msg}</p>}
      </div>

      <p className="mt-6 text-center text-xs text-gray-400">
        <Link to="/settings" className="text-indigo-600 hover:underline">
          Open Settings
        </Link>{' '}
        for language and data options
      </p>
    </div>
  )
}
