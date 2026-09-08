import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, MessageCircle, Moon, Sun, Clock, Camera } from 'lucide-react'
import { menuApi } from '../api/client'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import CategoryNav from '../components/menu/CategoryNav'
import ProductCard, { ProductModal } from '../components/menu/ProductCard'
import { MenuSkeleton } from '../components/ui/Skeleton'
import { cn } from '../utils/helpers'

export default function MenuPage() {
  const { t, lang, toggleLang, localized } = useLanguage()
  const { isDark, toggleTheme } = useTheme()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [activeCategory, setActiveCategory] = useState(null)
  const [selected, setSelected] = useState(null)
  const sectionRefs = useRef({})
  const scrollingToRef = useRef(false)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        const menu = await menuApi.getMenu()
        if (!cancelled) {
          setData(menu)
          const first = menu?.categories?.find((c) => c.isVisible !== false)
          if (first) setActiveCategory(first.id)
        }
      } catch (err) {
        if (!cancelled) {
          const status = err?.status
          const msg =
            status === 502 || status === 503 || status === 504
              ? t.errorBackend
              : err.message || t.errorGeneric
          setError(msg)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [t.errorGeneric, t.errorBackend, reloadKey])

  const settings = data?.settings || {}
  const categories = useMemo(
    () => (data?.categories || []).filter((c) => c.isVisible !== false),
    [data],
  )

  useEffect(() => {
    if (!categories.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollingToRef.current) return
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) {
          const id = Number(visible[0].target.dataset.categoryId)
          if (id) setActiveCategory(id)
        }
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0.1, 0.25, 0.5] },
    )

    categories.forEach((cat) => {
      const el = sectionRefs.current[cat.id]
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [categories, loading])

  const scrollToCategory = (id) => {
    setActiveCategory(id)
    scrollingToRef.current = true
    const el = sectionRefs.current[id]
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72
      window.scrollTo({ top, behavior: 'smooth' })
    }
    window.setTimeout(() => {
      scrollingToRef.current = false
    }, 700)
  }

  const brandName = localized(
    settings.nameAr || settings.restaurantNameAr,
    settings.nameEn || settings.restaurantNameEn,
  ) || t.brand

  const welcome = localized(settings.welcomeAr, settings.welcomeEn) ||
    localized(settings.taglineAr, settings.taglineEn) ||
    t.tagline
  const isOpen = settings.isOpen !== false

  if (loading) return <MenuSkeleton />

  if (error) {
    return (
      <div className="flex min-h-svh items-center justify-center p-6 text-center">
        <div className="max-w-md">
          <p className="font-display text-2xl font-semibold text-brand">Maison Olivéa</p>
          <p className="mt-3 text-sm text-muted leading-relaxed">{error}</p>
          <button
            type="button"
            onClick={() => setReloadKey((k) => k + 1)}
            className="mt-6 bg-brand px-5 py-2.5 text-sm font-medium text-cream"
          >
            {t.retry}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-cream">
      <header className="border-b border-line">
        <div className="mx-auto max-w-3xl px-4 py-5 sm:px-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <span
              className={cn(
                'text-xs font-medium',
                isOpen ? 'text-brand' : 'text-muted',
              )}
            >
              {isOpen ? `● ${t.openNow}` : `○ ${t.closedNow}`}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleLang}
                className="px-2 py-1 text-xs font-medium text-ink underline-offset-2 hover:underline"
              >
                {lang === 'ar' ? 'EN' : 'ع'}
              </button>
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={isDark ? t.lightMode : t.darkMode}
                className="p-1.5 text-ink"
              >
                {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </button>
            </div>
          </div>

          <div>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-brand sm:text-4xl">
              {brandName}
            </h1>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{welcome}</p>
          </div>
        </div>
      </header>

      <CategoryNav
        categories={categories}
        activeId={activeCategory}
        onSelect={scrollToCategory}
      />

      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <div className="space-y-10">
          {categories.map((cat) => {
            const products = (cat.products || []).filter((p) => p.isVisible !== false)
            const catName = localized(cat.nameAr, cat.nameEn)
            return (
              <section
                key={cat.id}
                id={`category-${cat.id}`}
                data-category-id={cat.id}
                ref={(node) => {
                  sectionRefs.current[cat.id] = node
                }}
                className="scroll-mt-20"
              >
                <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                  {catName}
                </h2>
                {(cat.descriptionAr || cat.descriptionEn) && (
                  <p className="mt-1 text-sm text-muted">
                    {localized(cat.descriptionAr, cat.descriptionEn)}
                  </p>
                )}

                {products.length === 0 ? (
                  <p className="mt-4 py-8 text-center text-sm text-muted">{t.emptyCategory}</p>
                ) : (
                  <div className="mt-2">
                    {products.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onClick={setSelected}
                      />
                    ))}
                  </div>
                )}
              </section>
            )
          })}
        </div>
      </main>

      <footer className="mt-4 border-t border-line">
        <div className="mx-auto max-w-3xl space-y-4 px-4 py-8 text-sm sm:px-6">
          <p className="font-display text-lg font-semibold text-brand">Maison Olivéa</p>
          <p className="text-muted">
            {localized(settings.addressAr, settings.addressEn) || t.address}
          </p>
          {(settings.openingHoursAr || settings.openingHoursEn) && (
            <p className="flex items-start gap-2 text-muted">
              <Clock className="mt-0.5 size-4 shrink-0" />
              {localized(settings.openingHoursAr, settings.openingHoursEn)}
            </p>
          )}
          <div className="flex flex-wrap gap-4 pt-1">
            {settings.whatsapp && (
              <a
                href={`https://wa.me/${String(settings.whatsapp).replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-brand hover:underline"
              >
                <MessageCircle className="size-4" />
                {t.whatsapp}
              </a>
            )}
            {settings.instagram && (
              <a
                href={
                  settings.instagram.startsWith('http')
                    ? settings.instagram
                    : `https://instagram.com/${settings.instagram.replace('@', '')}`
                }
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-brand hover:underline"
              >
                <Camera className="size-4" />
                {t.instagram}
              </a>
            )}
            {settings.mapsUrl && (
              <a
                href={settings.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-brand hover:underline"
              >
                <MapPin className="size-4" />
                Maps
              </a>
            )}
          </div>
          <div className="flex flex-wrap gap-3 pt-4 text-xs text-muted">
            <span>© {new Date().getFullYear()} Maison Olivéa</span>
            <Link to="/admin/login" className="hover:text-brand hover:underline">
              Admin
            </Link>
          </div>
        </div>
      </footer>

      <ProductModal
        product={selected}
        categoryName={
          selected
            ? localized(
                categories.find((c) => c.id === selected.categoryId)?.nameAr,
                categories.find((c) => c.id === selected.categoryId)?.nameEn,
              ) || ''
            : ''
        }
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </div>
  )
}
