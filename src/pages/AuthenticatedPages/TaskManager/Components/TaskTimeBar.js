import React, {useState} from 'react';
import Style from './Style.module.css';
import { Button, Popover } from 'antd';
import { useNavigate, createSearchParams } from 'react-router-dom';

const status = {
    '3' : '#ff7c7c',
    '2' : '#fbcf69',
    '1' : 'red',
    '4' : '#5afc5f',
}

export default function TaskTimeBar({ data, date, id, left }) {

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
        '23:00'
    ];
    const navigate = useNavigate();
    const [popoverVisible, setPopoverVisible] = useState(false);
    const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
    const [start, setStart] = useState();
    function createTask() {
        const startTime = parseInt(start);
        navigate({
            pathname: "/create-task",
            search: `?${createSearchParams({
                startTime: date+'T'+startTime.toString().padStart(2, '0')+':00:00',
                endTime: date+'T'+(startTime+1).toString().padStart(2, '0')+':00:00',
                id
            })}`
        })
    }

    const handleDashboardRightClick = (e) => {
        e.preventDefault();
        setPopoverPosition({ top: e.clientY, left: e.clientX });
        setPopoverVisible(true);
      };
    return (
        <div id='timer' style={{ display: 'flex', flexDirection: 'column' }} onContextMenu={handleDashboardRightClick}>
            <div className={Style.Timer}>
                {!!left && <div className='line' style={{ left }}></div>}
                {time.map((val) => (<div className={Style.Header}>{val}</div>))}
            </div>
            <div className='timeentry'>
                <div style={{ position: 'absolute', width: '100%', height: data ? (data.filter(val => val.width).length * 36 || 36) : 36, display: 'flex' }}>
                    {time.map((val, index) => (<div className="placeholderbg" onMouseOver={()=> setStart(val)}></div>))}
                </div>
                {data ? data.filter(val => val.width).map(res => <div className={Style.Body}>
                    <span className={Style.Task} style={{ width: res.width / 60, left: res.left / 60, backgroundColor:  status[res.status] }}>{res.name} </span>
                </div>) : <div className={Style.Body}>
                </div>}
            </div>
            <Popover
                content={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <Button onClick={() => createTask()}>View Task Description</Button>
                        <Button onClick={() => createTask()}>Complete Task</Button>
                        <Button onClick={() => createTask()}>Run Checklist</Button>
                        <Button onClick={() => createTask()}>View/Open Process</Button>
                        <Button onClick={() => createTask()}>Assign to me</Button>
                        <Button onClick={() => createTask()}>Reassign</Button>
                        <Button onClick={() => createTask()}>Edit Task</Button>
                        {/* <Button onClick={() => createTask()}>Add Task</Button> */}
                        <Button onClick={() => createTask()}>Delete Task</Button>
                        <Button onClick={() => createTask()}>Disable Task</Button>
                    </div>
                }
                open={popoverVisible}
                onOpenChange={setPopoverVisible}
                placement="bottomCenter"
                overlayStyle={{
                    position: 'absolute',
                    top: popoverPosition.top,
                    left: popoverPosition.left
                }}
            >
                <div style={{ display: 'none' }} />
            </Popover>
        </div>
    );
}
