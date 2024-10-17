import React from 'react'
import { CiMail } from "react-icons/ci";
import AuthCard from '../components/AuthCard/AuthCard';

const RequestOtp: React.FC = () => {
    return (
        <div className='centerDiv'>
            <AuthCard
                icon={<CiMail size={100}/>}
                buttontxt='Get Otp'
                title='Verify your email'
                description='Enter your valid email to receive an otp email for login'
                buttonRedirect='/login'
                data='email'
                placeholder='andy.ansong@amalitechtraining.org'/>
        </div>
    )
}

export default RequestOtp