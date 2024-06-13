import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home, SignUp, LogIn, AddPost, EditPost, Post, AllPosts } from './pages/index.js'
import Protected from './components/Protected.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: "/signup",
        element: (
          <Protected authenticated={false}>
            <SignUp />
          </Protected>
        ),
      },
      {
        path: '/login',
        element: (
          <Protected authentication={false}>
            <LogIn />
          </Protected>
        )
      },
      {
        path: "/all-posts",
        element: (
          <Protected authenticated>
            {" "}
            <AllPosts />
          </Protected>
        ),
      },
      {
        path: "/add-post",
        element: (
          <Protected authenticated>
            {" "}
            <AddPost />
          </Protected>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <Protected authenticated>
            {" "}
            <EditPost />
          </Protected>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
