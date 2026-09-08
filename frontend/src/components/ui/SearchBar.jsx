import { Search, X } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { cn } from '../../utils/helpers'

export default function SearchBar({ value, onChange, placeholder, className }) {
  const { t } = useLanguage()

  return (
    <div className={cn('relative', className)}>
      <Search className="pointer-events-none absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || t.searchPlaceholder}
        className="w-full rounded-2xl border border-line bg-surface py-3 pe-10 ps-10 text-sm text-ink shadow-soft outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30 placeholder:text-muted"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute end-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted hover:bg-cream-deep hover:text-ink"
          aria-label={t.close}
        >
          <X className="size-4" />
        </button>
      ) : null}
    </div>
  )
}
