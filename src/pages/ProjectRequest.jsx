import React, { useState } from 'react';
import { 
  ArrowLeftIcon, 
  ArrowRightIcon, 
  CheckIcon,
  UserIcon,
  BriefcaseIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';
import { useFormSubmission } from '../hooks/useFormSubmission';
import '../styles/components/projectrequest.css';

const ProjectRequest = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { submitForm, isSubmitting, submitStatus, submitMessage, resetStatus } = useFormSubmission();
  
  // Create notification object based on submit status
  const notification = submitStatus ? {
    type: submitStatus === 'success' ? 'success' : 'error',
    message: submitMessage
  } : null;

  // Auto-hide success notifications after 5 seconds
  React.useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => {
        resetStatus();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus, resetStatus]);
  
  const [formData, setFormData] = useState({
    // Personal Information
    name: '',
    email: '',
    phone: '',
    company: '',
    
    // Project Details
    projectType: '',
    projectTitle: '',
    description: '',
    timeline: '',
    budget: '',
    platform: [],
    technology: '',
    
    // Additional Requirements
    features: '',
    targetAudience: '',
    designPreference: '',
    additionalRequirements: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'platform') {
        setFormData(prev => ({
          ...prev,
          platform: checked
            ? [...prev.platform, value]
            : prev.platform.filter(item => item !== value)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Add the form type identifier for the useFormSubmission hook
      const submissionData = {
        ...formData,
        type: 'project-request',
        formType: 'project-request'
      };
      
      const result = await submitForm(submissionData);
      
      if (result.success) {
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          projectTitle: '',
          description: '',
          timeline: '',
          budget: '',
          platform: [],
          technology: '',
          features: '',
          targetAudience: '',
          designPreference: '',
          additionalRequirements: ''
        });
        setCurrentStep(1);
        
        // Reset status after a delay to hide notification
        setTimeout(() => {
          resetStatus();
        }, 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const steps = [
    {
      number: 1,
      title: 'Personal Information',
      icon: <UserIcon className="step-icon" />,
      description: 'Tell us about yourself and your company'
    },
    {
      number: 2,
      title: 'Project Details',
      icon: <BriefcaseIcon className="step-icon" />,
      description: 'Describe your project requirements'
    },
    {
      number: 3,
      title: 'Additional Requirements',
      icon: <PaperAirplaneIcon className="step-icon" />,
      description: 'Final details and submission'
    }
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-content">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your email address"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone" className="form-label">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your phone number"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="company" className="form-label">Company Name</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your company name (optional)"
              />
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="form-content">
            <div className="form-group">
              <label htmlFor="projectType" className="form-label">Project Type *</label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Select Project Type</option>
                <option value="web-application">Web Application</option>
                <option value="mobile-app">Mobile Application</option>
                <option value="ecommerce">E-commerce Solution</option>
                <option value="business-software">Business Software</option>
                <option value="api-development">API Development</option>
                <option value="cloud-solution">Cloud Solution</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="projectTitle" className="form-label">Project Title *</label>
              <input
                type="text"
                id="projectTitle"
                name="projectTitle"
                value={formData.projectTitle}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Give your project a title"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description" className="form-label">Project Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="form-textarea"
                placeholder="Describe your project in detail..."
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="timeline" className="form-label">Timeline *</label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Timeline</option>
                  <option value="1-2 weeks">1-2 weeks</option>
                  <option value="1 month">1 month</option>
                  <option value="2-3 months">2-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="6+ months">6+ months</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="budget" className="form-label">Budget Range *</label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Budget Range</option>
                  <option value="Under $5,000">Under $5,000</option>
                  <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                  <option value="$15,000 - $50,000">$15,000 - $50,000</option>
                  <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                  <option value="$100,000+">$100,000+</option>
                  <option value="To be discussed">To be discussed</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Target Platform(s) *</label>
              <div className="checkbox-group">
                {['Web Browser', 'iOS', 'Android', 'Desktop', 'API Only'].map((platform) => (
                  <label key={platform} className="checkbox-label">
                    <input
                      type="checkbox"
                      name="platform"
                      value={platform}
                      checked={formData.platform.includes(platform)}
                      onChange={handleInputChange}
                      className="checkbox-input"
                    />
                    <span className="checkbox-text">{platform}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="form-content">
            <div className="form-group">
              <label htmlFor="technology" className="form-label">Preferred Technology/Framework</label>
              <input
                type="text"
                id="technology"
                name="technology"
                value={formData.technology}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., React, Vue.js, Node.js, Python, etc."
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="features" className="form-label">Key Features Required</label>
              <textarea
                id="features"
                name="features"
                value={formData.features}
                onChange={handleInputChange}
                rows="3"
                className="form-textarea"
                placeholder="List the key features you need..."
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="targetAudience" className="form-label">Target Audience</label>
              <input
                type="text"
                id="targetAudience"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Who will use this application?"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="designPreference" className="form-label">Design Preference</label>
              <select
                id="designPreference"
                name="designPreference"
                value={formData.designPreference}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">Select Design Style</option>
                <option value="modern-minimalist">Modern & Minimalist</option>
                <option value="professional-corporate">Professional & Corporate</option>
                <option value="creative-colorful">Creative & Colorful</option>
                <option value="clean-simple">Clean & Simple</option>
                <option value="custom-design">Custom Design Required</option>
                <option value="no-preference">No Preference</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="additionalRequirements" className="form-label">Additional Requirements</label>
              <textarea
                id="additionalRequirements"
                name="additionalRequirements"
                value={formData.additionalRequirements}
                onChange={handleInputChange}
                rows="4"
                className="form-textarea"
                placeholder="Any other requirements, integrations, or special considerations..."
              />
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="project-request-page">
      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-container">
          {steps.map((step, index) => (
            <div key={step.number} className="progress-step">
              <div className={`progress-step-indicator ${currentStep >= step.number ? 'active' : ''}`}>
                {currentStep > step.number ? (
                  <CheckIcon className="progress-check-icon" />
                ) : (
                  <span className="progress-step-number">{step.number}</span>
                )}
              </div>
              <div className="progress-step-label">{step.title}</div>
              {index < steps.length - 1 && (
                <div className={`progress-line ${currentStep > step.number ? 'completed' : ''}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-container">
          {/* Left Column - Information */}
          <div className="info-column">
            <div className="step-info">
              <div className="step-icon-container">
                {steps[currentStep - 1].icon}
              </div>
              <h1 className="step-title">{steps[currentStep - 1].title}</h1>
              <p className="step-description">{steps[currentStep - 1].description}</p>
              
              <div className="step-features">
                <h3>What we'll cover:</h3>
                <ul>
                  {currentStep === 1 && (
                    <>
                      <li>Your contact information</li>
                      <li>Company details</li>
                      <li>How we can reach you</li>
                    </>
                  )}
                  {currentStep === 2 && (
                    <>
                      <li>Project type and scope</li>
                      <li>Timeline and budget</li>
                      <li>Technical requirements</li>
                      <li>Target platforms</li>
                    </>
                  )}
                  {currentStep === 3 && (
                    <>
                      <li>Technology preferences</li>
                      <li>Design requirements</li>
                      <li>Special considerations</li>
                      <li>Final submission</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="form-column">
            <div className="form-container">
              
              
              {renderStepContent()}
              
              {/* Navigation Buttons */}
              <div className="form-navigation">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className={`nav-button nav-button-secondary ${currentStep === 1 ? 'disabled' : ''}`}
                  disabled={currentStep === 1}
                >
                  <ArrowLeftIcon className="nav-icon" />
                  Previous
                </button>
                
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="nav-button nav-button-primary"
                  >
                    Next
                    <ArrowRightIcon className="nav-icon" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="nav-button nav-button-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                    <PaperAirplaneIcon className="nav-icon" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`notification ${notification.type} ${notification.type === 'success' ? 'show' : ''}`}>
          <div className="notification-content">
            {notification.message}
          </div>
          <button 
            className="notification-close"
            onClick={resetStatus}
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectRequest;
