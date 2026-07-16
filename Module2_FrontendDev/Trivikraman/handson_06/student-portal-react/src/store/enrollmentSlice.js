import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  enrolledCourses: []
};

export const enrollmentSlice = createSlice({
  name: 'enrollment',
  initialState,
  reducers: {
    enroll: (state, action) => {
      const course = action.payload;
      // RTK uses Immer, so we can mutate the state array safely
      if (!state.enrolledCourses.some(c => c.id === course.id)) {
        state.enrolledCourses.push(course);
      }
    },
    unenroll: (state, action) => {
      const courseId = action.payload;
      state.enrolledCourses = state.enrolledCourses.filter(c => c.id !== courseId);
    }
  }
});

export const { enroll, unenroll } = enrollmentSlice.actions;

export default enrollmentSlice.reducer;
