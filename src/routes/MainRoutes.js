import { lazy } from 'react';
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import User from 'pages/users/User';
import Folder from 'pages/Folders/Folder';
import Group from 'pages/Groups/Group';
import ProcessinFolder from 'pages/ProcessinFolder/ProcessinFolder';
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const ChangepassWord = Loadable(lazy(() => import('pages/authentication/ChangePassword')));
const MainRoutes = {
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: '*',
      element: <DashboardDefault />
    },
    {
      path: 'color',
      element: <Color />
    },

    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },

    {
      path: 'change-password',
      element: <ChangepassWord />
    },
    {
      path: 'users',
      element: <User />
    },
    {
      path: 'groups/:groupId/folders/:folderId',
      element: <Folder />
    },
    {
      path: 'groups/:groupId',
      element: <Group />
    },
    {
      path: 'process/:folderId',
      element: <ProcessinFolder />
    }
  ]
};

export default MainRoutes;
