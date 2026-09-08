const TOKEN_KEY = 'maison-olivea-token'
const USER_KEY = 'maison-olivea-user'

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function setAuth(token, user) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user))
  } catch {
    /* ignore */
  }
}

export function clearAuth() {
  try {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  } catch {
    /* ignore */
  }
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export const getAdminUser = getStoredUser

export function setToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    else localStorage.removeItem(TOKEN_KEY)
  } catch {
    /* ignore */
  }
}

export function setAdminUser(user) {
  try {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user))
    else localStorage.removeItem(USER_KEY)
  } catch {
    /* ignore */
  }
}

export class ApiError extends Error {
  constructor(message, status, body) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

async function parseResponse(res) {
  const contentType = res.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    return res.json()
  }
  const text = await res.text()
  return text || null
}

export async function apiFetch(path, options = {}) {
  const { auth = false, headers: customHeaders, body, ...rest } = options
  const headers = { ...customHeaders }

  if (body && !(body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }

  if (auth) {
    const token = getToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(path, {
    ...rest,
    headers,
    body: body instanceof FormData || typeof body === 'string' || body == null
      ? body
      : JSON.stringify(body),
  })

  const data = await parseResponse(res)

  if (!res.ok) {
    const message =
      (data && (data.message || data.error || data.title)) ||
      `Request failed (${res.status})`
    if (res.status === 401 && auth) {
      clearAuth()
    }
    throw new ApiError(message, res.status, data)
  }

  return data
}

/* Public */
export const menuApi = {
  getMenu: () => apiFetch('/api/menu'),
  search: (q) => apiFetch(`/api/menu/search?q=${encodeURIComponent(q)}`),
}

/* Admin */
export const authApi = {
  login: (email, password) =>
    apiFetch('/api/admin/auth/login', {
      method: 'POST',
      body: { email, password },
    }),
}

export const dashboardApi = {
  get: () => apiFetch('/api/admin/dashboard', { auth: true }),
}

export const productsApi = {
  list: (params = {}) => {
    const qs = new URLSearchParams()
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') qs.set(k, v)
    })
    const q = qs.toString()
    return apiFetch(`/api/admin/products${q ? `?${q}` : ''}`, { auth: true })
  },
  get: (id) => apiFetch(`/api/admin/products/${id}`, { auth: true }),
  create: (data) =>
    apiFetch('/api/admin/products', { method: 'POST', body: data, auth: true }),
  update: (id, data) =>
    apiFetch(`/api/admin/products/${id}`, { method: 'PUT', body: data, auth: true }),
  remove: (id) =>
    apiFetch(`/api/admin/products/${id}`, { method: 'DELETE', auth: true }),
  setVisibility: (id, isVisible) =>
    apiFetch(`/api/admin/products/${id}/visibility`, {
      method: 'PATCH',
      body: { isVisible },
      auth: true,
    }),
  setAvailability: (id, isAvailable) =>
    apiFetch(`/api/admin/products/${id}/availability`, {
      method: 'PATCH',
      body: { isAvailable },
      auth: true,
    }),
}

export const categoriesApi = {
  list: () => apiFetch('/api/admin/categories', { auth: true }),
  get: (id) => apiFetch(`/api/admin/categories/${id}`, { auth: true }),
  create: (data) =>
    apiFetch('/api/admin/categories', { method: 'POST', body: data, auth: true }),
  update: (id, data) =>
    apiFetch(`/api/admin/categories/${id}`, { method: 'PUT', body: data, auth: true }),
  remove: (id) =>
    apiFetch(`/api/admin/categories/${id}`, { method: 'DELETE', auth: true }),
  setVisibility: (id, isVisible) =>
    apiFetch(`/api/admin/categories/${id}/visibility`, {
      method: 'PATCH',
      body: { isVisible },
      auth: true,
    }),
  reorder: (ids) =>
    apiFetch('/api/admin/categories/reorder', {
      method: 'PUT',
      body: { ids },
      auth: true,
    }),
}

export const uploadApi = {
  upload: (file) => {
    const form = new FormData()
    form.append('file', file)
    return apiFetch('/api/admin/upload', {
      method: 'POST',
      body: form,
      auth: true,
    })
  },
}

export const settingsApi = {
  get: () => apiFetch('/api/admin/settings', { auth: true }),
  update: (data) =>
    apiFetch('/api/admin/settings', { method: 'PUT', body: data, auth: true }),
}

export function imageUrl(path) {
  if (!path) return null
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path
  }
  return path.startsWith('/') ? path : `/${path}`
}
