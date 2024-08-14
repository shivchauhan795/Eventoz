import React from 'react'
import img from '../assets/a.png'

const Home = () => {
    return (
        <>
            <div className='pb-5'>

                <div className='text-white flex items-center justify-evenly p-8 flex-wrap'>
                    <div className='hometext text-6xl flex flex-wrap text-wrap items-center justify-center  w-1/2'>
                        Create events of Today and Tomorrow!!
                    </div>
                    <div className='flex justify-center text-center'>
                        <img src={img} alt="image" />
                    </div>
                </div>
                <div className='flex justify-center gap-3'>
                    <button type="button" class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg uppercase px-5 py-2.5 text-center me-2 mb-2">Register</button>
                    <button type="button" class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg uppercase px-5 py-2.5 text-center me-2 mb-2">Login</button>
                </div>
            </div>
        </>
    )
}

export default Home
