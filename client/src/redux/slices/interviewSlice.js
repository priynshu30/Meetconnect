import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import interviewService from '../../services/interviewService'
import toast from 'react-hot-toast'

export const scheduleInterview = createAsyncThunk(
  'interviews/schedule',
  async (interviewData, thunkAPI) => {
    try {
      const data = await interviewService.scheduleInterview(interviewData)
      toast.success('Interview scheduled successfully! 🎯')
      return data
    } catch (error) {
      const message = error.response?.data?.message || error.message
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const fetchInterviews = createAsyncThunk(
  'interviews/fetchAll',
  async ({ status, type } = {}, thunkAPI) => {
    try {
      return await interviewService.getInterviews({ status, type })
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message)
    }
  }
)

const interviewSlice = createSlice({
  name: 'interviews',
  initialState: {
    upcoming: [],
    completed: [],
    loading: false,
    error: null,
    scheduled: false,
  },
  reducers: {
    resetScheduled(state) {
      state.scheduled = false
    },
    clearInterviewError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(scheduleInterview.pending, (state) => {
        state.loading = true
        state.scheduled = false
        state.error = null
      })
      .addCase(scheduleInterview.fulfilled, (state, action) => {
        state.loading = false
        state.scheduled = true
        state.upcoming.unshift(action.payload)
      })
      .addCase(scheduleInterview.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(fetchInterviews.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchInterviews.fulfilled, (state, action) => {
        state.loading = false
        const status = action.meta?.arg?.status
        if (status === 'completed') {
          state.completed = action.payload
        } else {
          state.upcoming = action.payload
        }
      })
      .addCase(fetchInterviews.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { resetScheduled, clearInterviewError } = interviewSlice.actions
export default interviewSlice.reducer
