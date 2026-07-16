import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { enroll } from '../store/enrollmentSlice';
import { initialCourses } from '../data/courses';

export default function CourseDetailPage() {
  const { courseId } = useParams(); // (Step 79)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get enrollment status from Redux
  const enrolledCourses = useSelector(state => state.enrollment.enrolledCourses);
  const isEnrolled = course && enrolledCourses.some(c => c.id === course.id);

  useEffect(() => {
    async function fetchCourseDetails() {
      try {
        setLoading(true);
        const id = parseInt(courseId, 10);
        
        // Fetch from API
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!response.ok) throw new Error("Course not found in catalog");
        
        const data = await response.json();
        
        setCourse({
          id: data.id,
          name: data.title.split(' ').slice(0, 3).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          code: `CS${100 + data.id}`,
          credits: data.id % 2 === 0 ? 4 : 3,
          grade: data.id % 3 === 0 ? 'A' : (data.id % 3 === 1 ? 'A-' : 'B+'),
          description: data.body
        });
      } catch (err) {
        console.error(err);
        // Fallback to local data
        const local = initialCourses.find(c => c.id === parseInt(courseId, 10));
        if (local) {
          setCourse({
            ...local,
            description: `This is a fallback course details rendering. Relational structures and theoretical principles of ${local.name}.`
          });
        } else {
          setError("Requested course details could not be retrieved.");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchCourseDetails();
  }, [courseId]);

  const handleEnrollClick = () => {
    if (course) {
      dispatch(enroll(course)); // (Step 88)
      navigate('/profile'); // (Step 80)
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
          <span className="meta-item"><strong>Target Grade:</strong> {course.grade}</span>
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
