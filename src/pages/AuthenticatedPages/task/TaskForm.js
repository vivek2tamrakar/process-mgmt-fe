import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../../features/task/taskSlice';
import { getFolderList, getGroupList, getProcessList } from '../../../features/Group/groupslice';
import useGet from 'hooks/useGet';
import './TaskForm.css';  // Import the CSS file

const TaskForm = () => {
  const dispatch = useDispatch();
  const { mutateAsync: GroupListGet } = useGet();
  const { groupList, processList } = useSelector((state) => state.group);
  const companyId = localStorage.getItem('companyId');

  const [taskData, setTaskData] = useState({
    group: '',
    name: '',
    description: '',
    taskOwner: '',
    process: '',
    checklistRequired: false,
    startTime: '',
    endTime: '',
    duration: '',
    allDayTask: false,
    reminder: '',
    recurrencePattern: 'daily',
    recurrenceInterval: 1,
    rangeOfRecurrence: 'noEndDate',
    endDate: '',
    endAfterOccurrences: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTaskData({
      ...taskData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(taskData));
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
        dispatch(getProcessList({ processList: allProcesses }));
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

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Group</label>
        <select name="group" value={taskData.group} onChange={handleChange}>
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
        <input type="text" name="taskOwner" value={taskData.taskOwner} onChange={handleChange} />
      </div>
      <div>
        <label>Add Process</label>
        <select name="process" value={taskData.process} onChange={handleChange}>
          <option value="">Select Process</option>
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
      <div style={{display: 'flex'}}>
      <div style={{width: '100%'}}>
        <label>Start Time</label>
        <input type="time" name="startTime" value={taskData.startTime} onChange={handleChange} />
      </div>
      <div style={{width: '100%'}}>
        <label>End Time</label>
        <input type="time" name="endTime" value={taskData.endTime} onChange={handleChange} />
      </div>
      </div>
      <div>
        <label>Duration</label>
        <input type="text" name="duration" value={taskData.duration} onChange={handleChange} />
      </div>
      <div>
        <label>
          <input type="checkbox" name="allDayTask" checked={taskData.allDayTask} onChange={handleChange} />
          All Day Task
        </label>
      </div>
      <div>
        <label>Reminder</label>
        <input type="text" name="reminder" value={taskData.reminder} onChange={handleChange} />
      </div>
      <div>
        <label>Recurrence Pattern</label>
        <select name="recurrencePattern" value={taskData.recurrencePattern} onChange={handleChange}>
          <option value="daily">Daily</option>
          <option value="everyNDays">Every N days</option>
          <option value="everyWeekday">Every weekday</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      {taskData.recurrencePattern === 'everyNDays' && (
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
          <input type="date" name="endDate" value={taskData.endDate} onChange={handleChange} />
        </div>
      )}
      {taskData.rangeOfRecurrence === 'endAfterOccurrences' && (
        <div>
          <label>End After</label>
          <input type="number" name="endAfterOccurrences" value={taskData.endAfterOccurrences} onChange={handleChange} />
          <label>occurrences</label>
        </div>
      )}
      <button type="submit">OK</button>
    </form>
  );
};

export default TaskForm;