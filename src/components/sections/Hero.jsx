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

        
        
      </div>
    </section>
  );
};

export default Hero;
