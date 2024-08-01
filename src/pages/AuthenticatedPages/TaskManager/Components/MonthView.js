import React, { useState } from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event.utils'

export default function MonthView({data, info, weekendsVisible = true}) {
    // const [weekendsVisible, setWeekendsVisible] = useState(true)
    const [currentEvents, setCurrentEvents] = useState([])
    
    const response = data?.map(val => ({
        ...val,
        title: val.name
    }))
    console.log(response)

    // function handleWeekendsToggle() {
    //     setWeekendsVisible(!weekendsVisible)
    // }

    function handleDateSelect(selectInfo) {
        // let title = prompt('Please enter a new title for your event')
        // let calendarApi = selectInfo.view.calendar

        // calendarApi.unselect() // clear date selection

        // if (title) {
        //     calendarApi.addEvent({
        //         id: createEventId(),
        //         title,
        //         start: selectInfo.startStr,
        //         end: selectInfo.endStr,
        //         allDay: selectInfo.allDay
        //     })
        // }
    }

    function handleEventClick(clickInfo) {
        // if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        //     clickInfo.event.remove()
        // }
    }

    function handleEvents(events) {
        setCurrentEvents(events)
    }

    return (
        <div className='month-app'>
            <div className='month-app-main'>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView={info}
                    editable={false}
                    selectable={false}
                    selectMirror={false}
                    dayMaxEvents={true}
                    weekends={weekendsVisible}
                    initialEvents={response} // alternatively, use the `events` setting to fetch from a feed
                    select={handleDateSelect}
                    eventContent={renderEventContent} // custom render function
                    eventClick={handleEventClick}
                    eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                />
            </div>
        </div>
    )
}

function renderEventContent(eventInfo) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}


