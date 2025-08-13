# Google Apps Script Setup for Talent Form

## 🎯 **Perfect Match for Your TalentForm.jsx**

This Google Apps Script is specifically designed to work with your existing TalentForm.jsx code structure.

## 📋 **Quick Setup Steps**

### 1. **Get Your Spreadsheet ID**
1. Open your existing Google Spreadsheet (where you want talent applications saved)
2. Copy the ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID_HERE/edit
   ```
3. Save this ID - you'll need it in step 3

### 2. **Create the Google Apps Script**
1. Go to [script.google.com](https://script.google.com)
2. Click **"New Project"**
3. Copy and paste the **entire contents** of `TALENT_FORM_GOOGLE_SCRIPT.gs` into the editor
4. Name your project: **"Talent Applications API"**

### 3. **Update the Spreadsheet ID**
1. Find this line in the script (around line 25):
   ```javascript
   const SPREADSHEET_ID = 'PASTE_YOUR_SPREADSHEET_ID_HERE';
   ```
2. Replace `'PASTE_YOUR_SPREADSHEET_ID_HERE'` with your actual spreadsheet ID:
   ```javascript
   const SPREADSHEET_ID = '1ABC...XYZ';  // Your real ID here
   ```
3. **Save** the script (Ctrl/Cmd + S)

### 4. **Deploy as Web App**
1. Click **"Deploy"** → **"New deployment"**
2. Click the gear icon next to "Type" and select **"Web app"**
3. Configure deployment:
   - **Description**: "Talent Form API v1"
   - **Execute as**: "Me"
   - **Who has access**: **"Anyone"** ⚠️ **This is crucial for CORS**
4. Click **"Deploy"**
5. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/AKfyc.../exec`)
6. Click **"Done"**

### 5. **Update Your Environment Variable**
1. In your `.env.local` file, update:
   ```env
   VITE_TALENT_GOOGLE_SCRIPT_URL=YOUR_NEW_WEB_APP_URL_HERE
   ```
2. If using Vercel, update the environment variable in your Vercel dashboard too

### 6. **Test the Setup**
1. **Test the script directly**: Visit your Web App URL in a browser
   - Should return JSON with `"status": "success"`
2. **Test your talent form**: Submit a test application
   - Check your spreadsheet for the new data

## 📊 **What This Script Does**

### **Automatic Sheet Creation**
- Creates a "Talent Applications" sheet if it doesn't exist
- Adds properly formatted headers

### **Perfect Data Mapping**
Your form sends this data structure:
```javascript
{
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com", 
  phone: "+1234567890",
  location: "New York, USA",
  jobTitle: "Senior React Developer",
  experienceLevel: "senior", // entry, mid, senior, lead
  skills: ["JavaScript", "React", "Node.js"], // Array
  minRate: "75",
  maxRate: "120", 
  portfolio: "https://portfolio.com",
  bio: "Developer bio...",
  availability: "twoWeeks", // immediate, twoWeeks, month, flexible
  workType: ["full-time", "contract"], // Array
  resume: { name: "resume.pdf" }, // File object
  type: "talent_application"
}
```

### **Spreadsheet Columns Created**
| Column | Data Source | Notes |
|--------|-------------|-------|
| Timestamp | Auto-generated | When form was submitted |
| First Name | `data.firstName` | |
| Last Name | `data.lastName` | |
| Email | `data.email` | |
| Phone | `data.phone` | |
| Location | `data.location` | |
| Job Title | `data.jobTitle` | |
| Experience Level | `data.experienceLevel` | entry/mid/senior/lead |
| Skills | `data.skills` | Array joined with commas |
| Min Rate (USD) | `data.minRate` | |
| Max Rate (USD) | `data.maxRate` | |
| Portfolio URL | `data.portfolio` | |
| Bio | `data.bio` | |
| Availability | `data.availability` | immediate/twoWeeks/month/flexible |
| Work Type | `data.workType` | Array joined with commas |
| Resume File | `data.resume.name` | Filename only |
| Form Type | `data.type` | Always "talent_application" |

## ✅ **Expected Result**

After setup, when someone submits your talent form:
1. ✅ Data is saved to your existing spreadsheet
2. ✅ New row is added with all form data
3. ✅ Success message is shown to user
4. ✅ Form is reset automatically

## 🐛 **Troubleshooting**

### **"Please update the SPREADSHEET_ID" Error**
- You forgot to replace the placeholder with your real spreadsheet ID

### **"Failed to access spreadsheet" Error**  
- Check that your spreadsheet ID is correct
- Make sure the spreadsheet exists and is accessible

### **CORS Errors**
- Ensure the script is deployed with "Anyone" access
- Wait 1-2 minutes after deployment for changes to take effect

### **No Data in Spreadsheet**
- Check the Google Apps Script execution logs: Go to your script → "Executions" tab
- Verify the Web App URL is correct in your environment variables

This script is perfectly tailored to your existing TalentForm.jsx and will work seamlessly! 🚀
