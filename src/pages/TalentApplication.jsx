import React from 'react';
import TalentForm from '../components/forms/TalentForm';

const TalentApplication = () => {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero-section hero-gradient">
        <div className="container" style={{padding: '2.5rem 1rem 5rem 1rem', textAlign: 'center'}}>
          <h1 style={{fontSize: '2.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.5rem', lineHeight: '1.2'}}>
            Join Our Elite Talent Network
          </h1>
          <p style={{fontSize: '1.125rem', color: '#4b5563', marginBottom: '2rem', maxWidth: '48rem', margin: '0 auto 2rem auto', padding: '0 1rem'}}>
            Connect with leading companies worldwide and take your career to new heights. 
            Join thousands of professionals who trust us with their career growth.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{padding: '2.5rem 0 4rem 0', backgroundColor: 'white'}}>
        <div className="container">
          <h2 style={{fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem'}}>Why Join Our Network</h2>
          
          <div className="talent-benefits-grid" style={{marginBottom: '4rem'}}>
            <div className="talent-benefit-card">
              <div className="talent-benefit-icon bg-blue-100" style={{backgroundColor: '#dbeafe', color: '#2563eb'}}>
                <svg style={{width: '2rem', height: '2rem'}} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
              </div>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem'}}>Global Opportunities</h3>
              <p style={{color: '#4b5563'}}>Access to positions with top companies across different industries and locations.</p>
            </div>
            
            <div className="talent-benefit-card">
              <div className="talent-benefit-icon" style={{backgroundColor: '#dcfce7', color: '#059669'}}>
                <svg style={{width: '2rem', height: '2rem'}} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem'}}>Competitive Compensation</h3>
              <p style={{color: '#4b5563'}}>Negotiate better salaries and benefits with our support and market insights.</p>
            </div>
            
            <div className="talent-benefit-card">
              <div className="talent-benefit-icon" style={{backgroundColor: '#e9d5ff', color: '#9333ea'}}>
                <svg style={{width: '2rem', height: '2rem'}} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem'}}>Career Growth</h3>
              <p style={{color: '#4b5563'}}>Continuous support and resources to advance your skills and career trajectory.</p>
            </div>
          </div>
          
          {/* Application Form */}
          <div className="talent-form-container">
            <TalentForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default TalentApplication;
