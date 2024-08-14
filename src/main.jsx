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

const router = createBrowserRouter([
  {
    path: '/',
    element: <><Navbar /><App /><Footer /></>
  },
  {
    path: '/dashboard',
    element: <><Navbar /><Dashboard /><Footer /></>
  },
  {
    path: '/createevent',
    element: <><Navbar /><CreateEvent /><Footer /></>
  },
  {
    path: '/login',
    element: <><Navbar /><Login /><Footer /></>
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <RouterProvider router={router} />

  </React.StrictMode>,
)
