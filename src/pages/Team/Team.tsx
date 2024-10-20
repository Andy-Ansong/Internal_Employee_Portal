import React, { useState } from 'react';
import './styles.css';

interface Employee {
  name: string;
  position: string;
  email: string;
  phone: string;
  image: string;
}

interface Department {
  name: string;
  description: string;
  employees: Employee[];
}

const teamData: Department[] = [
  {
    name: 'Engineering',
    description: 'Responsible for developing and maintaining our company’s core products.',
    employees: [
      {
        name: 'Alice Johnson',
        position: 'Lead Engineer',
        email: 'alice.johnson@company.com',
        phone: '555-1234',
        image: '/images/alice.jpg'
      },
      {
        name: 'Bob Smith',
        position: 'Software Developer',
        email: 'bob.smith@company.com',
        phone: '555-5678',
        image: '/images/bob.jpg'
      }
    ]
  },
  {
    name: 'Marketing',
    description: 'Handles the branding, marketing strategies, and customer outreach.',
    employees: [
      {
        name: 'Jane Doe',
        position: 'Marketing Manager',
        email: 'jane.doe@company.com',
        phone: '555-4321',
        image: '/images/jane.jpg'
      },
      {
        name: 'Tom Williams',
        position: 'Content Strategist',
        email: 'tom.williams@company.com',
        phone: '555-8765',
        image: '/images/tom.jpg'
      }
    ]
  }
];

const TeamPage: React.FC = () => {
  const [expandedEmployee, setExpandedEmployee] = useState<string | null>(null);

  const handleToggleExpand = (name: string) => {
    if (expandedEmployee === name) {
      setExpandedEmployee(null); // Collapse if already expanded
    } else {
      setExpandedEmployee(name); // Expand this employee's details
    }
  };

  return (
    <div className="team-page">
      <h1>Our Team</h1>
      {teamData.map((department, index) => (
        <div key={index} className="department">
          <h2>{department.name}</h2>
          <p>{department.description}</p>
          <div className="employee-grid">
            {department.employees.map((employee, idx) => (
              <div key={idx} className="employee-card">
                <img src={employee.image} alt={employee.name} className="employee-image" />
                <h3>{employee.name}</h3>
                <p>{employee.position}</p>
                <button onClick={() => handleToggleExpand(employee.name)}>
                  {expandedEmployee === employee.name ? 'Hide Details' : 'Show Details'}
                </button>

                {expandedEmployee === employee.name && (
                  <div className="employee-details">
                    <p><strong>Email:</strong> {employee.email}</p>
                    <p><strong>Phone:</strong> {employee.phone}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamPage;
