import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';

// session pages
const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));

// dashboard page
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
        <MatxLayout />
    ),
    children: [
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
      {
        path: '/content/manage/:id',
        element: <ContentManage />,
      }
    ]
  },
  { path: '/', element: <Navigate to="/personality/overview" /> },
  { path: '*', element: <NotFound /> }
];

export default routes;
