import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";

const cookies = new Cookies();


const CreateEvent = () => {
    const navigate = useNavigate()
    const [form, setform] = useState({ eventName: '', eventDesc: '', date: '', banner: '' })


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.eventName && form.banner && form.date && form.eventDesc) {
            const token = cookies.get("TOKEN");
            const eventDetails = { ...form, id: uuidv4() };

            const response = await fetch('http://localhost:3000/createevent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(eventDetails), // Send the correct event data
            });

            setform({ eventName: '', eventDesc: '', date: '', banner: '' });

            if (response.ok) {
                toast('Event Created Successfully!!', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });

                setTimeout(() => {
                    navigate('/dashboard');
                }, 3000);
            } else {
                toast('Error Occurred!!', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } else {
            toast('Fill all the details!!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };




    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className='flex flex-col pt-14 items-center min-h-screen  bg-black'>
                <div className='flex justify-center font-bold'>
                    <h1 className='text-3xl uppercase text-white'>Create Event</h1>
                </div>
                <form className='flex flex-col justify-center items-center gap-4 pt-10 w-full sm:px-36 px-14'>
                    <label htmlFor="eventName" className='w-full text-white font-bold'>Event Name:</label>
                    <input onChange={handleChange} value={form.eventName} type="text" name="eventName" id="eventName" className='bg-slate-600 hover:bg-slate-500 w-full ps-5 rounded-lg p-2 text-white' />
                    <label htmlFor="eventDesc" className='w-full text-white font-bold'>Event Description:</label>
                    <textarea onChange={handleChange} value={form.eventDesc} type="text" name="eventDesc" id="eventDesc" className='bg-slate-600 hover:bg-slate-500 w-full ps-5 rounded-lg p-2 text-white' />

                    <label htmlFor="dateTime" className='w-full text-white font-bold'>Enter Date:</label>
                    <input onChange={handleChange} value={form.date} type="datetime-local" name="date" id="dateTime" className='bg-slate-600 hover:bg-slate-500 w-full ps-5 rounded-lg p-2 text-white' />
                    <label htmlFor="banner" className='w-full text-white font-bold'>Upload Event Banner:</label>
                    <input onChange={handleChange} value={form.banner} type="url" name="banner" id="banner" className='bg-slate-600 hover:bg-slate-500 w-full ps-5 rounded-lg p-2 text-white' />
                    <button onClick={handleSubmit} className="text-white w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Create Event</button>
                </form>
            </div>
        </>
    )
}

export default CreateEvent
