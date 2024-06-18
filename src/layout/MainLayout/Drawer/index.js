import React, { useState, useEffect } from 'react';
import {
  Container,
  LogoContainer,
  RoutesContainer,
  Route,
  AddTaskBox,
  AddTaskContainer,
  Arrowdiv,
  ArrowBox,
  ContextMenuOptios
} from './Styled';
import usePost from 'hooks/usePost';
import AddTaskModal from 'pages/AddTaskModal/AddGroupModal';
import { Link, useLocation } from 'react-router-dom';
import useGet from 'hooks/useGet';
import { getGroupList } from 'store/reducers/group';
import { useDispatch, useSelector } from 'react-redux';
import { AddGroupData, GetGroupListApi, DeleteGroupById } from '../../../constants/api';
import AddFolderModal from 'pages/AddTaskModal/AddFolderModal';
import AddProcessModal from 'pages/AddTaskModal/AddProcessModal';
import PlusSvg from '../../../assets/svg/PlusSvg';
import { FolderOpenOutlined, GroupOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Add this import
import useDelete from 'hooks/useDelete';

const MainDrawer = () => {
  const { pathname } = useLocation(); // Hook to get the current route
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutateAsync: DeleteGroup } = useDelete();
  const { mutateAsync: UserListGet } = useGet();
  const { mutateAsync: AddGroup } = usePost();
  const { groupList, folderList, processList } = useSelector((state) => state.group);
  const [option, setOption] = useState(false);
  const [open, setOpen] = useState(false); //state for open group modal
  const [openFolder, setOpenFolder] = useState(false); //state for open folder modal
  const [openProcess, setOpenProcess] = useState(false); //state for open process modal
  const [groupName, setGroupName] = useState(''); //state for set group name value
  const [showGroups, setShowGroups] = useState(false); // state for showing/hiding groups
  const [selectedGroup, setSelectedGroup] = useState(null); // state to store the selected group ID
  const [selectedFolder, setSelectedFolder] = useState(null); // state to store the selected folder ID
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, groupId: null }); // state for context menu
  const [contextGroupId, setContextGroupId] = useState(null); // state to store context group ID for adding a folder
  const [groupData, setGroupData] = useState(groupList);
  const [folderData, setFolderData] = useState(folderList);
  const [processData, setProcessData] = useState(processList);

  //open and close group modal
  const handleOpen = () => {
    setOption(false);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOption(true);
  };

  const handleOpenFolder = (groupId = null) => {
    setContextGroupId(groupId); // Set the context group ID or reset it
    setOpenFolder(true);
  };
  const handleCloseFolder = () => {
    setOpenFolder(false);
    setOption(true);
  };

  //open and close process modal

  const handleOpenProcess = (groupId = null) => {
    setContextGroupId(groupId); // Set the context group ID or reset it
    setOpenProcess(true);
    setOption(false);
  };
  const handleCloseProcess = () => {
    setOpenProcess(false);
    setOption(true);
  };

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
      url: GetGroupListApi,
      type: 'details',
      token: true
    })
      .then((res) => {
        dispatch(getGroupList({ groupList: res?.group }));
        // dispatch(getFolderList({ folderList: res?.folder }));
        // dispatch(getProcessList({ processList: res?.process }));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setGroupData(groupList);
    setFolderData(folderList);
    setProcessData(processList);
  }, [groupList, folderList, processList]);

  const handleToggleGroups = () => {
    setShowGroups((prev) => !prev); // Toggle the state of showGroups
  };

  const handleGroupClick = (groupId) => {
    setSelectedGroup((prevSelectedGroup) => (prevSelectedGroup === groupId ? null : groupId));
    setSelectedFolder(null); // Reset the selected folder ID
  };

  const handleFolderClick = (folderId) => {
    setSelectedFolder(folderId); // Set the selected folder ID
    navigate(`/process/${folderId}`); // Navigate to the ProcessinFolder route with the folderId
  };

  // --------------------------->>>>>>>>>>>>
  const handleContextMenu = (event, groupId) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      groupId: groupId
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ ...contextMenu, visible: false });
  };

  const handleEditMember = () => {
    // Add your logic to handle Edit Member action
    // console.log('Edit Member', contextMenu.groupId);
    handleCloseContextMenu();
  };

  const handleRename = () => {
    // Add your logic to handle Rename action
    // console.log('Rename', contextMenu.groupId);
    handleCloseContextMenu();
  };

  const handleNewFolder = () => {
    console.log('Rename', contextMenu.groupId);
    // setContextGroupId(contextMenu.groupId);
    handleOpenFolder(contextMenu.groupId);
    handleCloseContextMenu();
  };

  const handleNewProcess = () => {
    handleOpenProcess(contextMenu.groupId);
    handleCloseContextMenu();
  };

  const handleDelete = () => {
    DeleteGroup({
      url: `${DeleteGroupById}/${contextMenu.groupId}`,
      type: 'details',
      token: true
    })
      .then((res) => {
        fetchData();
        console.log(res, 'res');
        handleCloseContextMenu();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Container>
        <LogoContainer>
          <p>Project Management</p>
        </LogoContainer>

        <AddTaskBox>
          <AddTaskContainer onClick={() => setOption(!option)}>
            <PlusSvg />
            <p>New</p>
          </AddTaskContainer>
          <ArrowBox show={option}>
            <Arrowdiv className="ds">
              <button onClick={handleOpen}>Group</button>
              <button onClick={handleOpenFolder}>Folder</button>
              <button onClick={handleOpenProcess}>Process</button>
            </Arrowdiv>
          </ArrowBox>
        </AddTaskBox>

        <RoutesContainer>
          <Link to="/">
            <Route isselected={pathname === '/'}>
              <p onClick={handleToggleGroups}>Home</p>
            </Route>
          </Link>
          {showGroups &&
            groupData?.map((group) => (
              <div key={group?.id} onContextMenu={(e) => handleContextMenu(e, group?.id)}>
                <Link to={`/groups/${group?.id}`} key={group?.id}>
                  <Route isselected={pathname === `/groups/${group?.id}`}>
                    <GroupOutlined />
                    <p onClick={() => handleGroupClick(group?.id)}>{group?.name}</p>
                  </Route>
                </Link>
                {selectedGroup === group?.id && (
                  <ul>
                    {group?.folder?.map((folder) => (
                      <div key={folder?.id}>
                        <Link to={`/groups/${selectedGroup}/folders/${folder?.id}`} key={folder?.id}>
                          <Route isselected={pathname === `/groups/${selectedGroup}/folders/${folder?.id}`}>
                            <FolderOpenOutlined />
                            <p onClick={() => handleFolderClick(folder?.id)}>{folder?.name}</p>
                          </Route>
                        </Link>
                      </div>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          {showGroups &&
            folderData?.map((i) => (
              <Link to={`/process/${i.id}`} key={i.id}>
                <Route isselected={pathname === `/process/${i.id}`}>
                  <FolderOpenOutlined />
                  <>{i?.name}</>
                </Route>
              </Link>
            ))}

          <Link to="/users">
            <Route isselected={pathname === '/users'}>
              <p>Users</p>
            </Route>
          </Link>
        </RoutesContainer>
      </Container>

      <AddTaskModal open={open} handleClose={handleClose} handleSubmit={handleSubmit} groupName={groupName} setGroupName={setGroupName} />
      <AddFolderModal open={openFolder} handleClose={handleCloseFolder} groupId={contextGroupId} />
      <AddProcessModal open={openProcess} handleClose={handleCloseProcess} groupId={contextGroupId} />

      {contextMenu.visible && (
        <ContextMenuOptios onMouseLeave={handleCloseContextMenu}>
          <ul>
            <li onClick={handleEditMember}>
              <button>Edit Member</button>
            </li>
            <li onClick={handleNewFolder}>
              <button>New Folder</button>
            </li>
            <li onClick={handleNewProcess}>
              <button>New Process</button>
            </li>
            <li onClick={handleRename}>
              <button>Rename</button>
            </li>
            <li onClick={handleDelete}>
              <button>Delete</button>
            </li>
          </ul>
        </ContextMenuOptios>
      )}
    </>
  );
};

export default MainDrawer;
