import React from 'react';
const BoardView = ({ data, date, id, index }) => {
    const overdue = data?.filter(val => val.status === 3) || [];
    const inprogress = data?.filter(val => val.status === 2) || [];
    const open = data?.filter(val => val.status === 1) || [];
    const completed = data?.filter(val => val.status === 4) || [];
    return (
        <div>
            {index === 0 && <div className='heading-type'>
                <div className='status-header overdue'>OVERDUE</div>
                <div className='status-header inprogress'>IN PROGRESS</div>
                <div className='status-header open'>OPEN</div>
                <div className='status-header completed'>COMPLETED</div>
            </div>}
            <div className='heading-type'>
                <div className='status-list'>
                    {overdue.map(val => <div className='list-header overdue'><strong>{val.name} - {val.description}</strong> {val.startTime} - {val.endTime}</div>)}
                </div>
                <div className='status-list'>
                    {inprogress.map(val => <div className='list-header inprogress'><strong>{val.name} - {val.description}</strong> {val.startTime} - {val.endTime} </div>)}
                </div>
                <div className='status-list'>
                    {open.map(val => <div className='list-header open'><strong>{val.name} - {val.description}</strong> {val.startTime} - {val.endTime}</div>)}
                </div>
                <div className='status-list'>
                    {completed.map(val => <div className='list-header completed'><strong>{val.name} - {val.description}</strong> {val.startTime} - {val.endTime}</div>)}
                </div>
            </div>
        </div>
    );
};

export default BoardView
