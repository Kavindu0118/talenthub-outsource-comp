import React from 'react';
import { 
  UserGroupIcon, 
  LightBulbIcon, 
  GlobeAltIcon,
  ShieldCheckIcon,
  HeartIcon,
  TrophyIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import Button from '../components/common/Button';
import '../styles/components/aboutus.css';

const AboutUs = () => {
  const values = [
    {
      icon: <ShieldCheckIcon className="h-8 w-8" />,
      title: 'Quality First',
      description: 'We maintain the highest standards in talent vetting and project delivery, ensuring exceptional results every time.'
    },
    {
      icon: <HeartIcon className="h-8 w-8" />,
      title: 'Client Success',
      description: 'Your success is our success. We go above and beyond to ensure every project exceeds expectations.'
    },
    {
      icon: <LightBulbIcon className="h-8 w-8" />,
      title: 'Innovation',
      description: 'We embrace cutting-edge technologies and methodologies to deliver forward-thinking solutions.'
    },
    {
      icon: <UserGroupIcon className="h-8 w-8" />,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and foster strong partnerships with clients and talent alike.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Talented Professionals' },
    { number: '1000+', label: 'Successful Projects' },
    { number: '50+', label: 'Countries Worldwide' },
    { number: '95%', label: 'Client Satisfaction' }
  ];

  const teamMembers = [
    {
      name: 'John Anderson',
      position: 'CEO & Founder',
      bio: 'With over 15 years of experience in technology and business development, John founded our company with a vision to bridge the gap between exceptional talent and innovative businesses. He holds an MBA from Stanford and has led multiple successful tech ventures.',
      image: '/api/placeholder/300/300', // Placeholder image
      linkedin: '#',
      email: 'john@company.com'
    },
    {
      name: 'Sarah Chen',
      position: 'Head of Talent Acquisition',
      bio: 'Sarah leads our rigorous talent vetting process, ensuring we only work with the top 3% of professionals. With a background in HR and psychology, she has revolutionized how we identify and assess exceptional talent.',
      image: '/api/placeholder/300/300', // Placeholder image
      linkedin: '#',
      email: 'sarah@company.com'
    },
    {
      name: 'Michael Rodriguez',
      position: 'Chief Technology Officer',
      bio: 'Michael oversees our technical infrastructure and platform development. With expertise in cloud architecture and AI, he ensures our platform delivers seamless experiences for both clients and talent.',
      image: '/api/placeholder/300/300', // Placeholder image
      linkedin: '#',
      email: 'michael@company.com'
    }
  ];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-container">
          <div className="about-hero-content">
            <div className="about-hero-badge">
              <StarIcon className="about-hero-badge-icon" />
              <span className="about-hero-badge-text">EST. 2018</span>
            </div>
            <h1 className="about-hero-title">
              Building the Future of 
              <br />
              <span className="about-hero-gradient-text">Global Talent</span>
            </h1>
            <p className="about-hero-subtitle">
              We're revolutionizing how exceptional talent connects with innovative businesses, 
              creating opportunities that transcend borders and transform industries worldwide.
            </p>
            <div className="about-hero-stats">
              <div className="about-hero-stat">
                <div className="about-hero-stat-number">500+</div>
                <div className="about-hero-stat-label">Professionals</div>
              </div>
              <div className="about-hero-stat">
                <div className="about-hero-stat-number">1000+</div>
                <div className="about-hero-stat-label">Projects</div>
              </div>
              <div className="about-hero-stat">
                <div className="about-hero-stat-number">50+</div>
                <div className="about-hero-stat-label">Countries</div>
              </div>
              <div className="about-hero-stat">
                <div className="about-hero-stat-number">95%</div>
                <div className="about-hero-stat-label">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="about-hero-floating-elements">
          <div className="about-hero-circle about-hero-circle-1"></div>
          <div className="about-hero-circle about-hero-circle-2"></div>
          <div className="about-hero-circle about-hero-circle-3"></div>
          <div className="about-hero-triangle"></div>
          <div className="about-hero-square"></div>
        </div>
        
        {/* Particle Background */}
        <div className="about-hero-particles"></div>
      </section>

      {/* Company Story */}
      <section className="section-padding">
        <div className="container">
          <div className="about-story-grid">
            <div className="about-story-content">
              <h2 className="section-title">Our Story</h2>
              <div className="about-story-text">
                <p>
                  Founded in 2018, our company emerged from a simple yet powerful observation: 
                  the world's most talented professionals were often separated from the most 
                  innovative projects by geography, time zones, and traditional hiring barriers.
                </p>
                <p>
                  We set out to change that by creating a platform that not only connects 
                  businesses with exceptional talent but ensures every match is perfect through 
                  our rigorous vetting process. Today, we're proud to have facilitated over 
                  1,000 successful projects across 50+ countries.
                </p>
                <p>
                  Our mission extends beyond simple talent matching. We're building a global 
                  ecosystem where the best minds can collaborate regardless of location, 
                  creating solutions that drive innovation and growth for businesses of all sizes.
                </p>
              </div>
            </div>
            <div className="about-story-image">
              <div className="story-image-placeholder">
                <GlobeAltIcon className="placeholder-icon" />
                <p>Company Image</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding section-bg-gray">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Values</h2>
            <p className="section-description">
              The principles that guide everything we do and shape our company culture
            </p>
          </div>

          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Meet Our Leadership Team</h2>
            <p className="section-description">
              The visionaries and experts driving our mission forward
            </p>
          </div>

          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member-card">
                <div className="team-member-image">
                  <div className="team-image-placeholder">
                    <UserGroupIcon className="placeholder-icon" />
                    <p>CEO Photo</p>
                  </div>
                </div>
                <div className="team-member-info">
                  <h3 className="team-member-name">{member.name}</h3>
                  <p className="team-member-position">{member.position}</p>
                  <p className="team-member-bio">{member.bio}</p>
                  <div className="team-member-contact">
                    <a href={`mailto:${member.email}`} className="contact-link">
                      <EnvelopeIcon className="contact-icon" />
                    </a>
                    <a href={member.linkedin} className="contact-link">
                      <svg className="contact-icon" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding section-bg-gray">
        <div className="container">
          <div className="mission-vision-grid">
            <div className="mission-card">
              <div className="mission-icon">
                <TrophyIcon className="h-12 w-12" />
              </div>
              <h3 className="mission-title">Our Mission</h3>
              <p className="mission-description">
                To democratize access to exceptional talent and revolutionary projects by creating 
                a global platform that transcends geographical boundaries and connects the world's 
                best professionals with innovative businesses.
              </p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">
                <LightBulbIcon className="h-12 w-12" />
              </div>
              <h3 className="mission-title">Our Vision</h3>
              <p className="mission-description">
                A world where talent knows no borders, where the best ideas come to life through 
                seamless collaboration, and where every business has access to the expertise 
                needed to achieve extraordinary success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="section-padding">
        <div className="container">
          <div className="contact-info-section">
            <div className="section-header">
              <h2 className="section-title">Get in Touch</h2>
              <p className="section-description">
                Ready to start your next project or join our talent network?
              </p>
            </div>

            <div className="contact-info-grid">
              <div className="contact-info-card">
                <MapPinIcon className="contact-info-icon" />
                <h4 className="contact-info-title">Headquarters</h4>
                <p className="contact-info-text">
                  123 Innovation Drive<br />
                  San Francisco, CA 94105<br />
                  United States
                </p>
              </div>
              <div className="contact-info-card">
                <EnvelopeIcon className="contact-info-icon" />
                <h4 className="contact-info-title">Email Us</h4>
                <p className="contact-info-text">
                  hello@company.com<br />
                  support@company.com<br />
                  careers@company.com
                </p>
              </div>
              <div className="contact-info-card">
                <PhoneIcon className="contact-info-icon" />
                <h4 className="contact-info-title">Call Us</h4>
                <p className="contact-info-text">
                  +1 (555) 123-4567<br />
                  Mon-Fri: 9AM-6PM PST<br />
                  24/7 Support Available
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">
              Ready to Work with Us?
            </h2>
            <p className="cta-subtitle">
              Whether you're looking to hire top talent or join our network, we're here to help
            </p>
            <div className="cta-buttons">
              <Button 
                variant="secondary" 
                size="lg" 
                className="cta-button-primary"
                href="/hire-with-us"
              >
                Hire Talent
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="cta-button-secondary"
                href="/talent-application"
              >
                Join Our Network
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
