import React from 'react';
const ScheduleView = ({ data, date, id, index }) => {
    return (
        <div className='schedule-view'>
            <table>
                <thead>
                    <tr>
                        <th>Task Owner</th>
                        <th>Task Description</th>
                        <th>Start</th>
                        <th>Duration</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map(val => <tr>
                        <td>{val.user?.email || 'Shared'}</td>
                        <td>{val.name} - {val.description}</td>
                        <td>{val.startTime}</td>
                        <td>{val.duration}</td>
                        <td>
                            {val.status === 4 && <span className='completed status-btn'>Completed</span>}
                            {val.status === 3 && <span className='overdue status-btn'>Overdue</span>}
                            {val.status === 2 && <span className='inprogress status-btn'>In Progress / Now / Current</span>}
                            {val.status === 1 && <span className="due">Due in {(val.endTimestamp - val.startTimestamp) / 60} mins</span>}
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    );
};

export default ScheduleView
