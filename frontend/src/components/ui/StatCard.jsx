import { cn } from '../../utils/helpers'

export default function StatCard({ icon: Icon, label, value, className }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-line bg-surface p-5 shadow-soft animate-fade-up',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted">{label}</p>
          <p className="mt-2 font-display text-3xl text-ink">{value ?? '—'}</p>
        </div>
        {Icon && (
          <div className="rounded-xl bg-cream-deep p-2.5 text-gold">
            <Icon className="size-5" />
          </div>
        )}
      </div>
    </div>
  )
}
