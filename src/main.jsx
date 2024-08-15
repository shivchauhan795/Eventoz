import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './components/Dashboard.jsx'
import CreateEvent from './components/CreateEvent.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import ProtectedRoutes from "./ProtectedRoutes.jsx"
import PublicRoutes from './PublicRoutes.jsx'

const router = createBrowserRouter([

  {
    element: <ProtectedRoutes />, // Wrap protected routes with ProtectedRoutes
    children: [
      {
        path: '/dashboard',
        element: <><Navbar /><Dashboard /><Footer /></>,
      },
      {
        path: '/createevent',
        element: <><Navbar /><CreateEvent /><Footer /></>,
      },
    ],
  },
  {
    element: <PublicRoutes />, // Wrap public routes with PublicRoutes
    children: [
      {
        path: '/login',
        element: <><Navbar /><Login /><Footer /></>
      },
      {
        path: '/register',
        element: <><Navbar /><Register /><Footer /></>
      },
      {
        path: '/',
        element: <><Navbar /><App /><Footer /></>
      },
    ],
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <RouterProvider router={router} />

  </React.StrictMode>,
)
