import React, { useEffect, useState } from 'react'
import './style.css'
import axios, { AxiosResponse } from 'axios'
import { Employee } from '../../model/Employee'
import { useNavigate } from 'react-router-dom'

const Profile: React.FC = () => {
    const [isOpen, setIsOpen] = useState<string>('personal')
    const [employee, setEmployee] = useState<Employee|null>(null)
    const [error, setError] = useState<string>("")
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3030/api/v1/employees/current", {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        }).then((res: AxiosResponse) => {
            setEmployee(res.data.employee)
        }).catch(err => {
            if(err.status === 401)
                navigate('/auth')
            setError(err.response.data.message)
        })
    }, [navigate])

    const toggleDropdown = (tab: string) => {
        if(isOpen == tab)
            tab = ''
        setIsOpen(tab)
    }

    return (
        <div className='profile-page'>
            {
                employee ?
                <>
                    <div className='profile-card'>
                        <h1 className='tag' onClick={() => {toggleDropdown('personal')}}>Personal file</h1>
                        {
                            isOpen == "personal" &&
                            <div className='personal'>
                                <div className='image-button'>
                                    <div className='image-container'>
                                        <img
                                            src={employee.image}
                                        />
                                    </div>
                                    <div>
                                        <h1>{employee.name}</h1>
                                        <p>{employee.gender}</p>
                                    </div>
                                    <button>Update</button>
                                </div>
                                <p className='bio'>
                                    {employee.bio}
                                </p>
                                <div className='personal-details'>
                                    <div>
                                        <h3>Phone number</h3>
                                        <h4>{employee.phoneNumber}</h4>
                                    </div>
                                    <div>
                                        <h3>Email</h3>
                                            <h4>{employee.email}</h4>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className='profile-card'>
                        <h1 onClick={() => {toggleDropdown('team')}} className="tag">Team info</h1>
                        {
                            isOpen == "team" &&
                            <div className="team-details-tab">
                                <div className='image-container'>
                                    <img src='amalitech_logo.jpg'/>
                                </div>
                                <div className='team-details'>
                                    <h3>Team Name: {employee.Department?.Team?.name}</h3>
                                    <h4>Role in Team: {employee.Department?.Team?.role}</h4>
                                    <h4>Team Lead: {employee.Department?.Team?.role}</h4>
                                    <h4>Current Project: {employee.Department?.Team?.role}</h4>
                                </div>
                                <div className='contacts'>
                                    <button>HR</button>
                                    <button>Team Lead</button>
                                </div>
                            </div>
                        }
                    </div>
                    <div className='profile-card'>
                        <h1 onClick={() => {toggleDropdown('skills')}} className="tag">Skills</h1>
                        {
                            isOpen == "skills" &&
                            <div className="skills">
                                <ul>
                                    {employee.skills.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                            </div>
                        }
                    </div>
                    <div className='profile-card'>
                        <h1 onClick={() => {toggleDropdown('job')}} className="tag">Work Schedule</h1>
                        {
                            isOpen == "job" &&
                            <div className="work-schedule">
                                {employee.WorkSchedule.map((schedule) => (
                                    <p key={schedule.day}>
                                        <span>{schedule.day}:</span> {schedule.type}
                                    </p>
                                ))}
                            </div>
                        }
                    </div>
                </>
                :
                <div className="profile-card">
                    <h1 className='tag'>{error}</h1>
                </div>
            }
        </div>
    )
}

export default Profile