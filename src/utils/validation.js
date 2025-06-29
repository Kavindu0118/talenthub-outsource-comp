// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone validation - Updated to handle international formats
export const validatePhone = (phone) => {
  if (!phone || !phone.trim()) return false;
  
  // Remove all spaces, dashes, parentheses, and other formatting
  const cleanPhone = phone.replace(/[\s\-\(\)\+]/g, '');
  
  // Check if it's a valid international number
  // Should be between 7-15 digits (international standard)
  const phoneRegex = /^\d{7,15}$/;
  
  // Additional check for common international formats
  const internationalRegex = /^(\+\d{1,4}[\s\-]?)?\d{7,15}$/;
  
  return phoneRegex.test(cleanPhone) || internationalRegex.test(phone.trim());
};

// Enhanced phone validation with country-specific rules
export const validatePhoneWithCountry = (phone, countryCode = null) => {
  if (!phone || !phone.trim()) return false;
  
  const cleanPhone = phone.replace(/[\s\-\(\)\+]/g, '');
  
  // Country-specific validation
  if (countryCode) {
    switch (countryCode) {
      case 'LK': // Sri Lanka
        // Sri Lankan mobile: 7X, 71X, 72X, 74X, 75X, 76X, 77X, 78X
        // Landline: Area code + number
        return /^(7[0-9]|[1-9][1-9])\d{7}$/.test(cleanPhone);
      case 'US':
      case 'CA': // US/Canada
        return /^\d{10}$/.test(cleanPhone);
      case 'GB': // UK
        return /^[1-9]\d{8,9}$/.test(cleanPhone);
      case 'IN': // India
        return /^[6-9]\d{9}$/.test(cleanPhone);
      case 'AU': // Australia
        return /^[2-478]\d{8}$/.test(cleanPhone);
      default:
        // General international validation
        return /^\d{7,15}$/.test(cleanPhone);
    }
  }
  
  // General validation if no country specified
  return /^\d{7,15}$/.test(cleanPhone);
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

// Form validation for hire request
export const validateHireForm = (formData) => {
  const errors = {};
  
  console.log('Validating hire form data:', formData); // Debug log
  
  // Company Information
  if (!validateRequired(formData.companyName)) {
    errors.companyName = 'Company name is required';
    console.log('Company name missing:', formData.companyName);
  }
  
  if (!validateRequired(formData.contactName)) {
    errors.contactName = 'Contact name is required';
    console.log('Contact name missing:', formData.contactName);
  }
  
  if (!validateRequired(formData.email)) {
    errors.email = 'Email is required';
    console.log('Email missing:', formData.email);
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
    console.log('Email invalid:', formData.email);
  }
  
  if (!validateRequired(formData.phone)) {
    errors.phone = 'Phone number is required';
    console.log('Phone missing:', formData.phone);
  } else if (!validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number (include country code if international)';
    console.log('Phone invalid:', formData.phone);
  }
  
  // Project Details
  if (!validateRequired(formData.projectTitle)) {
    errors.projectTitle = 'Project title is required';
    console.log('Project title missing:', formData.projectTitle);
  }
  
  if (!validateRequired(formData.projectType)) {
    errors.projectType = 'Project type is required';
    console.log('Project type missing:', formData.projectType);
  }
  
  if (!validateRequired(formData.projectDescription)) {
    errors.projectDescription = 'Project description is required';
    console.log('Project description missing:', formData.projectDescription);
  } else if (formData.projectDescription.length < 20) { // Reduced from 50 to 20
    errors.projectDescription = 'Project description must be at least 20 characters';
    console.log('Project description too short:', formData.projectDescription.length);
  }
  
  // Requirements
  if (!validateRequired(formData.timeline)) {
    errors.timeline = 'Timeline is required';
    console.log('Timeline missing:', formData.timeline);
  }
  
  if (!validateRequired(formData.budget)) {
    errors.budget = 'Budget range is required';
    console.log('Budget missing:', formData.budget);
  }
  
  if (!validateRequired(formData.teamSize)) {
    errors.teamSize = 'Team size is required';
    console.log('Team size missing:', formData.teamSize);
  }
  
  // Required skills validation - make it more flexible
  if (!formData.requiredSkills || formData.requiredSkills.trim().length === 0) {
    errors.requiredSkills = 'At least one required skill must be specified';
    console.log('Required skills missing:', formData.requiredSkills);
  }
  
  console.log('Validation errors found:', errors);
  
  return errors;
};
