import axios from 'axios'

const API = axios.create({ baseURL: '/api' })

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('meetconnect_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

const register = async (userData) => {
  const { data } = await API.post('/auth/register', userData)
  localStorage.setItem('meetconnect_user', JSON.stringify(data))
  localStorage.setItem('meetconnect_token', data.token)
  return data
}

const login = async (credentials) => {
  const { data } = await API.post('/auth/login', credentials)
  localStorage.setItem('meetconnect_user', JSON.stringify(data))
  localStorage.setItem('meetconnect_token', data.token)
  return data
}

const logout = () => {
  localStorage.removeItem('meetconnect_user')
  localStorage.removeItem('meetconnect_token')
}

const getMe = async () => {
  const { data } = await API.get('/auth/me')
  return data
}

const updateProfile = async (profileData) => {
  const { data } = await API.put('/auth/update', profileData)
  return data
}

const googleLogin = async (googleData) => {
  const { data } = await API.post('/auth/google', googleData)
  localStorage.setItem('meetconnect_user', JSON.stringify(data))
  localStorage.setItem('meetconnect_token', data.token)
  return data
}

const authService = { register, login, logout, getMe, updateProfile, googleLogin }
export default authService
