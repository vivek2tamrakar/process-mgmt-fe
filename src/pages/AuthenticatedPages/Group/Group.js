import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { GroupContainer, Header } from "./Styled";

const Group = () => {
  const { groupId } = useParams();
  const group = useSelector((state) =>
    state.group.groupList.find((g) => g.id.toString() === groupId)
  );
  console.log(group, "sdfghj");
  return (
    <>
      <GroupContainer>
        <Header>
          <p>Process</p>
        </Header>
        {group?.proces?.map((item) => (
          <>{item.name}</>
        ))}
        <Header>
          <p>Users</p>
        </Header>
        {group?.assign?.map((item) => (
          <p>{item?.user?.email}</p>
        ))}
      </GroupContainer>
    </>
  );
};

export default Group;
