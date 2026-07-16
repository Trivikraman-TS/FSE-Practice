import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="home-page text-center">
      <div className="hero-landing">
        <h1 className="portal-title">Empower Your Learning Journey</h1>
        <p className="hero-subtext">
          Access your courses, track your graduation checkpoints, review active grades, and configure your profile—all within the next-generation Ocean Midnight Student Portal.
        </p>
        <div className="action-buttons">
          <Link to="/courses" className="btn-primary-link">Browse Catalog</Link>
          <Link to="/profile" className="btn-secondary-link">View Profile</Link>
        </div>
      </div>
      
      <div className="features-grid">
        <div className="feature-card">
          <span className="feature-icon">📚</span>
          <h4>Dynamic Catalog</h4>
          <p>Explore full course details, credits, codes, and grades with ease.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">⚡</span>
          <h4>Redux State Management</h4>
          <p>Enrolling dynamically registers actions globally across components instantly.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🧭</span>
          <h4>Fluid Routing</h4>
          <p>Client-side routing ensures instant, responsive page switching.</p>
        </div>
      </div>
    </div>
  );
}
