import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Header, Footer, Content } from './styled';
import { CloseOutlined } from '@ant-design/icons';
import { AddProcessData, GetGroupList } from '../../constants/api';
import { getProcessList } from 'store/reducers/group';
import { useDispatch } from 'react-redux';
import usePost from 'hooks/usePost';
import useGet from 'hooks/useGet';
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

const AddProcessModal = ({ open, handleClose }) => {
  const [folderName, setFolderName] = useState(''); //state for set Folder name value
  const { mutateAsync: AddFolder } = usePost();
  const dispatch = useDispatch();
  const { mutateAsync: UserListGet } = useGet();

  // function for add Folders
  const handleFolderSubmit = () => {
    const payload = { name: folderName };
    AddFolder({
      url: AddProcessData,
      type: 'details',
      payload: payload,
      token: true,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then((res) => {
        handleClose();
        fetchData();
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
        dispatch(getProcessList({ processList: res?.process }));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  return (
    <>
      <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Header>
            <div>
              <h3>Add Process</h3>
            </div>
            <div>
              <CloseOutlined onClick={handleClose} />
            </div>
          </Header>
          <Content className="content">
            <input
              type="text"
              name="folderName"
              placeholder="Enter Folder Name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
          </Content>

          <Footer>
            <button onClick={handleClose}>Cancel</button>
            <button onClick={handleFolderSubmit}>Add</button>
          </Footer>
        </Box>
      </Modal>
    </>
  );
};

export default AddProcessModal;
