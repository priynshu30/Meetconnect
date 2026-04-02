import API from './api'

const getQuestions = async ({ category, page = 1, limit = 10 } = {}) => {
  const params = { page, limit }
  if (category) params.category = category
  const { data } = await API.get('/resources/questions', { params })
  return data
}

const getBlogs = async ({ category } = {}) => {
  const params = {}
  if (category) params.category = category
  const { data } = await API.get('/resources/blogs', { params })
  return data
}

const resourceService = { getQuestions, getBlogs }
export default resourceService
