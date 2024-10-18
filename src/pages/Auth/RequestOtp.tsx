import React from 'react'
import { CiMail } from "react-icons/ci";
import AuthCard from '../../components/AuthCard/AuthCard';
import axios, { AxiosResponse } from 'axios';

interface Props{
    handlePage: (path: string) => void
}

const RequestOtp: React.FC<Props> = ({handlePage}) => {
    const handleOtpRequest: (e:string) => Promise<string> = async (value:string) => {
        const data = {
            email: value
        }
        return axios.post("http://localhost:3030/api/v1/auth/request", data, {withCredentials: true})
        .then((response: AxiosResponse) => {
            console.log(response.data)
            handlePage("login")
            return "completed"
        })
        .catch((err) => {
            return err.response.data.message
        })
    }

    return (
        <div className='centerDiv'>
            <AuthCard
                icon={<CiMail size={100}/>}
                buttontxt='Get Otp'
                title='Verify your email'
                description='Enter your valid email to receive an otp email for login'
                buttonRedirect='/login'
                data='email'
                function={handleOtpRequest}
                placeholder='andy.ansong@amalitechtraining.org'/>
        </div>
    )
}

export default RequestOtp