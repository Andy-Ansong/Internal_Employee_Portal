import React,{ FormEvent, useEffect, useState }from 'react'
import './style.css'
import axios from 'axios'
import{ useNavigate }from 'react-router-dom'
import { IoClose } from "react-icons/io5"
import { Employee } from '../../model/Employee'

interface Props{
    fetchPage: () =>  void
    handleFormOpen: (e:boolean) => void
    formRef: React.RefObject<HTMLDivElement>
    task: string
    clickedUser?: Employee|null
}
interface WorkScheduleEntry {
    day: string;
    type: string;
}
interface WorkSchedule {
    schedule: WorkScheduleEntry[];
}

const CreateEmployee: React.FC<Props> = (props) => {
    const [error, setError] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [birthDate, setBirthDate] = useState<string>(new Date().toISOString().split('T')[0])
    const [phone, setPhone] = useState<string>("")
    const [team, setTeam] = useState<string>("")
    const [role, setRole] = useState<string>("")
    const [gender, setGender] = useState<string>("Male")
    const [workSchedule, setWorkSchedule] = useState<WorkSchedule>({
        schedule: [
            { day: 'Monday', type: 'On-site' },
            { day: 'Tuesday', type: 'On-site' },
            { day: 'Wednesday', type: 'On-site' },
            { day: 'Thursday', type: 'On-site' },
            { day: 'Friday', type: 'On-site' }
        ]
    })
    const navigate = useNavigate()

    const clearForm = () => {
        setEmail("")
        setName("")
        setBirthDate(new Date().toISOString().split("T")[0])
        setPhone("")
        setTeam("")
        setRole("")
        setGender("Male")
        setWorkSchedule({
            schedule: [
                { day: "Monday", type: "Remote" },
                { day: "Tuesday", type: "On-site" },
                { day: "Wednesday", type: "Remote" },
                { day: "Thursday", type: "On-site" },
                { day: "Friday", type: "On-site" }
            ]
        })
    }

    useEffect(() => {
        if(props.task == "edit"){
            const employee = props.clickedUser
            if(employee){
                setName(employee.name)
                setEmail(employee.email)
                setPhone(employee.phoneNumber)
                setTeam(employee.Department.Team.name)
                setRole(employee.Department.Role.position)
            }
        }else{
            clearForm()
        }
    }, [props.clickedUser, props.task])

    const handleFormSubmit = async(e: FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        if(props.task == 'create'){
            const Department = {
                Team: {
                    name: team,
                    role: role,
                    isLeader: false
                }
            }
            const data = {
                name, email, gender, birthDate, phoneNumber:phone,
                WorkSchedule: workSchedule.schedule, Department
            }
            console.log("adding employee: ", data)
            axios.post(`http://localhost:3030/api/v1/employees`, data,{
                headers:{ Authorization: `Bearer ${localStorage.getItem("token")}` },
                withCredentials: true
            }).then(res => {
                console.log(res)
                props.fetchPage()
                clearForm()
                setIsLoading(false)
            }).catch((err) => {
                if(err.status === 401){
                    navigate('/auth')
                }
                const currentError = err.response.data
                if(currentError?.err?.message) {
                    setError(currentError.err.message)
                }else{
                    setError(currentError.message)
                }
                setIsLoading(false)
            })
        }else{
            const Department = {
                Team: {
                    name: team,
                    role: role,
                    isLeader: false
                }
            }
            const data = {
                name, email, gender, birthDate, phoneNumber:phone,
                WorkSchedule: workSchedule.schedule, Department
            }
            axios.patch(`http://localhost:3030/api/v1/employees/${props.clickedUser?._id}`, data,{
                headers:{ Authorization: `Bearer ${localStorage.getItem("token")}` },
                withCredentials: true
            }).then(res => {
                console.log(res)
                props.fetchPage()
                clearForm()
                setIsLoading(false)
            }).catch((err) => {
                if(err.status === 401){
                    navigate('/auth')
                }
                const currentError = err.response.data
                if(currentError?.err?.message) {
                    setError(currentError.err.message)
                }else{
                    setError(currentError.message)
                }
                setIsLoading(false)
            })
        }
        setIsLoading(false)
    }

    const handleWorkScheduleChange = (day: string, value: string) => {
        setWorkSchedule((prevSchedule) => {
            const dayIndex = prevSchedule.schedule.findIndex(entry => entry.day === day)
            const newSchedule = [...prevSchedule.schedule]
            if(dayIndex >= 0){
                newSchedule[dayIndex] = { day, type: value }
            }else{
                newSchedule.push({ day, type: value })
            }
            return{ schedule: newSchedule }
        })
    }

    return (
        <div ref={props.formRef} className='employee-form'>
            <div className='form-headers'>
                <h2>
                    {
                        props.task == "edit"?
                        <>Edit Employee</>:
                        <>Add Employee</>
                    }
                </h2>
                <IoClose onClick={() => {props.handleFormOpen(false)}}/>
            </div>
            <form onSubmit={handleFormSubmit}>
                <div className="input-container">
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder='Full Name Here'
                        value={name}
                        onChange={(e) =>  setName(e.target.value)}
                        name="name"
                        id="name"
                    />
                </div>
                <div className="input-container">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder='emailhere@amalitech.org'
                        value={email}
                        onChange={(e) =>  setEmail(e.target.value)}
                        name="email"
                        id="email"
                    />
                </div>
                <div className="input-container">
                    <h3>Gender</h3>
                    <div className="radio-selection">
                        <label className="custom-radio">
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={gender === 'Male'}
                                onChange={(e) =>  setGender(e.target.value)}
                            />
                            <span className="radio-label left-radio">Male</span>
                        </label>
                        <label className="custom-radio">
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={gender === 'Female'}
                                onChange={(e) =>  setGender(e.target.value)}
                            />
                            <span className="radio-label right-radio">Female</span>
                        </label>
                    </div>
                </div>
                {
                    props.task == "create" &&
                    <div className="input-container">
                        <label>Birth Date</label>
                        <input
                            type="date"
                            value={birthDate}
                            onChange={(e) =>  setBirthDate(e.target.value)}
                            name="date"
                            id="date"
                        />
                    </div>
                }
                <div className="input-container">
                    <label>Phone</label>
                    <input
                        type="number"
                        maxLength={9}
                        placeholder='0123456789'
                        value={phone}
                        onChange={(e) =>  setPhone(e.target.value)}
                        name="phone"
                        id="phone"
                    />
                </div>
                <div className="input-container">
                    <label>Team</label>
                    <input
                        type="text"
                        value={team}
                        onChange={(e) =>  setTeam(e.target.value)}
                        name="team"
                        id="team"
                    />
                </div>
                <div className="input-container">
                    <label>Role</label>
                    <input
                        type="text"
                        value={role}
                        onChange={(e) =>  setRole(e.target.value)}
                        name="role"
                        id="role"
                    />
                </div>
                <div className="input-container">
                    <h3>Work Schedule</h3>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                        <div key={day}>
                            <h4>{day}</h4>
                            <div className="radio-selection">
                                <label className="custom-radio">
                                    <input
                                        type="radio"
                                        name={day.toLowerCase()}
                                        value="On-site"
                                        checked={workSchedule.schedule.find(entry => entry.day === day)?.type === 'On-site'}
                                        onChange={(e) => handleWorkScheduleChange(day, e.target.value)}
                                    />
                                    <span className="radio-label left-radio">On-Site</span>
                                </label>
                                <label className="custom-radio">
                                    <input
                                        type="radio"
                                        name={day.toLowerCase()}
                                        value="Remote"
                                        checked={workSchedule.schedule.find(entry => entry.day === day)?.type === 'Remote'}
                                        onChange={(e) => handleWorkScheduleChange(day, e.target.value)}
                                    />
                                    <span className="radio-label right-radio">Remote</span>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">
                    {
                        isLoading ?
                        <div className='button-loader'></div>
                        :<>
                            {
                                props.task == "edit"?
                                <>Save Changes</>:
                                <>Add Employee</>
                            }
                        </>
                    }
                </button>
            </form>
        </div>
    )
}

export default CreateEmployee
