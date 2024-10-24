// import axios, { AxiosResponse } from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface Props{
    children: React.ReactNode
}

const ProtectedRoute:React.FC<Props> = ({children}) => {
    const navigate = useNavigate()

    const token = localStorage.getItem('token')
    // let isExpired = true
    // if(token){
    //     let payload = JSON.parse(atob(token.split('.')[1]))
    //     isExpired = payload.exp < Math.floor(Date.now()/1000)
        
    //     if(isExpired){
    //         console.log("Your token is expired")
    //         axios.post("http://localhost:3030/api/v1/auth/refresh", {withCredentials: true})
    //         .then((response:AxiosResponse) => {
    //             console.log("Generating new token")
    //             const {accessToken} = response.data
    //             localStorage.setItem('token', accessToken)
    //             console.log("Set new access token")
    //             token = localStorage.getItem('token') || ""
    //             payload = JSON.parse(atob(token.split('.')[1]))
    //             isExpired = payload.exp < Math.floor(Date.now()/1000)
    //             console.log("Your token got refreshed")
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //             navigate('/auth')
    //         })
    //     }
    // }
    if(!token)
        navigate('/auth')

    return children
}

export default ProtectedRoute