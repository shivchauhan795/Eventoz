import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useParams, useNavigate } from 'react-router-dom';
import dotenv from 'dotenv'

dotenv.config()
const backendURL = process.env.BACKEND_URL

const EventRegistrationForm = () => {
    const navigate = useNavigate();
    const { formId } = useParams(); // Retrieve the form ID from the URL
    const [form, setForm] = useState({ name: '', branch: '', college: '', semester: '', phoneno: '', email: '' });


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUserDetails = { ...form, id: uuidv4(), formId };

        try {
            const response = await fetch(`${backendURL}eventregistereduser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUserDetails),
            });

            if (response.ok) {
                console.log("User registered successfully");
                navigate(`/downloadqr/${newUserDetails.id}`);
                setForm({ name: '', branch: '', college: '', semester: '', phoneno: '', email: '' });
            } else {
                console.error("Failed to register user for the event");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className='flex flex-col pt-14 items-center min-h-screen bg-black'>
            <div className='flex justify-center font-bold'>
                <h1 className='text-3xl uppercase text-white'>Register For Event</h1>
            </div>
            <form className='flex flex-col justify-center items-center gap-4 pt-10 w-1/2' onSubmit={handleSubmit}>
                <label htmlFor="name" className='w-full text-white font-bold'>Name:</label>
                <input onChange={handleChange} value={form.name} type="text" name="name" id="name" className='bg-slate-600 hover:bg-slate-500 w-full ps-5 rounded-lg p-2 text-white' />

                <label htmlFor="branch" className='w-full text-white font-bold'>Branch:</label>
                <input onChange={handleChange} value={form.branch} type="text" name="branch" id="branch" className='bg-slate-600 hover:bg-slate-500 w-full ps-5 rounded-lg p-2 text-white' />

                <label htmlFor="college" className='w-full text-white font-bold'>College:</label>
                <input onChange={handleChange} value={form.college} type="text" name="college" id="college" className='bg-slate-600 hover:bg-slate-500 w-full ps-5 rounded-lg p-2 text-white' />

                <label htmlFor="semester" className='w-full text-white font-bold'>Semester:</label>
                <input onChange={handleChange} value={form.semester} type="number" name="semester" id="semester" className='bg-slate-600 hover:bg-slate-500 w-full ps-5 rounded-lg p-2 text-white' />

                <label htmlFor="phoneno" className='w-full text-white font-bold'>Phone No:</label>
                <input onChange={handleChange} value={form.phoneno} type="number" name="phoneno" id="phoneno" className='bg-slate-600 hover:bg-slate-500 w-full ps-5 rounded-lg p-2 text-white' />

                <label htmlFor="email" className='w-full text-white font-bold'>Email:</label>
                <input onChange={handleChange} value={form.email} type="email" name="email" id="email" className='bg-slate-600 hover:bg-slate-500 w-full ps-5 rounded-lg p-2 text-white' />

                <button type="submit" className="text-white w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 text-center me-2 mb-2">
                    Register
                </button>
            </form>
        </div>
    );
}

export default EventRegistrationForm;
