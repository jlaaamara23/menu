import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { authApi, getToken, setAuth } from '../../api/client'
import { useLanguage } from '../../context/LanguageContext'
import { useToast } from '../../context/ToastContext'
import Button from '../../components/ui/Button'

export default function AdminLoginPage() {
  const { t, lang, toggleLang } = useLanguage()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  if (getToken()) {
    return <Navigate to="/admin/dashboard" replace />
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await authApi.login(email.trim(), password)
      setAuth(res.token, { name: res.name, email: res.email })
      showToast(t.successSave)
      navigate('/admin/dashboard', { replace: true })
    } catch {
      showToast(t.errorLogin, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-cream px-4">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(196,164,108,0.22),_transparent_50%),radial-gradient(ellipse_at_bottom,_rgba(27,58,47,0.12),_transparent_55%)]" />
      <button
        type="button"
        onClick={toggleLang}
        className="absolute end-4 top-4 z-10 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium shadow-soft"
      >
        {lang === 'ar' ? 'EN' : 'ع'}
      </button>

      <div className="relative w-full max-w-md animate-fade-up rounded-3xl border border-line bg-surface p-8 shadow-lift">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full border border-gold/50 bg-cream">
            <span className="font-display text-2xl text-brand">O</span>
          </div>
          <h1 className="font-display text-3xl text-brand">{t.adminLogin}</h1>
          <p className="mt-2 text-sm text-muted">{t.loginSubtitle}</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm text-muted">{t.email}</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
              autoComplete="username"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm text-muted">{t.password}</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
              autoComplete="current-password"
            />
          </label>
          <Button type="submit" className="w-full" loading={loading} size="lg">
            {t.login}
          </Button>
        </form>
      </div>
    </div>
  )
}
