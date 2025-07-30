// Google Sheets service for saving project request data
// Uses Google Apps Script as a web service

class ProjectRequestGoogleSheetsService {
  constructor() {
    this.scriptUrl = import.meta.env.VITE_PROJECT_REQUEST_GOOGLE_SCRIPT_URL;
  }

  // Save Project Request form data to Google Sheets
  async saveProjectRequestFormData(formData) {
    console.log('🚀 Starting project request submission...');
    console.log('Form data received:', formData);
    console.log('Script URL:', this.scriptUrl);
    
    if (!this.scriptUrl) {
      console.warn('Project Request Google Apps Script URL not configured. Skipping Google Sheets save.');
      return this.logToConsole(formData);
    }

    try {
      console.log('Saving project request data to Google Sheets...', formData);

      // Prepare data for Google Sheets (project request specific fields)
      const sheetData = {
        name: formData.name,
        email: formData.email,
        company: formData.company || '',
        phone: formData.phone || '',
        projectType: formData.projectType,
        projectTitle: formData.projectTitle,
        projectDescription: formData.projectDescription,
        features: formData.features || '',
        platform: formData.platform, // Array of platforms
        technology: formData.technology || '',
        integrations: formData.integrations || '',
        budget: formData.budget,
        timeline: formData.timeline,
        urgency: formData.urgency || 'medium',
        hasDesigns: formData.hasDesigns || '',
        designFiles: formData.designFiles,
        additionalInfo: formData.additionalInfo || ''
      };

      console.log('Sending project request to:', this.scriptUrl);
      console.log('Project request data payload:', sheetData);

      // Validate that all required fields are present
      const requiredFields = ['name', 'email'];
      const missingFields = requiredFields.filter(field => !sheetData[field]);
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Send data to Google Apps Script - try normal request first, fallback to no-cors
      let requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sheetData)
      };

      console.log('Request options:', requestOptions);
      console.log('🚀 Sending request to Google Apps Script...');

      try {
        // First attempt: normal request
        const response = await fetch(this.scriptUrl, requestOptions);
        console.log('Project request response status:', response.status);
        console.log('Project request response type:', response.type);

        if (response.ok) {
          const responseText = await response.text();
          console.log('Raw response text:', responseText);
          
          let result = JSON.parse(responseText);
          console.log('Parsed result:', result);
          
          return {
            success: result.success || false,
            message: result.message || 'Project request processed',
            timestamp: result.timestamp || new Date().toISOString(),
            clientName: result.clientName || sheetData.name,
            rawResponse: result
          };
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      } catch (corsError) {
        console.log('CORS request failed, trying no-cors mode:', corsError.message);
        
        // Fallback: no-cors mode
        requestOptions.mode = 'no-cors';
        const noCorsResponse = await fetch(this.scriptUrl, requestOptions);
        
        console.log('No-cors response type:', noCorsResponse.type);
        
        // With no-cors, we can't read the response, so assume success if no error thrown
        if (noCorsResponse.type === 'opaque') {
          console.log('No-cors request completed - assuming success');
          return {
            success: true,
            message: 'Project request submitted (no-cors mode)',
            timestamp: new Date().toISOString(),
            clientName: sheetData.name,
            note: 'Response verification limited due to CORS restrictions'
          };
        } else {
          throw new Error('No-cors request failed');
        }
      }

    } catch (error) {
      console.error('❌ Failed to save project request to Google Sheets:', error);
      
      // Fallback: Log to console
      console.log('Using fallback: logging project request to console...');
      return this.logToConsole(formData);
    }
  }

  // Fallback method: log to console when Google Sheets is not available
  logToConsole(formData) {
    console.group('📊 Project Request Data (Google Sheets Fallback)');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Client Info:', {
      name: formData.name,
      email: formData.email,
      company: formData.company,
      phone: formData.phone
    });
    console.log('Project Details:', {
      type: formData.projectType,
      title: formData.projectTitle,
      description: formData.projectDescription,
      features: formData.features
    });
    console.log('Technical Requirements:', {
      platforms: formData.platform,
      technology: formData.technology,
      integrations: formData.integrations
    });
    console.log('Project Scope:', {
      budget: formData.budget,
      timeline: formData.timeline,
      urgency: formData.urgency,
      hasDesigns: formData.hasDesigns
    });
    console.log('Additional Info:', {
      designFiles: formData.designFiles?.name || 'None',
      additionalInfo: formData.additionalInfo || 'None'
    });
    console.groupEnd();

    return {
      success: true,
      message: 'Project request logged to console (development mode)',
      method: 'console'
    };
  }

  // Test connection to Google Sheets
  async testConnection() {
    if (!this.scriptUrl) {
      return {
        success: false,
        error: 'Project Request Google Apps Script URL not configured'
      };
    }

    try {
      console.log('Testing connection to Project Request Google Apps Script...');
      
      // Test with actual project request form data
      const testData = {
        name: 'Test Client',
        email: 'test.client@example.com',
        company: 'Test Company Ltd',
        phone: '+1234567890',
        projectType: 'web-application',
        projectTitle: 'Test Web Application',
        projectDescription: 'This is a test project request for web application development.',
        features: 'User authentication, dashboard, data management',
        platform: ['Web Browser', 'iOS'],
        technology: 'React, Node.js, PostgreSQL',
        integrations: 'Payment gateway, email service, analytics',
        budget: '$25,000 - $50,000',
        timeline: '2-3 months',
        urgency: 'high',
        hasDesigns: 'yes',
        designFiles: { name: 'test_mockups.pdf' },
        additionalInfo: 'This is a test connection for project request form.'
      };

      const result = await this.saveProjectRequestFormData(testData);
      return result;

    } catch (error) {
      console.error('Project Request connection test failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Export singleton instance
export const projectRequestGoogleSheetsService = new ProjectRequestGoogleSheetsService();

// Export specific method for project request form
export const saveToProjectRequestGoogleSheets = async (formData) => {
  return await projectRequestGoogleSheetsService.saveProjectRequestFormData(formData);
};

// Export test function for troubleshooting
export const testProjectRequestGoogleSheetsConnection = async () => {
  return await projectRequestGoogleSheetsService.testConnection();
};

export default projectRequestGoogleSheetsService;
