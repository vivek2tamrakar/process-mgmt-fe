
import React, { useState, useEffect } from 'react';
import TaskScheduler from "./Components/TaskScheduler";
import Style from "./Components/Style.module.css"
import { Calendar, TreeSelect } from 'antd';
import useGet from 'hooks/useGet';
import { useDispatch, useSelector } from 'react-redux';
import './Components/style.css';
const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};
const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
};
export default function TaskManager() {
    const currentTime = new Date().getTime() / 1000;
    const { mutateAsync: TaskListGet } = useGet();
    const companyId = localStorage.getItem('companyId');
    const [tree, setTree] = useState([]);
    const [task, setTask] = useState([]);
    const { groupList, folderList, processList } = useSelector((state) => state.group);
    const fetchData = () => {

        const currentTime7 = new Date(date + 'T07:00:00.000Z').getTime() / 1000;
        const currentTime18 = new Date(date + 'T19:00:00.000Z').getTime() / 1000;
        TaskListGet({
            url: 'task/' + companyId,
            type: 'details',
            token: true
        })
            .then((res) => {
                const result = res.reduce((acc, item) => {
                    const startTimestamp = new Date(item.startDate).getTime() / 1000;
                    const endTimestamp = new Date(item.endDate).getTime() / 1000;
                    const key = `${item.group.id}$$${item.group.name}`;
                    console.log(key, acc[key])
                    let width = 0;
                    let left = 0;
                    if (startTimestamp >= currentTime7 && endTimestamp <= currentTime18) {
                        width = endTimestamp - startTimestamp;
                        left = startTimestamp - currentTime7;
                    }
                    else if (startTimestamp < currentTime7 && endTimestamp >= currentTime7 && endTimestamp <= currentTime18) {
                        width = endTimestamp - currentTime7;
                    }
                    else if (startTimestamp >= currentTime7 && endTimestamp >= currentTime18) {
                        width = currentTime18 - startTimestamp;
                        left = startTimestamp - currentTime7;
                    }
                    if (startTimestamp < currentTime18) {
                        if (!acc[key]) {
                            acc[key] = [{ ...item, startTimestamp, endTimestamp, width, currentTime7, currentTime18, currentTime, left }]
                        }
                        else {
                            acc[key].push({ ...item, startTimestamp, endTimestamp, width, currentTime7, currentTime18, currentTime, left })
                        }
                    }
                    return acc;
                }, {});
                console.log(res)
                setTask(result)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const [value, setValue] = useState([]);
    const [left, setLeft] = useState(0);
    const [date, setDate] = useState(getCurrentDate());

    const onChange = (newValue) => {
        setValue(newValue);
    };

    const onDateChange = (newValue) => {
        setDate(newValue.format('YYYY-MM-DD'));
    };

    function convertToTree(data) {
        let returnData = data.map(group => ({
            value: `${group.id}$$${group.name}`,
            title: group.name,
            children: group.folder.map(folder => ({
                value: `${folder.id}$$${folder.name}`,
                title: folder.name
            }))
        }));
        console.log(returnData)
        return returnData;
    }
    useEffect(() => {
        const element = document.getElementById('timer');
        const currentTime7 = new Date(date + 'T07:00:00.000Z').getTime() / 1000;
        const currentTime18 = new Date(date + 'T19:00:00.000Z').getTime() / 1000;
        if (element) {
            let val = 0;
            if (currentTime > currentTime7 && currentTime <= currentTime18) {
                val = ((currentTime - currentTime7) / 60)
            }
            const { left } = element.getBoundingClientRect();
            setLeft(left + val)
        }
        fetchData();
    }, [date]);

    useEffect(() => {
        setTree(convertToTree(groupList), [])
    }, [groupList]);

    const wrapperStyle = {
        width: 250,
        border: `1px solid`,
        borderRadius: 10,
        position: 'fixed',
        bottom: 10,
        left: 20
    };

    return (
        <>
            <div className='line' style={{ position: 'absolute', zIndex: 999, left }}></div>
            <div style={{ display: 'flex' }}>
                <div className='sidebar'>
                    <label style={{ color: '#fff', marginTop: 20 }}>Select Group</label>
                    <TreeSelect
                        showSearch
                        style={{ width: '100%', marginTop: 20 }}
                        value={value}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder="Please select"
                        allowClear
                        multiple
                        treeDefaultExpandAll
                        onChange={onChange}
                        treeData={tree}
                    />
                    <div style={wrapperStyle}>
                        <Calendar fullscreen={false} onPanelChange={onPanelChange} onChange={onDateChange} />
                    </div>
                </div>
                <div>
                    <div className={Style.TaskManager}>
                        <TaskScheduler value={value} date={date} task={task}></TaskScheduler>
                    </div>
                    <div className={Style.TaskScheduleType}>
                        <div className={Style.selected}>Week</div>
                        <div>Next 7 days</div>
                        <div>Work Week</div>
                        <div>Month</div>
                        <div>Schedule</div>
                        <div>Board</div>
                    </div>
                </div>
            </div>
        </>
    )
}