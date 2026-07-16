import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StudentProfile from '../components/StudentProfile';
import { unenroll } from '../store/enrollmentSlice';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const enrolledCourses = useSelector(state => state.enrollment.enrolledCourses);

  const handleRemove = (id) => {
    dispatch(unenroll(id));
  };

  return (
    <div className="profile-page-container">
      <div className="layout-split">
        {/* Profile Card */}
        <section>
          <StudentProfile />
        </section>

        {/* Global Redux Enrolled Courses List */}
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
                      onClick={() => handleRemove(course.id)}
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
