/* eslint-disable react/function-component-definition */
import React, { FC } from 'react';
import { Container } from '@mui/material';
import Page from '../../../components/Page';
import TeamList from './components/TeamList';

const TeamsView: FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <Page title="Teams">
      <Container maxWidth={false}>
        <TeamList />
      </Container>
    </Page>
  );
};
export default TeamsView;
