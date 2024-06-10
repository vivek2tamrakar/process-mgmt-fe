import React, { useState, useEffect } from 'react';
import { Container, LogoContainer, RoutesContainer, Route, AddTaskBox, AddTaskContainer, Arrowdiv, ArrowBox } from './Styled';
import usePost from 'hooks/usePost';
import AddTaskModal from 'pages/AddTaskModal/AddGroupModal';
import { Link, useLocation } from 'react-router-dom';
import useGet from 'hooks/useGet';
import { getGroupList } from 'store/reducers/group';
import { useDispatch, useSelector } from 'react-redux';
import { AddGroupData, GetGroupList } from '../../../constants/api';
import AddFolderModal from 'pages/AddTaskModal/AddFolderModal';
import AddProcessModal from 'pages/AddTaskModal/AddProcessModal';
import PlusSvg from '../../../assets/svg/PlusSvg';
import { FolderOpenOutlined, GroupOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Add this import

const MainDrawer = () => {
  const [option, setOption] = useState(false);
  const [open, setOpen] = useState(false); //state for open group modal
  const [openFolder, setOpenFolder] = useState(false); //state for open folder modal
  const [openProcess, setOpenProcess] = useState(false); //state for open process modal
  const [groupName, setGroupName] = useState(''); //state for set group name value
  const [showGroups, setShowGroups] = useState(false); // state for showing/hiding groups
  const [selectedGroup, setSelectedGroup] = useState(null); // state to store the selected group ID
  const [selectedFolder, setSelectedFolder] = useState(null); // state to store the selected folder ID
  const navigate = useNavigate(); // Add this line

  const { pathname } = useLocation(); // Hook to get the current route
  const { mutateAsync: AddGroup } = usePost();
  const { mutateAsync: UserListGet } = useGet();
  const dispatch = useDispatch();
  const { groupList, folderList, processList } = useSelector((state) => state.group);
  const [groupData, setGroupData] = useState(groupList);
  const [folderData, setFolderData] = useState(folderList);
  const [processData, setProcessData] = useState(processList);

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
  console.log(folderData, 'folderData');
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
              <div key={group?.id} className="jhcgkj">
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
      <AddFolderModal open={openFolder} handleClose={handleCloseFolder} />
      <AddProcessModal open={openProcess} handleClose={handleCloseProcess} />
    </>
  );
};

export default MainDrawer;
