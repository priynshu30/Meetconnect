import axios from 'axios'

const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim()

const API = axios.create({
  baseURL: configuredBaseUrl || '/api',
})

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('meetconnect_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default API
