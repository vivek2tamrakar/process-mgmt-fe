import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFolderList, getGroupList, getProcessList } from '../../../features/Group/groupslice';
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
import { toast } from 'react-hot-toast';
import { BookOutlined } from '@ant-design/icons';
import useGet from '../../../hooks/useGet';
import { useNavigate } from 'react-router-dom';
import { PopoverContainer } from 'layout/LoginLayout/Style';
import { Button, Popover } from 'antd';
import CommonModal from 'components/CommonModal/CommonModal';

// Date formatting function
const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) {
    return 'Invalid Date'; // Or any default value you prefer
  }
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
  const companyId = localStorage.getItem('companyId');
  const userRole = localStorage.getItem('userRole');
  console.log('LoggedInData',companyId)
  const fetchData = () => {
    GroupListGet({
      url: 'group/list/'+companyId,
      type: 'details',
      token: true
    })
      .then((res) => {
        const allGroups = [...(res?.group || []), ...(res?.assignGroup || [])] 
        const allFolder = [...(res?.folder || []), ...(res?.assignFolder || [])]
        const allProcesses = [...(res?.folder || []), ...(res?.assignProcess || [])]
        dispatch(getProcessList({ processList: allProcesses }));
        dispatch(getGroupList({ groupList: allGroups}));
        dispatch(getFolderList({ folderList: allFolder }));
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

  const copy = async (process, type) => {
    try {
      await navigator.clipboard.writeText(process.id+"_"+type);
      toast.success('Process Copied.');
      setPopoverVisible(false);
    }
    catch(err) {
      console.log(err)
    }
  }

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
                    <>
                     {(parseInt(userRole) === 4 || parseInt(userRole) === 3 || parseInt(userRole) === 2) && (
                      <PopoverContainer>
                      <Button onClick={() => handleOpenClick(i)}>Open</Button>
                      <Button onClick={() => handleEditClick(i)}>Edit</Button>
                      <Button onClick={() => copy(i, 'COPY')}>Copy</Button>
                      <Button onClick={() => copy(i, 'MOVE')}>Move</Button>
                      <Button onClick={() => showModal('Process Delete', i)}>Delete</Button>
                    </PopoverContainer>
                     )}
                     {(parseInt(userRole) === 5) && (
                      <PopoverContainer>
                      <Button onClick={() => handleOpenClick(i)}>Open</Button>
                    </PopoverContainer>
                     )}
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
                    <td className="LastUpdated">{formatDate(i?.updatedAt)}</td>
                    <td className="LastReview"></td>
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
