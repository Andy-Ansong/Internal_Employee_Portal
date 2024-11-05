import axios, { AxiosResponse } from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from "./Navbar"

interface Props{
    children: React.ReactNode
}

const ProtectedRoute:React.FC<Props> = ({children}) => {
    const navigate = useNavigate()

    useEffect(() => {
        // let token = localStorage.getItem('token')
        // let isExpired = true
        // if(token){
        //     let payload = JSON.parse(atob(token.split('.')[1]))
        //     isExpired = payload.exp < Math.floor(Date.now()/1000)
            
            // if(isExpired){
            //     console.log("Your token is expired")
            //     axios.post("http://localhost:3030/api/v1/auth/refresh", {
            //         headers:{ Authorization: `Bearer ${localStorage.getItem("token")}` },
            //         withCredentials: true
            //     })
            //     .then((res:AxiosResponse) => {
            //         console.log("Generating new token")
            //         const {accessToken} = res.data
            //         localStorage.setItem('token', accessToken)
            //         localStorage.setItem("user", JSON.stringify(res.data.user))
            //         console.log("Set new access token")
            //         token = localStorage.getItem('token') || ""
            //         payload = JSON.parse(atob(token.split('.')[1]))
            //         isExpired = payload.exp < Math.floor(Date.now()/1000)
            //         console.log("Your token got refreshed")
            //     })
            //     .catch((err) => {
            //         console.log(err)
            //         navigate('/')
            //     })
            // }
        // }

        if(!token)
            navigate('/')
    }, [navigate])
    

    return (
        <>
            <Navbar/>
            {children}
        </>
    )
}

export default ProtectedRoute