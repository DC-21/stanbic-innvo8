/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';
import AccountView from './account';
import Dashboard from './dashboard';
import UserEditView from './users/components/UserEditView';
import User from './users/index';
import Teams from './teams/index';
import TeamEditView from './teams/components/TeamEditView';
import NotFoundView from '../errors/NotFoundView';
import TeamMemberEditView from './teams/components/TeamMember/TeamMemberEditView';
import Applications from './Applications';
import ApplicationViewDetails from './Applications/ApplicationViewDetails';
import TeamDetails from './teams/components/TeamDetails';
import AuthRoutes from '../../components/AuthRoutes';
// import Challenge from './challenge/index';
// import EditViewChallenge from './challenge/components/EditViewChallenge';
import ThemesEditView from './themes/ThemesEditView';
// import Themes from './themes';
import ThemeView from './themes/ThemeView';
import EditViewChallenge from './challenge/components/EditViewChallenge';
import ThemeTabs from './themes/tabs/ThemeTabs';

export const AdminRoutes = [
  {
    path: 'app',
    element: <AdminLayout />,
    children: [
      { path: 'dashboard', element: <AuthRoutes component={Dashboard} /> },
      {
        path: 'users',
        element: <AuthRoutes component={User} />
      },
      {
        path: 'users/edit/:id',
        element: <AuthRoutes component={UserEditView} />
      },
      {
        path: 'users/team_member/edit/:id',
        element: <AuthRoutes component={TeamMemberEditView} />
      },
      {
        path: 'teams',
        element: <AuthRoutes component={Teams} />
      },
      {
        path: 'teams/view/:id',
        element: <AuthRoutes component={TeamDetails} />
      },
      {
        path: 'teams/edit/:id',
        element: <AuthRoutes component={TeamEditView} />
      },
      {
        path: 'applications',
        element: <AuthRoutes component={Applications} />
      },
      {
        path: 'applications/view/:id',
        element: <AuthRoutes component={ApplicationViewDetails} />
      },
      {
        path: 'themes',
        element: <AuthRoutes component={ThemeTabs} />
      },
      {
        path: 'themes/edit/:id',
        element: <AuthRoutes component={ThemesEditView} />
      },
      {
        path: 'challenges/edit/:id',
        element: <AuthRoutes component={EditViewChallenge} />
      },
      {
        path: 'themes/view/:id',
        element: <AuthRoutes component={ThemeView} />
      },
      {
        path: 'account',
        element: <AccountView />
      },
      { path: '404', element: <NotFoundView /> },
      { path: '*', element: <Navigate to="/app/404" /> }
    ]
  }
];
