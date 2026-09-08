import { Search, X } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { cn } from '../../utils/helpers'

export function SearchBar({ value, onChange, className, placeholder }) {
  const { t } = useLanguage()

  return (
    <div
      className={cn(
        'relative flex items-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm shadow-[var(--color-shadow)]',
        'focus-within:ring-2 focus-within:ring-[var(--color-gold)]/40 focus-within:border-[var(--color-gold)]',
        className,
      )}
    >
      <Search className="absolute start-3.5 h-[18px] w-[18px] text-[var(--color-text-muted)] pointer-events-none" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || t.searchPlaceholder}
        className="w-full bg-transparent border-0 py-3.5 pe-10 ps-11 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]/70 focus:outline-none"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute end-3 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
          aria-label={t.close}
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
