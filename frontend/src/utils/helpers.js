export function cn(...parts) {
  return parts.filter(Boolean).join(' ')
}

export function formatPrice(value) {
  if (value == null || Number.isNaN(Number(value))) return '—'
  const n = Number(value)
  return `₪${n.toFixed(n % 1 === 0 ? 0 : 2)}`
}

export function debounce(fn, wait = 250) {
  let t
  return (...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...args), wait)
  }
}
