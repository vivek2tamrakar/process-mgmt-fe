import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProcessList } from '../../../features/Group/groupslice';
import { setSelectedProcess } from '../../../features/process/processSlice';
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
import { useNavigate } from 'react-router-dom';
import { PopoverContainer } from 'layout/LoginLayout/Style';
import { Button, Popover } from 'antd';
import CommonModal from 'components/CommonModal/CommonModal';

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
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [selectedProcessName, setSelectedProcessName] = useState();
  const [processId, setProcessId] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const showModal = (title, i) => {
    setModalTitle(title);
    setSelectedProcessName(i?.name);
    setIsModalOpen(true);
    setProcessId(i?.id);
  };

  const handleRightClick = (e, group) => {
    e.preventDefault();
    setSelectedGroup(group);
    setPopoverVisible(true);
  };

  const handleEditClick = (process) => {
    dispatch(setSelectedProcess(process));
    navigate('/add-process');
  };
  const handleOpenClick = (process) => {
    dispatch(setSelectedProcess(process));
    navigate('/open-process');
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
                    <PopoverContainer>
                      <Button onClick={() => handleOpenClick(i)}>Open</Button>
                      <Button onClick={() => handleEditClick(i)}>Edit</Button>
                      <Button onClick={() => showModal('Process Delete', i)}>Delete</Button>
                    </PopoverContainer>
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
                    <td className="LastUpdated">{i?.updatedAt}</td>
                    <td className="LastReview">01-Aug-2023</td>
                  </tr>
                </Popover>
              ))}
            </table>
          </TableData>
          <AddProcessLink>
            <span>
              Create a new process <a onClick={() => showModal('Process')}>here</a>
            </span>
          </AddProcessLink>
        </HomeContent>
      </HomeContainer>
      <CommonModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title={modalTitle}
        fetchData={fetchData}
        processName={selectedProcessName}
        processId={processId}
      />
    </>
  );
};

export default Home;
