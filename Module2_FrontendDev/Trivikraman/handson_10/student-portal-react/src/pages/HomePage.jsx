import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="home-page text-center">
      <div className="hero-landing">
        <h1 className="portal-title">Consolidated API & Advanced States</h1>
        <p className="hero-subtext">
          Experience clean architecture using Redux Toolkit Async Thunks, centralized Axios API layers with JWT authorization interceptors, and strict React Error Boundary protection.
        </p>
        <div className="action-buttons">
          <Link to="/courses" className="btn-primary-link">Browse Catalog</Link>
          <Link to="/profile" className="btn-secondary-link">View Profile</Link>
        </div>
      </div>
      
      <div className="features-grid">
        <div className="feature-card">
          <span className="feature-icon">⚙️</span>
          <h4>Centralized Axios Layer</h4>
          <p>Integrated response mapping wrappers and request headers interceptors.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🚀</span>
          <h4>Async Thunks Redux</h4>
          <p>State selectors and async dispatchers separate components from store structures.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🛡️</span>
          <h4>Error Boundaries</h4>
          <p>Robust global error catcher wraps application tree to prevent blank rendering page views.</p>
        </div>
      </div>
    </div>
  );
}
