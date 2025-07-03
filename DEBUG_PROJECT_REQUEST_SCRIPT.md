# Debug Your Project Request Google Apps Script

Since `no-cors` mode hides the actual response, we need to debug your Google Apps Script directly.

## Step 1: Test Your Google Apps Script Directly

1. **Go to your Project Request Google Apps Script**
2. **In the script editor, click on the function dropdown and select `testProjectRequestSheet`**
3. **Click the "Run" button**
4. **Check the execution logs** to see if it works

This will test if your Google Apps Script can save to the sheet directly.

## Step 2: Check Your Current Google Apps Script

Make sure your Google Apps Script looks exactly like this:

```javascript
// Replace with your actual Google Sheet ID for Project Requests
const SPREADSHEET_ID = '1Yx0D-nRY8aQqp8XFrJvq3xS7ztrAAocyehTTdrOEj1';

function doPost(e) {
  try {
    console.log('doPost called with:', {
      hasE: !!e,
      hasPostData: !!(e && e.postData),
      hasContents: !!(e && e.postData && e.postData.contents),
      contentType: e && e.postData ? e.postData.type : 'none'
    });

    // Handle CORS preflight requests
    if (!e || !e.postData || !e.postData.contents) {
      console.log('No postData found - likely a preflight request or invalid request');
      return createCorsResponse({
        success: false,
        error: 'No data received',
        message: 'This appears to be a preflight request or invalid request'
      });
    }

    // Log raw content for debugging
    console.log('Raw postData contents:', e.postData.contents);

    // Parse the JSON data from the request
    const data = JSON.parse(e.postData.contents);
    console.log('Parsed project request data:', data);
    
    // Validate required fields
    if (!data.name || !data.email) {
      throw new Error('Missing required fields: name or email');
    }
    
    // Open the spreadsheet
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    console.log('Sheet opened successfully');
    
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
    
    console.log('Row data prepared:', rowData);
    
    // Add the row to the sheet
    sheet.appendRow(rowData);
    console.log('Row added to sheet successfully');
    
    // Log successful submission
    console.log('Project request saved successfully:', {
      email: data.email,
      name: data.name,
      projectType: data.projectType,
      timestamp: new Date().toISOString()
    });
    
    // Return success response with CORS headers
    return createCorsResponse({
      success: true,
      message: 'Project request saved successfully',
      timestamp: new Date().toISOString(),
      clientName: data.name,
      projectType: data.projectType
    });
      
  } catch (error) {
    // Log error for debugging
    console.error('Error saving project request:', error);
    
    // Return error response with CORS headers
    return createCorsResponse({
      success: false,
      error: error.toString(),
      timestamp: new Date().toISOString(),
      debug: {
        hasPostData: !!e?.postData,
        hasContents: !!e?.postData?.contents,
        requestMethod: e?.parameter?.method || 'unknown'
      }
    });
  }
}

// Handle GET requests (for testing)
function doGet(e) {
  console.log('doGet called');
  return createCorsResponse({
    status: 'Project Request Google Apps Script is running',
    timestamp: new Date().toISOString(),
    message: 'Use POST method to submit project request data',
    expectedFields: [
      'name', 'email', 'company', 'phone', 'projectType', 'projectTitle',
      'projectDescription', 'features', 'platform', 'technology', 'integrations',
      'budget', 'timeline', 'urgency', 'hasDesigns', 'designFiles', 'additionalInfo'
    ],
    spreadsheetId: SPREADSHEET_ID
  });
}

// Helper function to create response with proper CORS headers
function createCorsResponse(data) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

// Test function to verify setup
function testProjectRequestSheet() {
  console.log('Starting test function...');
  
  const testData = {
    name: 'Test Client Direct',
    email: 'test.direct@example.com',
    company: 'Test Company Ltd',
    phone: '+1234567890',
    projectType: 'web-application',
    projectTitle: 'Direct Test Application',
    projectDescription: 'This is a direct test from Google Apps Script editor.',
    features: 'User authentication, dashboard, data management',
    platform: ['Web Browser', 'iOS'],
    technology: 'React, Node.js, PostgreSQL',
    integrations: 'Payment gateway, email service',
    budget: '$25,000 - $50,000',
    timeline: '2-3 months',
    urgency: 'high',
    hasDesigns: 'yes',
    designFiles: { name: 'direct_test_mockups.pdf' },
    additionalInfo: 'This is a direct test from the Google Apps Script editor.'
  };
  
  try {
    console.log('Opening spreadsheet...');
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    console.log('Sheet opened successfully');
    
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
    
    console.log('Adding row to sheet...');
    sheet.appendRow(rowData);
    console.log('Test data added successfully!');
    return 'Direct test successful - check your sheet for the test row';
    
  } catch (error) {
    console.error('Direct test failed:', error);
    return 'Direct test failed: ' + error.toString();
  }
}
```

## Step 3: Run the Direct Test

1. **Select `testProjectRequestSheet` function**
2. **Click Run**
3. **Check your Google Sheet** - you should see a new row with "Test Client Direct"
4. **Check the execution logs** for any errors

If the direct test works, then the issue is with the data transmission from your app to Google Apps Script. If it fails, then there's an issue with your Google Apps Script or Sheet permissions.

Let me know what happens with the direct test!
