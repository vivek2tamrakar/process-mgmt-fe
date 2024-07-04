import React, { useState, useEffect } from 'react';
import useGet from 'hooks/useGet';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupList, getFolderList, getProcessList } from '../../../features/Group/groupslice';
import { Content, FolderComtainer, GroupComtainer, Header, MainContainer, ProcessComtainer } from './Styled';
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
  const [selectedView, setSelectedView] = useState(null);

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

  const handleViewChange = (view) => {
    setSelectedView(view);
  };

  return (
    <>
      <MainContainer>
        <GroupComtainer>
          <Header>
            {selectedView === 'groups' ? <UngroupOutlined /> : <GroupOutlined />}

            <span>Groups</span>
            {allGroups?.length}
          </Header>

          <Content onClick={() => handleViewChange('groups')}>Details</Content>
        </GroupComtainer>

        <GroupComtainer>
          <Header>
            {selectedView === 'folders' ? <FolderOpenOutlined /> : <FolderOutlined />}

            <span>Folders</span>
            {allFolders?.length}
          </Header>
          <Content onClick={() => handleViewChange('folders')}>Details</Content>
        </GroupComtainer>

        <GroupComtainer>
          <Header>
            {selectedView === 'processes' ? <NodeExpandOutlined /> : <NodeCollapseOutlined />}

            <span>Process</span>
            {allProcess?.length}
          </Header>
          <Content onClick={() => handleViewChange('processes')}>Details</Content>
        </GroupComtainer>
      </MainContainer>
      {selectedView === 'groups' && (
        <>
          <h3>Groups</h3>
          {allGroups.map((i) => (
            <div key={i.id}>{i.name}</div>
          ))}
        </>
      )}
      {selectedView === 'folders' && (
        <>
          <h3>Folders</h3>
          {allFolders.map((i) => (
            <div key={i.id}>{i.name}</div>
          ))}
        </>
      )}
      {selectedView === 'processes' && (
        <>
          <h3>Processes</h3>
          {allProcess.map((i) => (
            <div key={i.id}>{i.name}</div>
          ))}
        </>
      )}
    </>
  );
};

export default Dashboard;
