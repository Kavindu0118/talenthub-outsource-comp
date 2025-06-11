import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Button from '../common/Button';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background"></div>
      <div className="hero-container">
        <h1 className="hero-title">
          Find <span className="gradient-text">World-Class</span> Talent
          <br />
          Effortlessly  change by Kavindu
        </h1>
        <p className="hero-subtitle">
          Connect with rigorously vetted professionals who are ready to transform your business. 
          Skip the hiring hassles and focus on what matters most.
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta">
          <Link to="/hire-with-us">
            <Button className="hero-btn hero-btn-primary">
              Hire Top Talent
              <ArrowRightIcon style={{ width: '1.25rem', height: '1.25rem', marginLeft: '0.5rem' }} />
            </Button>
          </Link>
          <Link to="/talent-application">
            <Button variant="secondary" className="hero-btn hero-btn-secondary">
              Apply as Talent
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '2rem',
          marginTop: '3rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(100, 116, 139, 0.3)'
        }}>
          <div className="text-center">
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>500+</div>
            <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Vetted Professionals</div>
          </div>
          <div className="text-center">
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>98%</div>
            <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Success Rate</div>
          </div>
          <div className="text-center">
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>24h</div>
            <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Average Response</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
