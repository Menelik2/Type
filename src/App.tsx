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
import TypingPage from './pages/TypingPage'
import VocabularyPage from './pages/VocabularyPage'
import ProgressPage from './pages/ProgressPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import RequireStaff from './components/admin/RequireStaff'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminCourses from './pages/admin/AdminCourses'
import AdminUsers from './pages/admin/AdminUsers'
import AdminAudit from './pages/admin/AdminAudit'
import AdminTranslations from './pages/admin/AdminTranslations'
import { getSettings } from './lib/settings'

function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  useEffect(() => {
    const s = getSettings()
    if (s.interfaceLang && s.interfaceLang !== i18n.language) {
      void i18n.changeLanguage(s.interfaceLang)
    }
    if (s.reduceMotion) {
      document.documentElement.classList.add('reduce-motion')
    }
  }, [i18n])

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<Layout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/my-courses" element={<DashboardPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:slug" element={<CourseDetailsPage />} />
        <Route path="/learn/:slug" element={<CoursePlayerPage />} />
        <Route path="/learn/english" element={<CoursesPage />} />
        <Route path="/learn/amharic" element={<CoursesPage />} />
        <Route path="/vocabulary" element={<VocabularyPage />} />
        <Route path="/typing" element={<TypingPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/admin" element={<RequireStaff />}>
          <Route index element={<AdminDashboard />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="audit" element={<AdminAudit />} />
          <Route path="translations" element={<AdminTranslations />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
