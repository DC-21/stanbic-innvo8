import React from 'react';
import { Container } from '@mui/material';
import Page from '../../../components/Page';
import ChallengeStatementsList from './components/ChallengeStatementsList';

function ChallengeView() {
  return (
    <Page title="Challenge">
      <Container maxWidth={false}>
        <ChallengeStatementsList />
      </Container>
    </Page>
  );
}
export default ChallengeView;
