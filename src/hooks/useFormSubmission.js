import { useState } from 'react';
import { sendTalentApplication, sendClientRequest } from '../utils/emailService';
import { sendHireFormEmail, sendHireFormEmailAlternative } from '../utils/hireEmailService';
import { validateTalentForm, validateClientForm, validateHireForm } from '../utils/validation';

export const useFormSubmission = (formType) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [submitMessage, setSubmitMessage] = useState('');

  const submitForm = async (formData, templateType = null) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');

    try {
      console.log('Form submission data:', formData); // Add debugging
      
      // Validate form data based on form type
      let errors = {};
      
      if (templateType === 'CLIENT_TEMPLATE' || formData.type === 'client_inquiry') {
        // This is a hire form - skip backend validation since React Hook Form handles it
        // The form component already validates all required fields
        console.log('Skipping backend validation for hire form - using React Hook Form validation');
      } else if (formType === 'talent') {
        errors = validateTalentForm(formData);
      } else if (formType === 'client') {
        errors = validateClientForm(formData);
      }

      if (Object.keys(errors).length > 0) {
        console.log('Form validation errors:', errors); // Add debugging
        setSubmitStatus('error');
        setSubmitMessage('Please fix the form errors before submitting.');
        setIsSubmitting(false);
        return { success: false, errors };
      }

      // Submit form based on template type or form type
      let result;
      
      if (templateType === 'CLIENT_TEMPLATE' || formData.type === 'client_inquiry') {
        // This is a hire/client request form
        try {
          result = await sendHireFormEmail(formData);
          
          // Fallback to alternative method if EmailJS fails
          if (!result.success) {
            console.warn('EmailJS failed, using alternative method:', result.error);
            result = await sendHireFormEmailAlternative(formData);
          }
        } catch (error) {
          console.warn('Primary email service failed, using alternative:', error);
          result = await sendHireFormEmailAlternative(formData);
        }
      } else if (formType === 'talent') {
        result = await sendTalentApplication(formData);
      } else {
        result = await sendClientRequest(formData);
      }

      if (result.success) {
        setSubmitStatus('success');
        
        if (templateType === 'CLIENT_TEMPLATE' || formData.type === 'client_inquiry') {
          setSubmitMessage('Thank you for your request! We will review your requirements and get back to you within 24 hours with suitable talent matches.');
        } else if (formType === 'talent') {
          setSubmitMessage('Thank you for your application! We will review it and get back to you soon.');
        } else {
          setSubmitMessage('Thank you for your request! Our team will contact you within 24 hours.');
        }
        
        return { success: true };
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.error || 'Something went wrong. Please try again.');
        return { success: false, error: result.error };
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Something went wrong. Please try again.');
      return { success: false, error: error.message };
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetStatus = () => {
    setSubmitStatus(null);
    setSubmitMessage('');
  };

  return {
    isSubmitting,
    submitStatus,
    submitMessage,
    submitForm,
    resetStatus,
  };
};
