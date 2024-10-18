import React, { useEffect, useRef, useState } from 'react'
import './styles.css'

interface Props{
    buttontxt: string,
    icon: React.ReactNode,
    title: string,
    buttonRedirect: string,
    description: string,
    data: string,
    placeholder: string,
    function: (value:string) => Promise<string>
}

const AuthCard: React.FC<Props> = (props) => {
    const [data, setData] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [isloading, setIsLoading] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement|null>(null)

    useEffect(() => {
        if(inputRef.current)
            inputRef.current.focus()
    }, [])

    const handleFormSubmit = async (e: HTMLFormElement) => {
        e.preventDefault()
        handleSubmit()
    }

    const handleSubmit = async () => {
        if(!data){
            setError(`Please enter your ${props.data == "email" ? "email" : "otp code"}`)
            return
        }
        setIsLoading(true)
        const status = await props.function(data)
        if(status != "completed")
            setError(status)
        setIsLoading(false)
    }

    return (
        <div className='authCard'>
            {props.icon}
            <h1>{props.title}</h1>
            <form className='form' onSubmit={() => handleFormSubmit}>
                <input value={data}
                    onChange={(e) => setData(e.target.value)}
                    required ref={inputRef}
                    type={props.data == "email" ? "email" : "text"}
                    name={props.data} id={props.data}
                    placeholder={props.placeholder}
                />
                {
                    error &&
                    <p className='error'>{error}</p>
                }
                <br/>
                <button onClick={handleSubmit} type="submit">
                    {
                        isloading ?
                        <div className='button-loader'></div>:
                        props.buttontxt
                    }
                </button>
            </form>
            <p>{props.description}</p>
        </div>
    )
}

export default AuthCard