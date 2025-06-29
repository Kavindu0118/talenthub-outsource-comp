import React from 'react';
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const Notification = ({ type = 'info', message, isVisible, onClose }) => {
  if (!isVisible) return null;

  const icons = {
    success: <CheckCircleIcon className="notification-icon" />,
    error: <XCircleIcon className="notification-icon" />,
    info: <InformationCircleIcon className="notification-icon" />
  };

  const styles = {
    success: {
      backgroundColor: '#f0fdf4',
      borderColor: '#22c55e',
      color: '#166534'
    },
    error: {
      backgroundColor: '#fef2f2',
      borderColor: '#ef4444',
      color: '#dc2626'
    },
    info: {
      backgroundColor: '#eff6ff',
      borderColor: '#3b82f6',
      color: '#1e40af'
    }
  };

  return (
    <div 
      className="notification" 
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        padding: '1rem 1.5rem',
        borderRadius: '0.5rem',
        border: '1px solid',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        minWidth: '300px',
        maxWidth: '500px',
        ...styles[type]
      }}
    >
      {icons[type]}
      <div className="notification-content" style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: '500' }}>
          {message}
        </p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.25rem',
            borderRadius: '0.25rem',
            color: 'inherit',
            opacity: 0.7
          }}
          onMouseEnter={(e) => e.target.style.opacity = '1'}
          onMouseLeave={(e) => e.target.style.opacity = '0.7'}
        >
          ×
        </button>
      )}
      <style jsx>{`
        .notification-icon {
          width: 1.25rem;
          height: 1.25rem;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
};

export default Notification;
