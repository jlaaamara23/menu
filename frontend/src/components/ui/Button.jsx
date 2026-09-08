import { cn } from '../../utils/helpers'

const variants = {
  primary:
    'bg-brand text-cream hover:bg-brand-soft shadow-soft disabled:opacity-50',
  secondary:
    'bg-elevated text-ink border border-line hover:border-gold disabled:opacity-50',
  gold: 'bg-gold text-brand hover:bg-gold-soft shadow-soft disabled:opacity-50',
  ghost: 'bg-transparent text-ink hover:bg-cream-deep disabled:opacity-50',
  danger: 'bg-red-700 text-white hover:bg-red-800 disabled:opacity-50',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-4 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3 text-base rounded-xl',
  icon: 'p-2.5 rounded-xl',
}

export default function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  type = 'button',
  loading = false,
  disabled,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream active:scale-[0.98]',
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        className,
      )}
      {...props}
    >
      {loading && (
        <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  )
}
