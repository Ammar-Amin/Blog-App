import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Logo } from './index'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { login } from '../store/authSlice'

export default function Signup() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState('')
    const { register, handleSubmit } = useForm()
    const [loading, setLoading] = useState(false)

    const handleSignup = async (data) => {
        setError('')
        setLoading(true)
        try {
            const userData = await authService.createAccount(data)
            if (userData.success === false) { setError(userData.error) }
            if (userData) {
                const currUserData = await authService.getCurrentUser()
                if (currUserData) {
                    dispatch(login(currUserData))
                    setLoading(false)
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
        }
        setLoading(false)
    }

    if (loading) {
        return (
            <div className='w-full h-[400px] relative'>
                <div class="banter-loader">
                    <div class="banter-loader__box"></div>
                    <div class="banter-loader__box"></div>
                    <div class="banter-loader__box"></div>
                    <div class="banter-loader__box"></div>
                    <div class="banter-loader__box"></div>
                    <div class="banter-loader__box"></div>
                    <div class="banter-loader__box"></div>
                    <div class="banter-loader__box"></div>
                    <div class="banter-loader__box"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center p-3">
            <div className={`mx-auto w-full max-w-lg bg-[#242324] text-slate-100 rounded-xl p-5 md:p-10 border border-slate-700`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                {error && <p className="text-red-400 mt-5 text-center">{error}</p>}
                <form onSubmit={handleSubmit(handleSignup)} className='mt-6 space-y-3'>
                    <Input
                        className="rounded-md"
                        label="Name : "
                        placeholder="Enter your name"
                        {...register("name", { required: true })}
                    />
                    <Input
                        className="rounded-md"
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
                        className="rounded-md mb-3"
                        label="Password : "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", { required: true })}
                    />
                    <Button type="submit" text="Create Account" className='w-full' />
                </form>
                <p className="mt-4 text-center text-sm">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    )
}
