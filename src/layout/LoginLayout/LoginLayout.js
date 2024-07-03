import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Header, HomeRoutes, LoginLayoutContainer, ProfileContainer, RightContent, ProcessStepButton } from './Style';
import LeftMenuBar from './LeftMenuBar';
import { Button } from 'antd';
import axios from 'axios';
import { getProcessList } from '../../features/Group/groupslice';
import { setSelectedProcess } from '../../features/process/processSlice';

import useGet from 'hooks/useGet';
const { REACT_APP_DETAILS_URL } = process.env;

const LoginLayout = ({ setIsLoggedIn }) => {
  const dispatch = useDispatch();
  const isAddStepEnabled = useSelector((state) => state.features.isAddStepEnabled);
  const process = useSelector((state) => state.process.selectedProcess);
  const stepDescription = useSelector((state) => state.stepDescription.stepDescription);
  // const { selectedOption } = useSelector((state) => state.sidebar);
  const token = localStorage.getItem('token');
  const location = useLocation();
  const { mutateAsync: GroupListGet } = useGet();
  const handleLogout = () => {
    setIsLoggedIn(false);
    dispatch(logout());
  };
  const fetchData = () => {
    GroupListGet({
      url: 'group/list',
      type: 'details',
      token: true
    })
      .then((res) => {
        dispatch(getProcessList({ processList: res?.process }));
        const updatedProcess = res?.process.find((p) => p?.id === process?.id);

        // console.log('updatedProcess', updatedProcess);
        // console.log('process?.id', process?.id, res?.process);

        dispatch(setSelectedProcess(updatedProcess));
        dispatch({ type: 'stepDescription/clearStepDescription' });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const submitForm = () => {
    const payload = {
      id: process?.id,
      stepDescription
    };

    axios
      .patch(`${REACT_APP_DETAILS_URL}process`, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        dispatch({ type: 'stepDescription/clearStepDescription' });
        fetchData();
      })
      .catch((error) => {
        console.error('Error while submitting form:', error);
      });
  };

  return (
    <>
      <LoginLayoutContainer>
        <LeftMenuBar />
        <RightContent>
          <Header>
            <HomeRoutes>
              <Link to="/home">Home</Link>
              <Link to="/inbox">Inbox</Link>
              <Link to="/task-manager">Task Manager</Link>
            </HomeRoutes>
            {location.pathname === '/add-process' && (
              <ProcessStepButton>
                <Button disabled={isAddStepEnabled} onClick={submitForm}>
                  Save Changes
                </Button>
                <Button>Cancel Changes</Button>
              </ProcessStepButton>
            )}
            {location.pathname !== '/add-process' && (
              <ProfileContainer>
                <Button type="primary" onClick={handleLogout} style={{ backgroundColor: '#003e6b', color: '#ffffff' }}>
                  Logout
                </Button>
              </ProfileContainer>
            )}
          </Header>
          <Outlet />
        </RightContent>
      </LoginLayoutContainer>
    </>
  );
};

export default LoginLayout;
