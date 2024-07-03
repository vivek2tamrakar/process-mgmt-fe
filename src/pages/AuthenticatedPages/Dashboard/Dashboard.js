import React, { useState, useEffect } from 'react';
import useGet from 'hooks/useGet';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupList, getFolderList, getProcessList } from '../../../features/Group/groupslice';
import { Content, FolderComtainer, GroupComtainer, Header, MainContainer, ProcessComtainer } from './Styled';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { groupList, folderList, processList } = useSelector((state) => state.group);
  const { mutateAsync: GroupListGet } = useGet();
  const [allGroups, setGetAllGroups] = useState(groupList);
  const [allFolders, setGetAllFolders] = useState(folderList);
  const [allProcess, setGetAllProcess] = useState(processList);

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
  console.log('allGroups', allGroups);
  return (
    <>
      <MainContainer>
        <GroupComtainer>
          <Header>
            <h3>Group</h3>
          </Header>

          <Content>
            {allGroups?.map((i) => (
              <li>{i?.name}</li>
            ))}
          </Content>
        </GroupComtainer>

        <FolderComtainer>
          <Header>
            <h3>Folder</h3>
          </Header>

          <Content>
            {allFolders?.map((i) => (
              <li>{i?.name}</li>
            ))}
          </Content>
        </FolderComtainer>

        <ProcessComtainer>
          <Header>
            <h3>Process</h3>
          </Header>

          <Content>
            {allProcess?.map((i) => (
              <li>{i?.name}</li>
            ))}
          </Content>
        </ProcessComtainer>
      </MainContainer>
    </>
  );
};

export default Dashboard;
