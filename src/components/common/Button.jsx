import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  onClick,
  type = 'button',
  href,
  ...props 
}) => {
  let buttonClasses = 'btn';
  
  // Add variant classes
  if (variant === 'primary') {
    buttonClasses += ' btn-primary';
  } else if (variant === 'secondary') {
    buttonClasses += ' btn-secondary';
  } else if (variant === 'outline') {
    buttonClasses += ' btn-outline';
  }
  
  // Add size classes
  if (size === 'sm') {
    buttonClasses += ' text-sm';
  } else if (size === 'lg') {
    buttonClasses += ' text-lg px-8 py-4';
  }
  
  // Add disabled styles
  if (disabled) {
    buttonClasses += ' opacity-50 cursor-not-allowed';
  }
  
  // Add custom classes
  if (className) {
    buttonClasses += ' ' + className;
  }
  
  const buttonStyles = {
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer'
  };
  
  // Render as link if href is provided
  if (href) {
    // Check if it's an internal link (starts with /) or external
    const isInternalLink = href.startsWith('/');
    
    if (isInternalLink) {
      // Use React Router Link for internal navigation
      return (
        <Link
          to={href}
          className={buttonClasses}
          style={buttonStyles}
          onClick={onClick}
          {...props}
        >
          {children}
        </Link>
      );
    } else {
      // Use regular anchor tag for external links
      return (
        <a
          href={href}
          className={buttonClasses}
          style={buttonStyles}
          onClick={onClick}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      );
    }
  }
  
  return (
    <button
      type={type}
      className={buttonClasses}
      style={buttonStyles}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
