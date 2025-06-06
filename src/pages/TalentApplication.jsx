import React from 'react';
import TalentForm from '../components/forms/TalentForm';

const TalentApplication = () => {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero-section hero-gradient">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-16 md:py-20 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Join Our Elite Talent Network
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4 sm:px-6">
            Connect with leading companies worldwide and take your career to new heights. 
            Join thousands of professionals who trust us with their career growth.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-10 sm:py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Why Join Our Network</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Global Opportunities</h3>
              <p className="text-gray-600">Access to positions with top companies across different industries and locations.</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Competitive Compensation</h3>
              <p className="text-gray-600">Negotiate better salaries and benefits with our support and market insights.</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 sm:col-span-2 lg:col-span-1 sm:max-w-md sm:mx-auto lg:mx-0 lg:max-w-none">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Career Growth</h3>
              <p className="text-gray-600">Continuous support and resources to advance your skills and career trajectory.</p>
            </div>
          </div>
          
          {/* Application Form */}
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-4 sm:p-6 md:p-8">
            <TalentForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default TalentApplication;
