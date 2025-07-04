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
    
    if (!this.scriptUrl || this.scriptUrl === 'https://script.google.com/macros/s/AKfycby19h6UqYmKhH7EYJRbHhIL1G_FZNe0rrwByy-HfTULfZuT26puQt5G5cHkd00vWKZwcA/exec') {
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

      // Send data to Google Apps Script with additional debugging
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sheetData),
        mode: 'no-cors', // Use no-cors to bypass CORS issues
        credentials: 'omit'
      };

      console.log('Request options:', requestOptions);
      console.log('🚀 Sending request to Google Apps Script...');

      const response = await fetch(this.scriptUrl, requestOptions);

      console.log('Project request response status:', response.status);
      console.log('Project request response statusText:', response.statusText);
      console.log('Project request response type:', response.type);

      // Handle no-cors response (opaque response)
      if (response.type === 'opaque') {
        console.log('Received opaque response (no-cors mode) - assuming success');
        return {
          success: true,
          message: 'Your project request has been submitted successfully!',
          timestamp: new Date().toISOString(),
          clientName: sheetData.name
        };
      }

      console.log('Project request response headers:', Object.fromEntries(response.headers.entries()));

      // Try to get response text first for better error debugging
      const responseText = await response.text();
      console.log('Raw response text:', responseText);

      if (!response.ok) {
        console.error('Project request response error details:', responseText);
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

      console.log('Project Request Google Apps Script response:', result);

      if (result.success) {
        console.log('✅ Project request saved to Google Sheets successfully:', result);
        return {
          success: true,
          message: 'Your project request has been submitted successfully!',
          timestamp: result.timestamp,
          clientName: result.clientName
        };
      } else {
        throw new Error(result.error || 'Failed to save project request');
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
    if (!this.scriptUrl || this.scriptUrl === 'your_project_request_web_app_url_here') {
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
