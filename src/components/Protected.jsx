import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


export default function Protected({
    children,
    authenticated = true,
}) {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        // we know this 
        // authStatus === false ? navigate('/login') : navigate('/')

        // this is advance stuff 
        if (authenticated && authStatus !== authenticated) {
            // true && false !== true 
            navigate('/login')
        }
        else if (!authenticated && authStatus !== authenticated) {
            // false && false !== true 
            navigate('/')
        }
        setLoading(false)
    }, [navigate, authStatus, authenticated])

    return loading
        ? <h1 className='text-slate-200 text-3xl text-center'>Loading...</h1>
        : <>{children}</>
}
