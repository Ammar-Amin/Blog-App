import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) =>
        userData ?
          dispatch(login({ userData }))
          : dispatch(logout())
      )
      .catch((error) => console.log('getCurrentUser Error:', error))
      .finally(() => setLoading(false))

  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between'>
      <Header />
      <main className='mx-auto'>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <h1 className='text-8xl text-center text-white mt-10'>Loading...</h1>
  )
}

export default App
