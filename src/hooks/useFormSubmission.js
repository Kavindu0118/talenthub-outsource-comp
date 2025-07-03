import { useState } from 'react';
import { sendClientRequest } from '../utils/emailService';
import { sendHireFormEmail, sendHireFormEmailAlternative } from '../utils/hireEmailService';
import { validateTalentForm, validateClientForm, validateHireForm } from '../utils/validation';
import { saveToGoogleSheets } from '../utils/googleSheetsService';
import { saveToTalentGoogleSheets } from '../utils/talentGoogleSheetsService';
import { saveToProjectRequestGoogleSheets } from '../utils/projectRequestGoogleSheetsService';

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

          // If email was sent successfully, save to Google Sheets
          if (result.success) {
            console.log('Email sent successfully, now saving to Google Sheets...');
            try {
              const sheetsResult = await saveToGoogleSheets(formData);
              console.log('Google Sheets save result:', sheetsResult);
              
              // Add Google Sheets status to result
              result.googleSheets = sheetsResult;
            } catch (sheetsError) {
              console.warn('Google Sheets save failed, but email was sent:', sheetsError);
              // Don't fail the whole submission if Google Sheets fails
              result.googleSheets = { 
                success: false, 
                error: sheetsError.message || 'Failed to save to Google Sheets' 
              };
            }
          }
        } catch (error) {
          console.warn('Primary email service failed, using alternative:', error);
          result = await sendHireFormEmailAlternative(formData);
          
          // If alternative email was sent successfully, save to Google Sheets
          if (result.success) {
            console.log('Alternative email sent successfully, now saving to Google Sheets...');
            try {
              const sheetsResult = await saveToGoogleSheets(formData);
              console.log('Google Sheets save result:', sheetsResult);
              result.googleSheets = sheetsResult;
            } catch (sheetsError) {
              console.warn('Google Sheets save failed, but email was sent:', sheetsError);
              result.googleSheets = { 
                success: false, 
                error: sheetsError.message || 'Failed to save to Google Sheets' 
              };
            }
          }
        }
      } else if (formType === 'talent') {
        // This is a talent application form - save directly to Google Sheets
        console.log('🎯 Processing talent application - saving to Google Sheets only...');
        console.log('📝 Form data to be submitted:', formData);
        try {
          const sheetsResult = await saveToTalentGoogleSheets(formData);
          console.log('📊 Talent Google Sheets save result:', sheetsResult);
          
          result = {
            success: sheetsResult.success,
            message: sheetsResult.success 
              ? 'Your talent application has been submitted successfully!' 
              : 'Failed to submit talent application',
            googleSheets: sheetsResult
          };
          
          console.log('✅ Final result for talent submission:', result);
        } catch (error) {
          console.error('❌ Talent Google Sheets service failed:', error);
          result = { 
            success: false, 
            error: error.message || 'Failed to submit talent application'
          };
        }
      } else if (formData.formType === 'project-request' || formData.type === 'project-request') {
        // This is a project request form
        try {
          result = await sendClientRequest(formData);
          
          // If email was sent successfully, save to Project Request Google Sheets
          if (result.success) {
            console.log('Project request email sent successfully, now saving to Google Sheets...');
            try {
              const sheetsResult = await saveToProjectRequestGoogleSheets(formData);
              console.log('Project Request Google Sheets save result:', sheetsResult);
              
              // Add Google Sheets status to result
              result.googleSheets = sheetsResult;
            } catch (sheetsError) {
              console.warn('Project Request Google Sheets save failed, but email was sent:', sheetsError);
              // Don't fail the whole submission if Google Sheets fails
              result.googleSheets = { 
                success: false, 
                error: sheetsError.message || 'Failed to save project request to Google Sheets' 
              };
            }
          }
        } catch (error) {
          console.error('Project request email service failed:', error);
          result = { success: false, error: error.message };
        }
      } else {
        result = await sendClientRequest(formData);
      }

      if (result.success) {
        setSubmitStatus('success');
        
        if (templateType === 'CLIENT_TEMPLATE' || formData.type === 'client_inquiry') {
          let message = 'Thank you for your request! We will review your requirements and get back to you within 24 hours with suitable talent matches.';
          
          // Add Google Sheets status to message if available
          if (result.googleSheets) {
            if (result.googleSheets.success) {
              console.log('✅ Form data saved to both email and Google Sheets');
            } else {
              console.warn('⚠️ Email sent but Google Sheets save failed:', result.googleSheets.error);
            }
          }
          
          setSubmitMessage(message);
        } else if (formType === 'talent') {
          setSubmitMessage('Thank you for your application! We will review it and get back to you soon.');
        } else if (formData.formType === 'project-request' || formData.type === 'project-request') {
          let message = 'Thank you for your project request! Our team will review your requirements and provide you with a detailed proposal within 24 hours.';
          
          // Add Google Sheets status to message if available
          if (result.googleSheets) {
            if (result.googleSheets.success) {
              console.log('✅ Project request saved to both email and Google Sheets');
            } else {
              console.warn('⚠️ Project request email sent but Google Sheets save failed:', result.googleSheets.error);
            }
          }
          
          setSubmitMessage(message);
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
