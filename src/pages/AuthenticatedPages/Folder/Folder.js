import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AddProcessLink, HeaderMessage, HeaderTableHeader, HomeContainer, HomeContent, HomeHeader, TableData } from './Styled';
import { BookOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Folder = () => {
  const { folderId } = useParams();
  const folder = useSelector((state) => state.group.folderList.find((g) => g.id.toString() === folderId));
  return (
    <>
      <HomeContainer>
        <HomeHeader>
          <HeaderMessage>
            <span>
              Home {' > '} {folder?.name}
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
    </>
  );
};

export default Folder;
