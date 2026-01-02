import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api'

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams(filters).toString()
      const response = await api.get(`/cars?${params}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cars')
    }
  }
)

export const fetchCarById = createAsyncThunk(
  'cars/fetchCarById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/cars/${id}`)
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch car')
    }
  }
)

export const fetchFeaturedCars = createAsyncThunk(
  'cars/fetchFeaturedCars',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/cars/featured')
      return response.data.data
    } catch (error) {
      // Don't crash if backend is not available - just return empty array
      console.warn('Failed to fetch featured cars:', error.message)
      return rejectWithValue([])
    }
  }
)

export const searchCars = createAsyncThunk(
  'cars/searchCars',
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get(`/cars/search?q=${query}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to search cars')
    }
  }
)

const carSlice = createSlice({
  name: 'cars',
  initialState: {
    cars: [],
    featuredCars: [],
    currentCar: null,
    loading: false,
    error: null,
    pagination: {
      page: 1,
      pages: 1,
      total: 0,
    },
  },
  reducers: {
    clearCurrentCar: (state) => {
      state.currentCar = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false
        state.cars = action.payload.data
        state.pagination = {
          page: action.payload.page,
          pages: action.payload.pages,
          total: action.payload.total,
        }
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchCarById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.loading = false
        state.currentCar = action.payload
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchFeaturedCars.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchFeaturedCars.fulfilled, (state, action) => {
        state.loading = false
        state.featuredCars = Array.isArray(action.payload) ? action.payload : []
      })
      .addCase(fetchFeaturedCars.rejected, (state) => {
        state.loading = false
        state.featuredCars = []
      })
      .addCase(searchCars.fulfilled, (state, action) => {
        state.cars = action.payload.data
        state.pagination = {
          page: action.payload.page,
          pages: action.payload.pages,
          total: action.payload.total,
        }
      })
  },
})

export const { clearCurrentCar, clearError } = carSlice.actions
export default carSlice.reducer

