import React, { FormEvent, useEffect, useState } from 'react'
import './style.css'
import axios, { AxiosResponse } from 'axios'
import { Employee } from '../../model/Employee'
import { useNavigate } from 'react-router-dom'

const Profile: React.FC = () => {
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<string>('personal')
    const [employee, setEmployee] = useState<Employee|null>(null)
    const [error, setError] = useState<string>("")

    const [name, setName] = useState<string>("")
    const [bio, setBio] = useState<string>("")
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const [image, setImage] = useState<string>("")
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3030/api/v1/employees/current", {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        }).then((res: AxiosResponse) => {
            const currentEmployee:Employee = res.data.employee
            setName(currentEmployee.name)
            setBio(currentEmployee.bio)
            setPhoneNumber(currentEmployee.phoneNumber)
            setImage(currentEmployee.image)
            setEmployee(currentEmployee)
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

    const startEditing = (val: boolean) => {
        console.log(val)
        console.log("is edting is true")
        setIsEditing(val)
    }

    const updateEmployee = (e:FormEvent) => {
        setIsLoading(true)
        e.preventDefault()
        const data = {
            name, bio, image
        }
        axios.patch("http://localhost:3030/api/v1/employees/current", data, {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        }).then((res: AxiosResponse) => {
            const currentEmployee:Employee = res.data.employee
            setName(currentEmployee.name)
            setBio(currentEmployee.bio)
            setPhoneNumber(currentEmployee.phoneNumber)
            setImage(currentEmployee.image)
            setEmployee(currentEmployee)
            setIsLoading(false)
        }).catch(err => {
            if(err.status === 401)
                navigate('/auth')
            setError(err.response.data.message)
            setIsLoading(false)
        })
        setIsEditing(false)
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
                            <form className='personal' onSubmit={(e) => {updateEmployee(e)}}>
                                <div className='image-button'>
                                    <div className='image-container'>
                                        <img
                                            src={employee.image}
                                        />
                                    </div>
                                    <div>
                                        {
                                            isEditing
                                            ?<input placeholder='Name here' type="text" id='name' value={name} onChange={(e) => {setName(e.target.value)}}/>
                                            :<h1>{employee.name}</h1>
                                        }
                                        <p>{employee.gender}</p>
                                    </div>
                                    {
                                        isEditing
                                        ?<button type='submit'>
                                            {
                                                isLoading ? <div className='button-loader'></div> : <>Update</>
                                            }
                                        </button>
                                        :<div className='button' onClick={() => {startEditing(true)}}>Edit</div>
                                    }
                                </div>
                                <p className='bio'>
                                    {
                                        isEditing
                                        ?<textarea rows={4} cols={40} placeholder='Short description' value={bio} onChange={(e) => {setBio(e.target.value)}}></textarea>
                                        :<p>{employee.bio}</p>
                                    }
                                </p>
                                <div className='personal-details'>
                                    <div>
                                        <h3>Phone number</h3>
                                        {
                                            isEditing
                                            ?<input  type='number' value={phoneNumber} onChange={(e) => {setPhoneNumber(e.target.value)}}/>
                                            :<h4>{phoneNumber}</h4>
                                        }
                                    </div>
                                    <div>
                                        <h3>Email</h3>
                                        <h4>{employee.email}</h4>
                                    </div>
                                </div>
                            </form>
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