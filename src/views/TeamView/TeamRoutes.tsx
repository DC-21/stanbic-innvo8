/* eslint-disable import/prefer-default-export */
import React from 'react';
import TeamLayout from '../../layouts/TeamLayout';
import AccountView from '../account';
import Dashboard from './dashboard';
//  import MainLayout from './layouts/MainLayout';

export const TeamRoutes = [
  {
    path: 'team',
    element: <TeamLayout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      {
        path: 'account',
        element: <AccountView />
      }
    ]
  }
];
