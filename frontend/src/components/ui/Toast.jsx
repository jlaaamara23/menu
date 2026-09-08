import { CheckCircle2, XCircle, X } from 'lucide-react'
import { useToast } from '../../context/ToastContext'
import { cn } from '../../utils/helpers'

export default function ToastContainer() {
  const { toasts, removeToast } = useToast()

  if (!toasts.length) return null

  return (
    <div className="fixed bottom-4 inset-x-4 z-[60] flex flex-col gap-2 pointer-events-none sm:inset-x-auto sm:end-4 sm:w-96">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'pointer-events-auto flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-lift animate-fade-up',
            toast.type === 'error'
              ? 'border-red-200 bg-surface text-red-800 dark:border-red-900 dark:text-red-200'
              : 'border-line bg-surface text-ink',
          )}
        >
          {toast.type === 'error' ? (
            <XCircle className="size-5 shrink-0 text-red-600 mt-0.5" />
          ) : (
            <CheckCircle2 className="size-5 shrink-0 text-brand mt-0.5" />
          )}
          <p className="flex-1 text-sm leading-relaxed">{toast.message}</p>
          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="text-muted hover:text-ink"
          >
            <X className="size-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
