import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>("")

    const submitEmail = () => {
        navigate('/request-otp')
    }

  return (
    <div className='bg-white md:w-[440px] flex flex-col gap-[24px] py-[32px] px-[40px] shadow-lg'>
        <div className='flex'>
            <img className='w-[123.64px] h-[35.39px]' src='/amalitech_logo.jpg'/>
        </div>
        <div className='flex flex-col gap-[8px]'>
            <h1 className='text-[#101828] leading-[32px] text-[24px] font-[600]'>Enter email account</h1>
        </div>
        <form onSubmit={(e) => {e.preventDefault();submitEmail()}} className='flex gap-[24px] flex-col'>
            <div className='flex flex-col gap-[16px]'>
                <div className='py-[10px] border-b-[1px] border-b-[#d0d5dd]'>
                    <input required value={email} onChange={(e) => {setEmail(e.target.value)}} className='outline-none border-none text-[16px] leading-[24px] font-[400] text-[#667085]' type='email' placeholder='someone@amalitech.org'/>
                </div>
                <a href='mailto:admin@email.com' className='text-[#2e90fa] leading-[20px] text-[14px] font-[400]'>Can't access your account? Contact admin</a>
            </div>
            <div className="flex flex-col gap-[8px] items-end w-full">
                <button type='button' onClick={submitEmail} className="border-[1px] border-[#06aed4] hover:shadow px-[14px] py-[8px] bg-[#2e90fa]">
                    <h1 className='text-white leading-[20px] font-[600] text-[14px]'>Next</h1>
                </button>
            </div>
        </form>
    </div>
  )
}

export default Login
