// Corrected Google Apps Script for Project Request Form - Fixed data parsing
// Replace with your actual Google Sheet ID for Project Requests
const SPREADSHEET_ID = '1Yx0D-nRY8aQqp8XFrJvq3xS7ztrAAocyehTTdrOEj1';

// Handle POST requests
function doPost(e) {
  try {
    // Handle CORS preflight requests
    if (!e || !e.postData || !e.postData.contents) {
      console.log('No postData found - likely a preflight request or invalid request');
      return createCorsResponse({
        success: false,
        error: 'No data received',
        message: 'This appears to be a preflight request or invalid request'
      });
    }

    console.log('Raw postData:', e.postData);
    console.log('Content type:', e.postData.type);
    console.log('Raw contents:', e.postData.contents);

    // Parse the data based on content type
    let data;
    try {
      if (e.postData.type === 'application/x-www-form-urlencoded') {
        // Handle form-urlencoded data
        console.log('Parsing form-urlencoded data...');
        const contents = e.postData.contents;
        
        // Manual parsing of form data
        const pairs = contents.split('&');
        const formData = {};
        
        for (const pair of pairs) {
          const [key, value] = pair.split('=');
          formData[decodeURIComponent(key)] = decodeURIComponent(value || '');
        }
        
        console.log('Parsed form data:', formData);
        
        // Extract the 'data' field and parse it as JSON
        if (formData.data) {
          data = JSON.parse(formData.data);
        } else {
          throw new Error('No data field found in form submission');
        }
      } else {
        // Handle JSON data directly
        console.log('Parsing JSON data...');
        data = JSON.parse(e.postData.contents);
      }
    } catch (parseError) {
      console.error('Failed to parse request data:', parseError);
      console.error('Raw contents for debugging:', e.postData.contents);
      return createCorsResponse({
        success: false,
        error: 'Failed to parse request data: ' + parseError.toString(),
        debug: {
          contentType: e.postData.type,
          rawContents: e.postData.contents.substring(0, 200) + '...' // First 200 chars for debugging
        }
      });
    }
    
    console.log('Successfully parsed project request data:', data);
    
    // Validate required fields
    if (!data.name || !data.email) {
      throw new Error('Missing required fields: name or email');
    }
    
    // Open the spreadsheet
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    // Process platform array
    const platformText = Array.isArray(data.platform) ? data.platform.join(', ') : (data.platform || '');
    
    // Process design files
    const designFilesText = data.designFiles ? (data.designFiles.name || 'Files uploaded') : 'No files uploaded';
    
    // Prepare the row data for project requests
    const rowData = [
      new Date(), // Timestamp
      data.name || '',
      data.email || '',
      data.company || '',
      data.phone || '',
      data.projectType || '',
      data.projectTitle || '',
      data.projectDescription || '',
      data.features || '',
      platformText,
      data.technology || '',
      data.integrations || '',
      data.budget || '',
      data.timeline || '',
      data.urgency || '',
      data.hasDesigns || '',
      designFilesText,
      data.additionalInfo || ''
    ];
    
    // Add the row to the sheet
    sheet.appendRow(rowData);
    
    // Log successful submission
    console.log('Project request saved successfully to sheet:', {
      email: data.email,
      name: data.name,
      projectType: data.projectType,
      timestamp: new Date().toISOString()
    });
    
    // Return success response
    return createCorsResponse({
      success: true,
      message: 'Project request saved successfully',
      timestamp: new Date().toISOString(),
      clientName: data.name,
      projectType: data.projectType,
      rowsAdded: 1
    });
      
  } catch (error) {
    // Log error for debugging
    console.error('Error saving project request:', error);
    
    // Return error response
    return createCorsResponse({
      success: false,
      error: error.toString(),
      timestamp: new Date().toISOString(),
      debug: {
        hasPostData: !!e?.postData,
        hasContents: !!e?.postData?.contents,
        contentType: e?.postData?.type || 'unknown',
        requestMethod: e?.parameter?.method || 'unknown'
      }
    });
  }
}

// Handle GET requests (for testing)
function doGet(e) {
  return createCorsResponse({
    status: 'Project Request Google Apps Script is running',
    timestamp: new Date().toISOString(),
    message: 'Use POST method to submit project request data',
    expectedFields: [
      'name', 'email', 'company', 'phone', 'projectType', 'projectTitle',
      'projectDescription', 'features', 'platform', 'technology', 'integrations',
      'budget', 'timeline', 'urgency', 'hasDesigns', 'designFiles', 'additionalInfo'
    ],
    spreadsheetId: SPREADSHEET_ID,
    cors: 'enabled'
  });
}

// Helper function to create response
function createCorsResponse(data) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

// Test function to verify setup
function testProjectRequestSheet() {
  const testData = {
    name: 'Test Client',
    email: 'test.client@example.com',
    company: 'Test Company Ltd',
    phone: '+1234567890',
    projectType: 'web-application',
    projectTitle: 'Test Web Application',
    projectDescription: 'This is a test project request submission.',
    features: 'User authentication, dashboard, data management',
    platform: ['Web Browser', 'iOS'],
    technology: 'React, Node.js, PostgreSQL',
    integrations: 'Payment gateway, email service',
    budget: '$25,000 - $50,000',
    timeline: '2-3 months',
    urgency: 'high',
    hasDesigns: 'yes',
    designFiles: { name: 'test_mockups.pdf' },
    additionalInfo: 'This is a test connection for project request integration.'
  };
  
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    const rowData = [
      new Date(),
      testData.name,
      testData.email,
      testData.company,
      testData.phone,
      testData.projectType,
      testData.projectTitle,
      testData.projectDescription,
      testData.features,
      testData.platform.join(', '),
      testData.technology,
      testData.integrations,
      testData.budget,
      testData.timeline,
      testData.urgency,
      testData.hasDesigns,
      testData.designFiles.name,
      testData.additionalInfo
    ];
    
    sheet.appendRow(rowData);
    console.log('Test data added successfully!');
    return 'Test successful - check your sheet';
    
  } catch (error) {
    console.error('Test failed:', error);
    return 'Test failed: ' + error.toString();
  }
}
