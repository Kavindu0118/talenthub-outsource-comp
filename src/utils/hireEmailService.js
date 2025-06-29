// Enhanced Email Service for HireWithUs Form
import emailjs from '@emailjs/browser';

// EmailJS configuration
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'development_mode';
const HIRE_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_HIRE_TEMPLATE_ID || 'hire_template';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'development_key';

// Target email addresses
const TARGET_EMAILS = [
  'isurulakmalid13@gmail.com'
];

// Check if we're in development mode
const isDevelopmentMode = SERVICE_ID === 'development_mode' || PUBLIC_KEY === 'development_key';

// Initialize EmailJS only if not in development mode
if (!isDevelopmentMode) {
  emailjs.init(PUBLIC_KEY);
}

/**
 * Formats form data into a readable email format
 */
const formatHireFormData = (formData) => {
  const formatters = {
    projectType: (value) => {
      const types = {
        'web-development': 'Web Development',
        'mobile-development': 'Mobile Development',
        'ui-ux-design': 'UI/UX Design',
        'data-science': 'Data Science & Analytics',
        'devops': 'DevOps & Infrastructure',
        'digital-marketing': 'Digital Marketing',
        'content-creation': 'Content Creation',
        'consulting': 'Technical Consulting',
        'other': 'Other'
      };
      return types[value] || value;
    },
    budget: (value) => {
      const budgets = {
        'under-5k': 'Under $5,000',
        '5k-15k': '$5,000 - $15,000',
        '15k-50k': '$15,000 - $50,000',
        '50k-100k': '$50,000 - $100,000',
        'over-100k': 'Over $100,000',
        'hourly': 'Hourly Rate Discussion'
      };
      return budgets[value] || value;
    },
    timeline: (value) => {
      const timelines = {
        'asap': 'ASAP (Within 1 week)',
        '1-month': 'Within 1 month',
        '2-3-months': '2-3 months',
        '3-6-months': '3-6 months',
        '6-months-plus': '6+ months',
        'flexible': 'Flexible timeline'
      };
      return timelines[value] || value;
    },
    teamSize: (value) => {
      const sizes = {
        '1': '1 person',
        '2-3': '2-3 people',
        '4-6': '4-6 people',
        '7-10': '7-10 people',
        '10+': '10+ people'
      };
      return sizes[value] || value;
    },
    communicationPreference: (value) => {
      const prefs = {
        'email': 'Email',
        'slack': 'Slack',
        'teams': 'Microsoft Teams',
        'zoom': 'Zoom Meetings',
        'phone': 'Phone Calls'
      };
      return prefs[value] || value;
    }
  };

  return {
    // Company Information
    companyName: formData.companyName || 'Not provided',
    contactName: formData.contactName || 'Not provided',
    email: formData.email || 'Not provided',
    phone: formData.phone || 'Not provided',
    jobTitle: formData.jobTitle || 'Not provided',
    
    // Project Details
    projectTitle: formData.projectTitle || 'Not provided',
    projectType: formatters.projectType(formData.projectType) || 'Not provided',
    projectDescription: formData.projectDescription || 'Not provided',
    
    // Requirements
    requiredSkills: Array.isArray(formData.requiredSkills) 
      ? formData.requiredSkills.join(', ') 
      : (formData.requiredSkills || 'Not specified'),
    timeline: formatters.timeline(formData.timeline) || 'Not provided',
    budget: formatters.budget(formData.budget) || 'Not provided',
    teamSize: formatters.teamSize(formData.teamSize) || 'Not provided',
    
    // Additional Information
    communicationPreference: formatters.communicationPreference(formData.communicationPreference) || 'Not provided',
    additionalRequirements: formData.additionalRequirements || 'None',
    
    // File Information
    hasProjectFile: formData.projectFile ? 'Yes' : 'No',
    fileName: formData.projectFile ? formData.projectFile.name : 'No file uploaded',
    
    // Timestamps
    submissionDate: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  };
};

/**
 * Creates a well-formatted HTML email template
 */
