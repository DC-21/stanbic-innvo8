/* eslint-disable react/function-component-definition */
import React, { FC } from 'react';
import { Container } from '@mui/material';
import Page from '../../../components/Page';
import UserList from './components/UserList';

const UsersView: FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <Page title="users">
      <Container maxWidth={false}>
        <UserList />
      </Container>
    </Page>
  );
};
export default UsersView;
