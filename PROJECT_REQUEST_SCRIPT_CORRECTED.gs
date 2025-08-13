/**
 * CORRECTED Google Apps Script for Project Request Form (Solutions Page)
 * ✅ This version fixes the logic error in your deployed script
 * 
 * ISSUE IDENTIFIED: Your deployed script likely has backwards logic that errors
 * when you correctly set your spreadsheet ID!
 * 
 * Deploy this corrected version as a web app with "Anyone" access
 */

function doPost(e) {
  try {
    // Log the request for debugging
    console.log('Received POST request:', e);
    
    // Parse the JSON data from the request
    let data;
    try {
      data = JSON.parse(e.postData.contents);
      console.log('Parsed data:', data);
    } catch (parseError) {
      console.error('Failed to parse JSON:', parseError);
      return ContentService
        .createTextOutput(JSON.stringify({
          status: "error", 
          message: "Invalid JSON data"
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // ✅ SET THIS TO YOUR ACTUAL SPREADSHEET ID
    // Get this from your Google Sheets URL: docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
    const SPREADSHEET_ID = '1vgHayzR6thr6vaxQMWhQ1JIK8VA-PrA1mAC2YSYwJLo';
    
    // ✅ CORRECTED LOGIC: Only error if STILL using placeholder
    if (SPREADSHEET_ID === 'PASTE_YOUR_SPREADSHEET_ID_HERE') {
      return ContentService
        .createTextOutput(JSON.stringify({
          status: "error", 
          message: "Please update the SPREADSHEET_ID in the script with your actual spreadsheet ID"
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    try {
      // Open your existing spreadsheet
      const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
      console.log('Successfully opened spreadsheet:', spreadsheet.getName());
      
      // Get or create the project requests sheet
      let sheet = spreadsheet.getSheetByName('Project Requests');
      
      if (!sheet) {
        // If sheet doesn't exist, create it
        console.log('Creating "Project Requests" sheet...');
        sheet = spreadsheet.insertSheet('Project Requests');
        
        // Add headers that match your ProjectRequestForm.jsx structure
        const headers = [
          'Timestamp',
          'Full Name',
          'Email',
          'Company',
          'Phone',
          'Project Type',
          'Project Title',
          'Project Description',
          'Key Features',
          'Target Platforms',
          'Technology/Framework',
          'Integrations',
          'Budget Range',
          'Timeline',
          'Urgency',
          'Has Designs',
          'Design Files',
          'Additional Info',
          'Form Type'
        ];
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
        
        // Format header row
        const headerRange = sheet.getRange(1, 1, 1, headers.length);
        headerRange.setFontWeight('bold');
        headerRange.setBackground('#4285f4');
        headerRange.setFontColor('white');
        
        console.log('Headers added to new sheet');
      } else {
        console.log('Using existing "Project Requests" sheet');
      }

      // Prepare row data that matches your form structure
      const timestamp = new Date();
      
      // Handle platform array - your form sends an array of selected platforms
      const platformsText = Array.isArray(data.platform) ? data.platform.join(', ') : (data.platform || '');
      
      // Handle design files - your form sends a File object with name property
      const designFileName = data.designFiles?.name || (data.hasDesigns === 'yes' ? 'Design files uploaded' : 'No design files');
      
      const rowData = [
        timestamp,                           // Timestamp
        data.name || '',                    // Full Name
        data.email || '',                   // Email
        data.company || '',                 // Company
        data.phone || '',                   // Phone
        data.projectType || '',             // Project Type
        data.projectTitle || '',            // Project Title
        data.projectDescription || '',      // Project Description
        data.features || '',                // Key Features
        platformsText,                      // Target Platforms (comma-separated)
        data.technology || '',              // Technology/Framework
        data.integrations || '',            // Integrations
        data.budget || '',                  // Budget Range
        data.timeline || '',                // Timeline
        data.urgency || '',                 // Urgency
        data.hasDesigns || '',              // Has Designs
        designFileName,                     // Design Files
        data.additionalInfo || '',          // Additional Info
        data.type || 'project-request'      // Form Type
      ];

      // Add the data to the sheet
      sheet.appendRow(rowData);
      
      // Auto-resize columns for better readability
      sheet.autoResizeColumns(1, rowData.length);
      
      const rowNumber = sheet.getLastRow();
      console.log('Data saved successfully to row:', rowNumber);
      
      // Return success response that matches your frontend expectations
      return ContentService
        .createTextOutput(JSON.stringify({
          status: "success",
          message: "Project request saved successfully",
          timestamp: timestamp.toISOString(),
          clientName: data.name,
          projectTitle: data.projectTitle,
          spreadsheetUrl: spreadsheet.getUrl(),
          sheetName: sheet.getName(),
          rowNumber: rowNumber
        }))
        .setMimeType(ContentService.MimeType.JSON);
        
    } catch (spreadsheetError) {
      console.error('Error accessing spreadsheet:', spreadsheetError);
      return ContentService
        .createTextOutput(JSON.stringify({
          status: "error", 
          message: "Failed to access spreadsheet: " + spreadsheetError.toString() + " (Check if the spreadsheet ID is correct and the script has permission to access it)"
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
      
  } catch (error) {
    console.error('Error in doPost:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing)
function doGet(e) {
  const SPREADSHEET_ID = '1vgHayzR6thr6vaxQMWhQ1JIK8VA-PrA1mAC2YSYwJLo';
  
  // ✅ CORRECTED LOGIC: Only error if STILL using placeholder
  if (SPREADSHEET_ID === 'PASTE_YOUR_SPREADSHEET_ID_HERE') {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        message: "Please update the SPREADSHEET_ID in the script",
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName('Project Requests');
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        message: "Project Requests API is running",
        timestamp: new Date().toISOString(),
        spreadsheetName: spreadsheet.getName(),
        spreadsheetUrl: spreadsheet.getUrl(),
        sheetName: sheet ? sheet.getName() : 'Sheet not found',
        totalRows: sheet ? sheet.getLastRow() : 0
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        message: "Failed to access spreadsheet: " + error.toString(),
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Optional: Function to test with sample data that matches your form
 */
function testWithSampleData() {
  const sampleData = {
    name: "Jane Smith",
    email: "jane.smith@company.com",
    company: "Tech Innovations Inc",
    phone: "+1-555-0123",
    projectType: "web-application",
    projectTitle: "Customer Portal Dashboard",
    projectDescription: "We need a comprehensive customer portal where our clients can manage their accounts, view invoices, and track project progress.",
    features: "User authentication, dashboard analytics, invoice management, project tracking, notification system",
    platform: ["Web Browser", "Desktop"],
    technology: "React, Node.js, PostgreSQL",
    integrations: "Stripe for payments, SendGrid for emails, AWS for hosting",
    budget: "25k-50k",
    timeline: "2-4-months",
    urgency: "high",
    hasDesigns: "partial",
    designFiles: { name: "wireframes_v1.pdf" },
    additionalInfo: "Looking for a team that can start within 2 weeks. Previous experience with financial applications preferred.",
    type: "project-request"
  };
  
  // Simulate the POST request
  const mockEvent = {
    postData: {
      contents: JSON.stringify(sampleData)
    }
  };
  
  const result = doPost(mockEvent);
  console.log('Test result:', result.getContent());
}
