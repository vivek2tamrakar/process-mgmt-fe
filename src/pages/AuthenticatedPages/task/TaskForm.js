import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../../features/task/taskSlice';
import { getUserList } from '../../../features/User/userslice';
import { getFolderList, getGroupList } from '../../../features/Group/groupslice';
import useGet from 'hooks/useGet';
import usePatch from 'hooks/usePatch';
import { DatePicker, Select, Button } from 'antd';
import dayjs from 'dayjs';
import './TaskForm.css';  // Import the CSS file
import * as moment from 'moment';
import { toast } from 'react-hot-toast';
// Convert Local Time to UTC
function localToUTC(localDateString) {
  // Parse the local time string with moment
  const localTime = moment(localDateString).local();

  // Convert to UTC
  const utcTime = localTime.utc().format('YYYY-MM-DDTHH:mm:ss');

  return utcTime;
}

// Convert UTC to Local Time
function utcToLocal(utcDateString) {
  // Parse the UTC time string with moment
  const utcTime = moment.utc(utcDateString);

  // Convert to local time
  const localTime = utcTime.local().format('YYYY-MM-DDTHH:mm:ss');

  return localTime;
}
const TaskForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutateAsync: TaskPatch } = usePatch();
  const params = useParams();
  const [processList, setProcessList] = useState([])
  const { mutateAsync: UserListGet } = useGet();
  const { mutateAsync: TaskByIdGet } = useGet();
  const { mutateAsync: GroupListGet } = useGet();
  const { mutateAsync: ProcessListGet } = useGet();
  const { userList } = useSelector((state) => state.user);
  const [allUsers, setAllUsers] = useState(userList.map(val => ({ value: val?.id, label: val?.email })));
  const { groupList } = useSelector((state) => state.group);
  const companyId = localStorage.getItem('companyId');
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id") || "";
  const startTime = searchParams.get("startTime") || "";
  const endTime = searchParams.get("endTime") || "";
  const [taskData, setTaskData] = useState({
    groupId: id,
    name: '',
    description: '',
    userId: [],
    createdId: companyId,
    processId: undefined,
    checklistRequired: false,
    startDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    endDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    duration: 0,
    isProcess: false,
    isDayTask: false,
    remainder: '',
    recurrenType: 'day',
    recurrenceInterval: 1,
    recurrenEndDate: '',
    rangeOfRecurrence: 'noEndDate',
    endAfterOccurrences: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let changedData = {};
    if (name === 'groupId') {
      changedData = {
        userId: [],
        processList: []
      }
    }
    setTaskData({
      ...taskData,
      [name]: type === 'checkbox' ? checked : value,
      ...changedData
    });
  };

  function fetchProcessData() {
    TaskByIdGet({
      url: `task/id/${params.id}`,
      type: 'details',
      token: true
    })
      .then((res) => {
        setTaskData({...res, startDate: res?.startDate ? utcToLocal(res?.startDate) : undefined, endDate: res?.endDate ? utcToLocal(res?.endDate) : undefined });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    if (params.id) {
      fetchProcessData();
    }
  }, [])

  useEffect(() => {
    const startDate = taskData.startDate;
    const endDate = taskData.endDate;
    const duration = ((moment(endDate).valueOf() - moment(startDate).valueOf()) / (1000 * 60));
    handleChange({ target: { name: 'duration', value: duration, type: 'number' } })
  }, [taskData.startDate, taskData.endDate])

  const fetchUserData = () => {
    UserListGet({
      url: `assign/group-id/${taskData.groupId}`,
      type: 'details',
      token: true
    })
      .then((res) => {
        console.log(res)
        dispatch(getUserList({ userList: res.map(val => val.user) }));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (params.id) {
      updateTask();
    } else {
      dispatch(addTask({
        ...taskData, startDate: taskData?.startDate ? localToUTC(taskData?.startDate) : undefined,
        endDate: taskData?.endDate ? localToUTC(taskData?.endDate) : undefined,
      }));
    }
    navigate('/task-manager')
  };

  function updateTask() {
    TaskPatch({
      url: `task`,
      type: 'details',
      payload: {
        "id": params.id,
        ...taskData,
        startDate: taskData?.startDate ? localToUTC(taskData?.startDate) : undefined,
        endDate: taskData?.endDate ? localToUTC(taskData?.endDate) : undefined,
      },
      token: true,
    })
      .then((res) => {
        toast.success('Task Updated successfully!');

      })
      .catch((err) => {
        toast.error('Server Error!');
        console.error(err);
      });
  };

  const fetchData = () => {
    GroupListGet({
      url: 'group/list/' + companyId,
      type: 'details',
      token: true,
    })
      .then((res) => {
        const allGroups = [...(res?.group || []), ...(res?.assignGroup || [])];
        const allFolder = [...(res?.folder || []), ...(res?.assignFolder || [])];
        const allProcesses = [...(res?.process || []), ...(res?.assignProcess || [])];
        dispatch(getGroupList({ groupList: allGroups }));
        dispatch(getFolderList({ folderList: allFolder }));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  function getProcessByGroup(id) {
    ProcessListGet({
      url: 'process/groups/'+id,
      type: 'details',
      token: true,
    }).then((res) => {
      console.log(res)
      setProcessList(res)
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }

  useEffect(() => {
    if (taskData.groupId) {
      fetchUserData();
      getProcessByGroup(taskData.groupId)
    }
  }, [taskData.groupId]);

  useEffect(() => {
    console.log(userList)
    setAllUsers(userList.map(val => ({ value: val?.id, label: val?.email })));
  }, [userList]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Group</label>
        <select name="groupId" value={taskData.groupId} onChange={handleChange} disabled={id != ""}>
          <option value="">Select Group</option>
          {groupList.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Task Name</label>
        <input type="text" name="name" value={taskData.name} onChange={handleChange} />
      </div>
      <div>
        <label>Task Description</label>
        <input type="text" name="description" value={taskData.description} onChange={handleChange} />
      </div>
      <div>
        <label>Task Owner</label>
        {/* <input type="text" name="taskOwner" value={taskData.taskOwner} onChange={handleChange} /> */}
        <Select
          mode="multiple"
          allowClear
          name="userId"
          style={{
            width: '100%',
          }}
          value={taskData.userId}
          placeholder="Please select"
          defaultValue={[]}
          onChange={(value) => {
            handleChange({ target: { name: 'userId', value, type: 'text' } })
          }}
          options={allUsers}
        />
      </div>
      <div>
        <label>Add Process</label>
        <select name="processId" value={taskData.processId} onChange={handleChange}>
          <option value={undefined}>Select Process</option>
          {processList.map((process) => (
            <option key={process.id} value={process.id}>
              {process.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>
          <input type="checkbox" name="checklistRequired" checked={taskData.checklistRequired} onChange={handleChange} />
          Checklist Required
        </label>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '100%', display: startTime == "" ? 'block' : 'none' }} >
          <label>Start Time</label>
          <DatePicker
            showTime
            value={dayjs(taskData?.startDate, 'YYYY-MM-DD HH:mm:ss')}
            onChange={(value, dateString) => {
              handleChange({ target: { name: 'startDate', value: dateString, type: 'date' } })
            }}
          />
          {/* <input type="datetime-local" name="startTime" value={taskData.startDate} onChange={handleChange} /> */}
        </div>
        <div style={{ width: '100%', display: endTime == "" ? 'block' : 'none' }}>
          <label>End Time</label>
          <DatePicker
            showTime
            value={dayjs(taskData?.endDate, 'YYYY-MM-DD HH:mm:ss')}
            onChange={(value, dateString) => {
              handleChange({ target: { name: 'endDate', value: dateString, type: 'date' } })
            }}
          />
          {/* <input type="datetime-local" name="endTime" value={taskData.endDate} onChange={handleChange} /> */}
        </div>
      </div>
      <div>
        <label>Duration</label>
        <input type="number" name="duration" value={taskData.duration} onChange={handleChange} readOnly />
      </div>
      <div>
        <label>
          <input type="checkbox" name="isDayTask" checked={taskData.isDayTask} onChange={handleChange} />
          All Day Task
        </label>
      </div>
      <div>
        <label>Reminder</label>
        <input type="number" name="remainder" value={taskData.remainder} onChange={handleChange} />
      </div>
      <div>
        <label>Recurrence Pattern</label>
        <select name="recurrenType" value={taskData.recurrenType} onChange={handleChange}>
          <option value="day">Daily</option>
          <option value="everyNDays">Every N days</option>
          <option value="everyWeekday">Every weekday</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      {taskData.recurrenType === 'everyNDays' && (
        <div>
          <label>Every</label>
          <input type="number" name="recurrenceInterval" value={taskData.recurrenceInterval} onChange={handleChange} />
          <label>days</label>
        </div>
      )}
      <div>
        <label>Range of Recurrence</label>
        <select name="rangeOfRecurrence" value={taskData.rangeOfRecurrence} onChange={handleChange}>
          <option value="noEndDate">No end date</option>
          <option value="endAfterOccurrences">End after N occurrences</option>
          <option value="endByDate">End by date</option>
        </select>
      </div>
      {taskData.rangeOfRecurrence === 'endByDate' && (
        <div>
          <label>End Date</label>
          <input type="date" name="recurrenEndDate" value={taskData.recurrenEndDate} onChange={handleChange} />
        </div>
      )}
      {taskData.rangeOfRecurrence === 'endAfterOccurrences' && (
        <div>
          <label>End After</label>
          <input type="number" name="endAfterOccurrences" value={taskData.endAfterOccurrences} onChange={handleChange} />
          <label>occurrences</label>
        </div>
      )}
      <Button onClick={() => navigate('/task-manager')} className="cancel">Cancel</Button>
      <button type="submit">OK</button>
    </form>
  );
};

export default TaskForm;