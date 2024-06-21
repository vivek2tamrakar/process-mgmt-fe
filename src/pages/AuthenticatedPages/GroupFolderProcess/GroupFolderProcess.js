import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const GroupFolderProcess = () => {
  const { groupId, folderId } = useParams();
  const group = useSelector((state) =>
    state.group.groupList.find((g) => g.id.toString() === groupId)
  );
  const folder = group?.folder.find((f) => f.id.toString() === folderId);
  return (
    <>
      <div>
        <h2>{folder?.name}</h2>
        {folder?.process?.map((item) => (
          <>{item?.name}</>
        ))}
      </div>
    </>
  );
};

export default GroupFolderProcess;
