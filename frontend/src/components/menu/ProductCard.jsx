import { useEffect, useRef, useState } from 'react'
import { imageUrl } from '../../api/client'
import { useLanguage } from '../../context/LanguageContext'
import { cn, formatPrice } from '../../utils/helpers'
import Badge from '../ui/Badge'
import Skeleton from '../ui/Skeleton'

function ProductImage({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const url = imageUrl(src)

  if (!url || error) {
    return (
      <div className={cn('flex items-center justify-center bg-cream-deep text-muted', className)}>
        <span className="text-xs">—</span>
      </div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden bg-cream-deep', className)}>
      {!loaded && <Skeleton className="absolute inset-0 rounded-none" />}
      <img
        src={url}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={cn('size-full object-cover', loaded ? 'opacity-100' : 'opacity-0')}
      />
    </div>
  )
}

export default function ProductCard({ product, onClick }) {
  const { t, localized } = useLanguage()
  const name = localized(product.nameAr, product.nameEn)
  const desc = localized(product.descriptionAr, product.descriptionEn)
  const available = product.isAvailable !== false

  return (
    <button
      type="button"
      onClick={() => onClick?.(product)}
      className={cn(
        'flex w-full gap-3 border-b border-line py-4 text-start transition hover:bg-cream-deep/40 sm:gap-4',
        !available && 'opacity-55',
      )}
    >
      <ProductImage
        src={product.image || product.imageUrl || product.imagePath}
        alt={name}
        className="size-20 shrink-0 rounded-lg sm:size-24"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold leading-snug text-ink sm:text-xl">
            {name}
          </h3>
          <span className="shrink-0 pt-0.5 text-sm font-semibold text-brand sm:text-base">
            {formatPrice(product.price)}
          </span>
        </div>
        {product.badge && <Badge type={product.badge} className="w-fit" />}
        {desc && <p className="line-clamp-2 text-sm leading-relaxed text-muted">{desc}</p>}
        {!available && <span className="text-xs text-gold">{t.unavailable}</span>}
      </div>
    </button>
  )
}

export function ProductModal({ product, categoryName, open, onClose }) {
  const { t, localized } = useLanguage()
  const panelRef = useRef(null)

  useEffect(() => {
    if (open) panelRef.current?.focus()
  }, [open])

  if (!open || !product) return null

  const name = localized(product.nameAr, product.nameEn)
  const desc = localized(product.descriptionAr, product.descriptionEn)
  const ingredients = localized(product.ingredientsAr, product.ingredientsEn)
  const allergens = localized(product.allergensAr, product.allergensEn)
  const available = product.isAvailable !== false
  const url = imageUrl(product.image || product.imageUrl || product.imagePath)

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label={t.close}
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-surface sm:rounded-2xl"
      >
        <div className="relative aspect-[16/10] w-full shrink-0 bg-cream-deep">
          {url ? (
            <img src={url} alt={name} className="size-full object-cover" />
          ) : (
            <div className="flex size-full items-center justify-center text-muted">—</div>
          )}
          <button
            type="button"
            onClick={onClose}
            className="absolute end-3 top-3 rounded-md bg-surface px-3 py-1.5 text-sm text-ink"
          >
            {t.close}
          </button>
        </div>
        <div className="overflow-y-auto p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">{name}</h2>
              {categoryName && <p className="mt-1 text-sm text-muted">{categoryName}</p>}
            </div>
            <p className="font-semibold text-brand">{formatPrice(product.price)}</p>
          </div>
          <p className="mt-2 text-xs text-muted">{available ? t.available : t.unavailable}</p>
          {product.badge && (
            <div className="mt-2">
              <Badge type={product.badge} />
            </div>
          )}
          {desc && <p className="mt-4 text-sm leading-relaxed text-muted">{desc}</p>}
          {ingredients && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-ink">{t.ingredients}</h3>
              <p className="mt-1 text-sm text-muted">{ingredients}</p>
            </div>
          )}
          {allergens && (
            <div className="mt-3">
              <h3 className="text-sm font-semibold text-ink">{t.allergens}</h3>
              <p className="mt-1 text-sm text-muted">{allergens}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
