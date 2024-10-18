import React from 'react'
import { Navigate } from 'react-router-dom'

interface Props{
    children: React.ReactNode
}

const ProtectedRoute:React.FC<Props> = ({children}) => {
    const token = localStorage.getItem('token')
    let isExpired = true
    if(token){
        const payload = JSON.parse(atob(token.split('.')[1]))
        isExpired = payload.exp < Math.floor(Date.now()/1000)
    }
    if(isExpired)
        return <Navigate to='auth'/>

    return children
}

export default ProtectedRoute