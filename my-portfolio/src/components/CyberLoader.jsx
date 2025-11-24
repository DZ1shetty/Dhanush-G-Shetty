import React from 'react';
import './CyberLoader.css';

// CyberLoader component for futuristic loading states
const CyberLoader = ({ text = "LOADING", className = "" }) => {
  return (
    <div className={`cyber-loader-container ${className}`}>
      <div className="cyber-scanner"></div>
      <div className="cyber-loader-content">
        <div className="cyber-spinner">
          <div className="cyber-spinner-inner"></div>
          <div className="cyber-spinner-core"></div>
        </div>
        <div className="cyber-text-container">
          <span className="cyber-text">{text}</span>
          <span className="cyber-dots">...</span>
        </div>
        <div className="cyber-progress-bar">
          <div className="cyber-progress-fill"></div>
        </div>
      </div>
    </div>
  );
};

export default CyberLoader;
