import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Styles from "./MainStyle.module.css";
import {
  Header,
  HomeRoutes,
  LoginLayoutContainer,
  ProfileContainer,
  RightContent,
  ProcessStepButton,
  ProfileContainerContent,
  SearchBar
} from './Style';
import LeftMenuBar from './LeftMenuBar';
import { Button, Popover } from 'antd';
import axios from 'axios';
import { getGroupList, getProcessList } from '../../features/Group/groupslice';
import { setSelectedProcess } from '../../features/process/processSlice';
import useGet from 'hooks/useGet';
import { setStepDescription } from 'features/CKeditor/ckeditorslice';
import { toggleAddStep } from 'features/step/stepSlice';
import ProfileImage from '../../assets/images/profiledummy.jpg';
import { useNavigate } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
const { REACT_APP_DETAILS_URL } = process.env;
const profilePic = localStorage.getItem("profilePic")

const LoginLayout = ({ setIsLoggedIn }) => {
  const dispatch = useDispatch();
  const isAddStepEnabled = useSelector((state) => state.features.isAddStepEnabled);
  const process = useSelector((state) => state.process.selectedProcess);
  const Group = useSelector((state) => state.process.selectedProcess);
  const stepDescription = useSelector((state) => state.stepDescription.stepDescription);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const location = useLocation();
  const { mutateAsync: GroupListGet } = useGet();
  const [openProfile, setOpenProfile] = useState(false);
  const [showList, setShowList] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const handleLogout = () => {
    setIsLoggedIn(false);
    dispatch(logout());
    navigate('/login')
  };
  const companyId = localStorage.getItem('companyId');
  console.log('LoggedInData', companyId)
  const fetchData = () => {
    GroupListGet({
      url: `group/list/` + companyId,
      type: 'details',
      token: true
    })
      .then((res) => {
        console.log(res);
        const allGroups = [...(res?.group || []), ...(res?.assignGroup || [])]
        // const allFolder = [...(res?.folder || []), ...(res?.assignFolder || [])] 
        const allProcesses = [...(res?.folder || []), ...(res?.assignProcess || [])]

        dispatch(getGroupList({ groupList: allGroups }));

        dispatch(getProcessList({ processList: allProcesses }));

        const updatedProcess = allProcesses.find((p) => p?.id === process?.id);
        dispatch(setSelectedProcess(updatedProcess));

        allGroups.forEach((group) => {
          const updatedGroupProcess = group.proces?.find((p) => p?.id === process?.id);
          if (updatedGroupProcess) {
            dispatch(setSelectedProcess(updatedGroupProcess));
          }
          group.folder?.forEach((folder) => {
            const updatedFolderProcess = folder.process?.find((p) => p?.id === process?.id);
            if (updatedFolderProcess) {
              dispatch(setSelectedProcess(updatedFolderProcess));
            }
          });
        });
        dispatch(setStepDescription(''));
        dispatch(toggleAddStep(false));

        dispatch({ type: 'stepDescription/clearStepDescription' });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const search = (event) => {
    setSearchVal(event.target.value);
    setSearchList([])
    if (!event.target.value) {
      return;
    }
    axios
      .get(`${REACT_APP_DETAILS_URL}process/search/${companyId}?tags=${event.target.value}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log(res.data)
        setShowList(true)
        setSearchList(res.data)
      })
      .catch((error) => {
        console.error('Error while submitting form:', error);
      });
  }

  const processById = (id) => {
    axios
      .get(`${REACT_APP_DETAILS_URL}process/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        dispatch(setSelectedProcess(res.data));
        navigate('/open-process');
      })
      .catch((error) => {
        console.error('Error while submitting form:', error);
      });
  }

  const submitForm = () => {
    const payload = {
      id: process?.id,
      stepId: process?.stepId,
      stepDescription,
      name: process?.name ? process?.name : '',
      description: process?.description,
      tags: process?.tags
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
            <HomeRoutes>
              <Link to="/create-task">
              <Button >
                Create Task
              </Button>

            </Link></HomeRoutes>

            {location.pathname !== '/add-process' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {(location.pathname !== '/open-process' && location.pathname !== '/view-process' && !location.pathname.includes('task')) && <div style={{ position: 'relative' }}>
                  <SearchOutlined style={{ position: 'relative', right: '-30px', top: '3px' }} /><SearchBar value={searchVal} type="search" placeholder='Search (hashtags)' onInput={search} />
                  {showList && <div className={Styles.searchList} >
                    {searchList.map((val) => (<div className={Styles.searchItem} key={val.id} onClick={() => { setShowList(data => !data); setSearchVal(val.name); processById(val.id) }}>
                      {val.name}
                    </div>))}
                  </div>}
                </div>}
                <ProfileContainer>
                  <Popover
                    placement="bottomRight"
                    visible={openProfile}
                    // onVisibleChange={openProfile}
                    onClose={() => setOpenProfile(false)}
                    content={
                      <ProfileContainerContent className="ooll">
                        <Button type="primary" onClick={() => { setOpenProfile(!openProfile); navigate('/profile') }} style={{ backgroundColor: '#003e6b', color: '#ffffff' }}>
                          Profile
                        </Button>
                        <Button type="primary" onClick={handleLogout} style={{ backgroundColor: '#003e6b', color: '#ffffff' }}>
                          Logout
                        </Button>
                      </ProfileContainerContent>
                    }
                  >
                    <div onClick={() => setOpenProfile(!openProfile)}>
                      <img src={profilePic ? profilePic : ProfileImage} alt="noImage" />
                    </div>
                  </Popover>
                </ProfileContainer>
              </div>
            )}
          </Header>
          <Outlet />
        </RightContent>
      </LoginLayoutContainer>
    </>
  );
};

export default LoginLayout;
