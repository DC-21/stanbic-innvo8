/* eslint-disable import/prefer-default-export */
import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import AccountView from '../account';
import Dashboard from './dashboard';
import User from './users/index';
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
        path: 'account',
        element: <AccountView />
      }
    ]
  }
];
