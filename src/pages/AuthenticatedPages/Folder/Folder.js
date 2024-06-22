import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { GroupContainer, Header } from "./Styled";

const Folder = () => {
  const { folderId } = useParams();
  const folder = useSelector((state) =>
    state.group.folderList.find((g) => g.id.toString() === folderId)
  );
  return (
    <>
      <GroupContainer>
        <Header>
          <p>Process</p>
        </Header>
        {folder?.process?.map((item) => (
          <>{item.name}</>
        ))}
      </GroupContainer>
    </>
  );
};

export default Folder;
