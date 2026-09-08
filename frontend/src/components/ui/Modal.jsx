import { useEffect } from 'react'
import { X } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { cn } from '../../utils/helpers'
import Button from './Button'

export default function Modal({
  open,
  onClose,
  title,
  children,
  size = 'md',
  bottomSheet = false,
  className,
}) {
  const { t } = useLanguage()

  useEffect(() => {
    if (!open) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title || t.close}
    >
      <button
        type="button"
        aria-label={t.close}
        className="absolute inset-0 bg-brand/40 backdrop-blur-sm animate-fade-in dark:bg-black/60"
        onClick={onClose}
      />
      <div
        className={cn(
          'relative z-10 w-full bg-surface shadow-lift animate-fade-up',
          bottomSheet
            ? 'rounded-t-3xl sm:rounded-2xl max-h-[92vh] animate-slide-up sm:animate-fade-up'
            : 'rounded-t-3xl sm:rounded-2xl max-h-[90vh]',
          sizes[size] || sizes.md,
          className,
        )}
      >
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
          <h2 className="font-display text-2xl text-ink">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label={t.close}>
            <X className="size-5" />
          </Button>
        </div>
        <div className="overflow-y-auto max-h-[calc(90vh-4.5rem)] p-5 scrollbar-thin">
          {children}
        </div>
      </div>
    </div>
  )
}