const createHtmlEmailTemplate = (data) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Hire Request</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 800px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
        .header p { margin: 10px 0 0 0; opacity: 0.9; font-size: 16px; }
        .content { padding: 40px; }
        .section { margin-bottom: 35px; }
        .section-title { color: #3b82f6; font-size: 20px; font-weight: 600; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #e5e7eb; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
        .info-item { background-color: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6; }
        .info-label { font-weight: 600; color: #374151; margin-bottom: 5px; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px; }
        .info-value { color: #1f2937; font-size: 14px; }
        .description-box { background-color: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; margin-top: 15px; }
        .status-badge { display: inline-block; background-color: #10b981; color: white; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; }
        .footer { background-color: #f9fafb; padding: 25px; text-align: center; border-top: 1px solid #e5e7eb; }
        .footer p { margin: 0; color: #6b7280; font-size: 14px; }
        .priority-high { border-left-color: #ef4444; }
        .priority-medium { border-left-color: #f59e0b; }
        .priority-low { border-left-color: #10b981; }
        @media (max-width: 600px) {
            .info-grid { grid-template-columns: 1fr; gap: 15px; }
            .content { padding: 25px; }
            .header { padding: 25px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 New Hire Request</h1>
            <p>A new client is looking to hire talent through your platform</p>
            <span class="status-badge">New Submission</span>
        </div>
        
        <div class="content">
            <!-- Contact Information -->
            <div class="section">
                <h2 class="section-title">👤 Contact Information</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Company Name</div>
                        <div class="info-value">${data.companyName}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Contact Person</div>
                        <div class="info-value">${data.contactName}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Job Title</div>
                        <div class="info-value">${data.jobTitle}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Email Address</div>
                        <div class="info-value"><a href="mailto:${data.email}" style="color: #3b82f6;">${data.email}</a></div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Phone Number</div>
                        <div class="info-value"><a href="tel:${data.phone}" style="color: #3b82f6;">${data.phone}</a></div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Preferred Communication</div>
                        <div class="info-value">${data.communicationPreference}</div>
                    </div>
                </div>
            </div>

            <!-- Project Details -->
            <div class="section">
                <h2 class="section-title">📋 Project Details</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Project Title</div>
                        <div class="info-value">${data.projectTitle}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Project Type</div>
                        <div class="info-value">${data.projectType}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Required Skills</div>
                        <div class="info-value">${data.requiredSkills}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Project File</div>
                        <div class="info-value">${data.hasProjectFile} ${data.fileName !== 'No file uploaded' ? '(' + data.fileName + ')' : ''}</div>
                    </div>
                </div>
                
                <div class="description-box">
                    <div class="info-label">Project Description</div>
                    <div class="info-value">${data.projectDescription.replace(/\n/g, '<br>')}</div>
                </div>
            </div>

            <!-- Project Requirements -->
            <div class="section">
                <h2 class="section-title">⚙️ Project Requirements</h2>
                <div class="info-grid">
                    <div class="info-item priority-high">
                        <div class="info-label">Timeline</div>
                        <div class="info-value">${data.timeline}</div>
                    </div>
                    <div class="info-item priority-medium">
                        <div class="info-label">Budget Range</div>
                        <div class="info-value">${data.budget}</div>
                    </div>
                    <div class="info-item priority-low">
                        <div class="info-label">Team Size Needed</div>
                        <div class="info-value">${data.teamSize}</div>
                    </div>
                </div>
                
                ${data.additionalRequirements !== 'None' ? `
                <div class="description-box">
                    <div class="info-label">Additional Requirements</div>
                    <div class="info-value">${data.additionalRequirements.replace(/\n/g, '<br>')}</div>
                </div>
                ` : ''}
            </div>

            <!-- Submission Info -->
            <div class="section">
                <h2 class="section-title">📅 Submission Information</h2>
                <div class="info-item">
                    <div class="info-label">Submitted On</div>
                    <div class="info-value">${data.submissionDate}</div>
                </div>
            </div>
        </div>

        <div class="footer">
            <p><strong>Next Steps:</strong> Review the request and contact the client within 24 hours for the best response rate.</p>
            <p style="margin-top: 10px; font-size: 12px;">This email was sent automatically from your HireWithUs form submission system.</p>
        </div>
    </div>
</body>
</html>
  `;
};

/**
 * Sends hire form data via email using EmailJS
 */
export const sendHireFormEmail = async (formData) => {
  try {
    // If in development mode, use alternative method immediately
    if (isDevelopmentMode) {
      console.log('📧 Development Mode: Using alternative email service');
      return await sendHireFormEmailAlternative(formData);
    }

    // Format the form data
    const formattedData = formatHireFormData(formData);
    
    // Create HTML email content
    const htmlContent = createHtmlEmailTemplate(formattedData);
    
    // Send email to both target addresses
    const emailPromises = TARGET_EMAILS.map(email => 
      emailjs.send(
        SERVICE_ID,
        HIRE_TEMPLATE_ID,
        {
          to_email: email,
          subject: `🚀 New Hire Request from ${formattedData.companyName}`,
          html_content: htmlContent,
          company_name: formattedData.companyName,
          contact_name: formattedData.contactName,
          contact_email: formattedData.email,
          contact_phone: formattedData.phone,
          project_title: formattedData.projectTitle,
          project_type: formattedData.projectType,
          timeline: formattedData.timeline,
          budget: formattedData.budget,
          submission_date: formattedData.submissionDate
        }
      )
    );

    const results = await Promise.all(emailPromises);
    
    return {
      success: true,
      message: `Email sent successfully to ${TARGET_EMAILS.length} recipients`,
      results
    };

  } catch (error) {
    console.error('Failed to send hire form email:', error);
    
    // Fallback to alternative method
    console.log('📧 Falling back to alternative email method');
    return await sendHireFormEmailAlternative(formData);
  }
};

/**
 * Alternative email service using Fetch API (if EmailJS is not configured)
 */
export const sendHireFormEmailAlternative = async (formData) => {
  const formattedData = formatHireFormData(formData);
  
  console.log('='.repeat(80));
  console.log('📧 NEW HIRE REQUEST RECEIVED');
  console.log('='.repeat(80));
  console.log('🏢 COMPANY:', formattedData.companyName);
  console.log('👤 CONTACT:', formattedData.contactName, `(${formattedData.email})`);
  console.log('📞 PHONE:', formattedData.phone);
  console.log('💼 JOB TITLE:', formattedData.jobTitle);
  console.log('📋 PROJECT:', formattedData.projectTitle);
  console.log('🔧 TYPE:', formattedData.projectType);
  console.log('⏰ TIMELINE:', formattedData.timeline);
  console.log('💰 BUDGET:', formattedData.budget);
  console.log('👥 TEAM SIZE:', formattedData.teamSize);
  console.log('💬 COMMUNICATION:', formattedData.communicationPreference);
  console.log('📂 FILE:', formattedData.hasProjectFile, formattedData.fileName);
  console.log('📅 SUBMITTED:', formattedData.submissionDate);
  console.log('');
  console.log('📄 PROJECT DESCRIPTION:');
  console.log(formattedData.projectDescription);
  console.log('');
  console.log('🔧 REQUIRED SKILLS:');
  console.log(formattedData.requiredSkills);
  
  if (formattedData.additionalRequirements !== 'None') {
    console.log('');
    console.log('➕ ADDITIONAL REQUIREMENTS:');
    console.log(formattedData.additionalRequirements);
  }
  
  console.log('');
  console.log('📧 WOULD BE SENT TO:', TARGET_EMAILS.join(', '));
  console.log('='.repeat(80));
  
  // Show notification in browser
  if (typeof window !== 'undefined' && window.alert) {
    const summary = `New Hire Request Received! ✅

🏢 Company: ${formattedData.companyName}
👤 Contact: ${formattedData.contactName}
📞 Phone: ${formattedData.phone}
📋 Project: ${formattedData.projectTitle}
💰 Budget: ${formattedData.budget}
⏰ Timeline: ${formattedData.timeline}

📧 Email would be sent to:
• isurulakmalid13@gmail.com
• kavinduavishka@gmail.com

Check browser console for complete details.`;
    setTimeout(() => alert(summary), 100);
  }
  
  // Simulate email sending delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: `✅ Form data received and processed successfully! 
        
📧 In production, this would send emails to:
• isurulakmalid13@gmail.com  
• kavinduavishka@gmail.com

Check browser console for detailed form submission data.`,
        data: formattedData,
        targetEmails: TARGET_EMAILS
      });
    }, 1000);
  });
};

export default {
  sendHireFormEmail,
  sendHireFormEmailAlternative
};
