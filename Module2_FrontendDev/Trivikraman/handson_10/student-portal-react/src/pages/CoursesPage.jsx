import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { enroll } from '../store/enrollmentSlice';
import { 
  fetchAllCourses, 
  selectCourses, 
  selectCoursesLoading, 
  selectCoursesError 
} from '../store/coursesSlice';
import { enrollStudent } from '../api/courseApi';

export default function CoursesPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Step 146: Retrieve states through selector functions
  const courses = useSelector(selectCourses);
  const loading = useSelector(selectCoursesLoading);
  const error = useSelector(selectCoursesError);
  
  const enrolledCourses = useSelector(state => state.enrollment.enrolledCourses);

  // Step 145: Dispatch the thunk on component mount
  useEffect(() => {
    dispatch(fetchAllCourses(false));
  }, [dispatch]);

  const handleEnrollClick = async (course) => {
    try {
      // Dispatch local Redux enroll action
      dispatch(enroll(course));
      
      // Perform mock API enroll call (Step 139 & 142)
      console.log(`[API Call] Registering enrollment via apiClient for Course ID: ${course.id}`);
      await enrollStudent(1, course.id);
      
      // Navigate to profile
      navigate('/profile');
    } catch (err) {
      console.error("Failed to register enrollment via API:", err);
      // Navigate to profile anyway since local state successfully updated
      navigate('/profile');
    }
  };

  const handleSimulateError = () => {
    // Step 147: Temporarily change request to trigger rejected thunk
    dispatch(fetchAllCourses(true));
  };

  const handleRetry = () => {
    dispatch(fetchAllCourses(false));
  };

  const filtered = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="courses-page">
      <div className="courses-header">
        <div className="title-area">
          <h2>Available Courses</h2>
          <button 
            onClick={handleSimulateError} 
            className="btn-warning-outline" 
            style={{ marginLeft: '1rem', fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
          >
            Simulate API Error
          </button>
        </div>
        
        <div className="courses-controls">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-indicator">Loading course catalog via Redux Thunk...</div>
      ) : error ? (
        // Step 147: UI displays standard error message and Retry button
        <div className="error-card" style={{ margin: '2rem auto', maxWidth: '600px' }}>
          <p className="error-msg">⚠️ {error}</p>
          <button onClick={handleRetry} className="btn-retry" style={{ marginTop: '1rem' }}>
            Retry Loading
          </button>
        </div>
      ) : (
        <div className="course-grid">
          {filtered.map(course => {
            const isEnrolled = enrolledCourses.some(c => c.id === course.id);
            return (
              <article key={course.id} className={`course-card ${isEnrolled ? 'enrolled' : ''}`}>
                <div className="card-tag">{course.credits >= 4 ? 'Core' : 'Elective'}</div>
                <h3>{course.name}</h3>
                <p className="course-desc">Code: {course.code} | Credits: {course.credits}</p>
                
                <div className="card-links">
                  <Link to={`/courses/${course.id}`} className="detail-link">View Details &rarr;</Link>
                </div>

                <div className="card-footer">
                  <span className="course-code">{course.code}</span>
                  <span className="course-credits">{course.credits} Credits</span>
                  {isEnrolled ? (
                    <button className="btn-card btn-enrolled" disabled>Enrolled</button>
                  ) : (
                    <button className="btn-card btn-enroll" onClick={() => handleEnrollClick(course)}>Enroll</button>
                  )}
                </div>
              </article>
            );
          })}

          {filtered.length === 0 && (
            <div className="no-results">No courses found matching the search criteria.</div>
          )}
        </div>
      )}
    </div>
  );
}
