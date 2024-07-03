import React, { useState, useEffect } from 'react';
import CommonModal from '../../../components/CommonModal/CommonModal';
import { Button } from 'antd';
import useGet from '../../../hooks/useGet';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from '../../../features/User/userslice';
import { ButtonBox, Header, TitleBox, UserContainer } from './Styled';
import CommonTable from '../../../components/CommonTable/CommonTable';
import { UserColumns } from '../../../constants/Tablecolumns';

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutateAsync: UserListGet } = useGet();
  const { userList } = useSelector((state) => state.user);
  const [allUsers, setAllUsers] = useState(userList);
  const [userTitle, setUserTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userData, setUserData] = useState('');
  const dispatch = useDispatch();
  const CompanyId = localStorage.getItem('companyId');

  const fetchData = () => {
    UserListGet({
      url: `users/list/${CompanyId}`,
      type: 'details',
      token: true
    })
      .then((res) => {
        dispatch(getUserList({ userList: res }));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setAllUsers(userList);
  }, [userList]);

  const handleInviteUserModal = () => {
    setUserTitle('Users');
    setIsModalOpen(true);
  };

  const handleEditUser = (record) => {
    setUserData(record);
    setUserId(record?.id);
    setUserName(record?.name);
    setUserTitle('UsersEdit');
    setIsModalOpen(true);
  };

  const handleDeleteUser = (record) => {
    setUserData(record);
    setUserId(record?.id);
    setUserName(record?.name);
    setUserTitle('UsersDelete');
    setIsModalOpen(true);
  };
  return (
    <>
      <UserContainer>
        <Header>
          <TitleBox>
            <p>Users</p>
          </TitleBox>
          <ButtonBox>
            <Button type="primary" onClick={handleInviteUserModal}>
              Invite Users
            </Button>
          </ButtonBox>
        </Header>
        <CommonTable columns={UserColumns(handleEditUser, handleDeleteUser)} data={allUsers} />
      </UserContainer>
      <CommonModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title={userTitle} fetchData={fetchData} userData={userData} />
    </>
  );
};

export default Users;
