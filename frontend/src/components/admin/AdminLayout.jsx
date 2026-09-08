import { Navigate, Outlet, NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  Folders,
  Image,
  Settings,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
} from 'lucide-react'
import { useState } from 'react'
import { clearAuth, getStoredUser, getToken } from '../../api/client'
import { useLanguage } from '../../context/LanguageContext'
import { useTheme } from '../../context/ThemeContext'
import { cn } from '../../utils/helpers'

export function ProtectedRoute({ children }) {
  const token = getToken()
  if (!token) return <Navigate to="/admin/login" replace />
  return children || <Outlet />
}

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, labelKey: 'dashboard' },
  { to: '/admin/products', icon: Package, labelKey: 'products' },
  { to: '/admin/categories', icon: Folders, labelKey: 'categories' },
  { to: '/admin/images', icon: Image, labelKey: 'images' },
  { to: '/admin/settings', icon: Settings, labelKey: 'settings' },
]

export default function AdminLayout() {
  const { t, lang, toggleLang } = useLanguage()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const user = getStoredUser()

  const logout = () => {
    clearAuth()
    navigate('/admin/login', { replace: true })
  }

  const Nav = ({ onNavigate }) => (
    <nav className="flex flex-1 flex-col gap-1 p-3">
      {navItems.map(({ to, icon: Icon, labelKey }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
              isActive
                ? 'bg-brand text-cream shadow-soft'
                : 'text-muted hover:bg-cream-deep hover:text-ink',
            )
          }
        >
          <Icon className="size-4" />
          {t[labelKey]}
        </NavLink>
      ))}
      <button
        type="button"
        onClick={logout}
        className="mt-auto flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/40 dark:hover:text-red-300"
      >
        <LogOut className="size-4" />
        {t.logout}
      </button>
    </nav>
  )

  return (
    <div className="min-h-svh bg-cream lg:flex">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-e border-line bg-surface lg:flex">
        <div className="border-b border-line px-5 py-6">
          <p className="font-display text-2xl text-brand">Maison Olivéa</p>
          <p className="mt-1 text-xs text-muted truncate">
            {t.welcomeAdmin}
            {user?.name ? `، ${user.name}` : ''}
          </p>
        </div>
        <Nav />
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-brand/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-label={t.close}
          />
          <aside className="relative z-10 flex h-full w-72 flex-col bg-surface shadow-lift animate-fade-in">
            <div className="flex items-center justify-between border-b border-line px-4 py-4">
              <p className="font-display text-xl text-brand">Maison Olivéa</p>
              <button type="button" onClick={() => setOpen(false)} className="p-2 text-muted">
                <X className="size-5" />
              </button>
            </div>
            <Nav onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-line bg-cream/90 px-4 py-3 backdrop-blur-md sm:px-6">
          <button
            type="button"
            className="rounded-xl border border-line bg-surface p-2 lg:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-5" />
          </button>
          <p className="font-display text-xl text-brand lg:hidden">Admin</p>
          <div className="ms-auto flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLang}
              className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium"
            >
              {lang === 'ar' ? 'EN' : 'ع'}
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-full border border-line bg-surface p-2"
            >
              {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
