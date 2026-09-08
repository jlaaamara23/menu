import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const ToastContext = createContext(null)

let toastId = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback(
    (message, type = 'success', duration = 3200) => {
      const id = ++toastId
      setToasts((prev) => [...prev, { id, message, type }])
      window.setTimeout(() => removeToast(id), duration)
    },
    [removeToast],
  )

  const value = useMemo(() => ({ showToast, removeToast, toasts }), [showToast, removeToast, toasts])

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
