import React, { useState, useEffect } from 'react';
import useGet from 'hooks/useGet';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupList, getFolderList, getProcessList } from '../../../features/Group/groupslice';
import { GroupContainerDashboard, Header, ContainerDashboard, Groups } from './Styled';
import {
  NodeCollapseOutlined,
  GroupOutlined,
  FolderOpenOutlined,
  FolderOutlined,
  NodeExpandOutlined,
  UngroupOutlined
} from '@ant-design/icons';
const Dashboard = () => {
  const dispatch = useDispatch();
  const { groupList, folderList, processList } = useSelector((state) => state.group);
  const { mutateAsync: GroupListGet } = useGet();
  const [allGroups, setGetAllGroups] = useState(groupList);
  const [allFolders, setGetAllFolders] = useState(folderList);
  const [allProcess, setGetAllProcess] = useState(processList);
  const [open, setOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState({ id: '', name: '' });
  // const [selectedView, setSelectedView] = useState(null);

  const fetchData = () => {
    GroupListGet({
      url: 'group/list',
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

  // const handleViewChange = (view) => {
  //   setSelectedView(view);
  // };
  const handleOpen = (id, name) => {
    setSelectedGroup({ id, name });
    setOpen(true);
  };
  // const handleClose = () => setOpen(false);

  const [openFolderProcess, setOpenFolderProcess] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState({ id: '', name: '' });

  const handleOpenFolder = (id, name) => {
    setSelectedFolder({ id, name });
    setOpenFolderProcess(true);
  };
  // const handleCloseFolderProcess = () => setOpenFolderProcess(false);

  return (
    <>
      <ContainerDashboard>
        <Header>
          <h2>Groups</h2>
        </Header>
        <GroupContainerDashboard>
          {allGroups?.map((item) => (
            <Groups className="ok">
              <p>{item.name}</p>
              <button onClick={() => handleOpen(item.id, item.name)}>Assign Member</button>
            </Groups>
          ))}
        </GroupContainerDashboard>
        <Header>
          <h2>Folder</h2>
        </Header>
        <GroupContainerDashboard>
          {allFolders?.map((item) => (
            <Groups className="ok">
              <p>{item.name}</p>
              <button onClick={() => handleOpenFolder(item.id, item.name)}>Add Process</button>
            </Groups>
          ))}
        </GroupContainerDashboard>
        <Header>
          <h2>Process</h2>
        </Header>
        <GroupContainerDashboard>
          {allProcess?.map((item) => (
            <Groups className="ok">
              <p>{item.name}</p>
            </Groups>
          ))}
        </GroupContainerDashboard>
      </ContainerDashboard>
    </>
  );
};

export default Dashboard;
