// assets
import { DashboardOutlined, UserOutlined, WalletOutlined, BellOutlined } from '@ant-design/icons';

const Role = localStorage.getItem('role');

// icons
const icons = {
  DashboardOutlined,
  UserOutlined,
  BellOutlined,
  WalletOutlined
};

const dashboard = {
  id: 'group-dashboard',
  title: '',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
      role: ['1', '3']
    }
  ]
};

export default dashboard;
