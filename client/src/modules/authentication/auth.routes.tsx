import { RootError } from '../shared/components/route-error';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';

export const AuthRoutes = [
  {
    path: 'login',
    element: <Login />,
    errorElement: <RootError />
  },
  {
    path: 'signUp',
    element: <SignUp />,
    errorElement: <RootError />
  }
];
