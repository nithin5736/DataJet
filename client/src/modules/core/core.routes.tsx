// import { Navigate } from 'react-router-dom';

import { RootError } from '../shared/components/route-error';
import LoginSucess from './components/LoginSucess';
import DataSource from './pages/DataSource/DataSource';
import Home from './pages/Home/Home';
import PublishedApp from './pages/PublishedApp/PublishedApp';

export const CoreRoutes = [
  {
    path: '',
    element: <Home />,
    errorElement: <RootError />,
    // loader: () => { console.log("loader  ", localStorage.getItem('accessToken'));}
  },
  {
    path: '/datasource',
    element: <DataSource />,
    errorElement: <RootError />
  },
  {
    path: '/app/:id',
    element: <PublishedApp />,
    errorElement: <RootError />,
  },
  {
    path: '/:accesstoken',
    element: <LoginSucess />,
    errorElement: <RootError />,
  }
];
