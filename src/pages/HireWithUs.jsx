import React from 'react';
import ClientForm from '../components/forms/ClientForm';
import { 
  ClockIcon, 
  ShieldCheckIcon, 
  UserGroupIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import Button from '../components/common/Button';

const HireWithUs = () => {
  const benefits = [
    {
      icon: <ClockIcon style={{height: '2rem', width: '2rem'}} />,
      title: 'Fast Matching',
      description: 'Get matched with qualified talent in 24-48 hours, not weeks'
    },
    {
      icon: <ShieldCheckIcon style={{height: '2rem', width: '2rem'}} />,
      title: 'Pre-Vetted Quality',
      description: 'Every professional has passed our rigorous 6-stage screening process'
    },
    {
      icon: <UserGroupIcon style={{height: '2rem', width: '2rem'}} />,
      title: 'Perfect Fit Guarantee',
      description: 'We ensure the talent matches your project requirements and culture'
    },
    {
      icon: <CurrencyDollarIcon style={{height: '2rem', width: '2rem'}} />,
      title: 'Transparent Pricing',
      description: 'No hidden fees - pay only the talent rate plus a small platform fee'
    },
    {
      icon: <ChatBubbleLeftRightIcon style={{height: '2rem', width: '2rem'}} />,
      title: 'Dedicated Support',
      description: 'Ongoing support from our team throughout your project'
    },
    {
      icon: <CheckCircleIcon style={{height: '2rem', width: '2rem'}} />,
      title: 'Success Guarantee',
      description: 'We stand behind our matches with a satisfaction guarantee'
    }
  ];

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



  const faqs = [
    {
      question: "How quickly can I get matched with talent?",
      answer: "Our typical matching time is 24-48 hours. For urgent projects, we can often provide matches within 12 hours."
    },
    {
      question: "What if I'm not satisfied with the talent?",
      answer: "We offer a satisfaction guarantee. If you're not happy with your match within the first week, we'll find you a replacement at no additional cost."
    },
    {
      question: "How does pricing work?",
      answer: "You pay the talent's hourly or project rate plus a 15% platform fee. No hidden costs, no long-term commitments."
    },
    {
      question: "Can I hire talent for long-term projects?",
      answer: "Absolutely! Our talent is available for projects ranging from a few hours to several months or even permanent positions."
    },
    {
      question: "What types of projects do you support?",
      answer: "We support all types of digital projects including web development, mobile apps, design, marketing, data analysis, and more."
    },
    {
      question: "Do you provide project management support?",
      answer: "Yes, we offer dedicated account management and can provide project management services if needed."
    }
  ];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero-section hero-gradient">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Hire Top Talent in 48 Hours
            </h1>
            <p className="hero-subtitle">
              Skip the lengthy hiring process. Get matched with pre-vetted professionals who are ready to start immediately.
            </p>
            <div className="cta-buttons">
              <Button 
                variant="primary" 
                size="lg" 
                className="btn-primary"
                href="#get-started"
                style={{ backgroundColor: '#3b82f6', color: 'white' }}
              >
                Get Started Now
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="cta-button-secondary"
                href="#how-it-works"
                style={{ 
                  borderColor: '#3b82f6', 
                  color: '#3b82f6',
                  transition: 'all 0.2s'
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
                See How It Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Why Choose Our Platform?
            </h2>
            <p className="section-description">
              We make hiring remote talent simple, fast, and reliable
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

      {/* FAQ Section */}
      <section className="section-padding section-bg-gray">
        <div className="container">
          <div className="section-content">
            <div className="section-header">
              <h2 className="section-title">
                Frequently Asked Questions
              </h2>
              <p className="section-description">
                Got questions? We've got answers.
              </p>
            </div>

            <div className="faq-grid">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-card">
                  <h3 className="faq-question">{faq.question}</h3>
                  <p className="faq-answer">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="get-started" className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Start Your Project Today
            </h2>
            <p className="section-description">
              Tell us about your project and we'll match you with the perfect talent within 48 hours
            </p>
          </div>

          <ClientForm />
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">
              Still Have Questions?
            </h2>
            <p className="cta-subtitle">
              Our team is here to help you find the perfect talent for your project
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

export default HireWithUs;
