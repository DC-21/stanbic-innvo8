/* eslint-disable import/prefer-default-export */
import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import AccountView from './account';
import Dashboard from './dashboard';
import UserEditView from './users/components/UserEditView';
import User from './users/index';
import Teams from './teams/index';
import TeamEditView from './teams/components/TeamEditView';
//  import MainLayout from './layouts/MainLayout';

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
        path: 'teams',
        element: <Teams />
      },
      {
        path: 'teams/edit/:id',
        element: <TeamEditView />
      },
      {
        path: 'account',
        element: <AccountView />
      }
    ]
  }
];
