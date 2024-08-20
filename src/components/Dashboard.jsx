import React, { useEffect, useState } from 'react'
import Card from './Card'
import ToggleButton from './ToggleButton'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const Dashboard = () => {
    const [events, setEvents] = useState([])
    const [isCompleted, setIsCompleted] = useState(false)

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = cookies.get("TOKEN");
                const response = await fetch('http://localhost:3000/myevents', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }

                const data = await response.json();

                // Fetch registration and attendance counts for each event
                const eventsWithCounts = await Promise.all(data.events.map(async (event) => {
                    // Fetch registration count
                    const registrationResponse = await fetch(`http://localhost:3000/event/${event.id}/registrations`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    const registrationCount = registrationResponse.ok
                        ? (await registrationResponse.json()).registrationCount
                        : 0;

                    // Fetch attendance count
                    const attendedResponse = await fetch(`http://localhost:3000/event/${event.id}/attended`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    const attendedCount = attendedResponse.ok
                        ? (await attendedResponse.json()).attendedCount
                        : 0;

                    // Combine the event data with the counts
                    return { ...event, registrationCount, attendedCount };
                }));

                setEvents(eventsWithCounts);

            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);


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
                        <Link to={`/card/${event.id}`} key={event.id}>
                            <Card event={event} />
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Dashboard
