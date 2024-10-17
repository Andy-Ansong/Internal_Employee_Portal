import React from 'react'
import AuthCard from '../components/AuthCard/AuthCard'
import { RiMailLockLine } from "react-icons/ri";

const Login:React.FC = () => {
    return (
        <div className='centerDiv'>
            <AuthCard
                icon={<RiMailLockLine size={100}/>}
                buttontxt='Login'
                title='Verify your code'
                description='Enter the code sent to your email'
                buttonRedirect='/admindashboard'
                data='email'
                placeholder='XXXXXX'/>
        </div>
    )
}

export default Login