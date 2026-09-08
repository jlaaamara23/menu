import { cn } from '../../utils/helpers'

export function Input({ label, error, className, id, ...props }) {
  const inputId = id || props.name
  return (
    <label className="block space-y-1.5">
      {label && (
        <span className="text-sm font-medium text-[var(--color-text)]">{label}</span>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2.5 text-sm text-[var(--color-text)]',
          'placeholder:text-[var(--color-text-muted)]/70',
          'focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50 focus:border-[var(--color-gold)]',
          'transition-shadow',
          error && 'border-red-400',
          className,
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  )
}

export function Textarea({ label, error, className, id, rows = 3, ...props }) {
  const inputId = id || props.name
  return (
    <label className="block space-y-1.5">
      {label && (
        <span className="text-sm font-medium text-[var(--color-text)]">{label}</span>
      )}
      <textarea
        id={inputId}
        rows={rows}
        className={cn(
          'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2.5 text-sm text-[var(--color-text)] resize-y',
          'placeholder:text-[var(--color-text-muted)]/70',
          'focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50 focus:border-[var(--color-gold)]',
          error && 'border-red-400',
          className,
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  )
}

export function Select({ label, error, className, id, children, ...props }) {
  const inputId = id || props.name
  return (
    <label className="block space-y-1.5">
      {label && (
        <span className="text-sm font-medium text-[var(--color-text)]">{label}</span>
      )}
      <select
        id={inputId}
        className={cn(
          'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2.5 text-sm text-[var(--color-text)]',
          'focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50 focus:border-[var(--color-gold)]',
          error && 'border-red-400',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  )
}

export function Toggle({ checked, onChange, label, id }) {
  return (
    <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange?.(!checked)}
        className={cn(
          'relative h-6 w-11 rounded-full transition-colors',
          checked ? 'bg-[var(--color-green)] dark:bg-[var(--color-gold)]' : 'bg-[var(--color-cream-deep)]',
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200',
            checked ? 'start-[1.375rem]' : 'start-0.5',
          )}
        />
      </button>
      {label && <span className="text-sm text-[var(--color-text)]">{label}</span>}
    </label>
  )
}
