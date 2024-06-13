import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login as storeLogin } from '../store/authSlice'
import { Input, Button, Logo } from './index'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

export default function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')

    const handleLogin = async (data) => {
        setError('')
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(storeLogin(userData))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center w-full p-3'>
            <div className={`mx-auto w-full max-w-lg bg-[#242324] text-slate-100 rounded-xl p-5 md:p-10 border border-slate-700`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                {
                    error &&
                    <p className="text-red-600 mt-8 text-center">{error}</p>
                }
                <form onSubmit={handleSubmit(handleLogin)} className='mt-6'>
                    <div className='space-y-3'>
                        <Input
                            className='rounded-md'
                            label="Email : "
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            className='rounded-md'
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                    </div>
                    <Button text="Sign in" type="submit" className="w-full mt-6" />
                </form>
                <p className="mt-4 text-center text-sm">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}
