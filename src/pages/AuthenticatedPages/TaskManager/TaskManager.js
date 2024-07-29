import React from "react";
import TaskScheduler from "./Components/TaskScheduler";
import Style from "./Components/Style.module.css"
import { Calendar } from 'antd';

const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
};
export default function TaskManager() {
    const wrapperStyle = {
        width: 250,
        border: `1px solid`,
        borderRadius: 10,
        position: 'absolute',
        bottom : 10,
        left: 20
    };
    return (
        <>
            <div style={wrapperStyle}>
                <Calendar fullscreen={false} onPanelChange={onPanelChange} />
            </div>
            <div className={Style.TaskManager}>
                <TaskScheduler></TaskScheduler>
            </div>
            <div className={Style.TaskScheduleType}>
                <div className={Style.selected}>Week</div>
                <div>Next 7 days</div>
                <div>Work Week</div>
                <div>Month</div>
                <div>Schedule</div>
                <div>Board</div>
            </div>
        </>
    )
}