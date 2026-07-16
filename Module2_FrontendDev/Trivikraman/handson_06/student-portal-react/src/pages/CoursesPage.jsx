import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { enroll } from '../store/enrollmentSlice';
import { initialCourses } from '../data/courses';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get enrolled courses from Redux store
  const enrolledCourses = useSelector(state => state.enrollment.enrolledCourses);

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) throw new Error("HTTP error fetching catalog");
        const data = await response.json();
        
        const mapped = data.slice(0, 5).map(post => ({
          id: post.id,
          name: post.title.split(' ').slice(0, 3).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          code: `CS${100 + post.id}`,
          credits: post.id % 2 === 0 ? 4 : 3,
          grade: post.id % 3 === 0 ? 'A' : (post.id % 3 === 1 ? 'A-' : 'B+')
        }));
        setCourses(mapped);
      } catch (err) {
        console.error(err);
        setError("API failed. Loaded fallback catalog.");
        setCourses(initialCourses);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  const handleEnrollClick = (course) => {
    // Dispatch action to Redux store (Step 88)
    dispatch(enroll(course));
    // Automatically navigate to profile page (Step 80)
    navigate('/profile');
  };

  const filtered = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="courses-page">
      <div className="courses-header">
        <h2>Available Courses</h2>
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
        <div className="loading-indicator">Loading course catalog...</div>
      ) : (
        <>
          {error && <div className="error-indicator">{error}</div>}
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
          </div>
        </>
      )}
    </div>
  );
}
