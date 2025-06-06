import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UserCircleIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  CodeBracketIcon,
  CheckBadgeIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import Button from '../common/Button';

const ProcessSteps = () => {
  const steps = [
    {
      id: 1,
      title: 'Application Review',
      description: 'We carefully review your application, portfolio, and experience to ensure initial compatibility.',
      icon: DocumentTextIcon,
      color: 'bg-blue-500',
    },
    {
      id: 2,
      title: 'Skills Assessment',
      description: 'Comprehensive technical evaluation including coding challenges and domain-specific tests.',
      icon: CodeBracketIcon,
      color: 'bg-purple-500',
    },
    {
      id: 3,
      title: 'Communication Test',
      description: 'Assessment of English proficiency and communication skills essential for remote collaboration.',
      icon: ChatBubbleLeftRightIcon,
      color: 'bg-green-500',
    },
    {
      id: 4,
      title: 'Technical Interview',
      description: 'In-depth discussion with senior engineers to evaluate problem-solving and technical expertise.',
      icon: UserCircleIcon,
      color: 'bg-orange-500',
    },
    {
      id: 5,
      title: 'Background Verification',
      description: 'Thorough verification of work history, references, and professional credentials.',
      icon: CheckBadgeIcon,
      color: 'bg-red-500',
    },
    {
      id: 6,
      title: 'Final Approval',
      description: 'Welcome to our elite talent network! Ready to be matched with exciting opportunities.',
      icon: UserGroupIcon,
      color: 'bg-primary',
    },
  ];

  return (
    <section className="process-steps">
      <div className="process-steps-container">
        <div className="process-header">
          <h2 className="process-title">
            Our 6-Stage Vetting Process
          </h2>
          <p className="process-description">
            We maintain the highest standards through our comprehensive evaluation process, 
            ensuring only the top 3% of applicants join our talent network.
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="timeline-desktop">
          <div className="timeline-container">
            {/* Timeline Line */}
            <div className="timeline-line"></div>
            <div className="timeline-line-active"></div>
            
            {/* Steps */}
            <div className="timeline-steps">
              {steps.map((step, index) => (
                <div key={step.id} className="timeline-step">
                  {/* Icon Circle */}
                  <div className={`step-icon ${step.color === 'bg-blue-500' ? 'bg-blue' : 
                    step.color === 'bg-purple-500' ? 'bg-purple' : 
                    step.color === 'bg-green-500' ? 'bg-green' : 
                    step.color === 'bg-orange-500' ? 'bg-orange' : 
                    step.color === 'bg-red-500' ? 'bg-red' : 'bg-primary'}`}>
                    <step.icon />
                  </div>
                  
                  {/* Content */}
                  <div className="step-content">
                    <div>
                      <h3 className="step-title">{step.title}</h3>
                      <p className="step-description">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Vertical Timeline */}
        <div className="timeline-mobile">
          <div className="mobile-steps">
            {steps.map((step, index) => (
              <div key={step.id} className="mobile-step">
                {/* Icon and Line */}
                <div className="mobile-step-icon-container">
                  <div className={`mobile-step-icon ${step.color === 'bg-blue-500' ? 'bg-blue' : 
                    step.color === 'bg-purple-500' ? 'bg-purple' : 
                    step.color === 'bg-green-500' ? 'bg-green' : 
                    step.color === 'bg-orange-500' ? 'bg-orange' : 
                    step.color === 'bg-red-500' ? 'bg-red' : 'bg-primary'}`}>
                    <step.icon />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="mobile-step-line"></div>
                  )}
                </div>
                
                {/* Content */}
                <div className="mobile-step-content">
                  <div className="mobile-step-header">
                    <span className="step-number">
                      {step.id}
                    </span>
                    <h3 className="mobile-step-title">{step.title}</h3>
                  </div>
                  <p className="mobile-step-description">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="process-cta">
          <h3 className="process-cta-title">
            Ready to Join Our Elite Talent Network?
          </h3>
          <p className="process-cta-description">
            Start your journey with us today. The application process takes about 15 minutes to complete.
          </p>
          <Link to="/talent-application">
            <Button size="lg">
              Apply Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;