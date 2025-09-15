import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'How We Hire', href: '/how-we-hire' },
    { name: 'Our Roles', href: '/our-roles' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Hire With Us', href: '/hire-with-us' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Apply as Talent', href: '/talent-application' },
    
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="header-logo">
            TalentHub
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="header-nav">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`header-nav-link ${isActive(item.href) ? 'active' : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="header-cta">
          <Link to="/hire-with-us">
            <Button>
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="mobile-menu-button"
        >
          <span className="sr-only">Open main menu</span>
          {isMenuOpen ? (
            <XMarkIcon className="block" style={{ width: '1.5rem', height: '1.5rem' }} />
          ) : (
            <Bars3Icon className="block" style={{ width: '1.5rem', height: '1.5rem' }} />
          )}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <nav className="mobile-menu-nav">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`mobile-menu-link ${isActive(item.href) ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="mobile-menu-cta">
                <Link
                  to="/hire-with-us"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button className="w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
