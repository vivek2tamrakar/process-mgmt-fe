import { lazy } from 'react';
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import { element } from 'prop-types';
import AuthWrapper from 'pages/authentication/AuthWrapper';
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
    // {
    //   path: '*',
    //   element: <AuthWrapper />
    // },
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
    }
  ]
};

export default MainRoutes;
