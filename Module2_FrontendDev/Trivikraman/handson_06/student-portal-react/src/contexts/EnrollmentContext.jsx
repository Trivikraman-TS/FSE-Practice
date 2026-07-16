import React, { createContext, useState } from 'react';

// Step 81: Create EnrollmentContext
export const EnrollmentContext = createContext();

export function EnrollmentProvider({ children }) {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const enrollCourse = (course) => {
    if (!enrolledCourses.some(c => c.id === course.id)) {
      setEnrolledCourses(prev => [...prev, course]);
    }
  };

  const removeCourse = (courseId) => {
    setEnrolledCourses(prev => prev.filter(c => c.id !== courseId));
  };

  return (
    <EnrollmentContext.Provider value={{ enrolledCourses, enrollCourse, removeCourse }}>
      {children}
    </EnrollmentContext.Provider>
  );
}
