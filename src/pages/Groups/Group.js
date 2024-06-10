import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Group = () => {
  const { groupId } = useParams();
  const group = useSelector((state) => state.group.groupList.find((g) => g.id.toString() === groupId));
  console.log(group, 'group');
  return (
    <div>
      <h2>Group Name : {group?.name}</h2>
      <h2>Folder</h2>
      {group?.folder?.map((folder) => (
        <div key={folder?.id}>
          <Link to={`/groups/${group?.id}/folders/${folder?.id}`}>{folder?.name}</Link>
        </div>
      ))}
      <h2>Process</h2>
      {group?.proces?.map((i) => (
        <>{i?.name}</>
      ))}
    </div>
  );
};

export default Group;
