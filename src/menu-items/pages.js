// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'authentication',
  title: 'Authentication',
  type: 'group',
  children: [
    {
      id: 'login1',
      title: 'Login',
      type: 'item',
      url: '/',
      icon: icons.LoginOutlined,
      target: true
    },

    {
      id: 'forgot',
      title: 'forgotpassword',
      type: 'item',
      url: '/forgot-password',
      icon: icons.ProfileOutlined,
      target: true
    }
  ]
};

export default pages;
