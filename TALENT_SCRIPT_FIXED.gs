/**
 * Google Apps Script for Talent Applications (FIXED VERSION)
 * This script works with your current TalentForm.jsx code
 * Deploy this as a web app with "Anyone" access for CORS support
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

    // ✅ YOUR ACTUAL SPREADSHEET ID (CORRECT)
    const SPREADSHEET_ID = '1vgHayzR6thr6vaxQMWhQ1JIK8VA-PrA1mAC2YSYwJLo';
    
    // ✅ FIXED: Only return error if ID is still the placeholder
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
      
      // Get or create the talent applications sheet
      let sheet = spreadsheet.getSheetByName('Talent Applications');
      
      if (!sheet) {
        // If sheet doesn't exist, create it
        console.log('Creating "Talent Applications" sheet...');
        sheet = spreadsheet.insertSheet('Talent Applications');
        
        // Add headers that match your TalentForm.jsx structure
        const headers = [
          'Timestamp',
          'First Name',
          'Last Name', 
          'Email',
          'Phone',
          'Location',
          'Job Title',
          'Experience Level',
          'Skills',
          'Min Rate (USD)',
          'Max Rate (USD)',
          'Portfolio URL',
          'Bio',
          'Availability',
          'Work Type',
          'Resume File',
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
        console.log('Using existing "Talent Applications" sheet');
      }

      // Prepare row data that matches your form structure
      const timestamp = new Date();
      
      // Handle skills array - your form sends an array of selected skills
      const skillsText = Array.isArray(data.skills) ? data.skills.join(', ') : (data.skills || '');
      
      // Handle work type array - your form sends an array of selected work types
      const workTypeText = Array.isArray(data.workType) ? data.workType.join(', ') : (data.workType || '');
      
      // Handle resume file - your form sends a File object with name property
      const resumeFileName = data.resumeFileName || data.resume?.name || 'Resume uploaded';
      
      const rowData = [
        timestamp,                           // Timestamp
        data.firstName || '',               // First Name
        data.lastName || '',                // Last Name  
        data.email || '',                   // Email
        data.phone || '',                   // Phone
        data.location || '',                // Location
        data.jobTitle || '',                // Job Title
        data.experienceLevel || '',         // Experience Level (entry, mid, senior, lead)
        skillsText,                         // Skills (comma-separated)
        data.minRate || '',                 // Min Rate
        data.maxRate || '',                 // Max Rate
        data.portfolio || '',               // Portfolio URL
        data.bio || '',                     // Bio
        data.availability || '',            // Availability (immediate, twoWeeks, month, flexible)
        workTypeText,                       // Work Type (full-time, part-time, contract, freelance)
        resumeFileName,                     // Resume File Name
        data.type || 'talent_application'   // Form Type
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
          message: "Talent application saved successfully",
          timestamp: timestamp.toISOString(),
          applicantName: `${data.firstName} ${data.lastName}`,
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
  
  // ✅ FIXED: Only return error if ID is still the placeholder
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
    const sheet = spreadsheet.getSheetByName('Talent Applications');
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        message: "Talent Applications API is running",
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
