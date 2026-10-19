import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Settings, Trash2, Save } from 'lucide-react'
import {
  getSettings,
  saveSettings,
  clearLearningData,
  clearAllLocalData,
  type AppSettings,
} from '../lib/settings'
import { cn } from '../lib/utils'

export default function SettingsPage() {
  const { i18n } = useTranslation()
  const [form, setForm] = useState<AppSettings>(() => getSettings())
  const [saved, setSaved] = useState(false)
  const [msg, setMsg] = useState('')

  const update = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
    setSaved(false)
  }

  const onSave = () => {
    const next = saveSettings(form)
    if (next.interfaceLang && next.interfaceLang !== i18n.language) {
      void i18n.changeLanguage(next.interfaceLang)
      document.documentElement.lang = next.interfaceLang
    }
    if (next.reduceMotion) {
      document.documentElement.classList.add('reduce-motion')
    } else {
      document.documentElement.classList.remove('reduce-motion')
    }
    setForm(next)
    setSaved(true)
    setMsg('Settings saved.')
  }

  const onClearLearning = () => {
    if (!confirm('Clear course progress, typing results, and vocabulary marks? Account stays logged in.')) {
      return
    }
    clearLearningData()
    setMsg('Learning data cleared.')
  }

  const onClearAll = () => {
    if (!confirm('Clear ALL local data including login and settings? You will need to sign in again.')) {
      return
    }
    clearAllLocalData()
    setMsg('All local data cleared. Refresh or go to Login.')
    window.location.href = '/login'
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
        <Settings className="h-6 w-6 text-indigo-600" />
        Settings
      </h1>
      <p className="mt-1 text-sm text-gray-600">Preferences for this device</p>

      <div className="mt-8 space-y-6">
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-gray-900">Interface language</h2>
          <p className="mt-1 text-xs text-gray-500">Also available from the header switcher</p>
          <div className="mt-3 flex gap-2">
            {(['en', 'am'] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => update('interfaceLang', l)}
                className={cn(
                  'rounded-xl px-4 py-2 text-sm font-medium',
                  form.interfaceLang === l
                    ? 'bg-indigo-600 text-white'
                    : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                )}
              >
                {l === 'en' ? 'English' : 'አማርኛ'}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-gray-900">Preferred learning language</h2>
          <p className="mt-1 text-xs text-gray-500">Used to highlight courses on the dashboard</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {(
              [
                { v: '' as const, label: 'No preference' },
                { v: 'en' as const, label: 'English' },
                { v: 'am' as const, label: 'አማርኛ' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.v || 'none'}
                type="button"
                onClick={() => update('learningLang', opt.v)}
                className={cn(
                  'rounded-xl px-4 py-2 text-sm font-medium',
                  form.learningLang === opt.v
                    ? 'bg-indigo-600 text-white'
                    : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
          <h2 className="font-semibold text-gray-900">Accessibility & typing</h2>
          <label className="flex cursor-pointer items-center justify-between gap-4">
            <span className="text-sm text-gray-700">Reduce motion</span>
            <input
              type="checkbox"
              checked={form.reduceMotion}
              onChange={(e) => update('reduceMotion', e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </label>
          <label className="flex cursor-pointer items-center justify-between gap-4">
            <span className="text-sm text-gray-700">Show Amharic keyboard by default on typing</span>
            <input
              type="checkbox"
              checked={form.showAmharicKeyboardDefault}
              onChange={(e) => update('showAmharicKeyboardDefault', e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </label>
        </section>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onSave}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            <Save className="h-4 w-4" />
            Save settings
          </button>
          {saved && <span className="text-sm text-emerald-600">Saved</span>}
        </div>

        <section className="rounded-2xl border border-red-100 bg-red-50/50 p-5">
          <h2 className="flex items-center gap-2 font-semibold text-red-900">
            <Trash2 className="h-4 w-4" />
            Data
          </h2>
          <p className="mt-1 text-xs text-red-800/80">
            Data is stored in this browser only until Supabase is connected.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onClearLearning}
              className="rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
            >
              Clear learning data
            </button>
            <button
              type="button"
              onClick={onClearAll}
              className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Clear all & log out
            </button>
          </div>
        </section>

        {msg && <p className="text-sm text-gray-600">{msg}</p>}
      </div>
    </div>
  )
}
