import React, { useState, useEffect } from 'react';
import {
  LeftSideBar,
  PopoverContainer,
  SideBarHeader,
  SideBarOptions,
  SidebarFolderRoute,
  SidebarGroupRoute,
  SidebarRoute,
  SidebarRoutesContainer
} from './Style';
import { Button, Popover } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CommonModal from '../../components/CommonModal/CommonModal';
import useGet from '../../hooks/useGet';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupList, getFolderList, getProcessList } from '../../features/Group/groupslice';
// import { selectedOptionList } from '../../features/SideBar/sideBarslice';
import { Link, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  HomeOutlined,
  UserOutlined,
  GroupOutlined,
  FolderOpenOutlined,
  FolderOutlined,
  NodeExpandOutlined,
  UngroupOutlined
} from '@ant-design/icons';
import logo from '../../assets/images/logo.34ac6a4edb0bef53937e.jpg';
const LeftMenuBar = () => {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [popoverVisible, setPopoverVisible] = useState(false); //right click on group
  const [selectedGroup, setSelectedGroup] = useState(null); //right click on group
  const [groupId, setGroupId] = useState(''); //right click on group
  const [groupName, seGroupIName] = useState(''); //right click on group
  const [popoverVisibleFolder, setPopoverVisibleFolder] = useState(false); //right click on folder
  const [selectedFolder, setSelectedFolder] = useState(null); //right click on folder
  const [folderId, setFolderId] = useState(''); //right click on folder
  const [folderName, setFolderName] = useState('');
  const { mutateAsync: GroupListGet } = useGet();
  const { groupList, folderList, processList } = useSelector((state) => state.group);
  const [allGroups, setGetAllGroups] = useState(groupList);
  const [allFolders, setGetAllFolders] = useState(folderList);
  const [allProcess, setGetAllProcess] = useState(processList);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [groupAssignUsers, setGroupAssignUsers] = useState([]);

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

  const showModal = (title) => {
    console.log('selectedGroup?.id', selectedGroup?.id);
    setModalTitle(title);
    setIsModalOpen(true);
    setGroupId(selectedGroup?.id);
    setFolderId(selectedFolder?.id);
    seGroupIName(selectedGroup?.name);
    setGroupAssignUsers(selectedGroup?.assign);
    setFolderName(selectedFolder?.name);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleRightClick = (e, group) => {
    e.preventDefault();
    setSelectedGroup(group);
    setPopoverVisible(true);
  };

  const handleGroupClick = (groupId) => {
    setSelectedGroupId((prevGroupId) => (prevGroupId === groupId ? null : groupId));
  };

  const handleFolderRightClick = (e, folder) => {
    e.preventDefault();
    setSelectedFolder(folder);
    setPopoverVisibleFolder(true);
  };

  return (
    <>
      <LeftSideBar>
        <SideBarHeader>
          <Link to="/">
            <img src={logo} alt="noimage" />
          </Link>
        </SideBarHeader>
        <SideBarOptions>
          <Popover
            content={
              <>
                <PopoverContainer>
                  <Button onClick={() => showModal('Group')}>New Group</Button>
                  <Button onClick={() => showModal('Folder')}>New Folder</Button>
                  <Button onClick={() => showModal('Process')}>New Process</Button>
                </PopoverContainer>
              </>
            }
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
            placement="rightTop"
          >
            <Button type="primary" style={{ backgroundColor: '#003e6b' }}>
              <PlusOutlined style={{ color: '#ffffff' }} /> New
            </Button>
          </Popover>
        </SideBarOptions>
        <SidebarRoutesContainer className="SidebarRoutesContainer">
          <Link to="/">
            <SidebarRoute isselected={pathname === '/'}>
              <DashboardOutlined />
              Dashboard
            </SidebarRoute>
          </Link>

          <Link to="/home">
            <SidebarRoute
              isselected={pathname === '/home'}
              onClick={() => {
                setShowSubMenu(!showSubMenu);
                // dispatch(selectedOptionList('process'));
              }}
            >
              <HomeOutlined />
              Home
            </SidebarRoute>
          </Link>

          {showSubMenu && (
            <>
              {/* this is all groups  */}
              {allGroups?.map((i) => (
                <Popover
                  key={i.id}
                  content={
                    <>
                      <PopoverContainer>
                        <Button onClick={() => showModal('EditMember')}>Edit Members</Button>
                        <Button onClick={() => showModal('EditMember')}>Rename</Button>
                        <Button onClick={() => showModal('TaskManager')}>Task Manager</Button>
                        <Button onClick={() => showModal('Folder')}>New Folder</Button>
                        <Button onClick={() => showModal('Process')}>New Process</Button>
                        <Button onClick={() => showModal('DeleteGroup')}>Delete</Button>
                      </PopoverContainer>
                    </>
                  }
                  trigger="contextMenu"
                  visible={popoverVisible && selectedGroup?.id === i.id}
                  onVisibleChange={(visible) => setPopoverVisible(visible)}
                  placement="rightTop"
                >
                  <Link to={`/group/${i.id}`} onContextMenu={(e) => handleRightClick(e, i)}>
                    <SidebarGroupRoute
                      isselected={pathname === `/group/${i.id}`}
                      onClick={() => {
                        handleGroupClick(i.id);
                        // dispatch(selectedOptionList('group'));
                      }}
                    >
                      {pathname === `/group/${i.id}` ? <UngroupOutlined /> : <GroupOutlined />}
                      {i?.name}
                    </SidebarGroupRoute>
                    {/* show folders here */}

                    {selectedGroupId === i.id && (
                      <div>
                        {i?.folder?.map((folder) => (
                          <Link key={folder.id} to={`/group/${selectedGroupId}/folder/${folder?.id}`}>
                            <SidebarFolderRoute isselected={pathname === `/group/${selectedGroupId}/folder/${folder?.id}`}>
                              {pathname === `/group/${selectedGroupId}/folder/${folder?.id}` ? <FolderOpenOutlined /> : <FolderOutlined />}

                              {folder.name}
                            </SidebarFolderRoute>
                          </Link>
                        ))}
                      </div>
                    )}
                  </Link>
                </Popover>
              ))}

              {/* this is all folders */}
              {allFolders?.map((i) => (
                <Popover
                  key={i.id}
                  content={
                    <PopoverContainer>
                      <Button onClick={() => showModal('Process')}>New Process</Button>
                      <Button onClick={() => showModal('Folder Delete')}>Delete</Button>
                    </PopoverContainer>
                  }
                  trigger="contextMenu"
                  visible={popoverVisibleFolder && selectedFolder?.id === i.id}
                  onVisibleChange={(visible) => setPopoverVisibleFolder(visible)}
                  placement="rightTop"
                >
                  <Link key={i.id} to={`/folder/${i.id}`} onContextMenu={(e) => handleFolderRightClick(e, i)}>
                    <SidebarGroupRoute isselected={pathname === `/folder/${i.id}`}>
                      {pathname === `/folder/${i.id}` ? <FolderOpenOutlined /> : <FolderOutlined />}
                      {i?.name}
                    </SidebarGroupRoute>
                  </Link>
                </Popover>
              ))}
            </>
          )}

          <Link to="/users">
            <SidebarRoute isselected={pathname === '/users'}>
              <UserOutlined />
              Users
            </SidebarRoute>
          </Link>
        </SidebarRoutesContainer>
      </LeftSideBar>
      <CommonModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title={modalTitle}
        fetchData={fetchData}
        groupId={groupId}
        setGroupId={setGroupId}
        folderId={folderId}
        groupName={groupName}
        groupAssignUsers={groupAssignUsers}
        folderName={folderName}
      />
    </>
  );
};

export default LeftMenuBar;
