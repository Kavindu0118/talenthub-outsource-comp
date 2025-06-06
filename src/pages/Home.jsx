import React from 'react';
import Hero from '../components/sections/Hero';
import ProcessSteps from '../components/sections/ProcessSteps';
import RoleCards from '../components/sections/RoleCards';
import { CheckCircleIcon, UserGroupIcon, ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import Button from '../components/common/Button';

const Home = () => {
  const benefits = [
    {
      icon: <CheckCircleIcon className="h-8 w-8" />,
      title: 'Pre-Vetted Talent',
      description: 'Every professional in our network has been thoroughly screened and tested'
    },
    {
      icon: <ClockIcon className="h-8 w-8" />,
      title: 'Fast Matching',
      description: 'Get matched with the right talent in as little as 24 hours'
    },
    {
      icon: <ShieldCheckIcon className="h-8 w-8" />,
      title: 'Quality Guarantee',
      description: 'We stand behind our talent with a satisfaction guarantee'
    },
    {
      icon: <UserGroupIcon className="h-8 w-8" />,
      title: 'Ongoing Support',
      description: 'Dedicated account management throughout your project'
    }
  ];



  const stats = [
    { number: '500+', label: 'Vetted Professionals' },
    { number: '95%', label: 'Client Satisfaction' },
    { number: '48hrs', label: 'Average Match Time' },
    { number: '50+', label: 'Countries Served' }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="benefits-container">
          <div className="benefits-header">
            <h2 className="benefits-title">
              Why Choose Our Platform?
            </h2>
            <p className="benefits-description">
              We make workforce outsourcing simple, reliable, and effective for businesses of all sizes
            </p>
          </div>

          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">{benefit.icon}</div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <ProcessSteps />

      {/* Roles Section */}
      <section className="benefits-section">
        <div className="benefits-container">
          <div className="benefits-header">
            <h2 className="benefits-title">
              Popular Roles We Fill
            </h2>
            <p className="benefits-description">
              From technical experts to creative professionals, find the right talent for any role
            </p>
          </div>
          <RoleCards />
        </div>
      </section>



      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">
              Ready to Get Started?
            </h2>
            <p className="cta-description">
              Whether you're looking to hire top talent or advance your career, we're here to help you succeed.
            </p>
            <div className="cta-buttons">
              <Button 
                variant="secondary" 
                size="lg" 
                className="cta-button-primary"
                href="/hire-with-us"
              >
                Hire Talent
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="cta-button-secondary"
                href="/talent-application"
              >
                Join as Talent
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
