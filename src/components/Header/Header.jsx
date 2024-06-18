import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Logo, LogoutBtn } from '../index'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../../appwrite/auth'

export default function Header() {

    const authStatus = useSelector(state => state.auth.status)
    const navigate = useNavigate()

    // navItem obj bana k map kr dege 
    const navItems = [
        {
            name: "Home",
            path: "/",
            active: !authStatus,
        },
        {
            name: "Signup",
            path: "/signup",
            active: !authStatus,
        },
        {
            name: "Login",
            path: "/login",
            active: !authStatus,
        },
        {
            name: "All Posts",
            path: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            path: "/add-post",
            active: authStatus,
        },
    ]

    return (
        <header className='w-full py-4 text-white text-center border-b-2 border-slate-700'>
            <Container>
                <nav className='flex items-center'>
                    <Link to='/'>
                        <Logo />
                    </Link>
                    <ul className='flex gap-2 md:text-ba md:gap-4 ml-auto'>
                        {
                            navItems.map(item => (
                                item.active &&
                                <li key={item.name}>
                                    <button onClick={() => navigate(item.path)}>
                                        {item.name}
                                    </button>
                                </li>
                            ))
                        }
                        {
                            authStatus && <li key='logout'>
                                <LogoutBtn />
                            </li>
                        }
                    </ul>
                </nav>
            </Container>
        </header>
    )
}
