import React, {useState} from 'react';
import Style from './Style.module.css';
import { Button, Popover } from 'antd';
import { useNavigate, createSearchParams } from 'react-router-dom';
export default function TaskTimeBar({ data, date, id }) {

    const time = [
        {
            time: '07:00'
        },
        {
            time: '08:00'
        },
        {
            time: '09:00'
        },
        {
            time: '10:00'
        },
        {
            time: '11:00'
        },
        {
            time: '12:00'
        },
        {
            time: '13:00',
        },
        {
            time: '14:00'
        },
        {
            time: '15:00'
        },
        {
            time: '16:00'
        },
        {
            time: '17:00'
        },
        {
            time: '18:00'
        }
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
                startTime: date+'T'+startTime.toString().padStart(2, '0')+':00:00.000Z',
                endTime: date+'T'+(startTime+1).toString().padStart(2, '0')+':00:00.000Z',
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
        <div id='timer' style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }} onContextMenu={handleDashboardRightClick}>
            <div className={Style.Timer}>
                {time.map((val) => (<div className={Style.Header}>{val.time}</div>))}
            </div>
            <div className='timeentry'>
                <div style={{ position: 'absolute', width: '100%', height: data ? (data.filter(val => val.width).length * 36 || 36) : 36, display: 'flex' }}>
                    {time.map((val, index) => (<div className="placeholderbg" onMouseOver={()=> setStart(val.time)}></div>))}
                </div>
                {data ? data.filter(val => val.width).map(res => <div className={Style.Body}>
                    <span className={Style.Task} style={{ width: res.width / 60, left: res.left / 60 }}>{res.name} </span>
                </div>) : <div className={Style.Body}>
                </div>}
            </div>
            <Popover
                content={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <Button onClick={() => createTask()}>Add Task</Button>
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
