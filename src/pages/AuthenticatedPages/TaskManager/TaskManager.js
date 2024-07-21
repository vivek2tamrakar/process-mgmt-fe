import React from "react";
import TaskScheduler from "../TaskManager/Components/TaskScheduler";
import Style from "./Style.module.css"


export default function TaskManager() {
    return (
        <div className={Style.TaskManager}>
         <TaskScheduler></TaskScheduler>
        </div>
    )
}