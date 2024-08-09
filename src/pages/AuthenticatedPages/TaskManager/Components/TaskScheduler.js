import React from 'react';
import TaskTimeBar from './TaskTimeBar'
import Style from './Style.module.css';
import { useNavigate, createSearchParams } from 'react-router-dom';
import ScheduleView from './ScheduleView';
import MonthView from './MonthView';
import BoardView from './Board';
const TaskScheduler = ({ value, date, task, type, left }) => {
    const navigate = useNavigate();
    function createTask(id) {
        navigate({
            pathname: "/create-task",
            search: `?${createSearchParams({
                id
            })}`
        })
    }

    return (
        <div>
            {value.map((data, index) => (<><div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', flexDirection: 'Column' }}>
                    <div className={Style.GroupName}>{data.split('$$')[1]}</div>
                    <div className={Style.AddTask} onClick={() => createTask(data.split('$$')[0])} >Add Task</div>
                </div>
                {type === 'week' && <TaskTimeBar data={task[data]} left={left} date={date} id={data.split('$$')[0]}></TaskTimeBar>}
                {type === 'schedule' && <ScheduleView data={task[data]} date={date} id={data.split('$$')[0]}></ScheduleView>}
                {type === 'board' && <BoardView data={task[data]} date={date} index={index} id={data.split('$$')[0]}></BoardView>}
                {type === 'month' && <MonthView data={task[data]} info={'dayGridMonth'}></MonthView>}
                {type === 'next7' && <MonthView data={task[data]} info={'timeGridWeek'}></MonthView>}
                {type === 'workweek' && <MonthView data={task[data]} info={'timeGridWeek'} weekendsVisible={false}></MonthView>}
            </div> <br /><br /></>))}
        </div>
    );
};

export default TaskScheduler
