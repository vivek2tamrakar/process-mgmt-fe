import { Space, Button } from 'antd';

export const UserColumns = (handleEditUser, handleDeleteUser) => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: '33.33%'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: '33.33%',
    textAlign: 'center'
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: (role) => {
      let roleName = '';
      switch (role) {
        case 3:
          roleName = 'Owner';
          break;
        case 4:
          roleName = 'Manager';
          break;
        case 5:
          roleName = 'Employee';
          break;
        default:
          roleName = 'Unknown';
      }
      return <span>{roleName}</span>;
    }
  },
  {
    title: 'Status',
    dataIndex: 'isActive',
    key: 'isActive',
    render: (isActive) => <span>{isActive ? 'Active' : 'Inactive'}</span>,
    width: '33.33%'
  },
  {
    title: 'Actions',
    dataIndex: 'action',
    key: 'action',
    width: '25%',
    render: (_, record) => (
      <Space size="middle">
        <Button type="link" onClick={() => handleEditUser(record)}>
          Edit
        </Button>
        <Button type="link" danger onClick={() => handleDeleteUser(record)}>
          Delete
        </Button>
      </Space>
    )
  }
];
