import React from 'react';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: {width: '1rem', height: '1rem'},
    md: {width: '1.5rem', height: '1.5rem'},
    lg: {width: '2rem', height: '2rem'},
    xl: {width: '3rem', height: '3rem'},
  };

  return (
    <div className={`spinner-container ${className}`} style={sizes[size]}>
      <div className="spinner">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
