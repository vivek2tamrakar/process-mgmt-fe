import React from 'react';
import Style from './Style.module.css';
export default function TaskTimeBar({ data, left }) {
console.log(data)
    const time = [
        '00:00',
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00',
        '23:59'
    ];

    return (
        <div id='timer' style={{ display: 'flex', flexDirection: 'column' }}>
            <div className={Style.Timer}>
                {!!left && <div className='line' style={{ left }}></div>}
                {time.map((val) => (<div className={Style.Header}>{val}</div>))}
            </div>
            <div className='timeentry'>
                <div style={{ position: 'absolute', width: '100%', height: data ? (data.filter(val => val.width).length * 36 || 36) : 36, display: 'flex' }}>
                    {time.map((val) => (<div className="placeholderbg"></div>))}
                </div>
                {data ? data.filter(val => val.width).map(res => <div className={Style.Body}>
                    <span className={Style.Task} style={{ width: res.width / 60, left: res.left / 60 }}>{res.name} </span>
                </div>) : <div className={Style.Body}>
                </div>}
            </div>
        </div>
    );
}
