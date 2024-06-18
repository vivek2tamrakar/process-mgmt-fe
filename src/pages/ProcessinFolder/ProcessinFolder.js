import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProcessinFolder = () => {
  const { folderId } = useParams(); // Get folderId from URL
  const { folderList } = useSelector((state) => state.group);
  const [processes, setProcesses] = useState([]);

  useEffect(() => {
    const folder = folderList.find((folder) => folder.id === parseInt(folderId));
    if (folder) {
      setProcesses(folder.process);
    }
  }, [folderId, folderList]);

  return (
    <>
      <ul>
        {processes.map((process) => (
          <li key={process.id}>{process.name}</li>
        ))}
      </ul>
    </>
  );
};

export default ProcessinFolder;
