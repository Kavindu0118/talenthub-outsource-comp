// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone validation
export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

// Required field validation
export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

// File validation
export const validateFile = (file, maxSize = 5 * 1024 * 1024, allowedTypes = []) => {
  const errors = [];
  
  if (!file) {
    errors.push('File is required');
    return errors;
  }
  
  if (file.size > maxSize) {
    errors.push(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
  }
  
  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    errors.push(`File type must be one of: ${allowedTypes.join(', ')}`);
  }
  
  return errors;
};

// Form validation for talent application
export const validateTalentForm = (formData) => {
  const errors = {};
  
  if (!validateRequired(formData.fullName)) {
    errors.fullName = 'Full name is required';
  }
  
  if (!validateRequired(formData.email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (formData.phone && !validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  if (!formData.skills || formData.skills.length === 0) {
    errors.skills = 'Please select at least one skill';
  }
  
  if (!validateRequired(formData.experience)) {
    errors.experience = 'Experience level is required';
  }
  
  if (formData.resume) {
    const fileErrors = validateFile(
      formData.resume,
      5 * 1024 * 1024,
      ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    );
    if (fileErrors.length > 0) {
      errors.resume = fileErrors[0];
    }
  }
  
  return errors;
};

// Form validation for client request
export const validateClientForm = (formData) => {
  const errors = {};
  
  if (!validateRequired(formData.companyName)) {
    errors.companyName = 'Company name is required';
  }
  
  if (!validateRequired(formData.contactName)) {
    errors.contactName = 'Contact name is required';
  }
  
  if (!validateRequired(formData.email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (formData.phone && !validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  if (!validateRequired(formData.projectTitle)) {
    errors.projectTitle = 'Project title is required';
  }
  
  if (!validateRequired(formData.projectDescription)) {
    errors.projectDescription = 'Project description is required';
  }
  
  if (!formData.requiredSkills || formData.requiredSkills.length === 0) {
    errors.requiredSkills = 'Please select at least one required skill';
  }
  
  if (!validateRequired(formData.timeline)) {
    errors.timeline = 'Project timeline is required';
  }
  
  if (!validateRequired(formData.budget)) {
    errors.budget = 'Budget range is required';
  }
  
  if (formData.projectBrief) {
    const fileErrors = validateFile(
      formData.projectBrief,
      10 * 1024 * 1024,
      ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
    );
    if (fileErrors.length > 0) {
      errors.projectBrief = fileErrors[0];
    }
  }
  
  return errors;
};
