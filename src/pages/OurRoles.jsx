import React from 'react';
import RoleCards from '../components/sections/RoleCards';
import Button from '../components/common/Button';
import { 
  CodeBracketIcon, 
  PaintBrushIcon, 
  ChartBarIcon,
  MegaphoneIcon,
  CogIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

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
      <section className="hero-section hero-gradient">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Find the Perfect Role
            </h1>
            <p className="hero-subtitle">
              Explore our comprehensive range of roles across technology, design, marketing, and specialized fields
            </p>
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
          <div className="section-header">
            <h2 className="section-title">
              Most Popular Roles
            </h2>
            <p className="section-description">
              These are the roles most frequently requested by our clients
            </p>
          </div>
          <RoleCards />
        </div>
      </section>

      {/* Hiring Process */}
      <section className="section-padding">
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
              No hidden fees, no surprises. You pay the talent's rate plus a small platform fee.
            </p>
            
            <div className="pricing-box">
              <div className="pricing-grid">
                <div className="pricing-item">
                  <h3>Talent Rate</h3>
                  <p>You pay the agreed hourly or project rate directly to the talent</p>
                </div>
                <div className="pricing-item">
                  <h3>+</h3>
                </div>
                <div className="pricing-item">
                  <h3>15% Platform Fee</h3>
                  <p>One-time fee for matching, vetting, and ongoing support</p>
                </div>
              </div>
              <div className="pricing-example">
                <p>
                  <strong>Example:</strong> If you hire a developer at $50/hour, you pay $50/hour + $7.50 platform fee = $57.50/hour total
                </p>
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
                href="/how-we-hire"
              >
                Learn About Our Process
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurRoles;
