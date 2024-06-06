import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Header, Footer, Content } from '../../pages/AddTaskModal/styled';
import { CloseOutlined } from '@ant-design/icons';
import usePost from 'hooks/usePost';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px'
};

const InviteuserModal = ({ open, handleClose, fetchData }) => {
  const { mutateAsync: AddGroup } = usePost();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(3);

  const handleSubmit = () => {
    const payload = { email, role };
    AddGroup({
      url: 'http://192.168.29.229:3004/api/users',
      type: 'details',
      payload: payload,
      token: true,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then((res) => {
        handleClose();
        fetchData();
        setEmail('');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Header>
            <div>
              <h3>Invite Users</h3>
            </div>
            <div>
              <CloseOutlined onClick={handleClose} />
            </div>
          </Header>
          <Content className="content">
            <input
              type="email"
              name="groupName"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Content>

          <Footer>
            <button onClick={handleClose}>Cancel</button>
            <button onClick={handleSubmit}>Invite</button>
          </Footer>
        </Box>
      </Modal>
    </>
  );
};

export default InviteuserModal;
