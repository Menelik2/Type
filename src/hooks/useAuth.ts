import { useState, useEffect, useCallback } from 'react'

export type MockUser = {
  email: string
  name: string
}

const USER_KEY = 'mockUser'

export function useAuth() {
  const [user, setUser] = useState<MockUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(USER_KEY)
      if (raw) setUser(JSON.parse(raw))
    } catch {
      // ignore
    }
    setLoading(false)
  }, [])

  const login = useCallback((email: string, name?: string) => {
    const u: MockUser = { email, name: name || email.split('@')[0] }
    localStorage.setItem(USER_KEY, JSON.stringify(u))
    setUser(u)
    return u
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(USER_KEY)
    setUser(null)
  }, [])

  return { user, loading, login, logout, isAuthenticated: !!user }
}
