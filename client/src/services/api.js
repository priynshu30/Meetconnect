import axios from 'axios'

const normalizeApiBaseUrl = (value) => {
  if (!value) return '/api'

  const trimmed = value.trim().replace(/\/+$/, '')

  if (trimmed === '/api' || trimmed.endsWith('/api')) {
    return trimmed
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return `${trimmed}/api`
  }

  return trimmed.startsWith('/') ? `${trimmed}/api` : `/${trimmed}/api`
}

const configuredBaseUrl = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL)

const API = axios.create({
  baseURL: configuredBaseUrl,
})

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('meetconnect_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default API
