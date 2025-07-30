import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../common/Button';
import FileUpload from './FileUpload';
import LoadingSpinner from '../common/LoadingSpinner';
import Notification from '../common/Notification';
import { validateEmail, validatePhone, validateRequired } from '../../utils/validation';
import { useFormSubmission } from '../../hooks/useFormSubmission';

const TalentForm = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [showValidationError, setShowValidationError] = useState(false);
  const { isSubmitting, submitStatus, submitMessage, submitForm, resetStatus } = useFormSubmission('talent');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    console.log('🎯 TalentForm onSubmit called with data:', data);
    
    // Check if resume is uploaded
    if (!resumeFile) {
      console.warn('❌ No resume file uploaded');
      alert('Please upload your resume before submitting the form.');
      return;
    }

    console.log('📄 Resume file:', resumeFile);

    const formData = {
      ...data,
      resume: resumeFile,
      type: 'talent_application'
    };

    console.log('📋 Final form data to submit:', formData);

    const result = await submitForm(formData);
    console.log('📤 Submit form result:', result);
    
    if (result.success) {
      console.log('✅ Form submitted successfully, resetting form...');
      reset();
      setResumeFile(null);
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        resetStatus();
      }, 5000);
    } else {
      console.error('❌ Form submission failed:', result);
    }
  };

  // Handle form submission with validation check
  const handleFormSubmit = (data, event) => {
    // If there are validation errors, show a notification
    if (Object.keys(errors).length > 0) {
      setShowValidationError(true);
      // Auto-hide error message after 5 seconds
      setTimeout(() => {
        setShowValidationError(false);
      }, 5000);
      return;
    }
    
    // Call the original onSubmit function
    onSubmit(data, event);
  };

  // Hide validation error when errors are fixed
  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      setShowValidationError(false);
    }
  }, [errors]);

  const skillsOptions = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'C#', '.NET',
    'PHP', 'Ruby', 'Go', 'Angular', 'Vue.js', 'TypeScript', 'SQL',
    'MongoDB', 'PostgreSQL', 'AWS', 'Azure', 'Docker', 'Kubernetes',
    'DevOps', 'UI/UX Design', 'Mobile Development', 'Data Science',
    'Machine Learning', 'Digital Marketing', 'Project Management'
  ];

  const experienceLevels = [
    { value: 'entry', label: '0-2 years (Entry Level)' },
    { value: 'mid', label: '3-5 years (Mid Level)' },
    { value: 'senior', label: '6-8 years (Senior Level)' },
    { value: 'lead', label: '9+ years (Lead/Principal)' }
  ];

  return (
    <div className="talent-form">
      <div className="form-header">
        <h2 className="form-title">Join Our Talent Network</h2>
        <p className="form-description">
          Ready to take your career to the next level? Submit your application and we'll add you to our talent network to connect with top companies worldwide.
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="form-container">
        {/* Validation Errors Summary */}
        {Object.keys(errors).length > 0 && (
          <div className="form-errors-summary">
            <h4>⚠️ Please fix the following errors:</h4>
            <ul>
              {Object.entries(errors).map(([field, error]) => {
                // Make field names more user-friendly
                const fieldNames = {
                  firstName: 'First Name',
                  lastName: 'Last Name',
                  email: 'Email Address',
                  phone: 'Phone Number',
                  location: 'Location',
                  jobTitle: 'Job Title',
                  experienceLevel: 'Experience Level',
                  skills: 'Skills',
                  minRate: 'Minimum Rate',
                  maxRate: 'Maximum Rate',
                  availability: 'Availability',
                  portfolio: 'Portfolio',
                  bio: 'Bio'
                };
                const friendlyFieldName = fieldNames[field] || field;
                
                return (
                  <li key={field}>
                    <strong>{friendlyFieldName}:</strong> {error.message}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Personal Information */}
        <div className="form-section">
          <h3 className="form-section-title">Personal Information</h3>
          <div className="form-row">
            <div className="form-field">
              <label className="form-field-label">
                First Name <span className="required">*</span>
              </label>
              <input
                type="text"
                {...register('firstName', { 
                  validate: (value) => validateRequired(value, 'First name')
                })}
                className={`form-field-input ${
                  errors.firstName ? 'error' : ''
                }`}
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <p className="form-field-error">{errors.firstName.message}</p>
              )}
            </div>

            <div className="form-field">
              <label className="form-field-label">
                Last Name <span className="required">*</span>
              </label>
              <input
                type="text"
                {...register('lastName', { 
                  validate: (value) => validateRequired(value, 'Last name')
                })}
                className={`form-field-input ${
                  errors.lastName ? 'error' : ''
                }`}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <p className="form-field-error">{errors.lastName.message}</p>
              )}
            </div>

            <div className="form-field">
              <label className="form-field-label">
                Email Address <span className="required">*</span>
              </label>
              <input
                type="email"
                {...register('email', { 
                  validate: (value) => {
                    if (!validateRequired(value)) {
                      return 'Email is required';
                    }
                    if (!validateEmail(value)) {
                      return 'Please enter a valid email address';
                    }
                    return true;
                  }
                })}
                className={`form-field-input ${
                  errors.email ? 'error' : ''
                }`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="form-field-error">{errors.email.message}</p>
              )}
            </div>

            <div className="form-field">
              <label className="form-field-label">
                Phone Number <span className="required">*</span>
              </label>
              <input
                type="tel"
                {...register('phone', { 
                  validate: (value) => {
                    if (!validateRequired(value)) {
                      return 'Phone number is required';
                    }
                    if (!validatePhone(value)) {
                      return 'Please enter a valid phone number';
                    }
                    return true;
                  }
                })}
                className={`form-field-input ${
                  errors.phone ? 'error' : ''
                }`}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="form-field-error">{errors.phone.message}</p>
              )}
            </div>

            <div className="form-field form-row-full">
              <label className="form-field-label">
                Location (City, Country) <span className="required">*</span>
              </label>
              <input
                type="text"
                {...register('location', { 
                  validate: (value) => validateRequired(value, 'Location')
                })}
                className={`form-field-input ${
                  errors.location ? 'error' : ''
                }`}
                placeholder="e.g., New York, USA"
              />
              {errors.location && (
                <p className="form-field-error">{errors.location.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="form-section">
          <h3 className="form-section-title">Professional Information</h3>
          <div className="form-row">
            <div className="form-field">
              <label className="form-field-label">
                Current Job Title <span className="required">*</span>
              </label>
              <input
                type="text"
                {...register('jobTitle', { 
                  validate: (value) => validateRequired(value, 'Job title')
                })}
                className={`form-field-input ${
                  errors.jobTitle ? 'error' : ''
                }`}
                placeholder="e.g., Senior Software Developer"
              />
              {errors.jobTitle && (
                <p className="form-field-error">{errors.jobTitle.message}</p>
              )}
            </div>

            <div className="form-field">
              <label className="form-field-label">
                Experience Level <span className="required">*</span>
              </label>
              <select
                {...register('experienceLevel', { 
                  validate: (value) => validateRequired(value, 'Experience level')
                })}
                className={`form-field-select ${
                  errors.experienceLevel ? 'error' : ''
                }`}
              >
                <option value="">Select experience level</option>
                {experienceLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
              {errors.experienceLevel && (
                <p className="form-field-error">{errors.experienceLevel.message}</p>
              )}
            </div>

            <div className="form-field form-row-full">
              <label className="form-field-label">
                Primary Skills <span className="required">*</span>
              </label>
              <div className="skills-grid">
                {skillsOptions.map((skill) => (
                  <label key={skill} className="skills-item">
                    <input
                      type="checkbox"
                      value={skill}
                      {...register('skills', { 
                        validate: (value) => value && value.length > 0 ? true : 'Please select at least one skill'
                      })}
                      className="skills-checkbox"
                    />
                    <span className="skills-label">{skill}</span>
                  </label>
                ))}
              </div>
              {errors.skills && (
                <p className="form-field-error">{errors.skills.message}</p>
              )}
            </div>

            <div className="form-field form-row-full">
              <label className="form-field-label">
                Expected Hourly Rate (USD) <span className="required">*</span>
              </label>
              <div className="rate-range">
                <div className="rate-input">
                  <label className="rate-label">Minimum Rate</label>
                  <input
                    type="number"
                    min="1"
                    {...register('minRate', { 
                      validate: (value) => validateRequired(value, 'Minimum rate')
                    })}
                    className={`form-field-input ${
                      errors.minRate ? 'error' : ''
                    }`}
                    placeholder="Min rate"
                  />
                  {errors.minRate && (
                    <p className="form-field-error">{errors.minRate.message}</p>
                  )}
                </div>
                <div className="rate-separator">to</div>
                <div className="rate-input">
                  <label className="rate-label">Maximum Rate</label>
                  <input
                    type="number"
                    min="1"
                    {...register('maxRate', { 
                      validate: (value) => validateRequired(value, 'Maximum rate')
                    })}
                    className={`form-field-input ${
                      errors.maxRate ? 'error' : ''
                    }`}
                    placeholder="Max rate"
                  />
                  {errors.maxRate && (
                    <p className="form-field-error">{errors.maxRate.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <FileUpload
                label="Resume/CV"
                required={true}
                acceptedTypes=".pdf,.doc,.docx"
                onFileSelect={setResumeFile}
                error={!resumeFile ? 'Resume is required' : null}
              />
            </div>

            <div className="form-field form-row-full">
              <label className="form-field-label">
                Portfolio/LinkedIn URL
              </label>
              <input
                type="url"
                {...register('portfolio')}
                className="form-field-input"
                placeholder="https://your-portfolio.com or LinkedIn profile"
              />
            </div>

            <div className="form-field form-row-full">
              <label className="form-field-label">
                Tell us about yourself
              </label>
              <textarea
                rows={4}
                {...register('bio')}
                className="form-field-textarea"
                placeholder="Brief description of your experience, goals, and what makes you unique..."
              />
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="form-section">
          <h3 className="form-section-title">Availability</h3>
          <div className="form-row">
            <div className="form-field">
              <label className="form-field-label">
                Availability <span className="required">*</span>
              </label>
              <select
                {...register('availability', { 
                  validate: (value) => validateRequired(value, 'Availability')
                })}
                className={`form-field-select ${
                  errors.availability ? 'error' : ''
                }`}
              >
                <option value="">Select availability</option>
                <option value="immediate">Immediate (within 1 week)</option>
                <option value="twoWeeks">Within 2 weeks</option>
                <option value="month">Within 1 month</option>
                <option value="flexible">Flexible</option>
              </select>
              {errors.availability && (
                <p className="form-field-error">{errors.availability.message}</p>
              )}
            </div>

            <div className="form-field">
              <label className="form-field-label">
                Preferred Work Type
              </label>
              <div className="work-type-options">
                {['Full-time', 'Part-time', 'Contract', 'Freelance'].map((type) => (
                  <label key={type} className="work-type-option">
                    <input
                      type="checkbox"
                      value={type.toLowerCase()}
                      {...register('workType')}
                      className="work-type-checkbox"
                    />
                    <span className="work-type-label">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-submit-section">
          <Button
            type="submit"
            disabled={isSubmitting || !resumeFile}
            size="lg"
          >
            {isSubmitting ? <LoadingSpinner size="sm" /> : 'Submit Application'}
          </Button>
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

        {/* Validation Error Notification */}
        {showValidationError && (
          <Notification
            type="error"
            message="⚠️ Please fix all validation errors before submitting the form."
            isVisible={showValidationError}
            onClose={() => setShowValidationError(false)}
          />
        )}
      </form>
    </div>
  );
};

export default TalentForm;