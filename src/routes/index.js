import { useRoutes } from 'react-router-dom';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';

export default function ThemeRoutes() {
  const accessToken = localStorage.getItem('token');
  if (accessToken) {
    return useRoutes([MainRoutes]);
  } else {
    return useRoutes([LoginRoutes]);
  }
}
