import React, { useEffect, useState } from 'react'
import './styles.css'
import { CiMail } from 'react-icons/ci'
import { Employee } from '../../model/Employee'
import { FiPhoneCall } from 'react-icons/fi'
import axios from 'axios'

const TeamPage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<Employee[] | []>([])

  useEffect(() => {
    axios.get(`http://localhost:3030/api/v1/employees/current/team`,
      {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        withCredentials: true
      })
      .then(res => {
        console.log(res.data.employees)
        setTeamMembers(res.data.employees)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className='team-page'>
      <h1>{teamMembers[0]?.Department.Team.name}</h1>
      <h2>{teamMembers.length} {teamMembers.length === 1 ? `Member` : `Members`}</h2>
      <div className='team-grid'>
      {
        teamMembers.map((member, index) => (
          <div key={index} className='team-card'>
            <div className='image-container'>
              <img src={member.image} alt={member.name} className='member-image' />
            </div>
            <div className='personal-info'>
              <h2>{member.name}</h2>
              <h3>{member.Department.Team.role}</h3>
            </div>
            <div className='member-details'>
              <h3>{member.Department.Role.position}</h3>
              <h4>{member.Department.Team.role}</h4>
              <h3>Date Hired</h3>
              <h4>{member.Department.Role.startDate.slice(0,10)}</h4>
              <div className='member-contacts'>
                <div>
                  <CiMail />
                  <a href={`mailto:${member.email}`}>{member.email}</a>
                </div>
                <div>
                  <FiPhoneCall />
                  <a href={`tel:${member.phoneNumber}`}>{member.phoneNumber}</a>
                </div>
              </div>
            </div>
          </div>
        ))
      }
      </div>
    </div>
  )
}

export default TeamPage
