import React from 'react';
import RoleCards from '../components/sections/RoleCards';
import Button from '../components/common/Button';
import { 
  CodeBracketIcon, 
  PaintBrushIcon, 
  ChartBarIcon,
  MegaphoneIcon,
  CogIcon,
  ShieldCheckIcon,
  BriefcaseIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import '../styles/components/ourroles.css';

const OurRoles = () => {
  const roleCategories = [
    {
      icon: <CodeBracketIcon className="h-12 w-12" />,
      title: 'Software Development',
      description: 'Expert developers across all major technologies and frameworks',
      roles: [
        'Frontend Developers (React, Vue, Angular)',
        'Backend Developers (Node.js, Python, Java, .NET)',
        'Full-Stack Developers',
        'Mobile Developers (iOS, Android, React Native)',
        'DevOps Engineers',
        'Quality Assurance Engineers'
      ],
      skills: ['JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'Docker'],
      hourlyRange: '$25 - $120'
    },
    {
      icon: <PaintBrushIcon className="h-12 w-12" />,
      title: 'Design & Creative',
      description: 'Talented designers who bring your vision to life',
      roles: [
        'UI/UX Designers',
        'Product Designers',
        'Graphic Designers',
        'Brand Designers',
        'Video Editors',
        'Motion Graphics Artists'
      ],
      skills: ['Figma', 'Adobe Suite', 'Sketch', 'InVision', 'Principle', 'After Effects'],
      hourlyRange: '$20 - $80'
    },
    {
      icon: <ChartBarIcon className="h-12 w-12" />,
      title: 'Data & Analytics',
      description: 'Data experts who turn information into insights',
      roles: [
        'Data Scientists',
        'Data Analysts',
        'Business Intelligence Specialists',
        'Machine Learning Engineers',
        'Data Engineers',
        'Statistics Experts'
      ],
      skills: ['Python', 'R', 'SQL', 'Tableau', 'Power BI', 'Machine Learning'],
      hourlyRange: '$30 - $100'
    },
    {
      icon: <MegaphoneIcon className="h-12 w-12" />,
      title: 'Digital Marketing',
      description: 'Marketing professionals who drive growth and engagement',
      roles: [
        'Digital Marketing Specialists',
        'SEO/SEM Experts',
        'Content Marketers',
        'Social Media Managers',
        'Email Marketing Specialists',
        'PPC Campaign Managers'
      ],
      skills: ['Google Ads', 'Facebook Ads', 'SEO', 'Content Strategy', 'Analytics', 'HubSpot'],
      hourlyRange: '$15 - $60'
    },
    {
      icon: <CogIcon className="h-12 w-12" />,
      title: 'Business & Operations',
      description: 'Strategic professionals who optimize and scale operations',
      roles: [
        'Project Managers',
        'Business Analysts',
        'Operations Specialists',
        'Virtual Assistants',
        'Customer Success Managers',
        'Sales Development Representatives'
      ],
      skills: ['Project Management', 'Agile', 'Scrum', 'Salesforce', 'CRM', 'Process Optimization'],
      hourlyRange: '$12 - $65'
    },
    {
      icon: <ShieldCheckIcon className="h-12 w-12" />,
      title: 'Specialized Skills',
      description: 'Niche experts for specialized technical requirements',
      roles: [
        'Cybersecurity Specialists',
        'Blockchain Developers',
        'AI/ML Specialists',
        'Cloud Architects',
        'Technical Writers',
        'System Administrators'
      ],
      skills: ['Cybersecurity', 'Blockchain', 'AI/ML', 'Cloud Computing', 'Technical Writing', 'System Admin'],
      hourlyRange: '$40 - $150'
    }
  ];

  const hiringProcess = [
    {
      step: 1,
      title: 'Tell Us Your Needs',
      description: 'Share your project requirements, timeline, and budget'
    },
    {
      step: 2,
      title: 'Get Matched',
      description: 'We match you with pre-vetted talent within 24-48 hours'
    },
    {
      step: 3,
      title: 'Interview & Select',
      description: 'Interview candidates and choose the best fit for your project'
    },
    {
      step: 4,
      title: 'Start Working',
      description: 'Begin your project with ongoing support from our team'
    }
  ];

  const benefits = [
    'Pre-vetted professionals only',
    'Fast matching within 48 hours',
    'Flexible engagement models',
    'Dedicated account management',
    'Quality guarantee',
    'Global talent pool',
    'Competitive rates',
    'Ongoing support'
  ];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="ourroles-hero">
        <div className="ourroles-hero-container">
          <div className="ourroles-hero-content">
            <div className="ourroles-hero-badge">
              <BriefcaseIcon className="ourroles-hero-badge-icon" />
              <span className="ourroles-hero-badge-text">TALENT MARKETPLACE</span>
            </div>
            <h1 className="ourroles-hero-title">
              Find the 
              <br />
              <span className="ourroles-hero-highlight">Perfect Role</span>
            </h1>
            <p className="ourroles-hero-subtitle">
              Explore our comprehensive range of pre-vetted professionals across technology, 
              design, marketing, and specialized fields ready to elevate your projects.
            </p>
            
            <div className="ourroles-hero-stats">
              <div className="ourroles-hero-stat">
                <div className="ourroles-hero-stat-number">200+</div>
                <div className="ourroles-hero-stat-label">Available Roles</div>
              </div>
              <div className="ourroles-hero-stat">
                <div className="ourroles-hero-stat-number">6</div>
                <div className="ourroles-hero-stat-label">Categories</div>
              </div>
              <div className="ourroles-hero-stat">
                <div className="ourroles-hero-stat-number">48hr</div>
                <div className="ourroles-hero-stat-label">Matching</div>
              </div>
              <div className="ourroles-hero-stat">
                <div className="ourroles-hero-stat-number">95%</div>
                <div className="ourroles-hero-stat-label">Success Rate</div>
              </div>
            </div>
            
            <div className="ourroles-hero-cta">
              <Button 
                variant="secondary" 
                size="lg" 
                className="hero-btn hero-btn-primary"
                href="/hire-with-us"
              >
                Start Hiring
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="ourroles-hero-floating-elements">
          <div className="ourroles-hero-rect ourroles-hero-rect-1"></div>
          <div className="ourroles-hero-rect ourroles-hero-rect-2"></div>
          <div className="ourroles-hero-rect ourroles-hero-rect-3"></div>
          <div className="ourroles-hero-circle ourroles-hero-circle-1"></div>
          <div className="ourroles-hero-circle ourroles-hero-circle-2"></div>
          <div className="ourroles-hero-triangle"></div>
        </div>
        
        {/* Professional Grid Background */}
        <div className="ourroles-hero-grid"></div>
      </section>

      {/* Role Categories */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Roles We Specialize In
            </h2>
            <p className="section-description">
              From technical experts to creative professionals, find the right talent for any project
            </p>
          </div>

          <div className="role-categories-grid">
            {roleCategories.map((category, index) => (
              <div key={index} className="role-category-card">
                <div className="role-category-header">
                  <div className="role-category-icon">{category.icon}</div>
                  <div className="role-category-info">
                    <h3 className="role-category-title">{category.title}</h3>
                    <p className="role-category-description">{category.description}</p>
                  </div>
                </div>

                <div className="role-category-section">
                  <h4 className="role-section-title">Available Roles:</h4>
                  <div className="role-list-grid">
                    {category.roles.map((role, roleIndex) => (
                      <div key={roleIndex} className="role-list-item">
                        <div className="role-bullet"></div>
                        {role}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="role-category-section">
                  <h4 className="role-section-title">Key Skills:</h4>
                  <div className="skill-tags">
                    {category.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex} 
                        className="skill-tag"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="role-category-footer">
                  <div className="hourly-rate">
                    <span className="rate-label">Hourly Rate: </span>
                    <span className="rate-value">{category.hourlyRange}</span>
                  </div>
                  {/*button to apply*/}
                  <Button 
                    variant="primary" 
                    size="sm"
                    href="/TalentApplication"
                  >
                    Apply Now
                  </Button>
                  <Button 
                    variant="primary" 
                    size="sm"
                    href="/hire-with-us"
                  >
                    Hire Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Roles */}
      <section className="section-padding bg-gray-50">
        <div className="container">
         
          <RoleCards />
        </div>
      </section>

      {/* Hiring Process */}
      <section className="section-padding section-bg-blue">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              How It Works
            </h2>
            <p className="section-description">
              Our streamlined process gets you connected with the right talent quickly
            </p>
          </div>

          <div className="hiring-process-grid">
            {hiringProcess.map((step, index) => (
              <div key={index} className="hiring-step">
                <div className="hiring-step-number">
                  {step.step}
                </div>
                <h3 className="hiring-step-title">{step.title}</h3>
                <p className="hiring-step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="section-content-max">
            <div className="section-header">
              <h2 className="section-title">
                Why Choose Our Talent
              </h2>
              <p className="section-description">
                We provide more than just talent - we provide peace of mind
              </p>
            </div>

            <div className="benefits-grid-simple">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-item">
                  <div className="benefit-bullet"></div>
                  <span className="benefit-text">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section-padding">
        <div className="container">
          <div className="pricing-content">
            <h2 className="section-title">
              Transparent Pricing
            </h2>
            <p className="section-description">
              No hidden fees, no surprises. Simple, transparent pricing that scales with your needs.
            </p>
            
            <div className="pricing-visual-container">
              <div className="pricing-infographic">
                {/* Talent Rate Component */}
                <div className="pricing-component pricing-talent-rate">
                  <div className="pricing-icon-container">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <h3 className="pricing-component-title">Talent Rate</h3>
                  <p className="pricing-component-description">
                    You pay the agreed hourly or project rate directly to the talent
                  </p>
                </div>

                {/* Plus Symbol */}
                <div className="pricing-plus-container">
                  +
                </div>

                {/* Platform Fee Component */}
                <div className="pricing-component pricing-platform-fee">
                  <div className="pricing-icon-container">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <h3 className="pricing-component-title">15% Platform Fee</h3>
                  <p className="pricing-component-description">
                    One-time fee for matching, vetting, and ongoing support
                  </p>
                </div>

                {/* Equals Symbol */}
                <div className="pricing-equals-container">
                  <div className="pricing-equals">
                    =
                  </div>
                </div>

                {/* Total Component */}
                <div className="pricing-component pricing-total">
                  <div className="pricing-icon-container" style={{background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'}}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                    </svg>
                  </div>
                  <h3 className="pricing-component-title">Your Total Cost</h3>
                  <p className="pricing-component-description">
                    Simple, predictable pricing with no hidden fees
                  </p>
                </div>
              </div>

              {/* Result Box */}
              <div className="pricing-result">
                <h4 className="pricing-result-title">What You Get</h4>
                <div className="pricing-benefits">
                  <div className="pricing-benefit-item">
                    <svg className="pricing-benefit-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <span className="pricing-benefit-text">Pre-vetted talent</span>
                  </div>
                  <div className="pricing-benefit-item">
                    <svg className="pricing-benefit-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <span className="pricing-benefit-text">48-hour matching</span>
                  </div>
                  <div className="pricing-benefit-item">
                    <svg className="pricing-benefit-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <span className="pricing-benefit-text">Ongoing support</span>
                  </div>
                  <div className="pricing-benefit-item">
                    <svg className="pricing-benefit-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <span className="pricing-benefit-text">Quality guarantee</span>
                  </div>
                </div>
              </div>

              {/* Example Calculation */}
              <div className="pricing-example">
                <div className="pricing-example-content">
                  <p>
                    <strong>Example:</strong> If you hire a developer at <span className="pricing-highlight">$50/hour</span>, 
                    you pay <span className="pricing-highlight">$50/hour + $7.50 platform fee = $57.50/hour total</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section bg-primary">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">
              Ready to Find Your Perfect Match?
            </h2>
            <p className="cta-subtitle">
              Tell us about your project and we'll connect you with the ideal talent within 48 hours
            </p>
            <div className="cta-buttons">
              <Button 
                variant="secondary" 
                size="lg" 
                className="cta-button-primary"
                href="/hire-with-us"
              >
                Start Your Project
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="cta-button-secondary"
                href="/solutions"
              >
                Request a Project
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurRoles;
