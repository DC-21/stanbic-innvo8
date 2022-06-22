/* eslint-disable import/prefer-default-export */
import React from 'react';
import JudgeLayout from '../../layouts/JudgeLayout';
import AccountView from '../JudgeView/account';
import Dashboard from './dashboard';
//  import MainLayout from './layouts/MainLayout';

export const JudgeRoutes = [
  {
    path: 'judge',
    element: <JudgeLayout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      {
        path: 'account',
        element: <AccountView />
      }
    ]
  }
];
