import React, { useEffect, useState } from 'react';
import useGet from 'hooks/useGet';
import { Container, Groups, Header, GroupContainer } from '../dashboard/DashboardStyle';
import AddMemberModal from './AddMemberModal';
import { getGroupList } from 'store/reducers/group';
import { useDispatch, useSelector } from 'react-redux';
import { GetGroupList } from '../../constants/api';

const DashboardDefault = () => {
  const { mutateAsync: UserListGet } = useGet();
  const { groupList } = useSelector((state) => state.group);
  const [userList, setUserList] = useState(groupList);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = (id, name) => {
    setSelectedGroup({ id, name });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [selectedGroup, setSelectedGroup] = useState({ id: '', name: '' });

  const fetchData = () => {
    UserListGet({
      url: GetGroupList,
      type: 'details',
      token: true
    })
      .then((res) => {
        dispatch(getGroupList({ groupList: res?.group }));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    // if (groupList?.length) {
    setUserList(groupList);
    // }
  }, [groupList]);
  return (
    <>
      <Container>
        <Header>
          <h2>Groups</h2>
        </Header>
        <GroupContainer>
          {userList?.map((item) => (
            <Groups className="ok">
              <p>{item.name}</p>
              <button onClick={() => handleOpen(item.id, item.name)}>Assign Member</button>
            </Groups>
          ))}
        </GroupContainer>
      </Container>
      <AddMemberModal open={open} handleClose={handleClose} group={selectedGroup} />
    </>
  );
};

export default DashboardDefault;
