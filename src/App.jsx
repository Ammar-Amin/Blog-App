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
          dispatch(login(userData))
          : dispatch(logout())
      )
      .catch((error) => console.log('getCurrentUser Error:', error))
      .finally(() => setLoading(false))

  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-col flex-wrap content-between'>
      <Header />
      <main className='mx-auto'>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <div className='min-h-screen flex justify-center items-center'>
      <div class="loader">
        <span class="loader-text">Loading</span>
        <span class="load"></span>
      </div>
    </div>
  )
}

export default App
