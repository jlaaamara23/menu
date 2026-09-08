import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import {
  clearAuth,
  getAdminUser,
  getToken,
  setAdminUser,
  setToken,
} from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => getToken())
  const [user, setUser] = useState(() => getAdminUser())

  const login = useCallback((payload) => {
    setToken(payload.token)
    const u = { name: payload.name, email: payload.email }
    setAdminUser(u)
    setTokenState(payload.token)
    setUser(u)
  }, [])

  const logout = useCallback(() => {
    clearAuth()
    setTokenState(null)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token, user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
