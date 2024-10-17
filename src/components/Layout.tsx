import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout: React.FC = () => {
    return (
        <div className='page'>
            <div className='left'><Sidebar/></div>
            <div className='right'>
                <Outlet/>
            </div>
        </div>
    )
}

export default Layout