import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import resourceService from '../../services/resourceService'

export const fetchQuestions = createAsyncThunk(
  'resources/fetchQuestions',
  async ({ category, page = 1, limit = 10 } = {}, thunkAPI) => {
    try {
      return await resourceService.getQuestions({ category, page, limit })
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message)
    }
  }
)

export const fetchBlogs = createAsyncThunk(
  'resources/fetchBlogs',
  async ({ category } = {}, thunkAPI) => {
    try {
      return await resourceService.getBlogs({ category })
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message)
    }
  }
)

const resourceSlice = createSlice({
  name: 'resources',
  initialState: {
    questions: [],
    blogs: [],
    totalPages: 1,
    currentPage: 1,
    total: 0,
    loading: false,
    blogsLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false
        state.questions = action.payload.questions
        state.totalPages = action.payload.totalPages
        state.currentPage = action.payload.currentPage
        state.total = action.payload.total
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(fetchBlogs.pending, (state) => { state.blogsLoading = true })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogsLoading = false
        state.blogs = action.payload
      })
      .addCase(fetchBlogs.rejected, (state) => { state.blogsLoading = false })
  },
})

export default resourceSlice.reducer
