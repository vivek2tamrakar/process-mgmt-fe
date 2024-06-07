import React, { useState, useEffect } from 'react';
import { Container, Header } from './UserStyles';
import InviteuserModal from './InviteuserModal';
import { Users } from 'constants/Table-columns/TableColumn';
import { Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Stack, Typography } from '@mui/material';
import useGet from 'hooks/useGet';
import { Link as RouterLink } from 'react-router-dom';
import Dot from 'components/@extended/Dot';
import { GetCompanyMemberbyID } from '../../constants/api';

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead sx={{ backgroundColor: '#ddd' }}>
      <TableRow>
        {Users.map((headCell) => (
          <TableCell
            key={headCell.id}
            sx={{ pt: '12px', pb: '12px' }}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
const User = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const { mutateAsync: UserListGet } = useGet();
  const [userList, setUserList] = useState([]);
  const CompanyId = JSON.parse(localStorage.getItem('user'));
  const fetchData = () => {
    UserListGet({
      url: `${GetCompanyMemberbyID}/${CompanyId?.id}`,
      type: 'details',
      token: true
    })
      .then((res) => {
        setUserList(res);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  const OrderStatus = ({ isActive }) => {
    let color;
    let title;

    switch (isActive) {
      case true:
        color = 'success';
        title = 'Active';
        break;
      case false:
        color = 'error';
        title = 'In Active';
        break;
      default:
        color = 'primary';
        title = 'None';
    }

    return (
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{
          justifyContent: 'end'
        }}
      >
        <Dot color={color} />
        <Typography>{title}</Typography>
      </Stack>
    );
  };
  return (
    <>
      <Container>
        <Header>
          <button onClick={handleOpen}>Invite User</button>
        </Header>
      </Container>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3
            }
          }}
        >
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {userList?.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow hover role="checkbox" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} tabIndex={0} key={row.index}>
                  <TableCell id={labelId} scope="row" align="left">
                    <Link color="secondary" component={RouterLink} to="">
                      {index + 1}
                    </Link>
                  </TableCell>

                  <TableCell align="left">{row.name ? row.name : '----'}</TableCell>
                  <TableCell align="left"> {row.email ? row.email : '----'}</TableCell>
                  <TableCell align="left"> {row.number ? row.number : '----'}</TableCell>

                  <TableCell align="center">
                    <div>
                      <OrderStatus isActive={row?.isActive} />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <InviteuserModal open={open} handleClose={handleClose} fetchData={fetchData} />
    </>
  );
};

export default User;
