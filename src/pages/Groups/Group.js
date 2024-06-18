import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Group = () => {
  const { groupId } = useParams();
  const group = useSelector((state) => state.group.groupList.find((g) => g.id.toString() === groupId));
  return (
    <div>
      <h2>Group Name : {group?.name}</h2>
      <h2>Folder: </h2>
      {group?.folder?.map((folder) => (
        <div key={folder?.id}>
          <Link to={`/groups/${group?.id}/folders/${folder?.id}`}>{folder?.name}</Link>
        </div>
      ))}
      <h2>All Process : </h2>
      {group?.proces?.map((i) => (
        <>{i?.name}</>
      ))}
      <h2>All Assign Users : </h2>
      <ol>
        {group?.assign?.map((i) => (
          <li>{i?.user?.email}</li>
        ))}
      </ol>
    </div>
  );
};

export default Group;
