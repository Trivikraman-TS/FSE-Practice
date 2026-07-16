import React from 'react';

export default function Header(props) {
  const { siteName, enrolledCount } = props;
  
  return (
    <header>
      <div className="logo">
        <span class="logo-accent">{siteName.split(' ')[0]}</span> {siteName.split(' ').slice(1).join(' ')}
      </div>
      <nav>
        <ul>
          <li><a href="#" className="active">Home</a></li>
          <li>
            <a href="#">
              Courses
              {enrolledCount > 0 && (
                <span className="enrolled-badge">{enrolledCount}</span>
              )}
            </a>
          </li>
          <li><a href="#">Profile</a></li>
        </ul>
      </nav>
    </header>
  );
}
