import React from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Grid } from '@mui/material';
import Page from '../../../components/Page';
import ProfileDetails from './ProfileDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

function Account() {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Account">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            {/* <Profile /> */}
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <ProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default Account;
