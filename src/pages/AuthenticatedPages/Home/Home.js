import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProcessList } from '../../../features/Group/groupslice';
import {
  AddProcessLink,
  Header,
  HeaderMessage,
  HeaderTableHeader,
  HomeContainer,
  HomeContent,
  HomeHeader,
  TableData
} from '../Group/Styled';

import { BookOutlined } from '@ant-design/icons';
import useGet from '../../../hooks/useGet';
import { Link } from 'react-router-dom';
import { PopoverContainer } from 'layout/LoginLayout/Style';
import { Button, Popover } from 'antd';

// Date formatting function
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
};

const Home = () => {
  const { mutateAsync: GroupListGet } = useGet();
  const { processList } = useSelector((state) => state.group);
  const [allProcess, setGetAllProcess] = useState(processList);
  const [popoverVisible, setPopoverVisible] = useState(false); //right click on group
  const [selectedGroup, setSelectedGroup] = useState(null); //right click on group

  const dispatch = useDispatch();

  const LoggedInName = localStorage.getItem('LoggedInName');

  const fetchData = () => {
    GroupListGet({
      url: 'group/list',
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
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setGetAllProcess(processList);
  }, [processList]);

  const showModal = (title) => {
    console.log(title);
  };
  const handleRightClick = (e, group) => {
    e.preventDefault();
    setSelectedGroup(group);
    setPopoverVisible(true);
  };

  return (
    <>
      <HomeContainer>
        <HomeHeader>
          <HeaderMessage>
            <span>Welcome, {LoggedInName}!</span>
          </HeaderMessage>
          <HeaderTableHeader>
            <div>Date Created</div>
            <div>Last Update</div>
            <div>Last Review</div>
          </HeaderTableHeader>
        </HomeHeader>
        <HomeContent>
          <TableData>
            <table>
              {allProcess?.map((i) => (
                <Popover
                  key={i.id}
                  content={
                    <>
                      <PopoverContainer>
                        <Button onClick={() => showModal('EditMember')}>Open</Button>
                        <Button onClick={() => showModal('Folder')}>
                          <Link to={`/add-process?id=${i.id}&name=${i.name}`}>Edit</Link>
                        </Button>
                        <Button onClick={() => showModal('EditMember')}>Delete</Button>
                      </PopoverContainer>
                    </>
                  }
                  trigger="contextMenu"
                  visible={popoverVisible && selectedGroup?.id === i.id}
                  onVisibleChange={(visible) => setPopoverVisible(visible)}
                  placement="rightTop"
                >
                  <tr>
                    <td className="Processname" onContextMenu={(e) => handleRightClick(e, i)}>
                      <div>
                        <BookOutlined />
                        <span>{i?.name}</span>
                      </div>
                    </td>
                    <td className="DateCreated">{formatDate(i?.createdAt)}</td>
                    <td className="LastUpdated">01-Aug-2023</td>
                    <td className="LastReview">01-Aug-2023</td>
                  </tr>
                </Popover>
              ))}
            </table>
          </TableData>
          <AddProcessLink>
            <span>
              Create a new process <Link to="/add-process">here</Link>
            </span>
          </AddProcessLink>
        </HomeContent>
      </HomeContainer>
    </>
  );
};

export default Home;
