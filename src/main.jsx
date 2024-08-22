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
import SemiPublicRoutes from './SemiPublicRoutes.jsx'
import ScanQR from './components/ScanQR.jsx'
import CardDetail from './components/CardDetail.jsx'
import DownloadQR from './components/DownloadQR.jsx'
import EventRegistrationForm from './components/EventRegistrationForm.jsx'

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
      {
        path: '/card/:id',
        element: <><Navbar /><CardDetail /><Footer /></>,
      },
      {
        path: '/scanqr',
        element: <><Navbar /><ScanQR /><Footer /></>
      },
      {
        path: '/eventregisterationform/:formId',
        element: <><Navbar /><EventRegistrationForm /><Footer /></>,
      },
      {
        path: '/downloadqr/:id',
        element: <><Navbar /><DownloadQR /><Footer /></>,
      },
    ],
  },
  {
    element: <SemiPublicRoutes />, // Wrap semi public routes with SemiPublicRoutes
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
