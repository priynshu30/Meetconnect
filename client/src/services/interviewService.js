import axios from 'axios'

const API = axios.create({ baseURL: '/api' })

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('meetconnect_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

const scheduleInterview = async (interviewData) => {
  const { data } = await API.post('/interviews', interviewData)
  return data
}

const getInterviews = async ({ status, type } = {}) => {
  const params = {}
  if (status) params.status = status
  if (type) params.type = type
  const { data } = await API.get('/interviews', { params })
  return data
}

const getInterview = async (id) => {
  const { data } = await API.get(`/interviews/${id}`)
  return data
}

const interviewService = { scheduleInterview, getInterviews, getInterview }
export default interviewService
