import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StudentProfile from '../components/StudentProfile';
import { unenroll } from '../store/enrollmentSlice';

export default function ProfilePage() {
  const dispatch = useDispatch();
  
  // Read state from Redux store (Step 89)
  const enrolledCourses = useSelector(state => state.enrollment.enrolledCourses);

  const handleRemove = (id) => {
    // Dispatch unenroll action (Step 88)
    dispatch(unenroll(id));
  };

  return (
    <div className="profile-page-container">
      <div className="layout-split">
        {/* Left Side: Student Profile Details Form */}
        <section>
          <StudentProfile />
        </section>

        {/* Right Side: Global Enrolled Courses List */}
        <section className="enrolled-courses-section">
          <h2>Your Enrolled Courses</h2>
          <div className="enrolled-list-card">
            {enrolledCourses.length === 0 ? (
              <div className="no-enrollments-msg">
                <span className="info-icon">💡</span>
                <p>You are not currently enrolled in any courses. Browse the catalog to add courses.</p>
              </div>
            ) : (
              <ul className="enrolled-items-list">
                {enrolledCourses.map(course => (
                  <li key={course.id} className="enrolled-item">
                    <div className="enrolled-item-details">
                      <span className="enrolled-item-code">{course.code}</span>
                      <span className="enrolled-item-name">{course.name}</span>
                      <span className="enrolled-item-credits">{course.credits} Credits</span>
                    </div>
                    <button 
                      className="btn-remove" 
                      onClick={() => handleRemove(course.id)} // (Step 84 & 88)
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
