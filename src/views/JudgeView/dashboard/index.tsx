import clsx from 'clsx';
import { Container, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import Page from '../../../components/Page';
import CompletedVotes from './CompletedVotes';
import PendingReview from './PendingReview';
import TotalSubmission from './TotalSubmission';
import AllSubmissions from './AllSubmissions';

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
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <AllSubmissions />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default Dashboard;
