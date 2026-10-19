import { Outlet, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  LayoutDashboard,
  BookOpen,
  Compass,
  Languages,
  Keyboard,
  BarChart3,
  Settings,
  Menu,
  Shield,
  Headphones,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import LanguageSwitcher from '../LanguageSwitcher'
import { isStaff } from '../../lib/admin'
import { useAuth } from '../../hooks/useAuth'
import { getSettings } from '../../lib/settings'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, key: 'dashboard' },
  { to: '/my-courses', icon: BookOpen, key: 'myCourses' },
  { to: '/courses', icon: Compass, key: 'explore' },
  { to: '/learn/english', icon: Languages, key: 'learnEnglish' },
  { to: '/learn/amharic', icon: Languages, key: 'learnAmharic' },
  { to: '/vocabulary', icon: BookOpen, key: 'vocabulary' },
  { to: '/practice/audio', icon: Headphones, key: 'listenType' },
  { to: '/typing', icon: Keyboard, key: 'typing' },
  { to: '/progress', icon: BarChart3, key: 'progress' },
  { to: '/settings', icon: Settings, key: 'settings' },
] as const

export default function Layout() {
  const { t } = useTranslation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [staff, setStaff] = useState(() => isStaff())
  const { user } = useAuth()
  const settings = getSettings()
  const avatarLetter = (
    settings.displayName ||
    user?.name ||
    user?.email ||
    'U'
  )
    .charAt(0)
    .toUpperCase()

  useEffect(() => {
    const sync = () => setStaff(isStaff())
    sync()
    window.addEventListener('storage', sync)
    window.addEventListener('focus', sync)
    const id = window.setInterval(sync, 1500)
    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener('focus', sync)
      clearInterval(id)
    }
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="hidden w-64 flex-shrink-0 border-r border-gray-200 bg-white lg:block">
        <div className="flex h-16 items-center gap-2 border-b border-gray-100 px-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <Languages className="h-4 w-4" />
          </div>
          <span className="font-semibold text-gray-900">{t('app.name')}</span>
        </div>
        <nav className="space-y-1 p-3">
          {navItems.map(({ to, icon: Icon, key }) => (
            <Link
              key={key}
              to={to}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-indigo-50 hover:text-indigo-700"
            >
              <Icon className="h-4 w-4" />
              {t(`nav.${key}`, { defaultValue: key === 'listenType' ? 'Listen & Type' : key })}
            </Link>
          ))}
          {staff && (
            <Link
              to="/admin"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-indigo-700 transition hover:bg-indigo-50"
            >
              <Shield className="h-4 w-4" />
              Admin
            </Link>
          )}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-6">
          <button
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            {staff && (
              <Link
                to="/admin"
                className="hidden rounded-lg px-2 py-1 text-xs font-medium text-indigo-600 hover:bg-indigo-50 sm:inline"
              >
                Admin
              </Link>
            )}
            <Link
              to="/profile"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-sm font-medium text-indigo-700"
              aria-label="Profile"
            >
              {avatarLetter}
            </Link>
          </div>
        </header>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
            <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl">
              <div className="flex h-16 items-center justify-between border-b px-4">
                <span className="font-semibold">{t('app.name')}</span>
                <button onClick={() => setMobileOpen(false)} className="p-2" aria-label="Close menu">
                  ✕
                </button>
              </div>
              <nav className="space-y-1 p-3">
                {navItems.map(({ to, icon: Icon, key }) => (
                  <Link
                    key={key}
                    to={to}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-indigo-50"
                  >
                    <Icon className="h-4 w-4" />
                    {t(`nav.${key}`, { defaultValue: key === 'listenType' ? 'Listen & Type' : key })}
                  </Link>
                ))}
                {staff && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-indigo-700 hover:bg-indigo-50"
                  >
                    <Shield className="h-4 w-4" />
                    Admin
                  </Link>
                )}
              </nav>
            </div>
          </div>
        )}

        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
