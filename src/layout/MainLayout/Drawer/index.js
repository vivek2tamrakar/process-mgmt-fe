import React, { useState, useEffect } from 'react';
import PlusSvg from 'assets/svg/PlusSvg';
import { Container, AddTaskContainer, Arrowdiv, Arrow, ArrowBox } from './Styled';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import useGet from 'hooks/useGet';
import usePost from 'hooks/usePost';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const MainDrawer = () => {
  const [option, setOption] = useState(false);
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { mutateAsync: AddGroup } = usePost();
  const { mutateAsync: UserListGet } = useGet();
  const [userList, setUserList] = useState([]);

  const handleSubmit = () => {
    const payload = {
      name: groupName
    };
    AddGroup({
      url: 'http://192.168.29.229:3004/api/group',
      type: 'details',
      payload: payload,
      token: true,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
        setGroupName('');
        handleClose();
        console.log(res, 'lllllllllllllll');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const fetchData = () => {
    UserListGet({
      url: `http://192.168.29.229:3004/api/group/list`,
      type: 'details',
      token: true
    })
      .then((res) => {
        setUserList(res);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(userList?.group, 'userList');
  return (
    <>
      <Container>
        <div>
          {userList?.group?.map((i) => (
            <div>{i?.name}</div>
          ))}
        </div>
        <div>
          <AddTaskContainer onClick={() => setOption(!option)}>
            <div>
              <PlusSvg />
            </div>
            <div>
              <p>ADD NEW TASK</p>
            </div>
          </AddTaskContainer>
          <ArrowBox show={option}>
            <Arrow></Arrow>
            <Arrowdiv>
              <button onClick={handleOpen}>New Group</button>
              <button>New Folder</button>
              <button>New Process</button>
            </Arrowdiv>
          </ArrowBox>
        </div>
        <div>
          <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                this modal for group
              </Typography>
              <div>
                <input type="text" name="groupName" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                <button onClick={handleSubmit}>add</button>
              </div>
            </Box>
          </Modal>
        </div>
      </Container>
    </>
  );
};

export default MainDrawer;
