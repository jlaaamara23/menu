import { Modal } from '../ui/Modal'
import { Badge, StatusPill } from '../ui/Badge'
import { SoftImage } from '../ui/SoftImage'
import { useLanguage } from '../../context/LanguageContext'
import { formatPrice, pickLocalized } from '../../utils/helpers'

export function ProductModal({ product, category, open, onClose }) {
  const { t, lang } = useLanguage()
  if (!product) return null

  const name = pickLocalized(product, 'name', lang)
  const desc = pickLocalized(product, 'description', lang)
  const ingredients = pickLocalized(product, 'ingredients', lang)
  const allergens = pickLocalized(product, 'allergens', lang)
  const categoryName = category ? pickLocalized(category, 'name', lang) : ''
  const available = product.isAvailable !== false

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={name}
      size="lg"
      bottomSheet
      className="sm:max-w-2xl"
    >
      <div className="space-y-5">
        <SoftImage
          src={product.image || product.imageUrl}
          alt={name}
          className="rounded-2xl"
          aspect="aspect-[16/10]"
        />

        <div className="flex flex-wrap items-center gap-2">
          {product.badge && <Badge type={product.badge} />}
          <StatusPill
            active={available}
            activeLabel={t.available}
            inactiveLabel={t.unavailable}
          />
          {categoryName && (
            <span className="text-xs text-[var(--color-text-muted)] rounded-full bg-[var(--color-cream-deep)] px-2.5 py-1">
              {t.category}: {categoryName}
            </span>
          )}
        </div>

        {desc && (
          <p className="text-[var(--color-text-muted)] leading-relaxed text-[15px]">
            {desc}
          </p>
        )}

        <div className="flex items-baseline justify-between gap-4 rounded-2xl bg-[var(--color-cream-deep)]/70 px-4 py-3">
          <span className="text-sm text-[var(--color-text-muted)]">{t.price}</span>
          <span className="font-display text-3xl text-[var(--color-green)] dark:text-[var(--color-gold)]">
            {formatPrice(product.price)}
          </span>
        </div>

        {ingredients && (
          <section>
            <h4 className="font-display text-lg mb-1.5">{t.ingredients}</h4>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              {ingredients}
            </p>
          </section>
        )}

        {allergens && (
          <section>
            <h4 className="font-display text-lg mb-1.5">{t.allergens}</h4>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              {allergens}
            </p>
          </section>
        )}
      </div>
    </Modal>
  )
}
