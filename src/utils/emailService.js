import emailjs from '@emailjs/browser';

// EmailJS configuration - Uses environment variables or fallback values
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id';
const TEMPLATE_ID_TALENT = import.meta.env.VITE_EMAILJS_TALENT_TEMPLATE_ID || 'your_talent_template_id';
const TEMPLATE_ID_CLIENT = import.meta.env.VITE_EMAILJS_CLIENT_TEMPLATE_ID || 'your_client_template_id';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key';

// Initialize EmailJS
if (PUBLIC_KEY !== 'your_public_key') {
  emailjs.init(PUBLIC_KEY);
}

export const sendTalentApplication = async (formData) => {
  // Check if EmailJS is properly configured
  if (SERVICE_ID === 'your_service_id' || PUBLIC_KEY === 'your_public_key') {
    console.warn('EmailJS not configured. Please set up environment variables.');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const result = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID_TALENT,
      {
        to_email: 'hr@yourcompany.com',
        from_name: formData.fullName,
        from_email: formData.email,
        phone: formData.phone,
        skills: formData.skills.join(', '),
        experience: formData.experience,
        portfolio: formData.portfolio,
        introduction: formData.introduction,
      }
    );
    return { success: true, result };
  } catch (error) {
    console.error('Failed to send talent application:', error);
    return { success: false, error: error.text || 'Failed to send application' };
  }
};

export const sendClientRequest = async (formData) => {
  // Check if EmailJS is properly configured
  if (SERVICE_ID === 'your_service_id' || PUBLIC_KEY === 'your_public_key') {
    console.warn('EmailJS not configured. Please set up environment variables.');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const result = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID_CLIENT,
      {
        to_email: 'sales@yourcompany.com',
        company_name: formData.companyName,
        contact_name: formData.contactName,
        from_email: formData.email,
        phone: formData.phone,
        project_title: formData.projectTitle,
        project_description: formData.projectDescription,
        required_skills: formData.requiredSkills.join(', '),
        timeline: formData.timeline,
        budget: formData.budget,
        start_date: formData.startDate,
      }
    );
    return { success: true, result };
  } catch (error) {
    console.error('Failed to send client request:', error);
    return { success: false, error: error.text || 'Failed to send request' };
  }
};

export const uploadFile = async (file, type = 'general') => {
  // This is a placeholder for file upload functionality
  // You can integrate with services like Cloudinary, AWS S3, or Firebase Storage
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    
    // Simulate file upload
    setTimeout(() => {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        reject(new Error('File size too large'));
      } else {
        resolve({
          success: true,
          url: `https://example.com/uploads/${file.name}`,
          filename: file.name,
        });
      }
    }, 2000);
  });
};
