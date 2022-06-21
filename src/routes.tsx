import React from 'react';
// import { Navigate } from 'react-router-dom';
//  import ProtectedRoutes from './components/ProtectedRoutes';
import DashboardLayout from './layouts/DashboardLayout';
//  import MainLayout from './layouts/MainLayout';
import AccountView from './views/AccountView';
import ForgotPassword from './views/auth/forgotPassword';
import ResetPassword from './views/auth/resetPassword';
import SignIn from './views/auth/SignIn';
import SignUp from './views/auth/SignUp';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      {
        path: 'account',
        element: <AccountView />
      }
    ]
  },
  { path: '/', element: <SignIn /> },
  { path: 'signup', element: <SignUp /> },
  { path: 'forgot-password', element: <ForgotPassword /> },
  { path: 'resetpassword/:resetPasswordToken', element: <ResetPassword /> }
];

export default routes;
