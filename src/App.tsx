import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import LandingPage from './pages/LandingPage'
import Layout from './components/layout/Layout'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import CoursesPage from './pages/CoursesPage'
import CourseDetailsPage from './pages/CourseDetailsPage'
import DashboardPage from './pages/DashboardPage'
import CoursePlayerPage from './pages/CoursePlayerPage'

function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return (
    <Routes>
      {/* Public marketing */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth (standalone layout) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* App shell */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/my-courses" element={<DashboardPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:slug" element={<CourseDetailsPage />} />
        <Route path="/learn/:slug" element={<CoursePlayerPage />} />
        {/* Shortcuts */}
        <Route path="/learn/english" element={<CoursesPage />} />
        <Route path="/learn/amharic" element={<CoursesPage />} />
        {/* Placeholders for later phases */}
        <Route path="/vocabulary" element={<ComingSoon title="Vocabulary" />} />
        <Route path="/typing" element={<ComingSoon title="Typing Practice" />} />
        <Route path="/progress" element={<ComingSoon title="Progress" />} />
        <Route path="/settings" element={<ComingSoon title="Settings" />} />
        <Route path="/profile" element={<ComingSoon title="Profile" />} />
      </Route>
    </Routes>
  )
}

function ComingSoon({ title }: { title: string }) {
  return (
    <div className="mx-auto max-w-lg py-20 text-center">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="mt-2 text-gray-600">Coming in a later phase</p>
    </div>
  )
}

export default App
