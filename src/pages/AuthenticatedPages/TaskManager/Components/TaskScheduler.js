import React from 'react';
import TaskTimeBar from './TaskTimeBar'
import Style from './Style.module.css';
const TaskScheduler = () => {
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', flexDirection: 'Column' }}>
                   <div className={Style.GroupName}>Group 4</div> 
                    <div className={Style.AddTask}>Add Task</div>
                </div>
                <TaskTimeBar></TaskTimeBar>
            </div> <br /><br />
            <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', flexDirection: 'Column' }}>
                   <div className={Style.GroupName}>Group 4</div> 
                    <div className={Style.AddTask}>Add Task</div>
                </div>
                <TaskTimeBar></TaskTimeBar>
            </div> <br /><br />
            <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', flexDirection: 'Column' }}>
                   <div className={Style.GroupName}>Group 4</div> 
                    <div className={Style.AddTask}>Add Task</div>
                </div>
                <TaskTimeBar></TaskTimeBar>
            </div> <br /><br />
            <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', flexDirection: 'Column' }}>
                   <div className={Style.GroupName}>Group 4</div> 
                    <div className={Style.AddTask}>Add Task</div>
                </div>
                <TaskTimeBar></TaskTimeBar>
            </div> <br /><br />
        </div>
    );
};

export default TaskScheduler
