import { Inbox } from 'lucide-react'
import { cn } from '../../utils/helpers'

export function EmptyState({ icon: Icon = Inbox, title, description, action, className }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center px-6 py-14 rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)]/60',
        className,
      )}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-cream-deep)] text-[var(--color-gold)]">
        <Icon className="h-6 w-6" />
      </div>
      {title && (
        <h3 className="font-display text-xl text-[var(--color-text)] mb-1">{title}</h3>
      )}
      {description && (
        <p className="text-sm text-[var(--color-text-muted)] max-w-sm">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
