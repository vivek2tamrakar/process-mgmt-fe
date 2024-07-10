// import React, { useState, useEffect } from 'react';
// import useGet from 'hooks/useGet';
// import { useDispatch, useSelector } from 'react-redux';
// import { getGroupList, getFolderList, getProcessList } from '../../../features/Group/groupslice';
// import { GroupContainerDashboard, Header, ContainerDashboard, Groups } from './Styled';
// const truncateName = (name) => {
//   if (name.length > 10) {
//     return name.substring(0, 10) + '...';
//   }
//   return name;
// };
// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const { groupList, folderList, processList } = useSelector((state) => state.group);
//   const { mutateAsync: GroupListGet } = useGet();
//   const [allGroups, setGetAllGroups] = useState(groupList);
//   const [allFolders, setGetAllFolders] = useState(folderList);
//   const [allProcess, setGetAllProcess] = useState(processList);

//   const fetchData = () => {
//     GroupListGet({
//       url: 'group/home',
//       type: 'details',
//       token: true
//     })
//       .then((res) => {
//         dispatch(getGroupList({ groupList: res?.group }));
//         dispatch(getFolderList({ folderList: res?.folder }));
//         dispatch(getProcessList({ processList: res?.process }));
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     setGetAllGroups(groupList);
//     setGetAllFolders(folderList);
//     setGetAllProcess(processList);
//   }, [groupList, folderList, processList]);

//   return (
//     <>
//       <ContainerDashboard>
//         <Header>
//           <h2>Groups</h2>
//         </Header>
//         <GroupContainerDashboard>
//           {allGroups?.map((item) => (
//             <Groups className="ok">
//               <p>{truncateName(item.name)}</p>
//             </Groups>
//           ))}
//         </GroupContainerDashboard>
//         <Header>
//           <h2>Folder</h2>
//         </Header>
//         <GroupContainerDashboard>
//           {allFolders?.map((item) => (
//             <Groups className="ok">
//               <p>{truncateName(item.name)}</p>
//             </Groups>
//           ))}
//         </GroupContainerDashboard>
//         <Header>
//           <h2>Process</h2>
//         </Header>
//         <GroupContainerDashboard>
//           {allProcess?.map((item) => (
//             <Groups className="ok">
//               <p>{truncateName(item.name)}</p>
//             </Groups>
//           ))}
//         </GroupContainerDashboard>
//       </ContainerDashboard>
//     </>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import { Button, Popover } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CommonModal from '../../../components/CommonModal/CommonModal';
import useGet from 'hooks/useGet';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupList, getFolderList, getProcessList } from '../../../features/Group/groupslice';
import { GroupContainerDashboard, Header, ContainerDashboard, Groups } from './Styled';

const truncateName = (name) => {
  if (name.length > 10) {
    return name.substring(0, 10) + '...';
  }
  return name;
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const { groupList, folderList, processList } = useSelector((state) => state.group);
  const { mutateAsync: GroupListGet } = useGet();
  const [allGroups, setGetAllGroups] = useState(groupList);
  const [allFolders, setGetAllFolders] = useState(folderList);
  const [allProcess, setGetAllProcess] = useState(processList);

  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const companyId = localStorage.getItem('companyId');
  console.log('LoggedInData',companyId)
  const fetchData = () => {
    GroupListGet({
      url: 'group/home/'+companyId,
      type: 'details',
      token: true
    })
      .then((res) => {
        dispatch(getGroupList({ groupList: res?.group }));
        dispatch(getFolderList({ folderList: res?.folder }));
        dispatch(getProcessList({ processList: res?.process }));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setGetAllGroups(groupList);
    setGetAllFolders(folderList);
    setGetAllProcess(processList);
  }, [groupList, folderList, processList]);

  const handleDashboardRightClick = (e) => {
    e.preventDefault();
    setPopoverPosition({ top: e.clientY, left: e.clientX });
    setPopoverVisible(true);
  };

  const showModal = (title) => {
    setModalTitle(title);
    setIsModalOpen(true);
    setPopoverVisible(false);
  };

  return (
    <>
      <ContainerDashboard onContextMenu={handleDashboardRightClick}>
        <Header>
          <h2>Groups</h2>
        </Header>
        <GroupContainerDashboard>
          {allGroups?.map((item) => (
            <Groups key={item.id} className="ok">
              <p>{truncateName(item.name)}</p>
            </Groups>
          ))}
        </GroupContainerDashboard>
        <Header>
          <h2>Folder</h2>
        </Header>
        <GroupContainerDashboard>
          {allFolders?.map((item) => (
            <Groups key={item.id} className="ok">
              <p>{truncateName(item.name)}</p>
            </Groups>
          ))}
        </GroupContainerDashboard>
        <Header>
          <h2>Process</h2>
        </Header>
        <GroupContainerDashboard>
          {allProcess?.map((item) => (
            <Groups key={item.id} className="ok">
              <p>{truncateName(item.name)}</p>
            </Groups>
          ))}
        </GroupContainerDashboard>

        <Popover
          content={
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <Button onClick={() => showModal('Group')}>New Group</Button>
              <Button onClick={() => showModal('Folder')}>New Folder</Button>
              <Button onClick={() => showModal('Process')}>New Process</Button>
            </div>
          }
          trigger="click"
          visible={popoverVisible}
          onVisibleChange={setPopoverVisible}
          placement="topLeft"
          overlayStyle={{
            position: 'absolute',
            top: popoverPosition.top,
            left: popoverPosition.left
          }}
        >
          <div style={{ display: 'none' }} />
        </Popover>
        <CommonModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title={modalTitle} fetchData={fetchData} />
      </ContainerDashboard>
    </>
  );
};

export default Dashboard;
