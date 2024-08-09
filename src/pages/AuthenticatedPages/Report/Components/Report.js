import React from 'react';
import ReportTimeBar from './ReportTimeBar'
import Style from './Style.module.css';
const Report = ({ value, date, task, type, left }) => {

    return (
        <div>
            {value.map((data, index) => (<><div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', flexDirection: 'Column' }}>
                    <div className={Style.GroupName}>{data.split('$$')[1]}</div>
                    <div className={Style.Owner} >Shared</div>
                </div>
                {type === 'week' && <ReportTimeBar data={task[data]} date={date} left={left} id={data.split('$$')[0]}></ReportTimeBar>}
            </div> <br /><br /></>))}
        </div>
    );
};

export default Report
