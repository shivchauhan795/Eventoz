import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();

    // Check if the token exists
    const token = cookies.get("TOKEN");

    const handleLogout = () => {
        cookies.remove("TOKEN")
        navigate('/login')
    }
    return (
        <div className='logo bg-slate-700 h-16 w-full flex flex-wrap items-center text-white px-20 justify-between'>
            <span className='text-xl flex items-center gap-2'>
                <Link to={'/'}>
                    <img src={"./assets/react.svg"} alt="" width={40} />
                    Eventoz
                </Link>
            </span>

            <div className='navlinks flex gap-4'>

                {
                    token ? (
                        <>
                            <Link to={"/dashboard"}>DASHBOARD</Link>
                            <Link to={"/createevent"}>CREATE EVENT</Link>
                            <Link to={"/scanqr"}>SCAN QR</Link>
                            <button onClick={handleLogout}>LOGOUT</button>
                        </>

                    ) : (
                        <Link to={"/login"}>LOGIN</Link>

                    )
                }

                {/* <Link to={"https://shiv-chauhan.netlify.app/"} target='_blank' className='nav-link'>About Developer</Link> */}
                {/* <Link to={"https://github.com/shivchauhan795/KeyShield"} target='_blank' className='nav-link'>Contribute</Link> */}
                {/* <Link to={"/dashboard"}>DASHBOARD</Link>
                <Link to={"/login"}>LOGIN</Link>
                <button onClick={handleLogout}>LOGOUT</button> */}
            </div>
        </div>
    )
}

export default Navbar
