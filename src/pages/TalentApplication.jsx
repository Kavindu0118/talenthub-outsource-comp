import React from 'react';
import TalentForm from '../components/forms/TalentForm';
import '../styles/components/TalentApplicationHeader.css';

const TalentApplication = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Header Section */}
      
      <section className="talent-header-section" style={{
        minHeight: '100vh', // Increase header height (adjust as needed, e.g. 80vh or 100vh for full screen)
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f0f7ff 0%, #f9fafb 60%, #e0e7ff 100%)'}}>
        <div className="talent-header-grid"></div>
        <div className="talent-header-floating-elements">
          {/* Graduation Cap Icon */}
          <div className="talent-header-icon talent-header-icon-1">
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#3b82f6" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L2 9l10 6 10-6-10-6zm0 13.5v4.5m-6-4.5v2.25A2.25 2.25 0 008.25 21h7.5A2.25 2.25 0 0018 18.75V16" />
            </svg>
          </div>
          {/* Briefcase Icon */}
          <div className="talent-header-icon talent-header-icon-2">
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#8b5cf6" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M3 7h18a2 2 0 012 2v9a2 2 0 01-2 2H3a2 2 0 01-2-2V9a2 2 0 012-2z" />
            </svg>
          </div>
          
          {/* Rocket Icon (realistic) */}
          <div className="talent-header-icon talent-header-icon-3">
            <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
              <g>
                
                <path d="M32 8C38 16 44 32 32 56C20 32 26 16 32 8Z" fill="#fff" stroke="#10b981" strokeWidth="2"/>
                
                <circle cx="32" cy="24" r="4" fill="#3b82f6" stroke="#2563eb" strokeWidth="1.5"/>
                
                <path d="M26 44L18 54L28 50" fill="#f59e42" stroke="#f59e42" strokeWidth="2"/>
                
                <path d="M38 44L46 54L36 50" fill="#f59e42" stroke="#f59e42" strokeWidth="2"/>
                
                <path d="M32 56C33 59 31 62 32 62C33 62 31 59 32 56Z" fill="#fbbf24" stroke="#f59e42" strokeWidth="1"/>
                <path d="M32 56C32.5 58 33.5 60 32 60C30.5 60 31.5 58 32 56Z" fill="#f59e42"/>
              </g>
            </svg>
          </div>
          {/* User Group Icon */}
          <div className="talent-header-icon talent-header-icon-4">
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#f59e42" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-6.13a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
        <div className="talent-header-container">
          <h1 className="talent-header-title">
            <span className="talent-header-highlight">Join Our Elite Talent Network</span>
          </h1>
          <p className="talent-header-subtitle">
            Connect with leading companies worldwide and take your career to new heights. Join thousands of professionals who trust us with their career growth.
          </p>
        </div>
      </section>
      {/* Benefits Section */}
      <section className="py-12 px-4 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl p-6 shadow-md text-center hover:scale-105 transition-transform">
          <div className="text-blue-500 text-5xl mb-4 mx-auto">🌐</div>
          <h3 className="text-xl font-semibold mb-2">Global Opportunities</h3>
          <p className="text-gray-600">Access to positions with top companies across different industries and locations.</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md text-center hover:scale-105 transition-transform">
          <div className="text-green-500 text-5xl mb-4 mx-auto">💵</div>
          <h3 className="text-xl font-semibold mb-2">Competitive Compensation</h3>
          <p className="text-gray-600">Negotiate better salaries and benefits with our support and market insights.</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md text-center hover:scale-105 transition-transform">
          <div className="text-purple-500 text-5xl mb-4 mx-auto">📈</div>
          <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
          <p className="text-gray-600">Continuous support and resources to advance your skills and career trajectory.</p>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-12 px-4 max-w-3xl mx-auto">
          <div className="talent-form-container">
            <TalentForm />
          </div>
      </section>
    </div>
  );
};

export default TalentApplication;
