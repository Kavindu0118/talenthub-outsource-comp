import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../common/Button';
import FileUpload from './FileUpload';
import LoadingSpinner from '../common/LoadingSpinner';
import { validateEmail, validatePhone, validateRequired } from '../../utils/validation';
import { useFormSubmission } from '../../hooks/useFormSubmission';

const TalentForm = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const { isSubmitting, submitForm } = useFormSubmission();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      resume: resumeFile,
      type: 'talent_application'
    };

    const success = await submitForm(formData, 'TALENT_TEMPLATE');
    if (success) {
      reset();
      setResumeFile(null);
    }
  };

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
          Ready to take your career to the next level? Submit your application and connect with top companies worldwide.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
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
                  validate: validateEmail
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
                  validate: validatePhone
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
                  <label key={type} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={type.toLowerCase()}
                      {...register('workType')}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm">{type}</span>
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
      </form>
    </div>
  );
};

export default TalentForm;