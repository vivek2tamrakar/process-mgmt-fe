import React from 'react';
import Style from './Style.module.css';
export default function TaskTimeBar() {
  const time = [
    {
      time: '07:00',
      task: ''
    },
    {
      time: '08:00',
      task: ''
    },
    {
      time: '09:00',
      task: ''
    },
    {
      time: '10:00',
      task: ''
    },
    {
      time: '11:00',
      task: ''
    },
    {
      time: '12:00',
      task: ''
    },
    {
      time: '13:00',
      task: ''
    },
    {
      time: '14:00',
      task: 'Task 1'
    },
    {
      time: '15:00',
      task: ''
    },
    {
      time: '16:00',
      task: ''
    },
    {
      time: '17:00',
      task: ''
    },
    {
      time: '18:00',
      task: ''
    }
  ];
  return (
    <div style={{ display: 'flex', border: '1px solid', width: '1224px' }}>
      {time.map((val) => (
        <div className={Style.Timer}>
          <div className={Style.Header}>{val.time}</div>
          <div className={Style.Body}>
            {val.task && <span className={Style.Task}>{val.task} </span>}
          </div>
        </div>
      ))}
    </div>
  );
}
