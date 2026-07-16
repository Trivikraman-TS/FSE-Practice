import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCourses } from '../api/courseApi';
import apiClient from '../api/apiClient';

// Step 143: Create async thunk supporting error simulation parameter
export const fetchAllCourses = createAsyncThunk(
  'courses/fetchAll',
  async (simulateError = false, { rejectWithValue }) => {
    try {
      if (simulateError) {
        // Query invalid endpoint to trigger 404/rejection (Step 147)
        await apiClient.get('/nonexistent-catalog-endpoint');
      }
      const courses = await getAllCourses();
      return courses;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed fetching course catalog.');
    }
  }
);

const initialState = {
  courses: [],
  loading: false,
  error: null
};

export const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || 'Failed to retrieve catalog.';
      });
  }
});

export const selectCourses = (state) => state.courses.courses;
export const selectCoursesLoading = (state) => state.courses.loading;
export const selectCoursesError = (state) => state.courses.error;

export default coursesSlice.reducer;
