import React, { useEffect, useState } from 'react'
import Card from './Card'
import ToggleButton from './ToggleButton'

const Dashboard = () => {
    const [events, setEvents] = useState([])
    const [isCompleted, setIsCompleted] = useState(false)

    useEffect(() => {
        setEvents(JSON.parse(localStorage.getItem('events')) || [])
    }, [])


    const filterEvents = () => {
        const now = new Date()
        if (isCompleted) {
            return events.filter(event => new Date(event.date) < now)
        } else {
            return events.filter(event => new Date(event.date) >= now)
        }
    }

    const handleToggle = (checked) => {
        setIsCompleted(checked)
    }

    const filteredEvents = filterEvents()

    return (

        <>
            <div className='bg-black min-h-screen'>

                <div className='flex flex-wrap justify-evenly py-14 gap-20 px-10'>
                    <h1 className='text-white text-2xl'>Welcome Organizer!!</h1>
                    <ToggleButton isChecked={isCompleted} onToggle={handleToggle} />
                </div>
                <div className='flex flex-wrap justify-center p-8 gap-10'>
                    {filteredEvents.length === 0 && (
                        <div className='text-white'>
                            {isCompleted ? 'No Completed Events to show.' : 'No Upcoming Events to show.'}
                        </div>
                    )}

                    {filteredEvents.map(event => (
                        <Card key={event.id} event={event} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Dashboard
