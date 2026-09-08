import { useLanguage } from '../../context/LanguageContext'
import { cn } from '../../utils/helpers'

const badgeStyles = {
  POPULAR: 'bg-gold/20 text-brand border-gold/40',
  CHEF: 'bg-brand/10 text-brand border-brand/20',
  NEW: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-200 dark:border-emerald-800',
  SPICY: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/40 dark:text-orange-200',
  VEGETARIAN: 'bg-lime-100 text-lime-800 border-lime-200 dark:bg-lime-900/40 dark:text-lime-200',
}

export default function Badge({ type, className }) {
  const { t } = useLanguage()
  if (!type) return null
  const label = t.badges?.[type] || type
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide',
        badgeStyles[type] || 'bg-cream-deep text-muted border-line',
        className,
      )}
    >
      {label}
    </span>
  )
}
