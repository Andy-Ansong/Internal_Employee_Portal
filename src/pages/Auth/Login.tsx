import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
    const navigate = useNavigate()
    const [error, setError] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [otp, setOtp] = useState<string>("")
    const inputRef = useRef<HTMLInputElement|null>(null)

    useEffect(() => {
        inputRef.current?.focus()
    })

    const submitOtp = () => {
        setIsLoading(true)
        axios.post('http://localhost:3030/api/v1/auth/login', {code: otp}, {withCredentials: true})
        .then((res) => {
            localStorage.setItem("token", res.data.accessToken)
            console.log(res.data.user)
            localStorage.setItem("user", JSON.stringify(res.data.user))
            navigate('/profile')
        }).catch(err => {
            setError(err.response.data.message)
        }).finally(() => {
            setIsLoading(false)
        })
    }

  return (
    <div className='bg-white md:w-[440px] w-[350px] h-[322px] flex flex-col gap-[24px] py-[32px] px-[40px] shadow-lg'>
        <div className='flex'>
            <img className='w-[123.64px] h-[35.39px]' src='/amalitech_logo.jpg'/>
        </div>
        <div className='flex flex-col gap-[8px]'>
            <h1 className='text-[#101828] leading-[32px] text-[20px] font-[600]'>Enter received code</h1>
        </div>
        <form onSubmit={(e) => {e.preventDefault();submitOtp()}} className='flex gap-[24px] flex-col'>
            <div className='flex flex-col gap-[16px]'>
                <div className='py-[10px] border-b-[1px] border-b-[#d0d5dd]'>
                    <input ref={inputRef} required value={otp} onChange={(e) => {setOtp(e.target.value)}} className='w-full outline-none border-none text-[16px] leading-[24px] font-[400] text-[#667085] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' type='number' placeholder='123456'/>
                </div>
            </div>
            <div className="flex relative flex-col gap-[8px] items-end w-full">
                {
                    error && <div className='absolute bottom-9 right-0 text-red-500'>{error}</div>
                }
                {
                    isLoading?
                    <div className="h-[38px] flex items-center justify-center w-[75.5px] border-[1px] border-[#06aed4] hover:shadow px-[14px] py-[8px] bg-[#2e90fa]">
                        <div className="w-4 h-4 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>:
                    <button type='submit' onClick={submitOtp} className="h-[38px] w-[75.5px] border-[1px] border-[#06aed4] hover:shadow px-[14px] py-[8px] bg-[#2e90fa]">
                        <h1 className='text-white leading-[20px] font-[600] text-[14px]'>Submit</h1>
                    </button>
                }
            </div>
        </form>
    </div>
  )
}

export default Login
