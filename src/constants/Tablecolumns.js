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
    title: 'Number',
    dataIndex: 'mobileNumber',
    key: 'mobileNumber',
    width: '33.33%'
  },
  {
    title: 'isActive',
    dataIndex: 'isActive',
    key: 'isActive',
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
