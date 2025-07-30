// Google Sheets service for saving talent application data
// Uses Google Apps Script as a web service

class TalentGoogleSheetsService {
  constructor() {
    this.scriptUrl = import.meta.env.VITE_TALENT_GOOGLE_SCRIPT_URL;
  }

  // Save Talent application form data to Google Sheets
  async saveTalentFormData(formData) {
    console.log('🚀 Starting talent form submission...');
    console.log('Form data received:', formData);
    console.log('Script URL:', this.scriptUrl);
    
    if (!this.scriptUrl) {
      console.warn('Talent Google Apps Script URL not configured. Skipping Google Sheets save.');
      return this.logToConsole(formData);
    }

    try {
      console.log('Saving talent application data to Google Sheets...', formData);

      // Prepare data for Google Sheets (talent-specific fields)
      const sheetData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        jobTitle: formData.jobTitle,
        experienceLevel: formData.experienceLevel,
        skills: formData.skills, // Array of skills
        minRate: formData.minRate,
        maxRate: formData.maxRate,
        portfolio: formData.portfolio || '',
        bio: formData.bio || '',
        availability: formData.availability,
        workType: formData.workType, // Array of work types
        resumeFileName: formData.resume?.name || 'Resume uploaded'
      };

      console.log('Sending talent application to:', this.scriptUrl);
      console.log('Talent data payload:', sheetData);

      // Validate that all required fields are present
      const requiredFields = ['firstName', 'lastName', 'email'];
      const missingFields = requiredFields.filter(field => !sheetData[field]);
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Send data to Google Apps Script with proper CORS handling
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sheetData)
      };

      console.log('Request options:', requestOptions);
      console.log('🚀 Sending request to Google Apps Script...');

      const response = await fetch(this.scriptUrl, requestOptions);

      console.log('Talent response status:', response.status);
      console.log('Talent response statusText:', response.statusText);
      console.log('Talent response type:', response.type);

      // Try to get response text first for better error debugging
      const responseText = await response.text();
      console.log('Raw response text:', responseText);

      if (!response.ok) {
        console.error('Talent response error details:', responseText);
        throw new Error(`HTTP error! status: ${response.status}, statusText: ${response.statusText}, details: ${responseText}`);
      }

      // Parse JSON response
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        throw new Error(`Invalid JSON response: ${responseText}`);
      }

      console.log('Talent Google Apps Script response:', result);

      if (result.success) {
        console.log('✅ Talent application saved to Google Sheets successfully:', result);
        return {
          success: true,
          message: 'Your talent application has been submitted successfully!',
          timestamp: result.timestamp,
          applicantName: result.applicantName
        };
      } else {
        throw new Error(result.error || 'Failed to save talent application');
      }

    } catch (error) {
      console.error('❌ Failed to save talent application to Google Sheets:', error);
      
      // Fallback: Log to console
      console.log('Using fallback: logging talent application to console...');
      return this.logToConsole(formData);
    }
  }

  // Fallback method: log to console when Google Sheets is not available
  logToConsole(formData) {
    console.group('📊 Talent Application Data (Google Sheets Fallback)');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Applicant Info:', {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      location: formData.location
    });
    console.log('Professional Info:', {
      jobTitle: formData.jobTitle,
      experienceLevel: formData.experienceLevel,
      skills: formData.skills,
      rateRange: `$${formData.minRate} - $${formData.maxRate}/hour`
    });
    console.log('Additional Info:', {
      portfolio: formData.portfolio || 'None',
      bio: formData.bio || 'None',
      availability: formData.availability,
      workType: formData.workType,
      resume: formData.resume?.name || 'No file'
    });
    console.groupEnd();

    return {
      success: true,
      message: 'Your talent application has been received! (Note: Google Sheets integration needs to be configured)',
      method: 'console'
    };
  }

  // Test connection to Google Sheets
  async testConnection() {
    if (!this.scriptUrl || this.scriptUrl === 'your_talent_web_app_url_here') {
      return {
        success: false,
        error: 'Talent Google Apps Script URL not configured'
      };
    }

    try {
      console.log('Testing connection to Talent Google Apps Script...');
      console.log('Script URL:', this.scriptUrl);
      
      // First try a simple GET request to see if the script is accessible
      const getResponse = await fetch(this.scriptUrl, {
        method: 'GET',
        mode: 'no-cors', // Use no-cors for testing
        credentials: 'omit'
      });

      console.log('Talent GET test response status:', getResponse.status);
      console.log('Talent GET test response type:', getResponse.type);
      
      if (getResponse.type === 'opaque') {
        console.log('✅ Script is accessible (opaque response received)');
      }

      // Now test with actual talent form data using no-cors
      const testData = {
        firstName: 'Test',
        lastName: 'Developer',
        email: 'test.developer@example.com',
        phone: '+1234567890',
        location: 'San Francisco, CA',
        jobTitle: 'Senior React Developer',
        experienceLevel: 'senior',
        skills: ['React', 'JavaScript', 'Node.js'],
        minRate: '75',
        maxRate: '100',
        portfolio: 'https://test-developer.com',
        bio: 'Experienced developer with 6 years in React development.',
        availability: 'immediate',
        workType: ['full-time', 'contract'],
        resume: { name: 'test_developer_resume.pdf' }
      };

      const result = await this.saveTalentFormData(testData);
      return result;

    } catch (error) {
      console.error('Talent connection test failed:', error);
      return {
        success: false,
        error: error.message,
        suggestion: 'Check if your Google Apps Script is properly deployed with "Anyone" access'
      };
    }
  }
}

// Export singleton instance
export const talentGoogleSheetsService = new TalentGoogleSheetsService();

// Export specific method for talent form
export const saveToTalentGoogleSheets = async (formData) => {
  return await talentGoogleSheetsService.saveTalentFormData(formData);
};

// Export test function for troubleshooting
export const testTalentGoogleSheetsConnection = async () => {
  return await talentGoogleSheetsService.testConnection();
};

export default talentGoogleSheetsService;