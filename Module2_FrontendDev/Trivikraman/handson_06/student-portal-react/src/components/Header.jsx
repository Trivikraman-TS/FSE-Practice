import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header(props) {
  const { siteName = "Student Portal" } = props;
  const location = useLocation();
  
  // Consume global state count via Redux selector (Step 83 & 89)
  const enrolledCourses = useSelector(state => state.enrollment.enrolledCourses);
  const enrolledCount = enrolledCourses.length;

  const isActive = (path) => location.pathname === path;

  return (
    <header>
      <div className="logo">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span className="logo-accent">{siteName.split(' ')[0]}</span> {siteName.split(' ').slice(1).join(' ')}
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
          </li>
          <li>
            <Link to="/courses" className={isActive('/courses') || location.pathname.startsWith('/courses/') ? 'active' : ''}>
              Courses
              {enrolledCount > 0 && (
                <span className="enrolled-badge">{enrolledCount}</span> // (Step 83)
              )}
            </Link>
          </li>
          <li>
            <Link to="/profile" className={isActive('/profile') ? 'active' : ''}>Profile</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
