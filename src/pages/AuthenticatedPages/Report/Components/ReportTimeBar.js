import React from 'react';
import Style from './Style.module.css';
export default function TaskTimeBar({ data }) {

    const time = [
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00', ,
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00'
    ];

    return (
        <div id='timer' style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className={Style.Timer}>
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
