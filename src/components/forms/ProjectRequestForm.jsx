import React, { useState } from 'react';
import { useFormSubmission } from '../../hooks/useFormSubmission';
import LoadingSpinner from '../common/LoadingSpinner';
import Notification from '../common/Notification';

const ProjectRequestForm = () => {
  const [formData, setFormData] = useState({
    // Contact Information
    name: '',
    email: '',
    company: '',
    phone: '',
    
    // Project Details
    projectType: '',
    projectTitle: '',
    projectDescription: '',
    features: '',
    
    // Technical Requirements
    platform: [],
    technology: '',
    integrations: '',
    
    // Project Scope
    budget: '',
    timeline: '',
    urgency: '',
    
    // Additional Information
    hasDesigns: '',
    designFiles: null,
    additionalInfo: ''
  });

  const { submitForm, isSubmitting, submitStatus, submitMessage, resetStatus } = useFormSubmission();

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
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submissionData = {
      ...formData,
      formType: 'project-request',
      type: 'project-request',
      submittedAt: new Date().toISOString()
    };

    const result = await submitForm(submissionData);
    
    if (result.success) {
      // Reset form on successful submission
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        projectType: '',
        projectTitle: '',
        projectDescription: '',
        features: '',
        platform: [],
        technology: '',
        integrations: '',
        budget: '',
        timeline: '',
        urgency: '',
        hasDesigns: '',
        designFiles: null,
        additionalInfo: ''
      });
      
      // Don't auto-hide success message - let user close it manually
      // setTimeout(() => {
      //   resetStatus();
      // }, 5000);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="project-request-form">
        {/* Contact Information Section */}
        <div className="form-section">
          <h3 className="form-section-title">Contact Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
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
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Project Details Section */}
        <div className="form-section">
          <h3 className="form-section-title">Project Details</h3>
          
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
              placeholder="Give your project a descriptive title"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="projectDescription" className="form-label">Project Description *</label>
            <textarea
              id="projectDescription"
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleInputChange}
              className="form-textarea"
              rows="4"
              placeholder="Describe your project, its goals, and what problem it will solve"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="features" className="form-label">Key Features & Functionality</label>
            <textarea
              id="features"
              name="features"
              value={formData.features}
              onChange={handleInputChange}
              className="form-textarea"
              rows="3"
              placeholder="List the main features and functionality you need"
            />
          </div>
        </div>

        {/* Technical Requirements Section */}
        <div className="form-section">
          <h3 className="form-section-title">Technical Requirements</h3>
          
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
            <label htmlFor="integrations" className="form-label">Required Integrations</label>
            <textarea
              id="integrations"
              name="integrations"
              value={formData.integrations}
              onChange={handleInputChange}
              className="form-textarea"
              rows="2"
              placeholder="Payment gateways, APIs, databases, third-party services, etc."
            />
          </div>
        </div>

        {/* Project Scope Section */}
        <div className="form-section">
          <h3 className="form-section-title">Project Scope</h3>
          <div className="form-grid">
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
                <option value="5k-10k">$5,000 - $10,000</option>
                <option value="10k-25k">$10,000 - $25,000</option>
                <option value="25k-50k">$25,000 - $50,000</option>
                <option value="50k-100k">$50,000 - $100,000</option>
                <option value="100k+">$100,000+</option>
                <option value="discuss">Prefer to Discuss</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="timeline" className="form-label">Desired Timeline *</label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Select Timeline</option>
                <option value="1-2-months">1-2 Months</option>
                <option value="2-4-months">2-4 Months</option>
                <option value="4-6-months">4-6 Months</option>
                <option value="6-12-months">6-12 Months</option>
                <option value="12-months+">12+ Months</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="urgency" className="form-label">Project Urgency</label>
              <select
                id="urgency"
                name="urgency"
                value={formData.urgency}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">Select Urgency</option>
                <option value="asap">ASAP - Rush Project</option>
                <option value="high">High - Need to Start Soon</option>
                <option value="medium">Medium - Planning Phase</option>
                <option value="low">Low - Exploring Options</option>
              </select>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="form-section">
          <h3 className="form-section-title">Additional Information</h3>
          
          <div className="form-group">
            <label htmlFor="hasDesigns" className="form-label">Do you have existing designs or wireframes?</label>
            <select
              id="hasDesigns"
              name="hasDesigns"
              value={formData.hasDesigns}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">Select Option</option>
              <option value="yes">Yes, I have designs</option>
              <option value="partial">Partial designs/concepts</option>
              <option value="no">No, need design services</option>
            </select>
          </div>
          
          {formData.hasDesigns === 'yes' && (
            <div className="form-group">
              <label htmlFor="designFiles" className="form-label">Upload Design Files</label>
              <input
                type="file"
                id="designFiles"
                name="designFiles"
                onChange={handleFileChange}
                className="form-file-input"
                accept=".pdf,.png,.jpg,.jpeg,.figma,.sketch,.xd"
                multiple
              />
              <p className="form-help-text">
                Accepted formats: PDF, PNG, JPG, Figma, Sketch, Adobe XD
              </p>
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="additionalInfo" className="form-label">Additional Information</label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              className="form-textarea"
              rows="3"
              placeholder="Any other details, requirements, or questions you'd like to share"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-submit">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary btn-lg"
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size="sm" />
                Submitting Request...
              </>
            ) : (
              'Submit Project Request'
            )}
          </button>
          
          <p className="form-help-text">
            We'll review your request and get back to you within 24 hours with a detailed proposal.
          </p>
        </div>

        {/* Status Messages */}
        {submitStatus && (
          <Notification
            type={submitStatus}
            message={submitMessage}
            isVisible={!!submitStatus}
            onClose={resetStatus}
          />
        )}
      </form>
    </div>
  );
};

export default ProjectRequestForm;
