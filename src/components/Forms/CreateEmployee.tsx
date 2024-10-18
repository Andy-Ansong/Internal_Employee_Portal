import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

interface Props{
    fetchPage: () => void
}

const CreateEmployee: React.FC<Props> = (props) => {
    const [error, setError] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [birthDate, setBirthDate] = useState<string>(new Date().toISOString().split('T')[0])
    const [phone, setPhone] = useState<string>("")
    const [team, setTeam] = useState<string>("")
    const [role, setRole] = useState<string>("")

    const handleSubmit = () => {
        const selectedGender = document.getElementsByName("gender").values
        console.log(selectedGender)
        const Monday = document.getElementsByName("monday")
        const Tuesday = document.getElementsByName("tuesday")
        const Wednesday = document.getElementsByName("wednesday")
        const Thursday = document.getElementsByName("thrusday")
        const Friday = document.getElementsByName("friday")
        const WorkSchedule = [
            {day: "Monday", type: Monday},
            {day: "Tuesday", type: Tuesday},
            {day: "Wednesday", type: Wednesday},
            {day: "Thursday", type: Thursday},
            {day: "Friday", type: Friday}
        ]
        const Team = {
            name: team,
            role: role,
            isLeader: false
        }
        const data = {
            name, email,
            gender: selectedGender,
            birthDate, phone,
            WorkSchedule, Team
        }
        console.log(data)
        // axios.post(`http://localhost:3030/api/v1/employees`, data,
        //     {
        //         headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}
        //     },
        // ).then(res => {
        //     console.log(res)
        // }).catch(err => {
        //     if(err.status === 401)
        //         <Navigate to='auth'/>
        //     setError(err.response.data.message)
        // })
        // props.fetchPage()
    }

    return (
        <div className='employee-form'>
            <h2>Add</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Name</label>
                    <input type="text" placeholder='Full Name Here' value={name} onChange={(e) => {setName(e.target.value)}} name="name" id="name" />
                </div>
                <div className="input-container">
                    <label>Email</label>
                    <input type="email" placeholder='emailhere@amalitech.org' value={email} onChange={(e) => {setEmail(e.target.value)}} name="email" id="email" />
                </div>
                <div className="input-container">
                    <h3>Gender</h3>
                    <div className="radio-selection">
                        <label className="custom-radio">
                            <input type="radio" name="gender" value="Male" />
                            <span className="radio-label left-radio">Male</span>
                        </label>
                        <label className="custom-radio">
                            <input type="radio" name="gender" value="Female" />
                            <span className="radio-label right-radio">Female</span>
                        </label>
                    </div>
                </div>
                <div className="input-container">
                    <label>Birth Date</label>
                    <input type="date" value={birthDate} onChange={(e) => {setBirthDate(e.target.value)}} name="date" id="date" />
                </div>
                <div className="input-container">
                    <label>Phone</label>
                    <input type="number" maxLength={9} placeholder='0123456789' value={phone} onChange={(e) => {setPhone(e.target.value)}} name="phone" id="phone" />
                </div>
                <div className="input-container">
                    <label>Team</label>
                    <input type="text" value={team} onChange={(e) => {setTeam(e.target.value)}} name="team" id="team" />
                </div>
                <div className="input-container">
                    <label>Role</label>
                    <input type="text" value={role} onChange={(e) => {setRole(e.target.value)}} name="role" id="role" />
                </div>
                <div className="input-container">
                    <h3>Work Schedule</h3>
                    <div className='work-schedule-inputs'>
                        <h4>Monday</h4>
                        <div className="radio-selection">
                            <label className="custom-radio">
                                <input defaultChecked type="radio" name="monday" value="On-Site" />
                                <span className="radio-label left-radio">On-Site</span>
                            </label>
                            <label className="custom-radio">
                                <input type="radio" name="monday" value="Remote" />
                                <span className="radio-label right-radio">Remote</span>
                            </label>
                        </div>
                        <h4>Tuesday</h4>
                        <div className="radio-selection">
                            <label className="custom-radio">
                                <input defaultChecked type="radio" name="tuesday" value="On-Site" />
                                <span className="radio-label left-radio">On-Site</span>
                            </label>
                            <label className="custom-radio">
                                <input type="radio" name="tuesday" value="Remote" />
                                <span className="radio-label right-radio">Remote</span>
                            </label>
                        </div>
                        <h4>Wednesday</h4>
                        <div className="radio-selection">
                            <label className="custom-radio">
                                <input defaultChecked type="radio" name="wednesday" value="On-Site" />
                                <span className="radio-label left-radio">On-Site</span>
                            </label>
                            <label className="custom-radio">
                                <input type="radio" name="wednesday" value="Remote" />
                                <span className="radio-label right-radio">Remote</span>
                            </label>
                        </div>
                        <h4>Thursday</h4>
                        <div className="radio-selection">
                            <label className="custom-radio">
                                <input defaultChecked type="radio" name="thursday" value="On-Site" />
                                <span className="radio-label left-radio">On-Site</span>
                            </label>
                            <label className="custom-radio">
                                <input type="radio" name="thursday" value="Remote" />
                                <span className="radio-label right-radio">Remote</span>
                            </label>
                        </div>
                        <h4>Friday</h4>
                        <div className="radio-selection">
                            <label className="custom-radio">
                                <input defaultChecked type="radio" name="friday" value="On-Site" />
                                <span className="radio-label left-radio">On-Site</span>
                            </label>
                            <label className="custom-radio">
                                <input type="radio" name="friday" value="Remote" />
                                <span className="radio-label right-radio">Remote</span>
                            </label>
                        </div>
                    </div>
                </div>
                <button type="submit">Add Employee</button>
            </form>
        </div>
    )
}

export default CreateEmployee