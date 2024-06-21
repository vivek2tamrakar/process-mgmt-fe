import React, { useState, useEffect } from "react";
import { Input, Modal } from "antd";
import usePost from "../../../src/hooks/usePost";
import { BoxInput } from "../../pages/authentication/styles";
import useDelete from "../../hooks/useDelete";
import { Select } from "antd";
import useGet from "../../hooks/useGet";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../../features/User/userslice";
import usePatch from "../../hooks/usePatch";

const CommonModal = ({
  isModalOpen,
  setIsModalOpen,
  title,
  fetchData,
  groupId,
  folderId,
  groupName,
  groupAssignUsers,
}) => {
  const { mutateAsync: CommonAdd } = usePost();
  const { mutateAsync: CommonDelete } = useDelete();
  const { mutateAsync: CommonPatch } = usePatch();
  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  // get users
  const { mutateAsync: UserListGet } = useGet();
  const { userList } = useSelector((state) => state.user);
  const [allUsers, setAllUsers] = useState(userList);
  const dispatch = useDispatch();
  const CompanyId = localStorage.getItem("companyId");
  const [assignUserId, setAssignUserId] = useState([]);
  //get users
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmitGroup = () => {
    const payload = {
      name,
    };
    CommonAdd({
      url: "group",
      type: "details",
      payload: payload,
      token: true,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        setName("");
        fetchData();
        handleCancel();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubmitFolder = () => {
    const payload = {
      name,
      groupId,
    };

    CommonAdd({
      url: "folder",
      type: "details",
      payload: payload,
      token: true,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        setName("");
        fetchData();
        handleCancel();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubmitProcess = () => {
    const payload = {
      name,
      groupId,
      folderId,
    };
    CommonAdd({
      url: "process",
      type: "details",
      payload: payload,
      token: true,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        setName("");
        fetchData();
        handleCancel();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleAddUser = () => {
    const payload = {
      email: userEmail,
      role: 3,
    };
    CommonAdd({
      url: "users",
      type: "details",
      payload: payload,
      token: true,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        setUserEmail("");
        fetchData();
        handleCancel();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleGroupDelete = () => {
    CommonDelete({
      url: `group/${groupId}`,
      type: "details",
      token: true,
    })
      .then((res) => {
        fetchData();
        handleCancel();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
    setAssignUserId(value);
  };

  const fetchUserData = () => {
    UserListGet({
      url: `users/list/${CompanyId}`,
      type: "details",
      token: true,
    })
      .then((res) => {
        dispatch(getUserList({ userList: res }));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    setAllUsers(userList);
  }, [userList]);

  const userOptions = allUsers.map((user) => ({
    label: user.email,
    value: user.id,
  }));

  const defaultUserOptions = groupAssignUsers.map((i) => ({
    label: i?.user?.email,
    value: i?.user.id,
  }));
  console.log(defaultUserOptions, "defaultUserOptions");

  const AssignUser = () => {
    const payload = {
      groupId,
      assignUserId,
    };

    CommonPatch({
      url: "assign",
      type: "details",
      payload: payload,
      token: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        fetchData();
        handleCancel();
        setAssignUserId("");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      {title === "Group" && (
        <Modal
          title="Add Group"
          open={isModalOpen}
          onOk={handleSubmitGroup}
          onCancel={handleCancel}
        >
          <BoxInput>
            <label>Group Name</label>
            <Input
              size="large"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Group Name"
            />
          </BoxInput>
        </Modal>
      )}

      {title === "EditMember" && (
        <Modal
          title="Add Group"
          open={isModalOpen}
          onOk={AssignUser}
          onCancel={handleCancel}
        >
          <BoxInput>
            <label>Group Name</label>
            <Input size="large" value={groupName} />
          </BoxInput>

          <BoxInput>
            <label>Assign User To New Group</label>
            <Select
              mode="tags"
              size="large"
              placeholder="Please select"
              // defaultValue={defaultUserOptions}
              onChange={(value) => setAssignUserId(value)}
              style={{
                width: "100%",
              }}
              options={userOptions}
            />
          </BoxInput>
        </Modal>
      )}

      {title === "Folder" && (
        <Modal
          title="Add Folder"
          open={isModalOpen}
          onOk={handleSubmitFolder}
          onCancel={handleCancel}
        >
          <BoxInput>
            <label>Folder Name</label>
            <Input
              size="large"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Folder Name"
            />
          </BoxInput>
        </Modal>
      )}

      {title === "Process" && (
        <Modal
          title="Add Process"
          open={isModalOpen}
          onOk={handleSubmitProcess}
          onCancel={handleCancel}
        >
          <BoxInput>
            <label>Process Name</label>
            <Input
              size="large"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Process Name"
            />
          </BoxInput>
        </Modal>
      )}

      {title === "Users" && (
        <Modal
          title="Invite Users"
          open={isModalOpen}
          onOk={handleAddUser}
          onCancel={handleCancel}
        >
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
        </Modal>
      )}

      {title === "Delete" && (
        <Modal
          title="Delete Group"
          open={isModalOpen}
          onOk={handleGroupDelete}
          onCancel={handleCancel}
        >
          <p>
            Are You Sure To Delete <b>{groupName}</b>
          </p>
        </Modal>
      )}
    </>
  );
};

export default CommonModal;
