import React, { useState } from 'react'
import RequestOtp from './RequestOtp'
import Login from './Login'

const Auth: React.FC = () => {
    const [page, setPage] = useState<string>('request')

    const handlePage = (path:string) => {
        setPage(path)
    }
    return (
        <>
        {
            page == "request"?
            <RequestOtp handlePage={handlePage}/>:
            <Login/>
        }
        </>
    )
}

export default Auth