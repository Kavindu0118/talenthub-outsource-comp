import React from 'react';
import { 
  MagnifyingGlassIcon, 
  DocumentCheckIcon, 
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  HandThumbUpIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ClockIcon,
  CheckBadgeIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import Button from '../components/common/Button';
import ProcessSteps from '../components/sections/ProcessSteps';
import '../styles/components/howwehire.css';

const HowWeHire = () => {
  const vettingSteps = [
    {
      step: 1,
      icon: <DocumentCheckIcon className="h-8 w-8" />,
      title: 'Application Review',
      description: 'We carefully review every application, examining portfolios, experience, and professional background.',
      details: [
        'Resume and portfolio analysis',
        'Experience verification',
        'Educational background check',
        'Professional references'
      ]
    },
    {
      step: 2,
      icon: <AcademicCapIcon className="h-8 w-8" />,
      title: 'Skills Assessment',
      description: 'Comprehensive technical and soft skills evaluation tailored to each role and expertise level.',
      details: [
        'Technical coding challenges',
        'Problem-solving assessments',
        'Industry-specific tests',
        'Communication evaluation'
      ]
    },
    {
      step: 3,
      icon: <ChatBubbleLeftRightIcon className="h-8 w-8" />,
      title: 'Video Interview',
      description: 'Personal interview with our talent acquisition team to assess cultural fit and communication skills.',
      details: [
        'Behavioral interview questions',
        'Cultural fit assessment',
        'Communication skills evaluation',
        'Career goals discussion'
      ]
    },
    {
      step: 4,
      icon: <ClipboardDocumentListIcon className="h-8 w-8" />,
      title: 'Background Verification',
      description: 'Thorough background checks to ensure reliability and professionalism.',
      details: [
        'Employment history verification',
        'Educational credentials check',
        'Professional certifications',
        'Reference validation'
      ]
    },
    {
      step: 5,
      icon: <AcademicCapIcon className="h-8 w-8" />,
      title: 'Practical Test',
      description: 'Real-world project simulation to demonstrate actual working capabilities.',
      details: [
        'Project-based assignments',
        'Time management assessment',
        'Quality standards evaluation',
        'Collaboration skills test'
      ]
    },
    {
      step: 6,
      icon: <HandThumbUpIcon className="h-8 w-8" />,
      title: 'Final Approval',
      description: 'Final review and approval by our senior team before joining our talent network.',
      details: [
        'Comprehensive evaluation review',
        'Team consensus approval',
        'Onboarding preparation',
        'Network integration'
      ]
    }
  ];

  const qualityMetrics = [
    {
      metric: '< 3%',
      label: 'Acceptance Rate',
      description: 'Only the top 3% of applicants make it through our rigorous vetting process'
    },
    {
      metric: '6-Stage',
      label: 'Vetting Process',
      description: 'Comprehensive evaluation across technical skills, communication, and cultural fit'
    },
    {
      metric: '95%',
      label: 'Client Satisfaction',
      description: 'Our clients consistently rate our talent quality as excellent'
    },
    {
      metric: '2-3 Weeks',
      label: 'Vetting Timeline',
      description: 'Thorough evaluation process completed within 2-3 weeks on average'
    }
  ];

  const skillAreas = [
    {
      category: 'Software Development',
      skills: ['Frontend Development', 'Backend Development', 'Full-Stack Development', 'Mobile Development', 'DevOps']
    },
    {
      category: 'Design & Creative',
      skills: ['UI/UX Design', 'Graphic Design', 'Product Design', 'Brand Design', 'Video Production']
    },
    {
      category: 'Data & Analytics',
      skills: ['Data Science', 'Machine Learning', 'Business Intelligence', 'Data Engineering', 'Analytics']
    },
    {
      category: 'Digital Marketing',
      skills: ['SEO/SEM', 'Content Marketing', 'Social Media', 'Email Marketing', 'PPC Advertising']
    },
    {
      category: 'Business & Strategy',
      skills: ['Project Management', 'Business Analysis', 'Consulting', 'Operations', 'Sales']
    },
    {
      category: 'Specialized Skills',
      skills: ['Cybersecurity', 'Blockchain', 'AI/ML', 'Cloud Architecture', 'Quality Assurance']
    }
  ];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="howwehire-hero">
        <div className="howwehire-hero-container">
          <div className="howwehire-hero-content">
            <div className="howwehire-hero-badge">
              <CheckBadgeIcon className="howwehire-hero-badge-icon" />
              <span className="howwehire-hero-badge-text">6-STAGE PROCESS</span>
            </div>
            <h1 className="howwehire-hero-title">
              How We Hire the 
              <br />
              <span className="howwehire-hero-highlight">Top 3%</span>
            </h1>
            <p className="howwehire-hero-subtitle">
              Our rigorous vetting process ensures you work with only the most exceptional talent, 
              saving you time and guaranteeing quality results for every project.
            </p>
            
            <div className="howwehire-hero-features">
              <div className="howwehire-hero-feature">
                <div className="howwehire-hero-feature-icon">
                  <ShieldCheckIcon className="h-6 w-6" />
                </div>
                <h3 className="howwehire-hero-feature-title">Quality Guaranteed</h3>
                <p className="howwehire-hero-feature-description">
                  Only 3% of applicants pass our comprehensive evaluation
                </p>
              </div>
              <div className="howwehire-hero-feature">
                <div className="howwehire-hero-feature-icon">
                  <ClockIcon className="h-6 w-6" />
                </div>
                <h3 className="howwehire-hero-feature-title">Fast Matching</h3>
                <p className="howwehire-hero-feature-description">
                  Pre-vetted talent means quicker project starts
                </p>
              </div>
              <div className="howwehire-hero-feature">
                <div className="howwehire-hero-feature-icon">
                  <StarIcon className="h-6 w-6" />
                </div>
                <h3 className="howwehire-hero-feature-title">95% Success Rate</h3>
                <p className="howwehire-hero-feature-description">
                  Exceptional client satisfaction across all projects
                </p>
              </div>
            </div>
            
            <div className="howwehire-hero-cta">
              <Button 
                variant="secondary" 
                size="lg" 
                className="hero-btn hero-btn-primary"
                href="/hire-with-us"
              >
                Start Hiring Now
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="howwehire-hero-floating-elements">
          <div className="howwehire-hero-hexagon howwehire-hero-hexagon-1"></div>
          <div className="howwehire-hero-hexagon howwehire-hero-hexagon-2"></div>
          <div className="howwehire-hero-hexagon howwehire-hero-hexagon-3"></div>
          <div className="howwehire-hero-diamond"></div>
          <div className="howwehire-hero-pentagon"></div>
          <div className="howwehire-hero-process-line"></div>
        </div>
        
        {/* Process Flow Background */}
        <div className="howwehire-hero-process-dots"></div>
      </section>

      {/* Quality Metrics */}
      <section className="metrics-section">
        <div className="container">
          <div className="metrics-grid">
            {qualityMetrics.map((metric, index) => (
              <div key={index} className="metric-item">
                <div className="metric-value">
                  {metric.metric}
                </div>
                <div className="metric-label">
                  {metric.label}
                </div>
                <p className="metric-description">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vetting Process */}
      <section className="section-padding section-bg-gray">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Our 6-Stage Vetting Process
            </h2>
            <p className="section-description">
              Every candidate goes through our comprehensive evaluation process to ensure excellence
            </p>
          </div>

          <div className="vetting-grid">
            {vettingSteps.map((step, index) => (
              <div key={index} className="vetting-card">
                <div className="vetting-card-header">
                  <div className="vetting-step-number">
                    <div className="step-number">
                      {step.step}
                    </div>
              
                  </div>
                  <div className="vetting-step-content">
                    <h3 className="vetting-step-title">
                      {step.title}
                    </h3>
                    <p className="vetting-step-description">
                      {step.description}
                    </p>
                   
                  </div>
                  
                </div>
                 <ul className="vetting-details">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="vetting-detail-item">
                          <div className="detail-bullet"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills We Test */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Skills We Evaluate
            </h2>
            <p className="section-description">
              We assess talent across a wide range of skills and specializations
            </p>
          </div>

          <div className="skills-grid">
            {skillAreas.map((area, index) => (
              <div key={index} className="skill-area-card">
                <h3 className="skill-area-title">
                  {area.category}
                </h3>
                <ul className="skill-list">
                  {area.skills.map((skill, skillIndex) => (
                    <li key={skillIndex} className="skill-item">
                      <span className="skill-check">✓</span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Process Works */}
      <section className="section-padding section-bg-gray">
        <div className="container">
          <div className="section-content">
            <div className="section-header">
              <h2 className="section-title">
                Why Our Process Works
              </h2>
              <p className="section-description">
                The result of our thorough vetting process is a network of exceptional professionals
              </p>
            </div>

            <div className="process-benefits-grid">
              <div className="process-benefit">
                <div className="process-benefit-icon">
                  <ShieldCheckIcon className="benefit-icon" />
                </div>
                <h3 className="process-benefit-title">Quality Assurance</h3>
                <p className="process-benefit-description">
                  Multiple checkpoints ensure only top-tier talent joins our network
                </p>
              </div>

              <div className="process-benefit">
                <div className="process-benefit-icon">
                  <ClockIcon className="benefit-icon" />
                </div>
                <h3 className="process-benefit-title">Time Efficiency</h3>
                <p className="process-benefit-description">
                  Pre-vetted talent means faster project starts and better outcomes
                </p>
              </div>

              <div className="process-benefit">
                <div className="process-benefit-icon">
                  <UserGroupIcon className="benefit-icon" />
                </div>
                <h3 className="process-benefit-title">Perfect Matches</h3>
                <p className="process-benefit-description">
                  Comprehensive evaluation leads to better talent-project alignment
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">
              Ready to Work with Pre-Vetted Talent?
            </h2>
            <p className="cta-subtitle">
              Skip the lengthy hiring process and get matched with qualified professionals today
            </p>
            <div className="cta-buttons">
              <Button 
                variant="secondary" 
                size="lg" 
                className="cta-button-primary"
                href="/hire-with-us"
              >
                Hire Now
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="cta-button-secondary"
                href="/our-roles"
              >
                View Available Roles
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Simple check icon component
const CheckIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default HowWeHire;
