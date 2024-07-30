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
import { Link, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  HomeOutlined,
  UserOutlined,
  FolderOpenOutlined,
  FolderOutlined,
  UsergroupAddOutlined,
  UsergroupDeleteOutlined
} from '@ant-design/icons';
import { toast } from 'react-hot-toast';
import logo from '../../assets/images/logo.34ac6a4edb0bef53937e.jpg';
import usePost from 'hooks/usePost';
import usePatch from 'hooks/usePatch';
const truncateName = (name) => {
  if (name.length > 10) {
    return name.substring(0, 10) + '...';
  }
  return name;
};
const LeftMenuBar = () => {
  const { mutateAsync: CopyProcess } = usePost();
  const { mutateAsync: MoveProcess } = usePatch();
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
  const [folderAssignUsers, setFolderAssignUsers] = useState([]);
  const companyId = localStorage.getItem('companyId');
  const userRole = localStorage.getItem('userRole');
  console.log(userRole,'LoggedInData',companyId)
  const fetchData = () => {
    GroupListGet({
      url: 'group/list/'+companyId,
      type: 'details',
      token: true
    })
      .then((res) => {
        const allGroups = [...(res?.group || []), ...(res?.assignGroup || [])]
        const allFolder = [...(res?.folder || []), ...(res?.assignFolder || [])] 
        const allProcess = [...(res?.folder || []), ...(res?.assignProcess || [])]
        console.log('allGroups',allGroups)
        dispatch(getGroupList({ groupList: allGroups}));
        dispatch(getFolderList({ folderList: allFolder }));
        dispatch(getProcessList({ processList: allProcess }));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const copyMoveProcess = async(type, folder) => {
    const text = await navigator.clipboard.readText();
    const [id, opr] = text.split('_');
    if(opr === "MOVE") {
      moveProcess(type, folder, id)
    }
    else {
      copyProcess(type, folder, id)
    }
  }

  const copyProcess = async(type, folder, id) => {
    try {
    const payload = {
      id,
      userId: companyId,
      [type]: folder,
    }
    CopyProcess({
      url: `process/copy-process`,
      type: 'details',
      payload: payload,
      token: true
  })
      .then((res) => {
        setPopoverVisible(false);
          toast.success('Process Paste Successfully.');
          console.log(res);
      })
      .catch((err) => {
        setPopoverVisible(false);
          console.error(err);
          toast.error('Process Paste failed.');
      });
    }
    catch(err) {
      console.log(err);
    }
  }
  const moveProcess = async(type, folder, id) => {
    try {
     const payload = {
      id,
      [type]: folder,
    }
    MoveProcess({
      url: `process`,
      type: 'details',
      payload: payload,
      token: true
  })
      .then((res) => {
        setPopoverVisible(false);
          toast.success('Process Moved Successfully.');
          console.log(res);
      })
      .catch((err) => {
        setPopoverVisible(false);
          console.error(err);
          toast.error('Process Moved failed.');
      });
    }
    catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setGetAllGroups(groupList);
    setGetAllFolders(folderList);
    setGetAllProcess(processList);
  }, [groupList, folderList, processList]);

  const showModal = (title, isAllFolder) => {
    if (title === 'Rename' && !isAllFolder) {
      setModalTitle(title);
      setIsModalOpen(true);
      setGroupAssignUsers(selectedGroup?.assign);
      setFolderAssignUsers(selectedFolder?.assign);

      if (popoverVisibleFolder) {
        setFolderId(selectedFolder?.id);
        setFolderName(selectedFolder?.name);
        setGroupId('');
        seGroupIName('');
      }
      if (popoverVisible) {
        setGroupId(selectedGroup?.id);
        seGroupIName(selectedGroup?.name);
        setFolderId('');
        setFolderName('');
      }
    } else if (title === 'Rename' && isAllFolder === true) {
      setModalTitle(title);
      setIsModalOpen(true);
      setGroupId(selectedGroup?.id);
      setFolderId(selectedFolder?.id);
      seGroupIName(selectedGroup?.name);
      setGroupAssignUsers(selectedGroup?.assign);
      setFolderAssignUsers(selectedFolder?.assign);
      setFolderName(selectedFolder?.name);
    } else {
      setModalTitle(title);
      setIsModalOpen(true);
      setGroupId(selectedGroup?.id);
      setFolderId(selectedFolder?.id);
      seGroupIName(selectedGroup?.name);
      setGroupAssignUsers(selectedGroup?.assign);
      setFolderAssignUsers(selectedFolder?.assign);
      setFolderName(selectedFolder?.name);
    }
  };

  const showFolderModal = (title) => {
    setModalTitle(title);
    setIsModalOpen(true);
    setFolderId(selectedFolder?.id);
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
  const ClearData = () => {
    setFolderId('');
    setGroupId('');
    setSelectedFolder(null);
    setSelectedGroup(null);
  };
  return (
    <>
     {!pathname.includes('task-manager') && <LeftSideBar>
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
            <Button type="primary" style={{ backgroundColor: '#003e6b' }} onClick={ClearData}>
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
              }}
            >
              <HomeOutlined />
              Home
            </SidebarRoute>
          </Link>
          {showSubMenu && (
            <>
              {/* this is all groups  */}
              
              {allGroups.map((i) => (
                <Popover
                  className="abababab"
                  key={i.id}
                  content={
                    <>
                    {(parseInt(userRole) === 4 || parseInt(userRole) === 3 || parseInt(userRole) === 2) && (
                      <PopoverContainer className="okokokok">
                        <Button onClick={() => showModal('EditMember')}>Edit Members</Button>
                        <Button onClick={() => showModal('Rename')}>Rename</Button>
                        <Button onClick={() => showModal('TaskManager')}>Task Manager</Button>
                        <Button onClick={() => showModal('Folder')}>New Folder</Button>
                        <Button onClick={() => showModal('Process')}>New Process</Button>
                        <Button onClick={() => showModal('DeleteGroup')}>Delete</Button>
                      </PopoverContainer>
                       )}
                    </>
                   
                  }
                  trigger="contextMenu"
                  visible={!popoverVisibleFolder && popoverVisible && selectedGroup?.id === i.id}
                  onVisibleChange={(visible) => setPopoverVisible(visible)}
                  placement="rightTop"
                >
                  <Link to={`/group/${i.id}`} onContextMenu={(e) => handleRightClick(e, i)}>
                    <SidebarGroupRoute
                      isselected={pathname === `/group/${i.id}`}
                      onClick={() => {
                        handleGroupClick(i.id);
                      }}
                    >
                      {pathname === `/group/${i.id}` ? <UsergroupDeleteOutlined /> : <UsergroupAddOutlined />}
                      {truncateName(i.name)}
                    </SidebarGroupRoute>
                    {/* show folders here */}

                    {selectedGroupId === i.id && (
                      <div>
                        {i?.folder?.map((folder) => (
                          <Popover
                            key={folder.id}
                            content={
                              <>
                              {(parseInt(userRole) === 4 || parseInt(userRole) === 3 || parseInt(userRole) === 2) && (
                              <PopoverContainer>
                                <Link to={`/group/${selectedGroupId}/folder/${folder?.id}`}>
                                  {' '}
                                  <Button onClick={() => showFolderModal('Process')}>New Process</Button>
                                </Link>

                                <Button onClick={() => copyMoveProcess('folderId', folder?.id)}>Paste</Button>
                                <Button onClick={() => showFolderModal('Rename')}>Rename</Button>
                                <Button onClick={() => showFolderModal('Folder Delete')}>Delete</Button>
                              </PopoverContainer>
                              )}
                              </>
                            }
                            trigger="contextMenu"
                            visible={popoverVisible && popoverVisibleFolder && selectedFolder?.id === folder.id}
                            onVisibleChange={(visible) => setPopoverVisibleFolder(visible)}
                            placement="rightTop"
                          >
                            <Link
                              to={`/group/${selectedGroupId}/folder/${folder?.id}`}
                              onContextMenu={(e) => handleFolderRightClick(e, folder)}
                            >
                              <SidebarFolderRoute isselected={pathname === `/group/${selectedGroupId}/folder/${folder?.id}`}>
                                {pathname === `/group/${selectedGroupId}/folder/${folder?.id}` ? (
                                  <FolderOpenOutlined />
                                ) : (
                                  <FolderOutlined />
                                )}
                                {truncateName(folder.name)}
                              </SidebarFolderRoute>
                            </Link>
                          </Popover>
                        ))}
                      </div>
                    )}
                  </Link>
                </Popover>
              ))}

              {/* this is all folders */}
              { /*allFolders?.map((i) => (
                <Popover
                  key={i.id}
                  content={
                    <PopoverContainer>
                      <Button onClick={() => showModal('Process')}>New Process</Button>
                      <Button onClick={() => showModal('Rename', true)}>Rename</Button>
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
                      // { {i?.name} }
                      {truncateName(i.name)}
                    </SidebarGroupRoute>
                  </Link>
                </Popover>
              )) */}
            </>
          )}
          { parseInt(userRole) === 4 || parseInt(userRole) === 3 || parseInt(userRole) === 2 && (
          <Link to="/users">
            <SidebarRoute isselected={pathname === '/users'}>
              <UserOutlined />
              Users
            </SidebarRoute>
          </Link>
          )
          }
        </SidebarRoutesContainer>
      </LeftSideBar>}
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
        folderAssignUsers={folderAssignUsers}
        folderName={folderName}
      />
    </>
  );
};

export default LeftMenuBar;
