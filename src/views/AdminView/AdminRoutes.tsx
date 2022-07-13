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

export const AdminRoutes = [
  {
    path: 'app',
    element: <AdminLayout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      {
        path: 'users',
        element: <User />
      },
      {
        path: 'users/edit/:id',
        element: <UserEditView />
      },
      {
        path: 'users/team_member/edit/:id',
        element: <TeamMemberEditView />
      },
      {
        path: 'teams',
        element: <Teams />
      },
      {
        path: 'teams/edit/:id',
        element: <TeamEditView />
      },
      {
        path: 'applications',
        element: <Applications />
      },
      {
        path: 'applications/view/:id',
        element: <ApplicationViewDetails />
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
