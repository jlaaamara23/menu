import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, MessageCircle, Moon, Sun, Clock, Camera } from 'lucide-react'
import { menuApi } from '../api/client'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import CategoryNav from '../components/menu/CategoryNav'
import ProductCard, { ProductModal } from '../components/menu/ProductCard'
import SearchBar from '../components/ui/SearchBar'
import { MenuSkeleton } from '../components/ui/Skeleton'
import { cn } from '../utils/helpers'

export default function MenuPage() {
  const { t, lang, toggleLang, localized } = useLanguage()
  const { isDark, toggleTheme } = useTheme()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [query, setQuery] = useState('')
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

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return categories

    return categories
      .map((cat) => {
        const catName = `${cat.nameAr || ''} ${cat.nameEn || ''}`.toLowerCase()
        const products = (cat.products || []).filter((p) => {
          if (p.isVisible === false) return false
          const hay = [
            p.nameAr,
            p.nameEn,
            p.descriptionAr,
            p.descriptionEn,
            cat.nameAr,
            cat.nameEn,
          ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase()
          return hay.includes(q) || catName.includes(q)
        })
        return { ...cat, products }
      })
      .filter((cat) => cat.products.length > 0)
  }, [categories, query])

  const totalFiltered = filteredCategories.reduce(
    (sum, c) => sum + (c.products?.length || 0),
    0,
  )

  useEffect(() => {
    if (query.trim() || !categories.length) return undefined

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
  }, [categories, query, loading])

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

  const welcome = localized(settings.welcomeAr, settings.welcomeEn) || t.tagline
  const isOpen = settings.isOpen !== false
  const pageUrl = typeof window !== 'undefined' ? window.location.href : ''
  const qrSrc = pageUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(pageUrl)}`
    : null

  if (loading) return <MenuSkeleton />

  if (error) {
    return (
      <div className="flex min-h-svh items-center justify-center p-6 text-center">
        <div className="max-w-md animate-fade-up">
          <p className="font-display text-3xl text-brand">Maison Olivéa</p>
          <p className="mt-3 text-muted leading-relaxed">{error}</p>
          <button
            type="button"
            onClick={() => setReloadKey((k) => k + 1)}
            className="mt-6 rounded-xl bg-brand px-5 py-2.5 text-sm font-medium text-cream shadow-soft transition hover:bg-brand-soft"
          >
            {t.retry}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-cream">
      <header className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(196,164,108,0.18),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(27,58,47,0.08),_transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-6 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between gap-3">
            <span
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium',
                isOpen
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200'
                  : 'bg-cream-deep text-muted',
              )}
            >
              <span
                className={cn(
                  'size-1.5 rounded-full',
                  isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-muted',
                )}
              />
              {isOpen ? t.openNow : t.closedNow}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleLang}
                className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink shadow-soft transition hover:border-gold"
              >
                {lang === 'ar' ? 'EN' : 'ع'}
              </button>
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={isDark ? t.lightMode : t.darkMode}
                className="rounded-full border border-line bg-surface p-2 text-ink shadow-soft transition hover:border-gold"
              >
                {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </button>
            </div>
          </div>

          <div className="text-center animate-fade-up">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full border border-gold/50 bg-surface shadow-soft">
              <span className="font-display text-2xl text-brand">O</span>
            </div>
            <h1 className="font-display text-4xl tracking-wide text-brand sm:text-5xl md:text-6xl">
              {brandName}
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted sm:text-base leading-relaxed">
              {welcome}
            </p>
          </div>

          <div className="mx-auto mt-7 max-w-md animate-fade-up" style={{ animationDelay: '80ms' }}>
            <SearchBar value={query} onChange={setQuery} />
          </div>
        </div>
      </header>

      {!query && (
        <CategoryNav
          categories={categories}
          activeId={activeCategory}
          onSelect={scrollToCategory}
        />
      )}

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {query && totalFiltered === 0 ? (
          <div className="py-20 text-center animate-fade-in">
            <p className="font-display text-2xl text-ink">{t.noResults}</p>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredCategories.map((cat, catIndex) => {
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
                  className="scroll-mt-24"
                >
                  <div className="mb-5 flex items-end justify-between gap-3">
                    <div>
                      <h2 className="font-display text-3xl text-ink">{catName}</h2>
                      {(cat.descriptionAr || cat.descriptionEn) && (
                        <p className="mt-1 text-sm text-muted">
                          {localized(cat.descriptionAr, cat.descriptionEn)}
                        </p>
                      )}
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/40 to-transparent mb-2 hidden sm:block" />
                  </div>

                  {products.length === 0 ? (
                    <p className="rounded-2xl border border-dashed border-line bg-surface/60 px-4 py-10 text-center text-muted">
                      {t.emptyCategory}
                    </p>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {products.map((product, i) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          categoryName={catName}
                          onClick={setSelected}
                          style={{ animationDelay: `${Math.min(catIndex * 40 + i * 40, 320)}ms` }}
                        />
                      ))}
                    </div>
                  )}
                </section>
              )
            })}
          </div>
        )}
      </main>

      <footer className="mt-8 border-t border-line bg-cream-deep/50">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div>
            <p className="font-display text-2xl text-brand">Maison Olivéa</p>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {localized(settings.addressAr, settings.addressEn) || t.address}
            </p>
            {(settings.openingHoursAr || settings.openingHoursEn) && (
              <p className="mt-3 flex items-start gap-2 text-sm text-muted">
                <Clock className="mt-0.5 size-4 shrink-0 text-gold" />
                {localized(settings.openingHoursAr, settings.openingHoursEn)}
              </p>
            )}
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-ink">{t.followUs}</p>
            <div className="flex flex-wrap gap-3">
              {settings.whatsapp && (
                <a
                  href={`https://wa.me/${String(settings.whatsapp).replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm text-ink transition hover:border-gold"
                >
                  <MessageCircle className="size-4 text-brand" />
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
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm text-ink transition hover:border-gold"
                >
                  <Camera className="size-4 text-brand" />
                  {t.instagram}
                </a>
              )}
              {settings.mapsUrl && (
                <a
                  href={settings.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm text-ink transition hover:border-gold"
                >
                  <MapPin className="size-4 text-brand" />
                  Maps
                </a>
              )}
            </div>
          </div>

          {qrSrc && (
            <div className="flex flex-col items-start gap-3 lg:items-end">
              <p className="text-sm font-medium text-ink">{t.scanQr}</p>
              <img
                src={qrSrc}
                alt="QR"
                width={120}
                height={120}
                className="rounded-xl border border-line bg-white p-2 shadow-soft"
              />
              <p className="text-xs text-muted">{t.qrHint}</p>
            </div>
          )}
        </div>
        <div className="border-t border-line py-4 text-center text-xs text-muted flex flex-wrap items-center justify-center gap-3">
          <span>© {new Date().getFullYear()} Maison Olivéa</span>
          <Link to="/admin/login" className="text-brand/70 hover:text-brand underline-offset-2 hover:underline">
            Admin
          </Link>
        </div>
      </footer>

      <ProductModal
        product={selected}
        categoryName={
          selected
            ? localized(
                categories.find((c) => c.id === selected.categoryId)?.nameAr,
                categories.find((c) => c.id === selected.categoryId)?.nameEn,
              ) ||
              filteredCategories.find((c) =>
                c.products?.some((p) => p.id === selected.id),
              )?.nameAr ||
              ''
            : ''
        }
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </div>
  )
}
