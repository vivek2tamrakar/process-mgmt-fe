import React, { useState } from 'react';
import { Container, LogoContainer, RoutesContainer, Route, SelectedRoute, AddTaskBox } from './Styled';
import usePost from 'hooks/usePost';
import AddTaskModal from 'pages/AddTaskModal/AddTaskModal';
import AddTaskOptions from 'pages/AddTaskModal/AddTaskOptions';
import { Link, useLocation } from 'react-router-dom';
import useGet from 'hooks/useGet';
import { getGroupList } from 'store/reducers/group';
import { useDispatch } from 'react-redux';
import { AddGroupData, GetGroupList } from '../../../constants/api';

const MainDrawer = () => {
  const [option, setOption] = useState(false);
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const { pathname } = useLocation(); // Hook to get the current route
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { mutateAsync: AddGroup } = usePost();
  const { mutateAsync: UserListGet } = useGet();
  const dispatch = useDispatch();

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
          <AddTaskOptions setOption={setOption} option={option} handleOpen={handleOpen} />
          <AddTaskModal
            open={open}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            groupName={groupName}
            setGroupName={setGroupName}
          />
        </AddTaskBox>
      </Container>
    </>
  );
};

export default MainDrawer;
