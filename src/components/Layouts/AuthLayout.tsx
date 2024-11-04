import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout: React.FC = () => {
    return(
        <div className='text-[#344054] bg-[#F9FAFB] flex items-center justify-center w-screen h-screen'>
            <Outlet />
        </div>
    )
}

export default AuthLayout
