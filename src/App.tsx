import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import LandingPage from './pages/LandingPage'
import Layout from './components/layout/Layout'

function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    // Keep <html lang> in sync with interface language
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/*" element={<Layout />}>
        {/* Protected & public app routes will be nested here */}
      </Route>
    </Routes>
  )
}

export default App
