import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CreateEvent from './components/CreateEvent'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Home from './components/Home'

function App() {

  return (
    <>
      <div className='min-h-screen bg-[#242424]'>
        <Home/>
      </div>
    </>
  )
}

export default App
