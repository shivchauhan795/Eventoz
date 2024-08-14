import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'


const CreateEvent = () => {
    const [form, setform] = useState({ eventName: '', eventDesc: '', date: '', banner: '' })
    const [events, setEvents] = useState([])

    useEffect(() => {
        setEvents(JSON.parse(localStorage.getItem('events')) || [])
    }, [])


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setEvents([...events, { ...form, id: uuidv4() }])
        localStorage.setItem('events', JSON.stringify([...events, { ...form, id: uuidv4() }]))
        console.log(form)
        setform({ eventName: '', date: '', banner: '' })
    }



    return (
        <div className='flex flex-col pt-14 items-center min-h-screen bg-black'>
            <div className='flex justify-center font-bold'>
                <h1 className='text-3xl uppercase text-white'>Create Event</h1>
            </div>
            <form className='flex flex-col justify-center items-center gap-4 pt-10 w-1/2'>
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
    )
}

export default CreateEvent
