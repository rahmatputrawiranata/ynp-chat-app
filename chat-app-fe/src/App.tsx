import './App.css'
import { Navigate,  RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import {  ReactNode } from 'react'

const PrivateRoute = ({children}: {children: ReactNode} ) => {
  const token = localStorage.getItem('access_token')
  const username = localStorage.getItem('username')

  return token && username ? children : <Navigate to="/auth" />
}

function App() {

  const router = createBrowserRouter([
    {path: '/auth', element: <AuthPage />},
    {path: '/', element:<PrivateRoute><HomePage /></PrivateRoute> }
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
