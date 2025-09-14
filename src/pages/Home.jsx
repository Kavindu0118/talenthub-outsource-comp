import React from 'react';
import Hero from '../components/sections/Hero';
import ProcessSteps from '../components/sections/ProcessSteps';
import RoleCards from '../components/sections/RoleCards';
import { CheckCircleIcon, UserGroupIcon, ClockIcon, ShieldCheckIcon, CodeBracketIcon, DevicePhoneMobileIcon, GlobeAltIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import Button from '../components/common/Button';

const Home = () => {
  const benefits = [
    {
      icon: <CheckCircleIcon style={{height: '2rem', width: '2rem'}} />,
      title: 'Pre-Vetted Talent',
      description: 'Every professional in our network has been thoroughly screened and tested'
    },
    {
      icon: <ClockIcon style={{height: '2rem', width: '2rem'}} />,
      title: 'Fast Matching',
      description: 'Get matched with the right talent in as little as 24 hours'
    },
    {
      icon: <ShieldCheckIcon style={{height: '2rem', width: '2rem'}} />,
      title: 'Quality Guarantee',
      description: 'We stand behind our talent with a satisfaction guarantee'
    },
    {
      icon: <UserGroupIcon style={{height: '2rem', width: '2rem'}} />,
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
  {/*Talent Request Process Steps*/}
  const processSteps = [
    {
      step: 1,
      title: 'Submit Your Requirements',
      description: 'Tell us about your project, timeline, budget, and the skills you need',
      timeline: '5 minutes'
    },
    {
      step: 2,
      title: 'Review Profiles',
      description: 'Review detailed profiles of matched candidates including portfolios and past work',
      timeline: '1-2 days'
    },
    {
      step: 3,
      title: 'Interview & Select',
      description: 'Interview your top candidates and select the best fit for your project',
      timeline: '2-3 days'
    },
    {
      step: 4,
      title: 'Start Your Project',
      description: 'Begin working with your selected talent with full support from our team',
      timeline: 'Immediate'
    }
  ];

  const softwareServices = [
    {
      icon: <CodeBracketIcon style={{height: '2rem', width: '2rem'}} />,
      title: 'Web Development',
      description: 'Full-stack web applications built with modern technologies and best practices'
    },
    {
      icon: <DevicePhoneMobileIcon style={{height: '2rem', width: '2rem'}} />,
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications for iOS and Android'
    },
    {
      icon: <GlobeAltIcon style={{height: '2rem', width: '2rem'}} />,
      title: 'E-commerce Solutions',
      description: 'Complete e-commerce platforms with payment integration and inventory management'
    },
    {
      icon: <ChartBarIcon style={{height: '2rem', width: '2rem'}} />,
      title: 'Business Software',
      description: 'Custom business applications, CRM systems, and enterprise solutions'
    }
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
      <section id="how-it-works" className="section-padding section-bg-gray">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              How It Works
            </h2>
            <p className="section-description">
              Our streamlined process gets you from project idea to working with talent in just days
            </p>
          </div>

          <div className="process-container">
            {processSteps.map((step, index) => (
              <div key={index} className="process-step">
                <div className="process-step-icon-container">
                  <div className="process-step-icon">
                    {step.step}
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="process-step-line"></div>
                  )}
                </div>
                <div className="process-step-content">
                  <div className="process-step-header">
                    <h3 className="process-step-title">{step.title}</h3>
                    <span className="process-step-timeline">
                      {step.timeline}
                    </span>
                  </div>
                  <p className="process-step-description">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="benefits-section-reduced-top">
        <div className="benefits-container">
          {/* <div className="benefits-header">
            <h2 className="benefits-title">
              Popular Roles We Fill
            </h2>
            <p className="benefits-description">
              From technical experts to creative professionals, find the right talent for any role
            </p>
          </div> */}
          <RoleCards />
        </div>
      </section>

      {/* Software Solutions Section */}
      <section className="software-section section-padding section-bg-gray">
        <div className="container">
          <div className="section-header section-header-center">
            <h2 className="section-title">
              Need Custom Software for Your Business?
            </h2>
            <p className="section-description">
              Beyond talent outsourcing, we deliver end-to-end software solutions tailored to your unique business needs
            </p>
          </div>

          <div className="benefits-grid">
            {softwareServices.map((service, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">{service.icon}</div>
                <h3 className="benefit-title">{service.title}</h3>
                <p className="benefit-description">{service.description}</p>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: '4rem', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            width: '100%'
          }}>
            <Button 
              variant="primary" 
              size="lg" 
              className="btn-primary"
              href="/solutions"
              style={{ backgroundColor: '#3b82f6', color: 'white' }}
            >
              Start Your Project
            </Button>
          </div>
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
