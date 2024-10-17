import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

interface Props{
    buttontxt: string,
    icon: React.ReactNode,
    title: string,
    buttonRedirect: string,
    description: string,
    data: string,
    placeholder: string
}

const AuthCard: React.FC<Props> = (props) => {
    const inputRef = useRef<HTMLInputElement|null>(null)

    useEffect(() => {
        if(inputRef.current)
            inputRef.current.focus()
    }, [])

    return (
        <div className='authCard'>
            {props.icon}
            <h1>{props.title}</h1>
            <div>
                <input ref={inputRef} type={props.data == "email" ? "email" : "text"} name={props.data} id={props.data} placeholder={props.placeholder} /><br/>
                <Link to={props.buttonRedirect}>
                    <button type="submit">{props.buttontxt}</button>
                </Link>
            </div>
            <p>{props.description}</p>
        </div>
    )
}

export default AuthCard