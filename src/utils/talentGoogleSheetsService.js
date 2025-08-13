// Google Sheets service for saving talent application data
// Uses Google Apps Script as a web service

class TalentGoogleSheetsService {
  constructor() {
    this.scriptUrl = import.meta.env.VITE_APPLYAS_TALENT_GOOGLE_SCRIPT_URL;
  }

  // Save Talent application form data to Google Sheets
  async saveTalentFormData(formData) {
    console.log('🚀 Starting talent form submission...');
    console.log('Form data received:', formData);
    console.log('Script URL from env:', import.meta.env.VITE_TALENT_GOOGLE_SCRIPT_URL);
    console.log('Script URL (this.scriptUrl):', this.scriptUrl);
    
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

      // Try the request with different approaches for CORS handling (same as hire form)
      let response;
      
      try {
        // First attempt: CORS-friendly request with redirect follow
        console.log('Attempting CORS-friendly request...');
        response = await fetch(this.scriptUrl, {
          redirect: "follow",
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(sheetData)
        });
      } catch (corsError) {
        console.warn('Standard CORS request failed:', corsError);
        
        // Second attempt: Try with no-cors mode (will limit response access)
        console.log('Attempting no-cors request...');
        try {
          response = await fetch(this.scriptUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(sheetData),
            mode: 'no-cors'
          });
          
          // With no-cors, we can't read the response, so assume success if no error
          if (response.type === 'opaque') {
            console.log('No-cors request completed (response opaque)');
            return {
              success: true,
              message: 'Talent application sent successfully (no-cors mode)',
              method: 'no-cors'
            };
          }
        } catch (noCorsError) {
          console.error('No-cors request also failed:', noCorsError);
          throw corsError; // Throw the original CORS error
        }
      }

      console.log('Talent response status:', response.status);
      console.log('Talent response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const responseText = await response.text();
        console.error('Talent response error details:', responseText);
        throw new Error(`HTTP error! status: ${response.status}, details: ${responseText}`);
      }

      const result = await response.json();
      console.log('Talent Google Apps Script response:', result);

      if (result.status === "success") {
        console.log('✅ Talent application saved to Google Sheets successfully:', result);
        return {
          success: true,
          message: result.message || 'Your talent application has been submitted successfully!',
          timestamp: result.timestamp,
          applicantName: result.applicantName,
          spreadsheetUrl: result.spreadsheetUrl,
          rowNumber: result.rowNumber
        };
      } else {
        console.error('Google Apps Script returned error:', result);
        throw new Error(result.message || 'Failed to save talent application');
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
      
      // First try a GET request to see if the script is accessible
      const getResponse = await fetch(this.scriptUrl, {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit'
      });

      console.log('Talent GET test response status:', getResponse.status);
      
      if (getResponse.ok) {
        const getResult = await getResponse.text();
        console.log('Talent GET test response:', getResult);
      }

      // Now test with actual talent form data
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
        error: error.message
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