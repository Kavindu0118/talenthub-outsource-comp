// Google Sheets service for saving form data
// Uses Google Apps Script as a web service

class GoogleSheetsService {
  constructor() {
    this.scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
  }

  // Save HireWithUs form data to Google Sheets
  async saveHireFormData(formData) {
    if (!this.scriptUrl || this.scriptUrl === 'https://script.google.com/macros/s/AKfycbwQoopux9COimFOvBvmuGh_ExVqMMpQybB9DyqvDW3wmLGXlf4zwb_Y7NegYT-uzjZl/exec') {
      console.warn('Google Apps Script URL not configured. Skipping Google Sheets save.');
      return this.logToConsole(formData);
    }

    try {
      console.log('Saving form data to Google Sheets...', formData);

      // Prepare data for Google Sheets
      const sheetData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        projectName: formData.projectName,
        projectDescription: formData.projectDescription,
        budget: formData.budget,
        timeline: formData.timeline,
        skills: formData.skills,
        priority: formData.priority || 'High',
        additionalNotes: formData.additionalNotes || ''
      };

      console.log('Sending request to:', this.scriptUrl);
      console.log('Data payload:', sheetData);

      // Try the request with different approaches for CORS handling
      let response;
      
      try {
        // First attempt: Standard CORS request
        console.log('Attempting standard CORS request...');
        response = await fetch(this.scriptUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sheetData),
          mode: 'cors',
          credentials: 'omit'
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
              message: 'Data sent successfully (no-cors mode)',
              method: 'no-cors'
            };
          }
        } catch (noCorsError) {
          console.error('No-cors request also failed:', noCorsError);
          throw corsError; // Throw the original CORS error
        }
      }

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const responseText = await response.text();
        console.error('Response error details:', responseText);
        throw new Error(`HTTP error! status: ${response.status}, details: ${responseText}`);
      }

      const result = await response.json();
      console.log('Google Apps Script response:', result);

      if (result.success) {
        console.log('✅ Data saved to Google Sheets successfully:', result);
        return {
          success: true,
          message: 'Form data saved to Google Sheets',
          timestamp: result.timestamp
        };
      } else {
        throw new Error(result.error || 'Failed to save data');
      }

    } catch (error) {
      console.error('❌ Failed to save to Google Sheets:', error);
      
      // Fallback: Log to console
      console.log('Using fallback: logging to console...');
      return this.logToConsole(formData);
    }
  }

  // Fallback method: log to console when Google Sheets is not available
  logToConsole(formData) {
    console.group('📊 HireWithUs Form Data (Google Sheets Fallback)');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Client Info:', {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      company: formData.company
    });
    console.log('Project Info:', {
      name: formData.projectName,
      description: formData.projectDescription,
      budget: formData.budget,
      timeline: formData.timeline,
      skills: formData.skills
    });
    console.log('Additional:', {
      priority: formData.priority || 'High',
      notes: formData.additionalNotes || 'None'
    });
    console.groupEnd();

    return {
      success: true,
      message: 'Form data logged to console (development mode)',
      method: 'console'
    };
  }

  // Test connection to Google Sheets
  async testConnection() {
    if (!this.scriptUrl || this.scriptUrl === 'your_web_app_url_here') {
      return {
        success: false,
        error: 'Google Apps Script URL not configured'
      };
    }

    try {
      console.log('Testing connection to Google Apps Script...');
      
      // First try a GET request to see if the script is accessible
      const getResponse = await fetch(this.scriptUrl, {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit'
      });

      console.log('GET test response status:', getResponse.status);
      
      if (getResponse.ok) {
        const getResult = await getResponse.text();
        console.log('GET test response:', getResult);
      }

      // Now test with actual form data
      const testData = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '+1234567890',
        company: 'Test Company',
        projectName: 'Test Project',
        projectDescription: 'This is a test submission',
        budget: '$1000-5000',
        timeline: '1-2 weeks',
        skills: ['Testing'],
        priority: 'Test',
        additionalNotes: 'Test connection'
      };

      const result = await this.saveHireFormData(testData);
      return result;

    } catch (error) {
      console.error('Connection test failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Export singleton instance
export const googleSheetsService = new GoogleSheetsService();

// Export specific method for hire form
export const saveToGoogleSheets = async (formData) => {
  return await googleSheetsService.saveHireFormData(formData);
};

// Export test function for troubleshooting
export const testGoogleSheetsConnection = async () => {
  return await googleSheetsService.testConnection();
};

export default googleSheetsService;
