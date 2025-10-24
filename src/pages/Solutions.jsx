import React from 'react';
import { 
  CodeBracketIcon, 
  DevicePhoneMobileIcon, 
  GlobeAltIcon,
  ChartBarIcon,
  CloudIcon,
  CogIcon,
  ShieldCheckIcon,
  BoltIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';
import Button from '../components/common/Button';
import '../styles/components/solutions.css';

const Solutions = () => {
  // Smooth scroll function for internal links
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Handle email opening
  const handleEmailQuote = () => {
    const subject = encodeURIComponent('Project Quote Request');
    const body = encodeURIComponent(`Hello,

I'm interested in getting a quote for my project. Here are some details:

Project Type: 
Timeline: 
Budget Range: 
Description: 

Please let me know if you need any additional information.

Best regards,`);
    
    window.location.href = `mailto:isurulakmalid13@gmail.com?subject=${subject}&body=${body}`;
  };

  const services = [
    {
      icon: <CodeBracketIcon style={{height: '2rem', width: '2rem'}} />,
      title: 'Web Development',
      description: 'Custom web applications built with modern frameworks like React, Vue, Angular, and Node.js'
    },
    {
      icon: <DevicePhoneMobileIcon style={{height: '2rem', width: '2rem'}} />,
      title: 'Mobile Applications',
      description: 'Native iOS and Android apps, or cross-platform solutions using React Native and Flutter'
    },
    {
      icon: <GlobeAltIcon style={{height: '2rem', width: '2rem'}} />,
      title: 'E-commerce Solutions',
      description: 'Complete online stores with payment gateways, inventory management, and analytics'
    },
    {
      icon: <ChartBarIcon style={{height: '2rem', width: '2rem'}} />,
      title: 'Business Software',
      description: 'CRM systems, ERP solutions, and custom business process automation tools'
    },

  ];

  const features = [
    {
      icon: <ShieldCheckIcon style={{height: '2rem', width: '2rem'}} />,
      title: 'Quality Assurance',
      description: 'Rigorous testing and code review processes ensure bug-free delivery'
    },
    {
      icon: <BoltIcon style={{height: '2rem', width: '2rem'}} />,
      title: 'Agile Development',
      description: 'Fast, iterative development with regular updates and client feedback'
    },
    {
      icon: <CogIcon style={{height: '2rem', width: '2rem'}} />,
      title: 'Ongoing Support',
      description: 'Post-launch maintenance, updates, and technical support included'
    },
    {
      icon: <CloudIcon style={{height: '2rem', width: '2rem'}} />,
      title: 'Scalable Architecture',
      description: 'Solutions designed to grow with your business and handle increased demand'
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Project Discovery',
      description: 'We analyze your requirements, goals, and technical specifications',
      timeline: '1-2 days'
    },
    {
      step: 2,
      title: 'Proposal & Planning',
      description: 'Detailed project proposal with timeline, milestones, and cost breakdown',
      timeline: '2-3 days'
    },
    {
      step: 3,
      title: 'Design & Development',
      description: 'Our expert team brings your vision to life with cutting-edge technology',
      timeline: '2-12 weeks'
    },
    {
      step: 4,
      title: 'Testing & Deployment',
      description: 'Thorough testing, optimization, and seamless deployment to production',
      timeline: '1-2 weeks'
    },
    {
      step: 5,
      title: 'Launch & Support',
      description: 'Go live with ongoing maintenance and support for continued success',
      timeline: 'Ongoing'
    }
  ];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="solutions-hero">
        <div className="solutions-hero-container">
          <div className="solutions-hero-content">
            <div className="solutions-hero-badge">
              <RocketLaunchIcon className="solutions-hero-badge-icon" />
              <span className="solutions-hero-badge-text">CUSTOM DEVELOPMENT</span>
            </div>
            <h1 className="solutions-hero-title">
              Custom Software 
              <br />
              <span className="solutions-hero-highlight">Solutions</span>
            </h1>
            <p className="solutions-hero-subtitle">
              From concept to deployment, we deliver scalable software solutions that drive 
              growth and efficiency for your business with cutting-edge technology.
            </p>
            
            <div className="solutions-hero-services">
              <div className="solutions-hero-service">
                <div className="solutions-hero-service-icon">
                  <CodeBracketIcon className="h-4 w-4" />
                </div>
                <h3 className="solutions-hero-service-title">Web Apps</h3>
                <p className="solutions-hero-service-tech">React, Node.js</p>
              </div>
              <div className="solutions-hero-service">
                <div className="solutions-hero-service-icon">
                  <DevicePhoneMobileIcon className="h-4 w-4" />
                </div>
                <h3 className="solutions-hero-service-title">Mobile Apps</h3>
                <p className="solutions-hero-service-tech">iOS, Android</p>
              </div>
              <div className="solutions-hero-service">
                <div className="solutions-hero-service-icon">
                  <CloudIcon className="h-4 w-4" />
                </div>
                <h3 className="solutions-hero-service-title">Cloud Solutions</h3>
                <p className="solutions-hero-service-tech">AWS, Azure</p>
              </div>
              <div className="solutions-hero-service">
                <div className="solutions-hero-service-icon">
                  <ChartBarIcon className="h-4 w-4" />
                </div>
                <h3 className="solutions-hero-service-title">Business Software</h3>
                <p className="solutions-hero-service-tech">CRM, ERP</p>
              </div>
            </div>
            
            <div className="solutions-hero-cta">
              <div className="cta-buttons">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="btn-primary"
                  onClick={handleEmailQuote}
                  style={{ backgroundColor: '#3b82f6', color: 'white' }}
                >
                  Get Free Quote
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="cta-button-secondary"
                  onClick={(e) => handleSmoothScroll(e, 'our-process')}
                  style={{ 
                    borderColor: '#3b82f6', 
                    color: '#3b82f6',
                    transition: 'all 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#3b82f6';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#3b82f6';
                  }}
                >
                  See Our Process
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="solutions-hero-floating-elements">
          <div className="solutions-hero-gear solutions-hero-gear-1"></div>
          <div className="solutions-hero-gear solutions-hero-gear-2"></div>
          <div className="solutions-hero-gear solutions-hero-gear-3"></div>
          <div className="solutions-hero-code-block"></div>
          <div className="solutions-hero-mobile"></div>
        </div>
        
        {/* Tech Stack Background */}
        <div className="solutions-hero-tech-dots"></div>
      </section>

      {/* Services Section */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Our Software Development Services
            </h2>
            <p className="section-description">
              We specialize in building modern, scalable software solutions using the latest technologies
            </p>
          </div>

          <div className="benefits-grid">
            {services.map((service, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">{service.icon}</div>
                <h3 className="benefit-title">{service.title}</h3>
                <p className="benefit-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding section-bg-gray">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Why Choose Our Development Team?
            </h2>
            <p className="section-description">
              We combine technical expertise with business understanding to deliver exceptional results
            </p>
          </div>

          <div className="benefits-grid">
            {features.map((feature, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">{feature.icon}</div>
                <h3 className="benefit-title">{feature.title}</h3>
                <p className="benefit-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="our-process" className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Our Development Process
            </h2>
            <p className="section-description">
              A proven methodology that ensures your project is delivered on time, on budget, and exceeds expectations
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

      {/* CTA to Form Section */}
      <section id="get-quote" className="section-padding section-bg-gray">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Start Your Project Today
            </h2>
            <p className="section-description">
              Tell us about your project requirements and we'll provide you with a detailed proposal within 24 hours
            </p>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Button 
              variant="primary" 
              size="lg" 
              className="btn-primary"
              href="/project-request"
              style={{ backgroundColor: '#3b82f6', color: 'white' }}
            >
              Start Project Request
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">
              Ready to Transform Your Business?
            </h2>
            <p className="cta-subtitle">
              Let's discuss how we can help you build the perfect software solution for your needs
            </p>
            <div className="cta-buttons">
              <Button 
                variant="secondary" 
                size="lg" 
                className="cta-button-primary"
                href="mailto:hello@workforce.com"
              >
                Contact Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
