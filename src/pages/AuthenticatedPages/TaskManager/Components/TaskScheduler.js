import React from 'react';
import TaskTimeBar from './TaskTimeBar'
import Style from './Style.module.css';
import { useNavigate, createSearchParams } from 'react-router-dom';
const TaskScheduler = ({ value, date, task }) => {
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
            {value.map(data => (<><div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', flexDirection: 'Column' }}>
                    <div className={Style.GroupName}>{data.split('$$')[1]}</div>
                    <div className={Style.AddTask} onClick={() => createTask(data.split('$$')[0])} >Add Task</div>
                </div>
                <TaskTimeBar data={task[data]} date={date} id={data.split('$$')[0]}></TaskTimeBar>
            </div> <br /><br /></>))}
        </div>
    );
};

export default TaskScheduler
