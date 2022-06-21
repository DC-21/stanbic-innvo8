import clsx from 'clsx';
import { Container, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import Page from '../../../components/Page';
import TotalFinnishBusinesses from './TotalFinnishBusinesses';
import TotalCohorts from './TotalCohorts';
import TotalZambianBusinesses from './TotalZambianBusinesses';
import TotalBds from './TotalBds';

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
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalZambianBusinesses />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalFinnishBusinesses />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalCohorts />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalBds />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default Dashboard;
