import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'


export default function LogoutBtn() {

  const dispatch = useDispatch()

  const handleLogout = () => {
    authService.logout()
      .then(() => {
        dispatch(logout())
      })
      .catch((e) => { console.log('Logout failed:', e) })
  }

  return (
    <button onClick={handleLogout}
      className='hover:text-red-300 duration-200 text-slate-200'>Logout</button>
  )
}
