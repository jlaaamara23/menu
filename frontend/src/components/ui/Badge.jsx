import { useLanguage } from '../../context/LanguageContext'
import { cn } from '../../utils/helpers'

const BADGE_VARIANT = {
  POPULAR: 'badge-chip--popular',
  CHEF: 'badge-chip--chef',
  NEW: 'badge-chip--new',
  SPICY: 'badge-chip--spicy',
  VEGETARIAN: 'badge-chip--vegetarian',
}

export function Badge({ type, className }) {
  const { t } = useLanguage()
  if (!type) return null
  const label = t.badges?.[type] || type
  const variant = BADGE_VARIANT[type] || 'badge-chip--popular'
  return (
    <span className={cn('badge-chip', variant, className)}>
      {label}
    </span>
  )
}

export function StatusPill({ active, activeLabel, inactiveLabel, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium',
        active ? 'text-brand' : 'text-muted',
        className,
      )}
    >
      <span aria-hidden="true">{active ? '●' : '○'}</span>
      {active ? activeLabel : inactiveLabel}
    </span>
  )
}

export default Badge
