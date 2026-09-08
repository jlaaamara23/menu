import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import translations from '../i18n/translations'

const LanguageContext = createContext(null)

const STORAGE_KEY = 'maison_lang'

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'en' || saved === 'ar' ? saved : 'ar'
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  const setLang = (next) => {
    setLangState(next === 'en' ? 'en' : 'ar')
  }

  const toggleLang = () => setLang(lang === 'ar' ? 'en' : 'ar')

  const t = useMemo(() => translations[lang] || translations.ar, [lang])

  const localize = useMemo(
    () => (ar, en) => (lang === 'ar' ? ar || en : en || ar) || '',
    [lang],
  )

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggleLang,
      t,
      isRtl: lang === 'ar',
      localize,
      localized: localize,
    }),
    [lang, t, localize],
  )

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
