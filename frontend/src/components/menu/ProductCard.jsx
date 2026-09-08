import { useEffect, useRef, useState } from 'react'
import { ImageOff } from 'lucide-react'
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
      <div
        className={cn(
          'flex items-center justify-center bg-gradient-to-br from-cream-deep to-cream text-gold',
          className,
        )}
      >
        <div className="flex flex-col items-center gap-1 opacity-70">
          <ImageOff className="size-6" />
          <span className="font-display text-sm tracking-wide">Olivéa</span>
        </div>
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
        className={cn(
          'size-full object-cover transition duration-500 group-hover:scale-105',
          loaded ? 'opacity-100' : 'opacity-0',
        )}
      />
    </div>
  )
}

export default function ProductCard({ product, categoryName, onClick, style }) {
  const { t, localized } = useLanguage()
  const name = localized(product.nameAr, product.nameEn)
  const desc = localized(product.descriptionAr, product.descriptionEn)
  const available = product.isAvailable !== false

  return (
    <>
      {/* Mobile horizontal */}
      <button
        type="button"
        onClick={() => onClick?.(product)}
        style={style}
        className={cn(
          'group flex w-full gap-3 rounded-2xl bg-surface p-3 text-start shadow-soft transition duration-300 hover:shadow-lift sm:hidden animate-fade-up',
          !available && 'opacity-70',
        )}
      >
        <ProductImage
          src={product.image || product.imageUrl || product.imagePath}
          alt={name}
          className="size-24 shrink-0 rounded-xl"
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg leading-tight text-ink line-clamp-2">{name}</h3>
            {product.badge && <Badge type={product.badge} className="shrink-0" />}
          </div>
          {desc && <p className="mt-1 line-clamp-2 text-xs text-muted">{desc}</p>}
          <div className="mt-auto flex items-center justify-between pt-2">
            <span className="font-medium text-brand">{formatPrice(product.price)}</span>
            {!available && (
              <span className="text-[11px] text-muted">{t.unavailable}</span>
            )}
          </div>
        </div>
      </button>

      {/* Tablet+ grid card */}
      <button
        type="button"
        onClick={() => onClick?.(product)}
        style={style}
        className={cn(
          'group hidden w-full flex-col overflow-hidden rounded-2xl bg-surface text-start shadow-soft transition duration-300 hover:-translate-y-0.5 hover:shadow-lift sm:flex animate-fade-up',
          !available && 'opacity-70',
        )}
      >
        <div className="relative">
          <ProductImage
            src={product.image || product.imageUrl || product.imagePath}
            alt={name}
            className="aspect-[4/3] w-full"
          />
          {product.badge && (
            <div className="absolute start-3 top-3">
              <Badge type={product.badge} />
            </div>
          )}
          {!available && (
            <div className="absolute inset-0 flex items-center justify-center bg-brand/30 backdrop-blur-[1px]">
              <span className="rounded-full bg-surface/90 px-3 py-1 text-xs font-medium text-ink">
                {t.unavailable}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-1.5 p-4">
          <h3 className="font-display text-xl leading-snug text-ink line-clamp-2">{name}</h3>
          {categoryName && (
            <p className="text-[11px] uppercase tracking-[0.14em] text-gold">{categoryName}</p>
          )}
          {desc && <p className="line-clamp-2 text-sm text-muted">{desc}</p>}
          <p className="mt-auto pt-2 font-medium text-brand">{formatPrice(product.price)}</p>
        </div>
      </button>
    </>
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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4" role="dialog" aria-modal="true">
      <button
        type="button"
        className="absolute inset-0 bg-brand/45 backdrop-blur-sm animate-fade-in dark:bg-black/65"
        onClick={onClose}
        aria-label={t.close}
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-surface shadow-lift animate-slide-up sm:rounded-3xl sm:animate-fade-up"
      >
        <div className="relative aspect-[16/10] w-full shrink-0 bg-cream-deep sm:aspect-[2/1]">
          {url ? (
            <img src={url} alt={name} className="size-full object-cover" />
          ) : (
            <div className="flex size-full items-center justify-center text-gold">
              <span className="font-display text-4xl">Olivéa</span>
            </div>
          )}
          <button
            type="button"
            onClick={onClose}
            className="absolute end-3 top-3 rounded-full bg-surface/90 px-3 py-1.5 text-sm text-ink shadow-soft backdrop-blur"
          >
            {t.close}
          </button>
          {product.badge && (
            <div className="absolute start-3 top-3">
              <Badge type={product.badge} />
            </div>
          )}
        </div>
        <div className="overflow-y-auto p-5 sm:p-7 scrollbar-thin">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-3xl text-ink sm:text-4xl">{name}</h2>
              {categoryName && (
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-gold">{categoryName}</p>
              )}
            </div>
            <p className="font-display text-2xl text-brand">{formatPrice(product.price)}</p>
          </div>

          <p className="mt-2 text-sm">
            <span
              className={cn(
                'inline-flex rounded-full px-2.5 py-0.5 text-xs',
                available ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200' : 'bg-cream-deep text-muted',
              )}
            >
              {available ? t.available : t.unavailable}
            </span>
          </p>

          {desc && <p className="mt-4 text-muted leading-relaxed">{desc}</p>}

          {ingredients && (
            <div className="mt-5">
              <h3 className="font-display text-lg text-ink">{t.ingredients}</h3>
              <p className="mt-1 text-sm text-muted leading-relaxed">{ingredients}</p>
            </div>
          )}

          {allergens && (
            <div className="mt-4">
              <h3 className="font-display text-lg text-ink">{t.allergens}</h3>
              <p className="mt-1 text-sm text-muted leading-relaxed">{allergens}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
