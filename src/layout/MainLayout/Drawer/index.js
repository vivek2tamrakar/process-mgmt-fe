import React, { useState } from 'react';
import { Container, LogoContainer, RoutesContainer, Route, SelectedRoute, AddTaskBox } from './Styled';
import usePost from 'hooks/usePost';
import AddTaskModal from 'pages/AddTaskModal/AddGroupModal';
import AddTaskOptions from 'pages/AddTaskModal/AddTaskOptions';
import { Link, useLocation } from 'react-router-dom';
import useGet from 'hooks/useGet';
import { getGroupList } from 'store/reducers/group';
import { useDispatch } from 'react-redux';
import { AddGroupData, GetGroupList } from '../../../constants/api';
import AddFolderModal from 'pages/AddTaskModal/AddFolderModal';
import AddProcessModal from 'pages/AddTaskModal/AddProcessModal';

const MainDrawer = () => {
  const [option, setOption] = useState(false);
  const [open, setOpen] = useState(false); //state for open group modal
  const [openFolder, setOpenFolder] = useState(false); //state for open folder modal
  const [openProcess, setOpenProcess] = useState(false); //state for open process modal
  const [groupName, setGroupName] = useState(''); //state for set group name value

  const { pathname } = useLocation(); // Hook to get the current route
  const { mutateAsync: AddGroup } = usePost();
  const { mutateAsync: UserListGet } = useGet();
  const dispatch = useDispatch();

  //open and close group modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //open and close folder modal
  const handleOpenFolder = () => setOpenFolder(true);
  const handleCloseFolder = () => setOpenFolder(false);

  //open and close process modal
  const handleOpenProcess = () => setOpenProcess(true);
  const handleCloseProcess = () => setOpenProcess(false);

  // function for add groups
  const handleSubmit = () => {
    const payload = { name: groupName };
    AddGroup({
      url: AddGroupData,
      type: 'details',
      payload: payload,
      token: true,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then((res) => {
        setGroupName('');
        fetchData();
        handleClose();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const fetchData = () => {
    UserListGet({
      url: GetGroupList,
      type: 'details',
      token: true
    })
      .then((res) => {
        dispatch(getGroupList({ groupList: res?.group }));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <>
      <Container className="erer">
        <LogoContainer>
          <p>Project Management</p>
        </LogoContainer>
        <RoutesContainer>
          <Link to="/">
            <Route isSelected={pathname === '/'}>
              <p>Dashboard</p>
            </Route>
          </Link>
          <Link to="/users">
            <Route isSelected={pathname === '/users'}>
              <p>Users</p>
            </Route>
          </Link>
        </RoutesContainer>
        <AddTaskBox>
          <AddTaskOptions
            setOption={setOption}
            option={option}
            handleOpen={handleOpen}
            handleOpenFolder={handleOpenFolder}
            handleOpenProcess={handleOpenProcess}
          />
          <AddTaskModal
            open={open}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            groupName={groupName}
            setGroupName={setGroupName}
          />
          <AddFolderModal open={openFolder} handleClose={handleCloseFolder} />
          <AddProcessModal open={openProcess} handleClose={handleCloseProcess} />
        </AddTaskBox>
      </Container>
    </>
  );
};

export default MainDrawer;
