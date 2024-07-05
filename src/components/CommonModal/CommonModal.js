import React, { useState, useEffect } from 'react';
import { Input, Modal } from 'antd';
import usePost from '../../../src/hooks/usePost';
import { BoxInput } from '../../pages/authentication/styles';
import useDelete from '../../hooks/useDelete';
import { Select } from 'antd';
import useGet from '../../hooks/useGet';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from '../../features/User/userslice';
import usePatch from '../../hooks/usePatch';
import { toast } from 'react-hot-toast';

const CommonModal = ({
  isModalOpen,
  setIsModalOpen,
  title,
  groupAssignUsers,
  folderAssignUsers,
  fetchData,
  setGroupId,
  userData,
  groupName,
  groupId,
  folderName,
  folderId,
  processName,
  processId
}) => {
  const { mutateAsync: CommonAdd } = usePost();
  const { mutateAsync: CommonDelete } = useDelete();
  const { mutateAsync: CommonPatch } = usePatch();
  const [name, setName] = useState('');
  // Add Procedd State
  const [tags, setTag] = useState('');
  const [description, setDescription] = useState('');
  // Add Procedd State
  const [rename, setRename] = useState('');
  const [heading, setHeading] = useState('');
  const [userEmail, setUserEmail] = useState('');
  // get users
  const { mutateAsync: UserListGet } = useGet();
  const { userList } = useSelector((state) => state.user);
  const [allUsers, setAllUsers] = useState(userList);
  const dispatch = useDispatch();
  const CompanyId = localStorage.getItem('companyId');
  const [assignUserId, setAssignUserId] = useState([]);
  const [assignfolderUserId, setAssignfolderUserId] = useState([]);
  //get users
  //user edit
  const [userName, setUserName] = useState('');
  const [isActive, setIsActive] = useState('');
  const [role, setRole] = useState('');

  const roles = [
    { label: 'Owner', value: 3 },
    { label: 'Manager', value: 4 },
    { label: 'Employee', value: 5 }
  ];

  const statusOptions = [
    { label: 'Active', value: true },
    { label: 'InActive', value: false }
  ];
  //user edit
  const handleCancel = () => {
    setIsModalOpen(false);
    setName('');
  };

  const handleSubmitGroup = () => {
    const payload = {
      name
    };
    CommonAdd({
      url: 'group',
      type: 'details',
      payload: payload,
      token: true,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then((res) => {
        setName('');
        toast.success('Group Created successfully!');
        fetchData();
        handleCancel();
      })
      .catch((error) => {
        if (error?.data?.message === 'GROUP_NAME_ALREADY_EXIST') {
          toast.error('Group name already exist!');
        } else {
          toast.error('Server Error');
        }
      });
  };

  const handleSubmitFolder = () => {
    const payload = {
      name,
      groupId
    };

    CommonAdd({
      url: 'folder',
      type: 'details',
      payload: payload,
      token: true,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then((res) => {
        setName('');
        toast.success('Folder Created successfully!');
        fetchData();
        handleCancel();
      })
      .catch((error) => {
        if (error?.data?.message === 'FOLDER_NAME_ALREADY_EXIST') {
          toast.error('Folder name already exist!');
        } else {
          toast.error('Server Error!');
        }
      });
  };

  const handleSubmitProcess = () => {
    const payload = {
      name,
      groupId,
      folderId,
      tags,
      description
    };
    CommonAdd({
      url: 'process',
      type: 'details',
      payload: payload,
      token: true,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then((res) => {
        setName('');
        setTag('');
        setDescription('');
        toast.success('Process Created successfully!');
        fetchData();
        handleCancel();
      })
      .catch((error) => {
        if (error?.data?.message === 'PROCESS_NAME_ALREADY_EXIST') {
          toast.error('Process name already exist!');
        } else {
          toast.error('Server Error!');
        }
      });
  };

  const handleAddUser = () => {
    const payload = {
      email: userEmail,
      role: assignUserId
    };
    CommonAdd({
      url: 'users',
      type: 'details',
      payload: payload,
      token: true,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then((res) => {
        setUserEmail('');
        toast.success('User added successfully!');

        fetchData();
        handleCancel();
      })
      .catch((error) => {
        if (error?.data?.message === 'EMAIL_ALREADY_EXIST') {
          toast.error('Email Address already exist!');
        } else {
          toast.error('Server Error');
        }
        console.error('Error:', error);
      });
  };

  const handleGroupDelete = () => {
    CommonDelete({
      url: `group/${groupId}`,
      type: 'details',
      token: true
    })
      .then((res) => {
        setGroupId('');
        toast.success('Group Deleted successfully!');
        fetchData();
        handleCancel();
      })
      .catch((err) => {
        toast.error('Server Error!');
        console.error(err);
      });
  };

  const handleFolderDelete = () => {
    CommonDelete({
      url: `folder/${folderId}`,
      type: 'details',
      token: true
    })
      .then((res) => {
        toast.success('Folder Deleted successfully!');
        fetchData();
        handleCancel();
      })
      .catch((err) => {
        toast.success('Server error!');
        console.error(err);
      });
  };

  const handleProcessDelete = () => {
    CommonDelete({
      url: `process/${processId}`,
      type: 'details',
      token: true
    })
      .then((res) => {
        toast.success('Process Deleted successfully!');
        fetchData();
        handleCancel();
      })
      .catch((err) => {
        toast.error('Server error!');
        console.error(err);
      });
  };

  const handleUserDelete = () => {
    CommonDelete({
      url: `users/${userData?.id}`,
      type: 'details',
      token: true
    })
      .then((res) => {
        toast.success('User Deleted successfully!');
        fetchData();
        handleCancel();
      })
      .catch((err) => {
        toast.error('Server error!');
        console.error(err);
      });
  };

  const fetchUserData = () => {
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
    fetchUserData();
  }, []);

  useEffect(() => {
    setAllUsers(userList);
  }, [userList]);

  const userOptions = allUsers?.map((user) => ({
    label: user.email,
    value: user.id
  }));

  useEffect(() => {
    const defaultUserOptions = groupAssignUsers?.map((i) => ({
      label: i?.user?.email,
      value: i?.user.id
    }));
    setAssignUserId(defaultUserOptions);
  }, [groupAssignUsers]);

  useEffect(() => {
    const defaultUserOptions = folderAssignUsers?.map((i) => ({
      label: i?.user?.email,
      value: i?.user.id
    }));
    setAssignfolderUserId(defaultUserOptions);
  }, [folderAssignUsers]);

  const AssignUser = () => {
    const payload = {
      groupId,
      assignUserId
    };

    CommonPatch({
      url: 'assign',
      type: 'details',
      payload: payload,
      token: true,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
        toast.success('User Assign Successfully !');
        fetchData();
        handleCancel();
        setAssignUserId('');
        setAssignfolderUserId('');
      })
      .catch((err) => {
        toast.error('server error !');
        console.error(err);
      });
  };

  // const AssignUserFolder = () => {
  //   const payload = {
  //     folderId,
  //     assignUserId: assignfolderUserId
  //   };

  //   CommonPatch({
  //     url: 'assign',
  //     type: 'details',
  //     payload: payload,
  //     token: true,
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     }
  //   })
  //     .then((res) => {
  //       fetchData();
  //       handleCancel();
  //       setAssignUserId('');
  //       setAssignfolderUserId('');
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  const EditUser = () => {
    const payload = {
      id: userData?.id,
      name: userName || userData?.name,
      role: role || userData?.role,
      isActive: isActive
    };

    CommonPatch({
      url: 'users',
      type: 'details',
      payload: payload,
      token: true,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
        toast.success('User Updated successfully!');
        setUserName('');
        fetchData();
        handleCancel();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const Rename = () => {
    let payload = {
      name: rename,
      ProcessId: processId
    };

    if (groupId && folderId) {
      payload = {
        ...payload,
        folderId
      };
    } else {
      if (groupId) {
        payload = {
          ...payload,
          groupId
        };
      }
      if (folderId) {
        payload = {
          ...payload,
          folderId
        };
      }
    }

    CommonPatch({
      url: 'group',
      type: 'details',
      payload: payload,
      token: true,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
        toast.success('Name Changed Successfully !');
        fetchData();
        handleCancel();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (userData) {
      setUserName(userData.name || '');
      setUserEmail(userData.email || '');
      // setIsActive(userData.isActive || '');
      setIsActive(userData.isActive !== undefined ? userData.isActive : '');
      setRole(userData.role || '');
    }
  }, [userData]);

  useEffect(() => {
    if (title === 'Rename') {
      if (groupName) {
        setRename(groupName);
        setHeading(groupName);
      }
      if (folderName) {
        setRename(folderName);
        setHeading(folderName);
      }
      if (processName) {
        setRename(processName);
        setHeading(processName);
      }
    }
  }, [title, groupName, folderName, processName]);

  return (
    <>
      {title === 'Group' && (
        <Modal title="Add Group" open={isModalOpen} onOk={handleSubmitGroup} onCancel={handleCancel}>
          <BoxInput>
            <label>Group Name</label>
            <Input size="large" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Group Name" />
          </BoxInput>
        </Modal>
      )}

      {title === 'EditMember' && (
        <Modal title={`Edit Members > ${groupName}`} open={isModalOpen} onOk={AssignUser} onCancel={handleCancel}>
          <BoxInput>
            <label>Assign Users</label>
            <Select
              mode="tags"
              size="large"
              placeholder="Please select"
              onChange={(value) => setAssignUserId(value)}
              style={{
                width: '100%'
              }}
              options={userOptions}
              value={assignUserId}
            />
          </BoxInput>
        </Modal>
      )}

      {/* {title === 'EditFolderMember' && (
        <Modal title={`Edit Members > ${folderName}`} open={isModalOpen} onOk={AssignUserFolder} onCancel={handleCancel}>
          <BoxInput>
            <label>Assign Users</label>
            <Select
              mode="tags"
              size="large"
              placeholder="Please select"
              onChange={(value) => setAssignfolderUserId(value)}
              style={{
                width: '100%'
              }}
              options={userOptions}
              value={assignfolderUserId}
            />
          </BoxInput>
        </Modal>
      )}  */}

      {title === 'Folder' && (
        <Modal title="Add Folder" open={isModalOpen} onOk={handleSubmitFolder} onCancel={handleCancel}>
          <BoxInput>
            <label>Folder Name</label>
            <Input size="large" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Folder Name" />
          </BoxInput>
        </Modal>
      )}

      {title === 'Process' && (
        <Modal title="Add Process" open={isModalOpen} onOk={handleSubmitProcess} onCancel={handleCancel}>
          <BoxInput>
            <label>Process Name</label>
            <Input size="large" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Process Name" />
          </BoxInput>
          <BoxInput>
            <label>Add #Tags</label>
            <Input size="large" type="text" value={tags} onChange={(e) => setTag(e.target.value)} placeholder="Enter Add #Tags" />
          </BoxInput>
          <BoxInput>
            <label>Add Description</label>
            <Input
              size="large"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
            />
          </BoxInput>
        </Modal>
      )}

      {title === 'Users' && (
        <Modal title="Invite Users" open={isModalOpen} onOk={handleAddUser} onCancel={handleCancel}>
          <BoxInput>
            <label>Email Address</label>
            <Input
              size="large"
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Address@workemail.com"
            />
          </BoxInput>
          <BoxInput>
            <label>Role</label>
            <Select
              size="large"
              placeholder="Please select Role"
              onChange={(value) => setAssignUserId(value)}
              style={{ width: '100%' }}
              options={roles}
              value={assignUserId}
            />
          </BoxInput>
        </Modal>
      )}

      {title === 'DeleteGroup' && (
        <Modal title="Delete Group" open={isModalOpen} onOk={handleGroupDelete} onCancel={handleCancel}>
          <p>
            Are You Sure To Delete <b>{groupName}</b>
          </p>
        </Modal>
      )}

      {title === 'Folder Delete' && (
        <Modal title="Delete Folder" open={isModalOpen} onOk={handleFolderDelete} onCancel={handleCancel}>
          <p>
            Are You Sure To Delete <b>{folderName}</b>
          </p>
        </Modal>
      )}

      {title === 'Process Delete' && (
        <Modal title="Delete Process" open={isModalOpen} onOk={handleProcessDelete} onCancel={handleCancel}>
          <p>
            Are You Sure To Delete <b>{processName}</b>
          </p>
        </Modal>
      )}

      {title === 'UsersDelete' && (
        <Modal title="Delete User" open={isModalOpen} onOk={handleUserDelete} onCancel={handleCancel}>
          <p>
            Are You Sure To Delete <b>{userData?.name}</b>
          </p>
        </Modal>
      )}

      {title === 'UsersEdit' && (
        <Modal title="Edit User" open={isModalOpen} onOk={EditUser} onCancel={handleCancel}>
          <BoxInput>
            <label>Name</label>
            <Input
              size="large"
              type="text"
              defaultV
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter  Name"
            />
          </BoxInput>
          <BoxInput>
            <label>Email</label>
            <Input size="large" value={userData?.email} />
          </BoxInput>
          <BoxInput>
            <label>Role</label>
            <Select
              size="large"
              placeholder="Please select Role"
              onChange={(value) => setRole(value)}
              style={{ width: '100%' }}
              options={roles}
              value={role}
            />
          </BoxInput>
          <BoxInput>
            <label>Status</label>
            <Select
              size="large"
              placeholder="Please select Status"
              onChange={(value) => setIsActive(value)}
              style={{ width: '100%' }}
              options={statusOptions}
              value={isActive}
            />
          </BoxInput>
        </Modal>
      )}

      {title === 'Rename' && (
        <Modal title={heading} open={isModalOpen} onOk={Rename} onCancel={handleCancel}>
          <BoxInput>
            <label>Rename</label>
            <Input size="large" type="text" value={rename} onChange={(e) => setRename(e.target.value)} placeholder="Enter Name" />
          </BoxInput>
        </Modal>
      )}
    </>
  );
};

export default CommonModal;
