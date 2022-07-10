import clsx from 'clsx';
import { Container, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import Page from '../../../components/Page';
import CompletedVotes from './CompletedVotes';
import PendingReview from './PendingReview';
import TotalSubmission from './TotalSubmission';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    paddingTop: 20
  }
}));

function Dashboard() {
  const classes = useStyles();

  return (
    <Page title="Dashboard">
      Judge
      <Container className={clsx(classes.root)} maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={4} sm={4} xl={4} xs={12}>
            <TotalSubmission />
          </Grid>
          <Grid item lg={4} sm={4} xl={4} xs={12}>
            <PendingReview />
          </Grid>
          <Grid item lg={4} sm={4} xl={4} xs={12}>
            <CompletedVotes />
          </Grid>
        </Grid>
        table
      </Container>
    </Page>
  );
}

export default Dashboard;
