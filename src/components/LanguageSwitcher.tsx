import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'

const languages = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'am', label: 'አማርኛ', flag: '🇪🇹' },
] as const

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const current = languages.find((l) => l.code === i18n.language) || languages[0]

  const cycleLanguage = () => {
    const next = i18n.language === 'en' ? 'am' : 'en'
    i18n.changeLanguage(next)
    localStorage.setItem('interfaceLanguage', next)
    document.documentElement.lang = next
  }

  return (
    <button
      onClick={cycleLanguage}
      className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
      aria-label="Switch language"
    >
      <Globe className="h-3.5 w-3.5 text-gray-500" />
      <span>{current.flag}</span>
      <span className="hidden sm:inline">{current.label}</span>
    </button>
  )
}
