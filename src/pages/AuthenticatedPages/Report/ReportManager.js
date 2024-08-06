
import React, { useState, useEffect } from 'react';
import Report from "./Components/Report";
import Style from "./Components/Style.module.css"
import { Calendar, TreeSelect, Table } from 'antd';
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
function calculateAge(timestamp) {
    if (!timestamp) {
        return ""
    }
    // Convert the timestamp to a Date object
    const old = new Date(timestamp * 1000);
    const now = new Date();

    // Calculate the difference in milliseconds
    const diffInMilliseconds = now - old;

    // Calculate the difference in days, hours, and minutes
    const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

    return `${days} days, ${hours} hours, and ${minutes} minutes`
}
function getStatus(status) {
    if (status === 1)
        return <div className='st-overdue'>Review Overdue</div>
    if (status === 2)
        return <div className='st-inprogress'>Review Inprogress</div>
    if (status === 3)
        return <div className='st-open'>Review Open</div>
    if (status === 4)
        return <div className='st-completed'>Review Complete</div>
}

const columns = [
    {
        title: 'Group',
        dataIndex: 'groupName',
        key: 'groupName',
    },
    {
        title: 'Process Name',
        dataIndex: 'processName',
        key: 'processName',
        render: (text) => <a style={{ textDecoration: 'underline' }}>{text}</a>,
    },
    {
        title: 'Date Created',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (text) => <span>{text.split('T')[0]} {text.split('T')[1].substring(0, 8)}</span>,
    },
    {
        title: 'Last Update',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: (text) => <span>{text.split('T')[0]} {text.split('T')[1].substring(0, 8)}</span>,
    },
    {
        title: 'Last Review',
        dataIndex: 'review',
        key: 'review',
    },
    {
        title: 'Age (days)',
        dataIndex: 'startTimestamp',
        key: 'startTimestamp',
        render: (text) => {
            return <span>{calculateAge(text)}</span>
        },
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (_, { status }) => (
            <>
                {
                    getStatus(status)
                }
            </>
        ),
        // render: (text) => <div style={{color: 'red'}}>{text}</div>,
    },
];

export default function TaskManager() {
    const currentTime = new Date().getTime() / 1000;
    const { mutateAsync: TaskListGet } = useGet();
    const companyId = localStorage.getItem('companyId');
    const [tree, setTree] = useState([]);
    const [task, setTask] = useState([]);
    const { groupList, folderList, processList } = useSelector((state) => state.group);
    const [value, setValue] = useState([]);
    const [left, setLeft] = useState(0);
    const [date, setDate] = useState(getCurrentDate());
    const [view, setView] = useState('List');
    const [loading, setLoading] = useState(false);
    const [scheduleType, setScheduleType] = useState('week');

    const fetchData = () => {
        const currentTime7 = new Date(date + 'T07:00:00.000Z').getTime() / 1000;
        const currentTime18 = new Date(date + 'T19:00:00.000Z').getTime() / 1000;
        TaskListGet({
            url: 'task/' + companyId,
            type: 'details',
            token: true
        })
            .then((res) => {

                let result = res.reduce((acc, item) => {
                    const startTimestamp = new Date(item.startDate).getTime() / 1000;
                    const endTimestamp = new Date(item.endDate).getTime() / 1000;
                    const key = `${item.group.id}$$${item.group.name}`;
                    console.log(key, acc[key])
                    let width = 0;
                    let left = 0;
                    let startTime = item.startDate?.split('T')[1].split('.')[0];
                    let endTime = item.endDate?.split('T')[1].split('.')[0];
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
                    if (startTimestamp < currentTime18 && width != 0) {
                        if (!acc[key]) {
                            acc[key] = [{ ...item, groupName: item?.group?.name, processName: item?.process?.name, startTimestamp, endTimestamp, width, currentTime7, currentTime18, currentTime, left, startTime, endTime }]
                        }
                        else {
                            acc[key].push({ ...item, groupName: item?.group?.name, processName: item?.process?.name, startTimestamp, endTimestamp, width, currentTime7, currentTime18, currentTime, left, startTime, endTime })
                        }
                    }
                    return acc;
                }, {});
                setTask(result);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false)
                console.error('Error fetching data:', error);
            });
    };


    const onChange = (newValue) => {
        setValue(newValue);
    };

    const onDateChange = (newValue) => {
        setDate(newValue.format('YYYY-MM-DD'));
    };

    function convertToTree(data) {
        let returnData = data?.map(group => ({
            value: `${group.id}$$${group.name}`,
            title: group.name,
            children: group.folder?.map(folder => ({
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
    }, [date, scheduleType]);

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

    function viewSelection(type) {
        if (type === 'Intraday') {
            return <div className='title-info'>
                <strong>Task Manager Report - Intraday</strong>
                <strong>Intraday Time - 13:00</strong>
            </div>
        }
        else if (type === 'EndOfDay') {
            return <div className='title-info'>
                <strong>Task Manager Report - End of Day</strong>
                <strong>End of Day Time - 18:00</strong>
            </div>
        }
        else if (type === 'List') {
            return <h2>Task Manager Report</h2>
        }
    }

    return (
        <>
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: 20 }}>
                        {viewSelection(view)}
                        <div style={{ display: 'flex', gap: 20 }}>
                            <div className='view' onClick={() => setView('List')}>List View</div>
                            <div className='view' onClick={() => setView('Intraday')}>Intraday View</div>
                            <div className='view' onClick={() => setView('EndOfDay')}>End Of Day View</div>
                        </div>
                    </div>
                    {(view === 'Intraday' || view === 'EndOfDay') && <div className={Style.TaskManager}>
                        {!loading && <Report value={value} date={date} task={task} type={scheduleType}></Report>}
                    </div>}
                    {view === 'List' && <div className={Style.TaskManager}>
                        {value.map((data, index) => <Table dataSource={task[data]} columns={columns} className="table" />)}
                    </div>}
                </div>
            </div>
        </>
    )
}