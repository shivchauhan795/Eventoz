import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='logo bg-slate-700 h-16 w-full flex flex-wrap items-center text-white px-20 justify-between'>
            <span className='text-xl flex items-center gap-2'>
                <Link to={'/'}>
                <img src={"./assets/react.svg"} alt="" width={40} />
                Eventoz
                </Link>
            </span>

            <div className='navlinks flex gap-4'>
                {/* <Link to={"https://shiv-chauhan.netlify.app/"} target='_blank' className='nav-link'>About Developer</Link> */}
                {/* <Link to={"https://github.com/shivchauhan795/KeyShield"} target='_blank' className='nav-link'>Contribute</Link> */}
                <Link to={"/dashboard"}>DASHBOARD</Link>
                <Link to={"/login"}>LOGIN</Link>
            </div>
        </div>
    )
}

export default Navbar
