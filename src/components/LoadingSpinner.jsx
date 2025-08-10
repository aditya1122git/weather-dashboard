import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading-container fade-in">
      <div className="loading-spinner">
        <div className="spinner-ring">
          <div className="spinner-circle"></div>
          <div className="spinner-circle"></div>
          <div className="spinner-circle"></div>
          <div className="spinner-circle"></div>
        </div>
        <div className="loading-text">
          <i className="fas fa-cloud-sun bounce"></i>
          <p>Loading weather data...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
