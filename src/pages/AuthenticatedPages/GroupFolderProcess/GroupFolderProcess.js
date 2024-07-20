import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AddProcessLink, HeaderMessage, HeaderTableHeader, HomeContainer, HomeContent, HomeHeader, TableData } from './Styled';
import { BookOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import useGet from 'hooks/useGet';
import { getProcessList, getFolderList, getGroupList } from '../../../features/Group/groupslice';
import CommonModal from 'components/CommonModal/CommonModal';
import { PopoverContainer } from 'layout/LoginLayout/Style';
import { Button, Popover } from 'antd';
import { setSelectedProcess } from '../../../features/process/processSlice';
import { toast } from 'react-hot-toast';
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
  const userRole = localStorage.getItem('userRole');

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
  const companyId = localStorage.getItem('companyId');
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
        dispatch(getFolderList({ folderList: allFolder }));
        dispatch(getGroupList({ groupList: allGroups }));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            <span>
              <Link to="/home">Home</Link> {' > '} <Link to={`/group/${groupId}`}>{group?.name}</Link>
              {' > '} {folder?.name}
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
                      { parseInt(userRole) !== 5 && <><Button onClick={() => handleEditClick(i)}>Edit</Button>
                      <Button onClick={() => copy(i, 'COPY')}>Copy</Button>
                      <Button onClick={() => copy(i, 'MOVE')}>Move</Button>
                      <Button onClick={() => showModal('Process Delete', i)}>Delete</Button></>}
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
                    <td className="LastReview">{i?.step?.[0]?.lastReview ? formatDate(i?.step?.[0]?.lastReview) : ''}</td>
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
