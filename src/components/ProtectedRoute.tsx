import React from 'react'
import { useNavigate } from 'react-router-dom'

interface Props{
    children: React.ReactNode
}

const ProtectedRoute:React.FC<Props> = ({children}) => {
    const navigate = useNavigate()
    
    const token = localStorage.getItem('token')
    let isExpired = true
    if(token){
        const payload = JSON.parse(atob(token.split('.')[1]))
        isExpired = payload.exp < Math.floor(Date.now()/1000)
    }
    if(isExpired)
        navigate('/auth')

    return children
}

export default ProtectedRoute