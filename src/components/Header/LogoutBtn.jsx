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
      className='px-6 py-2 rounded-full hover:bg-blue-200 duration-200 text-slate-200'>Logout</button>
  )
}
