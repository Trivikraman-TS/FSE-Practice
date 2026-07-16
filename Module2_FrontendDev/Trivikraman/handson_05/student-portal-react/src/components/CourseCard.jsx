import React from 'react';

export default function CourseCard(props) {
  const { id, name, code, credits, grade, isEnrolled, onEnroll } = props;
  
  return (
    <article className={`course-card ${isEnrolled ? 'enrolled' : ''}`}>
      <div className="card-tag">{credits >= 4 ? 'Core' : 'Elective'}</div>
      <h3>{name}</h3>
      <p className="course-desc">This is a React-managed course component for {name} ({code}).</p>
      <div className="card-footer">
        <span className="course-code">{code}</span>
        <span className="course-credits">{credits} Credits</span>
        {isEnrolled ? (
          <button className="btn-card btn-enrolled" disabled>Enrolled</button>
        ) : (
          <button className="btn-card btn-enroll" onClick={() => onEnroll(id)}>Enroll</button>
        )}
      </div>
    </article>
  );
}
