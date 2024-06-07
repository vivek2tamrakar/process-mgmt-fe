import React, { useEffect, useState } from 'react';
import useGet from 'hooks/useGet';
import AddMemberModal from './AddMemberModal';
import { Container, Groups, Header, GroupContainer } from '../dashboard/DashboardStyle';
import { useDispatch, useSelector } from 'react-redux';
import { GetGroupList } from '../../constants/api';
import { getGroupList, getFolderList, getProcessList } from 'store/reducers/group';
import AddFolderProcess from './AddFolderProcess';

const DashboardDefault = () => {
  const { mutateAsync: UserListGet } = useGet();
  const { groupList, folderList, processList } = useSelector((state) => state.group);
  const [userList, setUserList] = useState(groupList);
  const [folderData, setFolderData] = useState(folderList);
  const [processData, setProcessData] = useState(processList);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState({ id: '', name: '' });

  const handleOpen = (id, name) => {
    setSelectedGroup({ id, name });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [openFolderProcess, setOpenFolderProcess] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState({ id: '', name: '' });

  const handleOpenFolder = (id, name) => {
    setSelectedFolder({ id, name });
    setOpenFolderProcess(true);
  };
  const handleCloseFolderProcess = () => setOpenFolderProcess(false);

  const fetchData = () => {
    UserListGet({
      url: GetGroupList,
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
    setUserList(groupList);
    setFolderData(folderList);
    setProcessData(processList);
  }, [groupList, folderList, processList]);
  return (
    <>
      <Container>
        <Header>
          <h2>Groups</h2>
        </Header>
        <GroupContainer>
          {userList?.map((item) => (
            <Groups className="ok">
              <p>{item.name}</p>
              <button onClick={() => handleOpen(item.id, item.name)}>Assign Member</button>
            </Groups>
          ))}
          <Header>
            <h2>Folder</h2>
          </Header>
          {folderData?.map((item) => (
            <Groups className="ok">
              <p>{item.name}</p>
              <button onClick={() => handleOpenFolder(item.id, item.name)}>Add Process</button>
            </Groups>
          ))}
          <Header>
            <h2>Process</h2>
          </Header>
          {processData?.map((item) => (
            <Groups className="ok">
              <p>{item.name}</p>
            </Groups>
          ))}
        </GroupContainer>
      </Container>
      <AddMemberModal open={open} handleClose={handleClose} group={selectedGroup} />
      <AddFolderProcess open={openFolderProcess} handleClose={handleCloseFolderProcess} folder={selectedFolder} />
    </>
  );
};

export default DashboardDefault;
