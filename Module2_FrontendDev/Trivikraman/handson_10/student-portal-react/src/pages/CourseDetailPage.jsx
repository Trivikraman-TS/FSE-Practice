import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { enroll } from '../store/enrollmentSlice';
import { getCourseById, enrollStudent } from '../api/courseApi';

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const enrolledCourses = useSelector(state => state.enrollment.enrolledCourses);
  const isEnrolled = course && enrolledCourses.some(c => c.id === course.id);

  useEffect(() => {
    async function loadDetails() {
      try {
        setLoading(true);
        const id = parseInt(courseId, 10);
        
        // Retrieve course data from our centralized API layer (Step 142)
        const data = await getCourseById(id);
        setCourse(data);
      } catch (err) {
        console.error("CourseDetailPage fetch error:", err);
        setError(err.message || "Failed to load course details.");
      } finally {
        setLoading(false);
      }
    }
    loadDetails();
  }, [courseId]);

  const handleEnrollClick = async () => {
    if (course) {
      try {
        // Redux enrollment state update
        dispatch(enroll(course));
        
        // Centralized API post registry (Step 142)
        await enrollStudent(1, course.id);
        
        navigate('/profile');
      } catch (err) {
        console.error("Enroll registry error:", err);
        navigate('/profile');
      }
    }
  };

  if (loading) return <div className="loading-indicator">Loading course details...</div>;
  if (error || !course) return <div className="error-indicator">{error || "Course not found."}</div>;

  return (
    <div className="course-detail-page">
      <div className="detail-header">
        <Link to="/courses" className="btn-back">&larr; Back to Catalog</Link>
      </div>

      <div className="course-detail-card">
        <div className="detail-tag">{course.credits >= 4 ? 'Core Requirement' : 'Elective Requirement'}</div>
        <h1 className="detail-title">{course.name}</h1>
        
        <div className="detail-meta">
          <span className="meta-item"><strong>Course Code:</strong> {course.code}</span>
          <span className="meta-item"><strong>Academic Credits:</strong> {course.credits} Credits</span>
          <span className="meta-item"><strong>Grade:</strong> {course.grade}</span>
        </div>

        <p className="detail-description">{course.description}</p>

        <div className="detail-actions">
          {isEnrolled ? (
            <button className="btn-primary btn-enrolled-large" disabled>Already Enrolled</button>
          ) : (
            <button className="btn-primary" onClick={handleEnrollClick}>Enroll in Course</button>
          )}
        </div>
      </div>
    </div>
  );
}
