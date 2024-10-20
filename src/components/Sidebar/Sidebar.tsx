import React from 'react'
import { FaBell } from "react-icons/fa"
import { IoLogOut, IoPersonCircle, IoPeopleCircle } from "react-icons/io5"
import { BsFillBuildingFill } from "react-icons/bs"
import { BsCalendarMonthFill } from "react-icons/bs"
import { MdSpaceDashboard } from "react-icons/md"
import { RiAdminFill } from "react-icons/ri"
import { NavLink, useNavigate } from 'react-router-dom'
import './style.css'

const Sidebar: React.FC = () => {
    const navigate =  useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/auth')
    }

    return (
        <div className='sidebar'>
            <div className='top'>
                {/* <NavLink className='nav-item' to='dashboard'>
                    <MdSpaceDashboard title="dashboard" />
                    <h3>Dashboard</h3>
                </NavLink> */}
                {/* <NavLink className='nav-item' to='admindashboard'>
                    <RiAdminFill title="admin/hr" />
                    <h3>Admin/HR</h3>
                </NavLink> */}
                {/* <NavLink className='nav-item' to='notifications'>
                    <FaBell title="notifications"/>
                    <h3>Notifications</h3>
                </NavLink> */}
                <NavLink className='nav-item' to='events'>
                    <BsCalendarMonthFill title="events" />
                    <h3>Events</h3>
                </NavLink>
                <NavLink className='nav-item' to='employees'>
                    <BsFillBuildingFill title="employees" />
                    <h3>Employees</h3>
                </NavLink>
                {/* <NavLink className='nav-item' to='team'>
                    <IoPeopleCircle title="team" />
                    <h3>Team</h3>
                </NavLink> */}
            </div>
            <div className='bottom'>
                <NavLink className='nav-item' to='profile'>
                    <IoPersonCircle title="profile" />
                    <h3>Profile</h3>
                </NavLink>
                <section className='nav-item' onClick={handleLogout}>
                    <IoLogOut title="logout" />
                    <h3>Logout</h3>
                </section>
            </div>
        </div>
    )
}

export default Sidebar