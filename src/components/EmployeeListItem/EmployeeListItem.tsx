import React from 'react'
import './style.css'
import { Employee } from '../../model/Employee'
import { User } from '../../model/User'
import { AiFillMessage } from 'react-icons/ai'
import { FaEdit } from 'react-icons/fa'
import { TiUserDelete } from 'react-icons/ti'
import { Link } from 'react-router-dom'

interface Props{
    employee: Employee
    user: User|null
    key: number
    handleEditEmployee: (id: string) => void
    deleteEmployee: (id: string) => void
}

const EmployeeListItem: React.FC<Props> = ({employee, user, handleEditEmployee, deleteEmployee}) => {
    return (
        <div className={`employee-list-item ${user?._id == employee.userId ? "self" : ""} ${user?.role}`}>
            <div className="image-container">
                <img
                    src={employee.image}
                />
            </div>
            <h3>{employee.name}</h3>
            <a href={`mailto:${employee.email}`} id='email' title='Send a message'>{employee.email}</a>
            <h4>{employee.Department.Role.position}</h4>
            {
                (user && ["admin", "hr"].includes(user.role)) ?
                <div className='auth-buttons'>
                    <button className='message' title='message'><AiFillMessage /></button>
                    <button className='edit' onClick={() => {handleEditEmployee(employee._id)}} title='edit'><FaEdit/></button>
                    <button className='delete' onClick={() => {deleteEmployee(employee._id)}} title='delete'><TiUserDelete /></button>
                </div>
                :<>
                {
                    user?._id == employee.userId ?
                    <Link className='profile-link' to={'/profile'}>
                        <button>
                            Profile
                        </button>
                    </Link>:
                    <button>
                        Message
                    </button>
                }
                </>
            }
        </div>
    )
}

export default EmployeeListItem
