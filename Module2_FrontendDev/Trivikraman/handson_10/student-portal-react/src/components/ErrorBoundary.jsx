import React, { Component } from 'react';

// Step 150: Global Error Boundary component
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error("ErrorBoundary caught an uncaught error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container" style={{ padding: '4rem 2rem', textAlign: 'center', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div className="error-card" style={{ maxWidth: '600px', backgroundColor: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '3rem', borderRadius: '16px' }}>
            <span style={{ fontSize: '3.5rem', display: 'block', marginBottom: '1.5rem' }}>⚠️</span>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.85rem', marginBottom: '1rem', color: '#ffffff' }}>Application Crash Detected</h1>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', marginBottom: '2rem' }}>
              Something went wrong while rendering this component. The details of the runtime crash are displayed below:
            </p>
            <pre style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '8px', color: '#ef4444', fontFamily: 'monospace', fontSize: '0.85rem', textAlign: 'left', overflowX: 'auto', marginBottom: '2rem', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              {this.state.error && this.state.error.toString()}
            </pre>
            <button className="btn-retry" onClick={this.handleReset}>
              Return to Homepage
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
