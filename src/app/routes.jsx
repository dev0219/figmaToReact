import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthGuard from './auth/AuthGuard';
import { authRoles } from './auth/authRoles';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';

// session pages
const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));
const JwtLogin = Loadable(lazy(() => import('app/views/sessions/JwtLogin')));
const JwtRegister = Loadable(lazy(() => import('app/views/sessions/JwtRegister')));
const ForgotPassword = Loadable(lazy(() => import('app/views/sessions/ForgotPassword')));

// echart page
const AppEchart = Loadable(lazy(() => import('app/views/charts/echarts/AppEchart')));

// dashboard page
const Analytics = Loadable(lazy(() => import('app/views/dashboard/Analytics')));
const PerasonalOverview = Loadable(lazy(() => import('app/views/personality/overview')));
const ContentOverview = Loadable(lazy(() => import('app/views/content/overview')));
const SocialOverView =  Loadable(lazy(() => import('app/views/social/overview')));
const SocialMedia =  Loadable(lazy(() => import('app/views/social/media')));
const PersonalEdit = Loadable(lazy(() => import('app/views/personality/edit')));
const PersonalityEditPage = Loadable(lazy(() => import('app/views/personality/editpersonality')));
const ContentManage = Loadable(lazy(() => import('app/views/content/manage')));

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,
      // dashboard route
      {
        path: '/dashboard/default',
        element: <Analytics />,
        auth: authRoles.admin
      },
      {
        path: '/personality/overview',
        element: <PerasonalOverview />,
      },
      {
        path: '/personality/edit',
        element: <PersonalEdit />,
      },
      {
        path: '/personality/edit/:id',
        element: <PersonalityEditPage />,
      },
      {
        path: '/social/overview',
        element: <SocialOverView />,
      },
      {
        path: '/social/media',
        element: <SocialMedia />,
      },
      {
        path: '/content/overview',
        element: <ContentOverview />,
      },
      {
        path: '/content/manage',
        element: <ContentManage />,
      },

      // e-chart rooute
      {
        path: '/charts/echarts',
        element: <AppEchart />,
        auth: authRoles.editor
      }
    ]
  },

  // session pages route
  { path: '/session/404', element: <NotFound /> },
  { path: '/session/signin', element: <JwtLogin /> },
  { path: '/session/signup', element: <JwtRegister /> },
  { path: '/session/forgot-password', element: <ForgotPassword /> },

  { path: '/', element: <Navigate to="/personality/overview" /> },
  { path: '*', element: <NotFound /> }
];

export default routes;
