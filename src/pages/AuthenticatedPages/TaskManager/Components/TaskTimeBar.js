import React, { useState } from 'react';
import Style from './Style.module.css';
import { Button, Popover, Modal } from 'antd';
import { useNavigate, createSearchParams } from 'react-router-dom';
import useDelete from '../../../../hooks/useDelete';
import usePatch from '../../../../hooks/usePatch';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedProcess } from '../../../../features/process/processSlice';
import axios from 'axios';
const status = {
    '3': '#ff7c7c',
    '2': '#fbcf69',
    '1': 'red',
    '4': '#1b751e',
}
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
const { REACT_APP_DETAILS_URL } = process.env;
export default function TaskTimeBar({ data, date, id, left, fetchData }) {
    const { mutateAsync: TaskDelete } = useDelete();
    const { mutateAsync: TaskPatch } = usePatch();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [popoverVisible, setPopoverVisible] = useState(false);
    const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
    const [start, setStart] = useState();
    const [res, setRes] = useState();
    const token = localStorage.getItem('token');
    function createTask() {
        const startTime = parseInt(start);
        navigate({
            pathname: "/create-task",
            search: `?${createSearchParams({
                startTime: date + 'T' + startTime.toString().padStart(2, '0') + ':00:00',
                endTime: date + 'T' + (startTime + 1).toString().padStart(2, '0') + ':00:00',
                id
            })}`
        })
    }

    function deleteTask() {
        TaskDelete({
            url: `task/${res.id}`,
            type: 'details',
            token: true
        })
            .then((res) => {
                toast.success('Task Deleted successfully!');
                fetchData();
            })
            .catch((err) => {
                toast.error('Server Error!');
                console.error(err);
            });
    };

    function updateTask(info) {
        TaskPatch({
            url: `task`,
            type: 'details',
            payload: {
                "id":res.id,
                ...info
            },
              token: true,
        })
            .then((res) => {
                toast.success('Task Updated successfully!');
                fetchData();
            })
            .catch((err) => {
                toast.error('Server Error!');
                console.error(err);
            });
    };

    const taskDescription = () => {
        Modal.info({
            title: `${res?.name}`,
            content: (
                <div>
                    <p>{res?.description}</p>
                </div>
            ),
            onOk() { },
        });
    };

    const processById = () => {
        console.log(res)
        axios
          .get(`${REACT_APP_DETAILS_URL}process/${res.processId}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          })
          .then((info) => {
            dispatch(setSelectedProcess(info.data));
            navigate('/open-process');
          })
          .catch((error) => {
            console.error('Error while submitting form:', error);
          });
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
                    {time.map((val, index) => (<div className="placeholderbg" onMouseOver={() => setStart(val)}></div>))}
                </div>
                {data ? data.filter(val => val.width).map(res => <div className={Style.Body}>
                    <span onMouseOver={() => setRes(res)} className={Style.Task + (res.isActive ? ' tactive' : ' tinactive')} style={{ width: res.width / 60, left: res.left / 60, backgroundColor: status[res.status] }}>{res.name} </span>
                </div>) : <div className={Style.Body}>
                </div>}
            </div>
            <Popover
                content={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <Button onClick={() => taskDescription()}>View Task Description</Button>
                        <Button onClick={() => updateTask({status: 4, isActive: true})}>Complete Task</Button>
                        <Button onClick={() => processById()}>Run Checklist</Button>
                        <Button onClick={() => processById()}>View/Open Process</Button>
                        <Button onClick={() => navigate('/update-task/'+res.id)}>Assign to me</Button>
                        <Button onClick={() => navigate('/update-task/'+res.id)}>Reassign</Button>
                        <Button onClick={() => navigate('/update-task/'+res.id)}>Edit Task</Button>
                        {/* <Button onClick={() => createTask()}>Add Task</Button> */}
                        <Button onClick={() => deleteTask()}>Delete Task</Button>
                        <Button onClick={() => updateTask({status: res.status, isActive: false})}>Disable Task</Button>
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
