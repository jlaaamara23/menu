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
      <div className={cn('menu-item-card__media flex items-center justify-center text-muted', className)}>
        <span className="text-xs">—</span>
      </div>
    )
  }

  return (
    <div className={cn('menu-item-card__media', className)}>
      {!loaded && <Skeleton className="absolute inset-0 rounded-none" />}
      <img
        src={url}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={cn(
          'absolute inset-0 size-full object-cover transition-opacity',
          loaded ? 'opacity-100' : 'opacity-0',
        )}
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
      className={cn('menu-item-card', !available && 'is-unavailable')}
    >
      <ProductImage
        src={product.image || product.imageUrl || product.imagePath}
        alt={name}
      />
      <div className="menu-item-card__body">
        {product.badge && (
          <div className="menu-item-card__badges">
            <Badge type={product.badge} />
          </div>
        )}
        <div className="menu-item-card__title-row">
          <h3 className="menu-item-card__title">{name}</h3>
          <span className="menu-item-card__price">{formatPrice(product.price)}</span>
        </div>
        {desc && <p className="menu-item-card__desc">{desc}</p>}
        {!available && <span className="menu-item-card__meta">{t.unavailable}</span>}
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
        <div className="relative aspect-square w-full shrink-0 bg-cream-deep sm:aspect-[16/10]">
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
          {product.badge && (
            <div className="menu-item-card__badges mb-2">
              <Badge type={product.badge} />
            </div>
          )}
          <div className="menu-item-card__title-row">
            <h2 className="menu-item-card__title text-2xl">{name}</h2>
            <p className="menu-item-card__price text-lg">{formatPrice(product.price)}</p>
          </div>
          {categoryName && <p className="mt-1 text-sm text-muted">{categoryName}</p>}
          <p className="mt-2 text-xs text-muted">{available ? t.available : t.unavailable}</p>
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
