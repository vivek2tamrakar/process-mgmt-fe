import React from 'react';
import { Space, Table, Tag } from 'antd';
import { TableContainer } from './Styled';

const CommonTable = ({ columns, data }) => {
  return (
    <>
      <TableContainer className="12345">
        <Table columns={columns} dataSource={data} />
      </TableContainer>
    </>
  );
};

export default CommonTable;
