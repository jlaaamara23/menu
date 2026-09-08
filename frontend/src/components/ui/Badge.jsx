import { useLanguage } from '../../context/LanguageContext'
import { cn } from '../../utils/helpers'

export default function Badge({ type, className }) {
  const { t } = useLanguage()
  if (!type) return null
  const label = t.badges?.[type] || type
  return (
    <span
      className={cn(
        'inline-flex text-[11px] font-medium text-gold',
        className,
      )}
    >
      {label}
    </span>
  )
}
