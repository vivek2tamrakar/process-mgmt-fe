import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AddProcessLink, HeaderMessage, HeaderTableHeader, HomeContainer, HomeContent, HomeHeader, TableData } from './Styled';
import { BookOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import CommonModal from 'components/CommonModal/CommonModal';
import useGet from 'hooks/useGet';
import { getProcessList, getFolderList } from '../../../features/Group/groupslice';
import { PopoverContainer } from 'layout/LoginLayout/Style';
import { Button, Popover } from 'antd';
import { setSelectedProcess } from '../../../features/process/processSlice';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
};

const Folder = () => {
  const { mutateAsync: GroupListGet } = useGet();
  const { folderId } = useParams();
  const folder = useSelector((state) => state.group.folderList.find((g) => g.id.toString() === folderId));
  const [modalTitle, setModalTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedProcessName, setSelectedProcessName] = useState();
  const [processId, setProcessId] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRightClick = (e, group) => {
    e.preventDefault();
    setSelectedGroup(group);
    setPopoverVisible(true);
  };

  const showModal = (title, i) => {
    setModalTitle(title);
    setIsModalOpen(true);
    setProcessId(i?.id);
    setSelectedProcessName(i?.name);
  };

  const fetchData = () => {
    GroupListGet({
      url: 'group/list',
      type: 'details',
      token: true
    })
      .then((res) => {
        dispatch(getProcessList({ processList: res?.process }));
        dispatch(getFolderList({ folderList: res?.folder }));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            <span>
              Home {' > '} {folder?.name}
            </span>
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
              {folder?.process?.map((i) => (
                <Popover
                  key={i?.id}
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
                    <td className="LastUpdated">01-Aug-2023</td>
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
        folderId={folderId}
        fetchData={fetchData}
        processName={selectedProcessName}
        processId={processId}
      />
    </>
  );
};

export default Folder;
