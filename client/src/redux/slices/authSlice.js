import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../../services/authService'
import toast from 'react-hot-toast'

const user = JSON.parse(localStorage.getItem('meetconnect_user'))
const token = localStorage.getItem('meetconnect_token')

export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const data = await authService.register(userData)
    toast.success(`Welcome to MeetConnect, ${data.name}! 🎉`)
    return data
  } catch (error) {
    const message = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || error.message
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})

export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const data = await authService.login(credentials)
    toast.success(`Welcome back, ${data.name}! 👋`)
    return data
  } catch (error) {
    const message = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || error.message
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})

export const updateProfile = createAsyncThunk('auth/updateProfile', async (profileData, thunkAPI) => {
  try {
    const data = await authService.updateProfile(profileData)
    toast.success('Profile updated successfully! ✅')
    return data
  } catch (error) {
    const message = error.response?.data?.message || error.message
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})

export const getMe = createAsyncThunk('auth/getMe', async (_, thunkAPI) => {
  try {
    return await authService.getMe()
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
})

export const googleLogin = createAsyncThunk('auth/googleLogin', async (googleData, thunkAPI) => {
  try {
    const data = await authService.googleLogin(googleData)
    toast.success(`Welcome to MeetConnect, ${data.name}! 🚀`)
    return data
  } catch (error) {
    const message = error.response?.data?.message || error.message
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: user || null,
    token: token || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      authService.logout()
      state.user = null
      state.token = null
      state.error = null
      toast.success('Logged out successfully. See you soon! 👋')
    },
    clearError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    const pending = (state) => { state.loading = true; state.error = null }
    const rejected = (state, action) => { state.loading = false; state.error = action.payload }

    builder
      .addCase(register.pending, pending)
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.token = action.payload.token
      })
      .addCase(register.rejected, rejected)

      .addCase(login.pending, pending)
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.token = action.payload.token
      })
      .addCase(login.rejected, rejected)

      .addCase(updateProfile.pending, pending)
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = { ...state.user, ...action.payload }
        localStorage.setItem('meetconnect_user', JSON.stringify({ ...state.user, ...action.payload }))
      })
      .addCase(updateProfile.rejected, rejected)

      .addCase(getMe.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload }
      })

      .addCase(googleLogin.pending, pending)
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.token = action.payload.token
      })
      .addCase(googleLogin.rejected, rejected)
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
