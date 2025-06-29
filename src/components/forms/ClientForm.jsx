import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../common/Button';
import FileUpload from './FileUpload';
import PhoneInput from './PhoneInput';
import LoadingSpinner from '../common/LoadingSpinner';
import Notification from '../common/Notification';
import { validateEmail, validatePhone, validateRequired } from '../../utils/validation';
import { useFormSubmission } from '../../hooks/useFormSubmission';

const ClientForm = () => {
  const [projectFile, setProjectFile] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const { isSubmitting, submitStatus, submitMessage, submitForm, resetStatus } = useFormSubmission();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    trigger
  } = useForm();

  const projectType = watch('projectType');

  const onSubmit = async (data) => {
    console.log('Form data before processing:', data);
    console.log('Phone number from state:', phoneNumber);
    console.log('Form errors:', errors);
    
    const formData = {
      ...data,
      contactName: `${data.firstName} ${data.lastName}`.trim(), // Combine first and last name
      companyName: data.company || 'Not specified', // Map company field
      phone: phoneNumber, // Use the phone number from PhoneInput
      projectFile: projectFile,
      type: 'client_inquiry'
    };

    console.log('Processed form data:', formData);

    const result = await submitForm(formData, 'CLIENT_TEMPLATE');
    if (result.success) {
      reset();
      setProjectFile(null);
      setPhoneNumber('');
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        resetStatus();
      }, 5000);
    }
  };

  const handlePhoneChange = (e) => {
    const phoneValue = e.target.value;
    setPhoneNumber(phoneValue);
    setValue('phone', phoneValue); // Update react-hook-form value
    trigger('phone'); // Trigger validation
  };

  // Register the phone field with validation - fix the validation function
  React.useEffect(() => {
    register('phone', {
      required: 'Phone number is required',
      validate: (value) => {
        console.log('Phone validation - value:', value);
        if (!value || !value.trim()) {
          return 'Phone number is required';
        }
        const isValid = validatePhone(value);
        console.log('Phone validation result:', isValid);
        if (!isValid) {
          return 'Please enter a valid phone number (include country code if international)';
        }
        return true;
      }
    });
  }, [register]);

  const projectTypes = [
    { value: 'web-development', label: 'Web Development' },
    { value: 'mobile-development', label: 'Mobile Development' },
    { value: 'ui-ux-design', label: 'UI/UX Design' },
    { value: 'data-science', label: 'Data Science & Analytics' },
    { value: 'devops', label: 'DevOps & Infrastructure' },
    { value: 'digital-marketing', label: 'Digital Marketing' },
    { value: 'content-creation', label: 'Content Creation' },
    { value: 'consulting', label: 'Technical Consulting' },
    { value: 'other', label: 'Other' }
  ];

  const budgetRanges = [
    { value: 'under-5k', label: 'Under $5,000' },
    { value: '5k-15k', label: '$5,000 - $15,000' },
    { value: '15k-50k', label: '$15,000 - $50,000' },
    { value: '50k-100k', label: '$50,000 - $100,000' },
    { value: 'over-100k', label: 'Over $100,000' },
    { value: 'discuss', label: 'Prefer to discuss' }
  ];

  const timelines = [
    { value: 'asap', label: 'ASAP (Rush project)' },
    { value: '1-month', label: 'Within 1 month' },
    { value: '2-3-months', label: '2-3 months' },
    { value: '3-6-months', label: '3-6 months' },
    { value: '6-months-plus', label: '6+ months' },
    { value: 'flexible', label: 'Flexible timeline' }
  ];

  const teamSizes = [
    { value: 'individual', label: '1 person' },
    { value: 'small', label: '2-3 people' },
    { value: 'medium', label: '4-6 people' },
    { value: 'large', label: '7+ people' },
    { value: 'not-sure', label: 'Not sure yet' }
  ];

  return (
    <div className="client-form">
      <div className="form-header">
        <h2 className="form-title">Start Your Project</h2>
        <p className="form-description">
          Tell us about your project and we'll connect you with the perfect talent to bring your vision to life.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Form Errors Summary */}
        {Object.keys(errors).length > 0 && (
          <div className="form-errors-summary">
            <h4>⚠️ Please fix the following errors:</h4>
            <ul>
              {Object.entries(errors).map(([field, error]) => {
                // Make field names more user-friendly
                const fieldNames = {
                  firstName: 'First Name',
                  lastName: 'Last Name',
                  company: 'Company Name',
                  email: 'Email Address',
                  phone: 'Phone Number',
                  projectType: 'Project Type',
                  projectTitle: 'Project Title',
                  projectDescription: 'Project Description',
                  budget: 'Budget Range',
                  timeline: 'Timeline',
                  teamSize: 'Team Size',
                  requiredSkills: 'Required Skills',
                  customProjectType: 'Custom Project Type'
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

        {/* Contact Information */}
        <div className="form-section">
          <h3 className="form-section-title">Contact Information</h3>
          <div className="form-row">
            <div className="form-field">
              <label className="form-field-label">
                First Name <span className="required">*</span>
              </label>
              <input
                type="text"
                {...register('firstName', { 
                  validate: (value) => {
                    if (!validateRequired(value)) {
                      return 'First name is required';
                    }
                    return true;
                  }
                })}
                className={`form-field-input ${errors.firstName ? 'error' : ''}`}
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
                  validate: (value) => {
                    if (!validateRequired(value)) {
                      return 'Last name is required';
                    }
                    return true;
                  }
                })}
                className={`form-field-input ${errors.lastName ? 'error' : ''}`}
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
                className={`form-field-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="form-field-error">{errors.email.message}</p>
              )}
            </div>

            <div className="form-field">
              <PhoneInput
                value={phoneNumber}
                onChange={handlePhoneChange}
                error={errors.phone?.message}
                required={true}
              />
            </div>

            <div className="form-field">
              <label className="form-field-label">
                Company Name <span className="required">*</span>
              </label>
              <input
                type="text"
                {...register('company', { 
                  validate: (value) => {
                    if (!validateRequired(value)) {
                      return 'Company name is required';
                    }
                    return true;
                  }
                })}
                className={`form-field-input ${errors.company ? 'error' : ''}`}
                placeholder="Your company name"
              />
              {errors.company && (
                <p className="form-field-error">{errors.company.message}</p>
              )}
            </div>

            <div className="form-field">
              <label className="form-field-label">
                Job Title
              </label>
              <input
                type="text"
                {...register('jobTitle')}
                className="form-field-input"
                placeholder="Your job title (optional)"
              />
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="form-section">
          <h3 className="form-section-title">Project Details</h3>
          <div className="form-row">
            <div className="form-field form-row-full">
              <label className="form-field-label">
                Project Type <span className="required">*</span>
              </label>
              <select
                {...register('projectType', { 
                  validate: (value) => {
                    if (!validateRequired(value)) {
                      return 'Project type is required';
                    }
                    return true;
                  }
                })}
                className={`form-field-select ${errors.projectType ? 'error' : ''}`}
              >
                <option value="">Select project type</option>
                {projectTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.projectType && (
                <p className="form-field-error">{errors.projectType.message}</p>
              )}
            </div>

            {projectType === 'other' && (
              <div className="form-field conditional-section">
                <label className="form-field-label">
                  Please specify the project type <span className="required">*</span>
                </label>
                <input
                  type="text"
                  {...register('customProjectType', { 
                    validate: (value) => projectType === 'other' && !value ? 'Please specify project type' : true
                  })}
                  className={`form-field-input ${errors.customProjectType ? 'error' : ''}`}
                  placeholder="Describe your project type"
                />
                {errors.customProjectType && (
                  <p className="form-field-error">{errors.customProjectType.message}</p>
                )}
              </div>
            )}

            <div className="form-field">
              <label className="form-field-label">
                Project Title <span className="required">*</span>
              </label>
              <input
                type="text"
                {...register('projectTitle', { 
                  validate: (value) => {
                    if (!validateRequired(value)) {
                      return 'Project title is required';
                    }
                    return true;
                  }
                })}
                className={`form-field-input ${errors.projectTitle ? 'error' : ''}`}
                placeholder="Give your project a descriptive title"
              />
              {errors.projectTitle && (
                <p className="form-field-error">{errors.projectTitle.message}</p>
              )}
            </div>

            <div className="form-field form-row-full">
              <label className="form-field-label">
                Project Description <span className="required">*</span>
              </label>
              <textarea
                rows={5}
                {...register('projectDescription', { 
                  validate: (value) => {
                    if (!validateRequired(value)) {
                      return 'Project description is required';
                    }
                    if (value.length < 20) {
                      return 'Project description must be at least 20 characters';
                    }
                    return true;
                  }
                })}
                className={`form-field-textarea ${errors.projectDescription ? 'error' : ''}`}
                placeholder="Describe your project in detail. What are you trying to achieve? What features do you need? What's the scope of work? (minimum 20 characters)"
              />
              <div className="form-field-meta">
                <span className={`character-count ${watch('projectDescription')?.length >= 20 ? 'valid' : 'invalid'}`}>
                  {watch('projectDescription')?.length || 0}/20 characters minimum
                </span>
              </div>
              {errors.projectDescription && (
                <p className="form-field-error">{errors.projectDescription.message}</p>
              )}
            </div>

            <div className="form-field">
              <label className="form-field-label">
                Project Budget <span className="required">*</span>
              </label>
              <select
                {...register('budget', { 
                  validate: (value) => {
                    if (!validateRequired(value)) {
                      return 'Budget range is required';
                    }
                    return true;
                  }
                })}
                className={`form-field-select ${errors.budget ? 'error' : ''}`}
              >
                <option value="">Select budget range</option>
                {budgetRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
              {errors.budget && (
                <p className="form-field-error">{errors.budget.message}</p>
              )}
            </div>

            <div className="form-field">
              <label className="form-field-label">
                Timeline <span className="required">*</span>
              </label>
              <select
                {...register('timeline', { 
                  validate: (value) => {
                    if (!validateRequired(value)) {
                      return 'Timeline is required';
                    }
                    return true;
                  }
                })}
                className={`form-field-select ${errors.timeline ? 'error' : ''}`}
              >
                <option value="">Select timeline</option>                {timelines.map((timeline) => (
                  <option key={timeline.value} value={timeline.value}>
                    {timeline.label}
                  </option>
                ))}
              </select>
              {errors.timeline && (
                <p className="form-field-error">{errors.timeline.message}</p>
              )}
            </div>

            <div className="form-field">
              <label className="form-field-label">
                Team Size Needed <span className="required">*</span>
              </label>
              <select
                {...register('teamSize', { 
                  validate: (value) => {
                    if (!validateRequired(value)) {
                      return 'Team size is required';
                    }
                    return true;
                  }
                })}
                className={`form-field-select ${errors.teamSize ? 'error' : ''}`}
              >
                <option value="">Select team size</option>
                {teamSizes.map((size) => (
                  <option key={size.value} value={size.value}>
                    {size.label}
                  </option>
                ))}
              </select>
              {errors.teamSize && (
                <p className="form-field-error">{errors.teamSize.message}</p>
              )}
            </div>

            <div className="form-field form-row-full">
              <label className="form-field-label">
                Required Skills/Technologies <span className="required">*</span>
              </label>
              <textarea
                rows={3}
                {...register('requiredSkills', { 
                  validate: (value) => {
                    if (!validateRequired(value)) {
                      return 'Required skills are required';
                    }
                    return true;
                  }
                })}
                className={`form-field-textarea ${errors.requiredSkills ? 'error' : ''}`}
                placeholder="List the specific skills, technologies, or expertise you need (e.g., React, Node.js, AWS, UI/UX design, etc.)"
              />
              {errors.requiredSkills && (
                <p className="form-field-error">{errors.requiredSkills.message}</p>
              )}
            </div>

            <div className="form-field form-row-full">
              <div className="file-upload-container">
                <FileUpload
                  label="Project Files (Optional)"
                  required={false}
                  acceptedTypes=".pdf,.doc,.docx,.zip,.jpg,.jpeg,.png"
                  onFileSelect={setProjectFile}
                  maxSize={10 * 1024 * 1024} // 10MB
                />
                <p className="form-help-text">
                  Upload any relevant documents, designs, wireframes, or project specifications
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="form-section">
          <h3 className="form-section-title">Additional Information</h3>
          <div className="form-row">
            <div className="form-field">
              <label className="form-field-label">
                How did you hear about us?
              </label>
              <select
                {...register('referralSource')}
                className="form-field-select"
              >
                <option value="">Select an option</option>
                <option value="google">Google Search</option>
                <option value="social-media">Social Media</option>
                <option value="referral">Referral from friend/colleague</option>
                <option value="linkedin">LinkedIn</option>
                <option value="online-ad">Online Advertisement</option>
                <option value="blog">Blog/Article</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-field form-row-full">
              <label className="form-field-label">
                Additional Comments or Questions
              </label>
              <textarea
                rows={4}
                {...register('comments')}
                className="form-field-textarea"
                placeholder="Any additional information, specific requirements, or questions you'd like to share..."
              />
            </div>

            <div className="form-field form-row-full">
              <div className="form-checkbox-group">
                <div className="form-checkbox-item">
                  <input
                    type="checkbox"
                    id="newsletters"
                    {...register('newsletters')}
                    className="form-checkbox"
                  />
                  <label htmlFor="newsletters" className="form-checkbox-label">
                    I'd like to receive updates about new talent, industry insights, and company news
                  </label>
                </div>
              </div>
            </div>

            <div className="form-field form-row-full">
              <div className="form-checkbox-group">
                <div className="form-checkbox-item">
                  <input
                    type="checkbox"
                    id="terms"
                    {...register('terms', { 
                      validate: (value) => value ? true : 'You must agree to the terms and conditions'
                    })}
                    className="form-checkbox"
                  />
                  <label htmlFor="terms" className="form-checkbox-label">
                    I agree to the <a href="/terms" className="text-link">Terms of Service</a> and{' '}
                    <a href="/privacy" className="text-link">Privacy Policy</a>
                    <span className="required"> *</span>
                  </label>
                </div>
              </div>
              {errors.terms && (
                <p className="form-field-error">{errors.terms.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-submit-section">
          <Button
            type="submit"
            disabled={isSubmitting}
            size="lg"
          >
            {isSubmitting ? <LoadingSpinner size="sm" /> : 'Submit Project Request'}
          </Button>
        </div>
      </form>

      {/* Notification */}
      <Notification
        type={submitStatus === 'success' ? 'success' : 'error'}
        message={submitMessage}
        isVisible={submitStatus !== null}
        onClose={resetStatus}
      />
    </div>
  );
};

export default ClientForm;