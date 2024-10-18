import React from 'react'
import AuthCard from '../../components/AuthCard/AuthCard'
import { RiMailLockLine } from "react-icons/ri";
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

const Login:React.FC = () => {
    const navigate = useNavigate()

    const handleLogin: (e: string) => Promise<string> = async (value:string) => {
        const data = {
            code: value
        }
        return axios.post("http://localhost:3030/api/v1/auth/login", data, {withCredentials: true})
        .then((response:AxiosResponse) => {
            const {token} = response.data
            console.log(token)
            localStorage.setItem('token', token)
            navigate('/profile')
            return "completed"
        })
        .catch((err) => {
            return err.response.data.message
        })
    }

    return (
        <div className='centerDiv'>
            <AuthCard
                icon={<RiMailLockLine size={100}/>}
                buttontxt='Login'
                title='Verify your code'
                description='Enter the code sent to your email'
                buttonRedirect='/admindashboard'
                data='code'
                function={handleLogin}
                placeholder='XXXXXX'/>
        </div>
    )
}

export default Login