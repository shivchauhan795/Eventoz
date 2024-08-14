import React from 'react'

const Card = ({event}) => {
    return (
        <div>
            <div className='h-100 w-56 p-2 rounded-3xl border background_color card_border hover:scale-110 transition-all text-white'>

                <img src={event.banner} alt='banner' className='size-fit border-b rounded-t-3xl h-32 w-56 background_color card_border pb-2' />

                <h2 className='text-center uppercase p-2 background_color'>{event.eventName}</h2>

                <p className='text-xs px-1 background_color'>{event.eventDesc}</p>

                <h3 className='text-center uppercase p-2 background_color'>{new Date(event.date).toLocaleString()}</h3>
                <h2 className='text-center uppercase p-1 background_color'>Total Participant Registered</h2>


            </div>
        </div>
    )
}

export default Card
