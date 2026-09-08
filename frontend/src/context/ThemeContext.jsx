import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext(null)
const STORAGE_KEY = 'maison_theme'

function getInitialTheme() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'dark' || saved === 'light') return saved
  return 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const setTheme = (next) => setThemeState(next === 'dark' ? 'dark' : 'light')
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme, isDark: theme === 'dark' }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
