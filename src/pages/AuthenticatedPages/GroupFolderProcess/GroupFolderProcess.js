import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AddProcessLink, HeaderMessage, HeaderTableHeader, HomeContainer, HomeContent, HomeHeader, TableData } from './Styled';
import { BookOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const GroupFolderProcess = () => {
  const { groupId, folderId } = useParams();
  const group = useSelector((state) => state.group.groupList.find((g) => g.id.toString() === groupId));
  const folder = group?.folder.find((f) => f.id.toString() === folderId);
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
                <tr>
                  <td className="Processname">
                    <div>
                      <BookOutlined />
                      <span>{i?.name}</span>
                    </div>
                  </td>
                  {/* <td className="DateCreated">{formatDate(i?.createdAt)}</td> */}
                  <td className="DateCreated">01-Aug-2023</td>
                  <td className="LastUpdated">01-Aug-2023</td>
                  <td className="LastReview">01-Aug-2023</td>
                </tr>
              ))}
            </table>
          </TableData>
          <AddProcessLink>
            <span>
              Create a new process <Link to="/add-process">here</Link>
            </span>
          </AddProcessLink>
        </HomeContent>
      </HomeContainer>
      {/* <div>
        <h2>{group?.name}</h2>
        <h2>{folder?.name}</h2>
        {folder?.process?.map((item) => (
          <>{item?.name}</>
        ))}
      </div> */}
    </>
  );
};

export default GroupFolderProcess;
