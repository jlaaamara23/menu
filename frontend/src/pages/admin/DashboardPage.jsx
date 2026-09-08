import { useEffect, useState } from 'react'
import { Package, Folders, Eye, CheckCircle } from 'lucide-react'
import { dashboardApi, imageUrl } from '../../api/client'
import { useLanguage } from '../../context/LanguageContext'
import StatCard from '../../components/ui/StatCard'
import Skeleton from '../../components/ui/Skeleton'
import { formatPrice } from '../../utils/helpers'

export default function DashboardPage() {
  const { t, localized } = useLanguage()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await dashboardApi.get()
        if (!cancelled) setData(res)
      } catch (err) {
        if (!cancelled) setError(err.message || t.errorGeneric)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [t.errorGeneric])

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return <p className="text-red-700">{error}</p>
  }

  const stats = data?.stats || data || {}
  const recent = data?.recentProducts || data?.recent || []

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-ink">{t.dashboard}</h1>
        <p className="mt-1 text-sm text-muted">{t.statsOverview}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Package}
          label={t.totalProducts}
          value={stats.totalProducts ?? stats.productsCount ?? 0}
        />
        <StatCard
          icon={Folders}
          label={t.totalCategories}
          value={stats.totalCategories ?? stats.categoriesCount ?? 0}
        />
        <StatCard
          icon={Eye}
          label={t.visibleProducts}
          value={stats.visibleProducts ?? stats.visibleCount ?? 0}
        />
        <StatCard
          icon={CheckCircle}
          label={t.availableProducts}
          value={stats.availableProducts ?? stats.availableCount ?? 0}
        />
      </div>

      <section>
        <h2 className="mb-4 font-display text-2xl text-ink">{t.recentProducts}</h2>
        {recent.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-line bg-surface px-4 py-10 text-center text-muted">
            {t.noData}
          </p>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-soft">
            <ul className="divide-y divide-line">
              {recent.map((p) => (
                <li key={p.id} className="flex items-center gap-3 px-4 py-3">
                  <div className="size-12 overflow-hidden rounded-xl bg-cream-deep">
                    {(p.image || p.imageUrl || p.imagePath) ? (
                      <img
                        src={imageUrl(p.image || p.imageUrl || p.imagePath)}
                        alt=""
                        className="size-full object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-ink">
                      {localized(p.nameAr, p.nameEn)}
                    </p>
                    <p className="text-xs text-muted">
                      {formatPrice(p.price)}
                      {p.updatedAt ? ` · ${new Date(p.updatedAt).toLocaleDateString()}` : ''}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  )
}
