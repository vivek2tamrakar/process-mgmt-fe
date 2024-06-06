import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Header, Footer, Content } from '../../pages/AddTaskModal/styled';
import { CloseOutlined } from '@ant-design/icons';
import usePost from 'hooks/usePost';
import useGet from 'hooks/useGet';
import { Select, MenuItem } from '@mui/material';

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

const AddMemberModal = ({ open, handleClose, group }) => {
  const { mutateAsync: UserListGet } = useGet();
  const { mutateAsync: AssignedMembers } = useGet();
  const [userList, setUserList] = useState([]);
  const [assignMemberList, setAssignMemberList] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');

  const { mutateAsync: AddMember } = usePost();
  const companyData = JSON.parse(localStorage.getItem('user'));
  const CompanyId = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = () => {
    const payload = { userId: companyData?.id, assignUserId: selectedUserId, groupId: group?.id };
    AddMember({
      url: 'http://192.168.29.229:3004/api/assign',
      type: 'details',
      payload: payload,
      token: true,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then((res) => {
        fetchData();
        handleClose();
        fetchAssignedMembers();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const fetchData = () => {
    UserListGet({
      url: `http://192.168.29.229:3004/api/users/list/${CompanyId.id}`,
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

  const fetchAssignedMembers = () => {
    AssignedMembers({
      url: `http://192.168.29.229:3004/api/group/id/${group?.id}`,
      type: 'details',
      token: true
    })
      .then((res) => {
        setAssignMemberList(res);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchAssignedMembers();
  }, [group?.id]);
  console.log(assignMemberList, 'group?.id');

  return (
    <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Header>
          <div>
            <h3>Assign Member / {group.name}</h3>
          </div>
          <div>
            <CloseOutlined onClick={handleClose} />
          </div>
        </Header>
        <Content className="content">
          <Select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)} displayEmpty fullWidth>
            <MenuItem value="" disabled>
              Select a user
            </MenuItem>
            {userList.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.email}
              </MenuItem>
            ))}
          </Select>
        </Content>
        <h3>Assigned Members : </h3>
        <ol>
          {assignMemberList?.assign?.map((i) => (
            <li>{i?.user?.email}</li>
          ))}
        </ol>
        <Footer>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSubmit}>Invite</button>
        </Footer>
      </Box>
    </Modal>
  );
};

export default AddMemberModal;
