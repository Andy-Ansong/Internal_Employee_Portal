import React from 'react'
import { FaBell } from "react-icons/fa"
import { IoPersonCircle, IoPeopleCircle } from "react-icons/io5"
import { BsFillBuildingFill } from "react-icons/bs"
import { BsCalendarMonthFill } from "react-icons/bs"
import { MdSpaceDashboard } from "react-icons/md"
import './style.css'
import { NavLink } from 'react-router-dom'

const Sidebar: React.FC = () => {
    return (
        <div className='sidebar'>
            <div className='top'>
                <NavLink className='nav-item' to='dashboard'>
                    <MdSpaceDashboard />
                    <h3>Dashboard</h3>
                </NavLink>
                <NavLink className='nav-item' to='notifications'>
                    <FaBell/>
                    <h3>Notifications</h3>
                </NavLink>
                <NavLink className='nav-item' to='events'>
                    <BsCalendarMonthFill />
                    <h3>Events</h3>
                </NavLink>
                <NavLink className='nav-item' to='staff'>
                    <BsFillBuildingFill />
                    <h3>Employees</h3>
                </NavLink>
                <NavLink className='nav-item' to='team'>
                    <IoPeopleCircle />
                    <h3>Team</h3>
                </NavLink>
            </div>
            <div className='bottom'>
                <NavLink className='nav-item' to='profile'>
                    <IoPersonCircle />
                    <h3>Profile</h3>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar