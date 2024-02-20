import React from 'react';
import { Navigate } from 'react-router-dom';
import { AdminRoutes } from './views/AdminView/AdminRoutes';
// import ProtectedRoutes from './components/ProtectedRoutes';
import MainLayout from './layouts/MainLayout';
import ForgotPassword from './views/auth/forgotPassword';
import ResetPassword from './views/auth/resetPassword';
// import SignIn from './views/auth/SignIn';
import SignUp from './views/auth/SignUp';
import CompleteSignUp from './views/auth/CompleteSignUp/CompleteSignUp';
import { TeamRoutes } from './views/TeamView/TeamRoutes';
import NotFoundView from './views/errors/NotFoundView';
import { JudgeRoutes } from './views/JudgeView/JudgeRoutes';
import Logout from './views/auth/logout';
import Home from './views/hompage';
// import FAQ from './views/Faq/Faq';
import SingleSignIn from './views/auth/SingleSignIn';
import AutoLogin from './views/auth/AutoLogin';
import SignIn from './views/auth/SignIn/SignIn';

const routes = [
  {
    path: '*',
    element: <MainLayout />,
    children: [
      { path: '404', element: <NotFoundView /> },
      { path: '*', element: <Navigate to="/404" /> },
      { path: 'logout', element: <Logout /> }
    ]
  },

  { path: '/', element: <Home /> },
  { path: 'signin', element: <SignIn /> },
  { path: 'single-signin', element: <SingleSignIn /> },
  { path: 'ssoLogin/:ssoToken', element: <AutoLogin /> },
  { path: 'signup', element: <SignUp /> },
  // { path: 'faq', element: <FAQ /> },
  { path: 'completeSignUp', element: <CompleteSignUp /> },
  { path: 'forgot-password', element: <ForgotPassword /> },
  { path: 'resetpassword', element: <ResetPassword /> },
  ...AdminRoutes,
  ...TeamRoutes,
  ...JudgeRoutes
];

export default routes;
