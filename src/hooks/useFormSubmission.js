import { useState } from 'react';
import { sendTalentApplication, sendClientRequest } from '../utils/emailService';
import { validateTalentForm, validateClientForm } from '../utils/validation';

export const useFormSubmission = (formType) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [submitMessage, setSubmitMessage] = useState('');

  const submitForm = async (formData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');

    try {
      // Validate form data
      const errors = formType === 'talent' 
        ? validateTalentForm(formData)
        : validateClientForm(formData);

      if (Object.keys(errors).length > 0) {
        setSubmitStatus('error');
        setSubmitMessage('Please fix the form errors before submitting.');
        setIsSubmitting(false);
        return { success: false, errors };
      }

      // Submit form
      const result = formType === 'talent'
        ? await sendTalentApplication(formData)
        : await sendClientRequest(formData);

      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage(
          formType === 'talent'
            ? 'Thank you for your application! We will review it and get back to you soon.'
            : 'Thank you for your request! Our team will contact you within 24 hours.'
        );
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
