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
import RequireStaff from './components/admin/RequireStaff'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminCourses from './pages/admin/AdminCourses'
import AdminUsers from './pages/admin/AdminUsers'
import AdminAudit from './pages/admin/AdminAudit'
import AdminTranslations from './pages/admin/AdminTranslations'

function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.lang = i18n.language
  }, [i18n.language])

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
        <Route path="/vocabulary" element={<ComingSoon title="Vocabulary" />} />
        <Route path="/typing" element={<ComingSoon title="Typing Practice" />} />
        <Route path="/progress" element={<ComingSoon title="Progress" />} />
        <Route path="/settings" element={<ComingSoon title="Settings" />} />
        <Route path="/profile" element={<ComingSoon title="Profile" />} />

        {/* Admin — staff only */}
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

function ComingSoon({ title }: { title: string }) {
  return (
    <div className="mx-auto max-w-lg py-20 text-center">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="mt-2 text-gray-600">Coming in a later phase</p>
    </div>
  )
}

export default App
