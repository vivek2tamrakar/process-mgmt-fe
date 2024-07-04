import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AddProcessLink, HeaderMessage, HeaderTableHeader, HomeContainer, HomeContent, HomeHeader, TableData } from './Styled';
import { BookOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import useGet from 'hooks/useGet';
import { getProcessList, getFolderList, getGroupList } from '../../../features/Group/groupslice';
import CommonModal from 'components/CommonModal/CommonModal';
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

const GroupFolderProcess = () => {
  const { mutateAsync: GroupListGet } = useGet();

  const { groupId, folderId } = useParams();
  const group = useSelector((state) => state.group.groupList.find((g) => g.id.toString() === groupId));
  const folder = group?.folder.find((f) => f.id.toString() === folderId);
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
        dispatch(getGroupList({ groupList: res?.group }));
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
              Home {' > '} {group?.name} {' > '} {folder?.name}
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
                    <td className="LastUpdated">{formatDate(i?.updatedAt)}</td>
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

export default GroupFolderProcess;
