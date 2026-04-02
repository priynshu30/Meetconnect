import API from './api'

const INTERVIEWS_STORAGE_KEY = 'meetconnect_mock_interviews'

const loadMockInterviews = () => JSON.parse(localStorage.getItem(INTERVIEWS_STORAGE_KEY) || '[]')

const saveMockInterviews = (interviews) => {
  localStorage.setItem(INTERVIEWS_STORAGE_KEY, JSON.stringify(interviews))
}

const isRecoverableApiError = (error) => {
  const status = error?.response?.status
  return !status || status === 401 || status === 404
}

const normalizeInterview = (interviewData) => ({
  _id: `interview-${Date.now()}`,
  ...interviewData,
  status: 'upcoming',
  result: null,
  score: null,
  feedback: '',
  resources: interviewData.resources || [],
  createdAt: new Date().toISOString(),
})

const scheduleInterview = async (interviewData) => {
  try {
    const { data } = await API.post('/interviews', interviewData)
    return data
  } catch (error) {
    if (!isRecoverableApiError(error)) throw error

    const interview = normalizeInterview(interviewData)
    const interviews = loadMockInterviews()
    interviews.unshift(interview)
    saveMockInterviews(interviews)
    return interview
  }
}

const getInterviews = async ({ status, type } = {}) => {
  const params = {}
  if (status) params.status = status
  if (type) params.type = type

  try {
    const { data } = await API.get('/interviews', { params })
    return data
  } catch (error) {
    if (!isRecoverableApiError(error)) throw error

    return loadMockInterviews().filter((interview) => {
      const matchesStatus = status ? interview.status === status : true
      const matchesType = type ? interview.type === type : true
      return matchesStatus && matchesType
    })
  }
}

const getInterview = async (id) => {
  try {
    const { data } = await API.get(`/interviews/${id}`)
    return data
  } catch (error) {
    if (!isRecoverableApiError(error)) throw error

    const interview = loadMockInterviews().find((entry) => entry._id === id)
    if (!interview) {
      throw new Error('Interview not found')
    }

    return interview
  }
}

const interviewService = { scheduleInterview, getInterviews, getInterview }
export default interviewService
