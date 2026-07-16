import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CourseCard from './components/CourseCard';
import StudentProfile from './components/StudentProfile';
import { initialCourses } from './data/courses';

export default function App() {
  // State variables
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lifecycle useEffect #1: Fetch courses on mount (Step 71 & 72 & 73)
  useEffect(() => {
    async function getCourses() {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        if (!response.ok) {
          throw new Error(`Fetch failed with status ${response.status}`);
        }
        
        const data = await response.json();
        
        // Map the first 5 posts to course objects as required (Step 71)
        const mappedCourses = data.slice(0, 5).map((post, idx) => ({
          id: post.id,
          // Use capitalized post title for name
          name: post.title.split(' ').slice(0, 3).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          code: `CS${100 + post.id}`,
          credits: post.id % 2 === 0 ? 4 : 3,
          grade: post.id % 3 === 0 ? 'A' : (post.id % 3 === 1 ? 'A-' : 'B+')
        }));
        
        setCourses(mappedCourses);
        setError(null);
      } catch (err) {
        console.error("Failed fetching courses:", err);
        setError("Unable to load courses from API. Falling back to local database.");
        // Fallback to local courses so application remains operational
        setCourses(initialCourses);
      } finally {
        setLoading(false);
      }
    }
    
    // Simulate a brief delay to demonstrate the loading state clearly (Step 72)
    const timer = setTimeout(() => {
      getCourses();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Lifecycle useEffect #2: Logs when courses state updates (Step 75)
  useEffect(() => {
    if (courses.length > 0) {
      console.log("Courses updated:", courses);
    }
    /*
      ==========================================================================
      Why the dependency array matters here:
      --------------------------------------------------------------------------
      1. If the dependency array is empty ([]):
         The effect would only execute once upon mounting. Updates to the 'courses'
         array via API resolutions or other operations would not trigger the log.
         
      2. If the dependency array is omitted (no second parameter):
         The effect would run after EVERY render cycle. This would cause redundant
         logging and could lead to infinite loops if the effect itself triggers
         a state update that affects any rendered state.
         
      3. By specifying [courses]:
         The effect runs ONLY when the 'courses' state array changes in value,
         making it efficient, targeted, and safe from infinite loops.
    */
  }, [courses]);

  // Handler to enroll a course - lifts state up from CourseCard (Step 69)
  const handleEnroll = (id) => {
    const courseToEnroll = courses.find(c => c.id === id);
    if (courseToEnroll && !enrolledCourses.some(c => c.id === id)) {
      setEnrolledCourses(prev => [...prev, courseToEnroll]);
    }
  };

  // Filter courses based on search term (Step 68)
  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Pass enrolled count to Header as prop (Step 70) */}
      <Header siteName="Student Portal" enrolledCount={enrolledCourses.length} />
      
      <main>
        {/* Hero Banner */}
        <section id="hero">
          <div className="hero-content">
            <h1>Welcome to the Student Portal</h1>
            <p>Your centralized gateway to manage courses, view grades, track academic progress, and stay updated with notifications.</p>
            <button className="btn-primary">Explore Courses</button>
          </div>
        </section>

        <div className="layout-split">
          
          {/* Courses Panel */}
          <section className="courses-section">
            <h2>Available Courses</h2>
            
            <div className="courses-controls">
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search courses by name or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // (Step 68)
              />
            </div>

            {loading ? (
              <div className="loading-indicator">Loading courses data...</div> // (Step 72)
            ) : error ? (
              <>
                <div className="error-indicator">{error}</div>
                <div className="course-grid">
                  {filteredCourses.map(course => (
                    <CourseCard 
                      key={course.id}
                      {...course}
                      isEnrolled={enrolledCourses.some(c => c.id === course.id)}
                      onEnroll={handleEnroll}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="course-grid">
                {filteredCourses.map(course => ( // (Step 67)
                  <CourseCard 
                    key={course.id}
                    {...course}
                    isEnrolled={enrolledCourses.some(c => c.id === course.id)}
                    onEnroll={handleEnroll} // (Step 69)
                  />
                ))}
              </div>
            )}
          </section>

          {/* Student Profile Panel */}
          <section>
            <StudentProfile />
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}
