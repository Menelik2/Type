import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Languages, Eye, EyeOff } from 'lucide-react'
import LanguageSwitcher from '../../components/LanguageSwitcher'
import { useAuth } from '../../hooks/useAuth'

export default function LoginPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    await new Promise((r) => setTimeout(r, 400))

    if (email.trim() && password.length >= 6) {
      login(email.trim())
      navigate('/dashboard')
    } else {
      setError(t('auth.invalidCredentials') || 'Invalid email or password')
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="flex h-16 items-center justify-between border-b border-gray-100 bg-white px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold text-gray-900">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <Languages className="h-4 w-4" />
          </div>
          <span>{t('app.name')}</span>
        </Link>
        <LanguageSwitcher />
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900">{t('auth.login')}</h1>
            <p className="mt-2 text-sm text-gray-600">
              {t('app.tagline')} · mock login (any email, password ≥ 6 chars)
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {error && (
                <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t('auth.email')}
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  {t('auth.password')}
                </label>
                <div className="relative mt-1.5">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 pr-10 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-60"
              >
                {loading ? t('common.loading') : t('auth.login')}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              {t('auth.noAccount')}{' '}
              <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-700">
                {t('auth.register')}
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
