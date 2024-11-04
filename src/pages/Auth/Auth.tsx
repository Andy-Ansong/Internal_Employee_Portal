import React, { useState } from 'react'
import RequestOtp from './RequestOtp'
import Login from './Login'

const Auth: React.FC = () => {
    const [page, setPage] = useState<string>('request')

    const handlePage = (path:string) => {
        setPage(path)
    }
    return (
        <div className='text-[#344054] bg-[#F9FAFB] flex items-center justify-center w-screen h-screen'>
        {
            page == "request"?
            <RequestOtp handlePage={handlePage}/>:
            <Login/>
        }
        </div>
    )
}

export default Auth