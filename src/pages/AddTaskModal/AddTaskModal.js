import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Header, Footer, Content } from './styled';
import { CloseOutlined } from '@ant-design/icons';

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

const AddTaskModal = ({ open, handleClose, handleSubmit, groupName, setGroupName }) => {
  return (
    <>
      <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Header>
            <div>
              <h3>Add Groups</h3>
            </div>
            <div>
              <CloseOutlined onClick={handleClose} />
            </div>
          </Header>
          <Content className="content">
            <input
              type="text"
              name="groupName"
              placeholder="Enter Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </Content>

          <Footer>
            <button onClick={handleClose}>Cancel</button>
            <button onClick={handleSubmit}>Add</button>
          </Footer>
        </Box>
      </Modal>
    </>
  );
};

export default AddTaskModal;
