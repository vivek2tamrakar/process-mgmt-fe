import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { TextField,FormControl, InputLabel, Select, MenuItem, Button, Grid, Typography } from '@mui/material';
import { Header, Footer, Content } from '../../pages/AddTaskModal/styled';
import { CloseOutlined } from '@ant-design/icons';
import usePost from 'hooks/usePost';
import { InviteUsers } from '../../constants/api';
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
      url: InviteUsers,
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
        {/* <Grid container spacing={2} fullWidth> */}
          <Header>
            <div>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Invite Users</Typography>
              </Grid>
            </div>
            <div>
              <CloseOutlined onClick={handleClose} />
            </div>
          </Header>
          <div style={{display:'block',width:'100%'}}>
          <div style={{display:'block',width:'100%'}}>
          <Grid item xs={12}>
          <FormControl fullWidth>
          {/* <InputLabel>Email</InputLabel> */}
          <TextField
          fullWidth
              type="email"
              name="groupName"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            </FormControl>
            </Grid>
            </div>
              <div style={{display:'block',width:'100%'}}>
            <Grid item xs={12} fullWidth>
              <FormControl fullWidth>
                <InputLabel fullWidth>Role</InputLabel>
                <Select fullWidth
                name='role' onChange={(e) => setRole(e.target.value)}
                >
                  <MenuItem value={3}>Manager</MenuItem>
                  <MenuItem value={4}>Task Manager</MenuItem>
                  <MenuItem value={5}>Employee</MenuItem>
                </Select>
              </FormControl>
            </Grid>
              </div>
            </div>
            <div style={{display:'block',width:'100%', marginTop:'5%'}}>
          <Footer>
            <button onClick={handleClose}>Cancel</button>
            <button onClick={handleSubmit}>Invite</button>
          </Footer>
          </div>
          {/* </Grid> */}
        </Box>
      </Modal>
    </>
  );
};

export default InviteuserModal;
