import React, { useState } from 'react';

export default function StudentProfile() {
  const [profile, setProfile] = useState({
    name: 'Trivikraman',
    email: 'trivikraman@example.edu',
    semester: '6'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section className="profile-section">
      <h2>Student Profile</h2>
      <div className="profile-card">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="name-input">Full Name</label>
            <input 
              type="text" 
              id="name-input" 
              name="name" 
              value={profile.name} 
              onChange={handleChange} 
              placeholder="Enter name..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="email-input">Email Address</label>
            <input 
              type="email" 
              id="email-input" 
              name="email" 
              value={profile.email} 
              onChange={handleChange} 
              placeholder="Enter email..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="semester-input">Current Semester</label>
            <select 
              id="semester-input" 
              name="semester" 
              value={profile.semester} 
              onChange={handleChange}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                <option key={sem} value={sem}>Semester {sem}</option>
              ))}
            </select>
          </div>
        </form>

        <div className="profile-preview">
          <h3>Real-time Preview</h3>
          <div className="preview-grid">
            <div><strong>Name:</strong> {profile.name || '(Not set)'}</div>
            <div><strong>Email:</strong> {profile.email || '(Not set)'}</div>
            <div><strong>Term:</strong> Semester {profile.semester}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
