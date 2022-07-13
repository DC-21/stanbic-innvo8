import clsx from 'clsx';
import { Card, CardContent, Container, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import Page from '../../../components/Page';

// import TotalFinnishBusinesses from './TotalFinnishBusinesses';
// import TotalCohorts from './TotalCohorts';
// import TotalZambianBusinesses from './TotalZambianBusinesses';
// import TotalBds from './TotalBds';

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
        <Container>
          <Card>
            <CardContent>
              <Typography variant="h2">
                Welcome to Stanbic Innov8 2.0
              </Typography>
              <Typography variant="h4">
                To submit your proposal, please follow the instructions below
              </Typography>
              <ul>
                <li>Create a team</li>
                <li>Add members to your team</li>
                <li>Submit your proposal</li>
              </ul>
            </CardContent>
          </Card>
        </Container>
      </Container>
    </Page>
  );
}

export default Dashboard;
