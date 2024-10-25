import React, { useEffect, useState } from 'react'
import './styles.css'
import { Employee } from '../../model/Employee'
import axios from 'axios'

const TeamPage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<Employee[] | []>([])

  useEffect(() => {
    axios.get(`http://localhost:3030/api/v1/employees/current/team`,
      {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
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
    <div className="team-page">
      <h1>{teamMembers[0]?.Department.Team.name}</h1>
      {
        teamMembers.map((member, index) => (
          <div key={index} className="department">
            <h2>{member.name}</h2>
            <div className="employee-grid">
              <img src={member.image} alt={member.name} className="member-image" />
              <h3>{member.Department.Team.name}</h3>
              <p>{member.Department.Role.position}</p>
                <div className="member-details">
                  <p><strong>Email:</strong> {member.email}</p>
                  <p><strong>Phone:</strong> {member.phoneNumber}</p>
                </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default TeamPage
