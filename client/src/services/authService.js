import API from './api'

const USERS_STORAGE_KEY = 'meetconnect_mock_users'

const loadMockUsers = () => JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]')

const saveMockUsers = (users) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}

const persistSession = (data) => {
  localStorage.setItem('meetconnect_user', JSON.stringify(data))
  localStorage.setItem('meetconnect_token', data.token)
}

const isRecoverableApiError = (error) => {
  const status = error?.response?.status
  return !status || status === 404
}

const buildSession = (user, tokenSeed = user._id || user.email || Date.now()) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  contactNumber: user.contactNumber || '',
  token: `mock-token-${tokenSeed}`,
})

const buildMockGoogleSession = ({ name, email, googleId }) => ({
  _id: `google-${googleId || Date.now()}`,
  name,
  email,
  contactNumber: '',
  token: `mock-google-token-${googleId || Date.now()}`,
})

const register = async (userData) => {
  try {
    const { data } = await API.post('/auth/register', userData)
    persistSession(data)
    return data
  } catch (error) {
    if (!isRecoverableApiError(error)) throw error

    const users = loadMockUsers()
    const normalizedEmail = userData.email.trim().toLowerCase()

    if (users.some((user) => user.email.toLowerCase() === normalizedEmail)) {
      throw new Error('User already exists')
    }

    const mockUser = {
      _id: `user-${Date.now()}`,
      name: userData.name.trim(),
      email: normalizedEmail,
      password: userData.password,
      contactNumber: userData.contactNumber || '',
    }

    users.push(mockUser)
    saveMockUsers(users)

    const session = buildSession(mockUser)
    persistSession(session)
    return session
  }
}

const login = async (credentials) => {
  try {
    const { data } = await API.post('/auth/login', credentials)
    persistSession(data)
    return data
  } catch (error) {
    if (!isRecoverableApiError(error)) throw error

    const users = loadMockUsers()
    const normalizedEmail = credentials.email.trim().toLowerCase()
    const user = users.find((entry) => entry.email.toLowerCase() === normalizedEmail)

    if (!user || user.password !== credentials.password) {
      throw new Error('Invalid email or password')
    }

    const session = buildSession(user)
    persistSession(session)
    return session
  }
}

const logout = () => {
  localStorage.removeItem('meetconnect_user')
  localStorage.removeItem('meetconnect_token')
}

const getMe = async () => {
  try {
    const { data } = await API.get('/auth/me')
    return data
  } catch (error) {
    if (!isRecoverableApiError(error)) throw error

    const currentUser = JSON.parse(localStorage.getItem('meetconnect_user') || 'null')
    if (!currentUser) {
      throw new Error('User not found')
    }

    return currentUser
  }
}

const updateProfile = async (profileData) => {
  try {
    const { data } = await API.put('/auth/update', profileData)
    return data
  } catch (error) {
    if (!isRecoverableApiError(error)) throw error

    const currentUser = JSON.parse(localStorage.getItem('meetconnect_user') || 'null')
    if (!currentUser) {
      throw new Error('User not found')
    }

    const nextUser = {
      ...currentUser,
      ...profileData,
    }

    persistSession(nextUser)

    const users = loadMockUsers()
    const nextUsers = users.map((user) =>
      user._id === nextUser._id
        ? { ...user, ...profileData }
        : user
    )
    saveMockUsers(nextUsers)

    return nextUser
  }
}

const googleLogin = async (googleData) => {
  const data = buildMockGoogleSession(googleData)
  persistSession(data)
  return data
}

const authService = { register, login, logout, getMe, updateProfile, googleLogin }
export default authService
