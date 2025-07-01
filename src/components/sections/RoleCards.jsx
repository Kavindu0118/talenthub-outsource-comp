import React, { useState } from 'react';
import { 
  CodeBracketIcon,
  PaintBrushIcon,
  ChartBarIcon,
  DevicePhoneMobileIcon,
  CloudIcon,
  CogIcon,
  MegaphoneIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';


const RoleCards = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Roles' },
    { id: 'development', name: 'Development' },
    { id: 'design', name: 'Design' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'data', name: 'Data & Analytics' },
  ];

  const roles = [
    {
      id: 1,
      title: 'Full Stack Developer',
      category: 'development',
      description: 'Build end-to-end web applications with modern frameworks and technologies.',
      skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
      icon: CodeBracketIcon,
      demand: 'High',
      experience: '3-8 years',
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      category: 'design',
      description: 'Create intuitive and beautiful user experiences that delight customers.',
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems'],
      icon: PaintBrushIcon,
      demand: 'High',
      experience: '2-6 years',
    },
    {
      id: 3,
      title: 'Data Analyst',
      category: 'data',
      description: 'Transform raw data into actionable insights that drive business decisions.',
      skills: ['Python', 'SQL', 'Tableau', 'Statistics', 'Excel'],
      icon: ChartBarIcon,
      demand: 'Medium',
      experience: '2-5 years',
    },
    {
      id: 4,
      title: 'Mobile Developer',
      category: 'development',
      description: 'Develop native and cross-platform mobile applications for iOS and Android.',
      skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
      icon: DevicePhoneMobileIcon,
      demand: 'High',
      experience: '3-7 years',
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      category: 'development',
      description: 'Streamline development workflows and manage cloud infrastructure.',
      skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD'],
      icon: CloudIcon,
      demand: 'Very High',
      experience: '4-8 years',
    },
    {
      id: 6,
      title: 'Product Manager',
      category: 'marketing',
      description: 'Drive product strategy and coordinate cross-functional teams.',
      skills: ['Strategy', 'Analytics', 'Agile', 'User Research', 'Roadmapping'],
      icon: CogIcon,
      demand: 'Medium',
      experience: '4-10 years',
    },
    {
      id: 7,
      title: 'Digital Marketer',
      category: 'marketing',
      description: 'Create and execute digital marketing campaigns across multiple channels.',
      skills: ['SEO', 'Google Ads', 'Social Media', 'Analytics', 'Content Marketing'],
      icon: MegaphoneIcon,
      demand: 'Medium',
      experience: '2-6 years',
    },
    {
      id: 8,
      title: 'Technical Writer',
      category: 'marketing',
      description: 'Create clear, comprehensive documentation and technical content.',
      skills: ['Technical Writing', 'Documentation', 'API Docs', 'Markdown', 'Git'],
      icon: DocumentTextIcon,
      demand: 'Medium',
      experience: '2-5 years',
    },
  ];

  const filteredRoles = selectedCategory === 'all' 
    ? roles 
    : roles.filter(role => role.category === selectedCategory);

  const getDemandColor = (demand) => {
    switch (demand) {
      case 'Very High':
        return 'role-demand high';
      case 'High':
        return 'role-demand high';
      case 'Medium':
        return 'role-demand medium';
      default:
        return 'role-demand';
    }
  };

  return (
    <section className="role-cards">
      <div className="role-cards-container">
        <div className="section-header">
          <h2 className="section-title">
            In-Demand Roles
          </h2>
          <p className="section-description">
            Explore our most sought-after roles across various disciplines. 
            Each position is carefully curated to match current market demands.
          </p>
        </div>

        {/* Category Filter */}
        <div className="role-filter">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`filter-button ${selectedCategory === category.id ? 'active' : ''}`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Roles Grid */}
        <div className="roles-grid">
          {filteredRoles.map((role) => (
            <div
              key={role.id}
              className="role-card"
            >
              {/* Header */}
              <div className="role-card-header">
                <div className="role-icon">
                  <role.icon />
                </div>
                <div>
                  <h3 className="role-title">{role.title}</h3>
                  <span className={getDemandColor(role.demand)}>
                    {role.demand} Demand
                  </span>
                </div>
              </div>

              {/* Content */}
              <div>
                <p className="role-description">
                  {role.description}
                </p>

                {/* Skills */}
                <div className="role-skills">
                  {role.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                  {role.skills.length > 3 && (
                    <span className="skill-tag">
                      +{role.skills.length - 3} more
                    </span>
                  )}
                </div>

                {/* Meta Info */}
                <div className="role-meta">
                  <span className="role-experience">
                    {role.experience}
                  </span>
                  {/* apply & hire buttons */}
                   
                  <button className="btn btn-primary"
                  style={{
                    minWidth: '100px',
                    height: '48px',
                    fontSize: '1rem',
                    padding: '0.5rem 1.5rem',
                    marginRight: '0.5rem'
                  }}
                  >
                    Apply Now
                  </button>
                  <button className="btn btn-primary"
                  style={{
                    minWidth: '100px',
                    height: '48px',
                    fontSize: '1rem',
                    padding: '0.5rem 1.5rem',
                    marginRight: '0.5rem'
                  }}
                  >
                    Hire Talent
                  </button>
                 
                </div> 
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA
        <div className="role-cta">
          <h3 className="role-cta-title">
            Don't See Your Role?
          </h3>
          <p className="role-cta-description">
            We work with talented professionals across many disciplines. 
            Let us know what you're looking for, and we'll find the perfect match.
          </p>
          <div className="role-cta-buttons">
            <button className="btn btn-primary">
              Request Custom Role
            </button>
            <button className="btn btn-outline">
              View All Opportunities
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default RoleCards;
