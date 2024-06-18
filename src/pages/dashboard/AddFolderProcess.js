import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Header, Footer, Content } from '../../pages/AddTaskModal/styled';
import { CloseOutlined } from '@ant-design/icons';
import usePost from 'hooks/usePost';
import useGet from 'hooks/useGet';
import { AddProcessData, AddFolderData } from '../../constants/api';

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

const AddFolderProcess = ({ open, handleClose, folder }) => {
  const { mutateAsync: AddMember } = usePost();
  const { mutateAsync: ProcessListGet } = useGet();
  const [processList, setProcessList] = useState([]);

  const [process, setProcess] = useState('');

  const handleSubmit = () => {
    const payload = { name: process, folderId: folder?.id };
    AddMember({
      url: AddProcessData,
      type: 'details',
      payload: payload,
      token: true,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then((res) => {
        handleClose();
        setProcess();
        fetchFolderProcess();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const fetchFolderProcess = () => {
    ProcessListGet({
      url: `${AddFolderData}/${folder?.id}`,
      type: 'details',
      token: true
    })
      .then((res) => {
        setProcessList(res);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchFolderProcess();
  }, [folder?.id]);

  return (
    <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Header>
          <div>
            <h3>Add Process/ {folder.name}</h3>
          </div>
          <div>
            <CloseOutlined onClick={handleClose} />
          </div>
        </Header>
        <Content className="content">
          <input type="text" placeholder="Enter Process Name" name="process" value={process} onChange={(e) => setProcess(e.target.value)} />
        </Content>
        <h3>Process of {folder.name} </h3>
        <ol>
          {processList?.process?.map((i) => (
            <li>{i?.name}</li>
          ))}
        </ol>
        <Footer>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSubmit}>Add</button>
        </Footer>
      </Box>
    </Modal>
  );
};

export default AddFolderProcess;
