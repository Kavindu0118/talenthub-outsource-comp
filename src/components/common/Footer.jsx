import React from 'react';
import { Link } from 'react-router-dom';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  BuildingOfficeIcon,
  UserGroupIcon,
  BriefcaseIcon 
} from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'How We Hire', href: '/how-we-hire' },
      { name: 'Our Roles', href: '/our-roles' },
      { name: 'Resources', href: '/resources' },
    ],
    services: [
      { name: 'Hire Talent', href: '/hire-with-us' },
      { name: 'Apply as Talent', href: '/talent-application' },
      { name: 'Talent Vetting', href: '/how-we-hire' },
      { name: 'Project Management', href: '/resources' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR Compliance', href: '/gdpr' },
    ],
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <h3>TalentHub</h3>
            <p className="footer-company-description">
              Connecting exceptional talent with innovative companies worldwide. 
              We specialize in rigorous vetting and seamless outsourcing solutions.
            </p>
            <div className="footer-contact-info">
              <div className="footer-contact-item">
                <EnvelopeIcon className="footer-contact-icon" />
                <span>contact@talenthub.com</span>
              </div>
              <div className="footer-contact-item">
                <PhoneIcon className="footer-contact-icon" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="footer-section">
            <h3>
              <BuildingOfficeIcon className="footer-section-icon" />
              Company
            </h3>
            <ul className="footer-links">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.href}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="footer-section">
            <h3>
              <BriefcaseIcon className="footer-section-icon" />
              Services
            </h3>
            <ul className="footer-links">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link to={link.href}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="footer-section">
            <h3>
              <UserGroupIcon className="footer-section-icon" />
              Legal
            </h3>
            <ul className="footer-links">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link to={link.href}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p className="footer-bottom-text">
            © {currentYear} TalentHub. All rights reserved.
          </p>
          <div className="footer-social">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;