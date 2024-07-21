import React, { useState, useEffect } from 'react';
import Scheduler, { SchedulerData, ViewTypes, DATE_FORMAT } from 'react-big-scheduler';
import 'react-big-scheduler/lib/css/style.css';
import moment from 'moment';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
let events = [
    {
        id: 1,
        start: '2024-07-21 09:30:00',
        end: '2024-07-21 15:35:00',
        resourceId: 'r1',
        title: 'I am finished',
        bgColor: '#D9D9D9',
    },
    {
        id: 2,
        start: '2024-07-21 09:30:00',
        end: '2024-07-21 17:30:00',
        resourceId: 'r2',
        title: 'I am not resizable',
        resizable: false,
    },
    {
        id: 3,
        start: '2017-12-19 12:30:00',
        end: '2017-12-20 23:30:00',
        resourceId: 'r3',
        title: 'I am not movable',
        movable: false,
    },
    {
        id: 4,
        start: '2024-07-21 09:30:00',
        end: '2024-07-21 17:30:00',
        resourceId: 'r1',
        title: 'I am not start-resizable',
        startResizable: false,
    },
    {
        id: 5,
        start: '2024-07-21 09:30:00',
        end: '2024-07-21 17:30:00',
        resourceId: 'r2',
        title: 'R2 has recurring tasks every week on Tuesday, Friday',
        bgColor: '#f759ab',
    },
];
const SchedulerComponent = () => {
    const [schedulerData, setSchedulerData] = useState(new SchedulerData(new moment().format(DATE_FORMAT), ViewTypes.Day, false, false, {
        dayStartFrom: 7,
        dayStopTo: 18,
        views: [
            { viewName: 'Day', viewType: ViewTypes.Day, showAgenda: false, isEventPerspective: false },
        ]
    }));

    useEffect(() => {
        moment.locale('zh-cn');
        schedulerData.setLocaleMoment(moment);

        let resources = [
            {
                id: 'r0',
                name: 'Group 0',
                groupOnly: false,
            },
            {
                id: 'r1',
                name: 'Group 1',
                groupOnly: false,
            },
            {
                id: 'r2',
                name: 'Group 2',
                groupOnly: false,
            },
            {
                id: 'r3',
                name: 'Group 3',
                groupOnly: false,
            },
            {
                id: 'r4',
                name: 'Group 4',
                groupOnly: false,
            },
        ];
        schedulerData.setResources(resources);
        schedulerData.setEvents(events);

        setSchedulerData(schedulerData);
    }, []);

    const prevClick = (schedulerData) => {
        schedulerData.prev();
        schedulerData.setEvents(events);
        setSchedulerData(schedulerData);
    };

    const nextClick = (schedulerData) => {
        schedulerData.next();
        schedulerData.setEvents(events);
        setSchedulerData(schedulerData);
    };

    const onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        schedulerData.setEvents(events);
        setSchedulerData(schedulerData);
    };

    const onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setEvents(events);
        setSchedulerData(schedulerData);
    };

    const eventClicked = (schedulerData, event) => {
        alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
    };

    return (
        <Scheduler
            schedulerData={schedulerData}
            prevClick={prevClick}
            nextClick={nextClick}
            onSelectDate={onSelectDate}
            onViewChange={onViewChange}
            eventItemClick={eventClicked}

        />
    );
};

export default DragDropContext(HTML5Backend)(SchedulerComponent);
