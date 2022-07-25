import React from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, ButtonBase, Paper, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Page from '../../../components/Page';

// import TotalFinnishBusinesses from './TotalFinnishBusinesses';
// import TotalCohorts from './TotalCohorts';
// import TotalZambianBusinesses from './TotalZambianBusinesses';
// import TotalBds from './TotalBds';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  image: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    width: '100%',
    hieght: '100%'
  },
  content: {
    marginTop: '10%',
    marginLeft: '5%'
  }
}));

function Dashboard() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Page title="Dashboard">
      <Paper
        sx={{
          p: 2,
          margin: 'auto',
          maxWidth: '90%',
          flexGrow: 1,
          marginTop: 5
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 328, height: 328 }}>
              <img
                className={clsx(classes.image)}
                src="/images/woman-having-online-class-meeting-through-e-learning-system.jpeg"
                alt="stanbic"
              />
            </ButtonBase>
          </Grid>

          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs className={clsx(classes.content)}>
                <Typography variant="h2">
                  Welcome to Stanbic Innov8 2.0
                </Typography>
                <br />
                <Typography variant="h4">
                  To submit your idea: create a team first, add your members and
                  then submit your idea
                </Typography>
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/team/teams`)}
                >
                  Create Team
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Page>
  );
}

export default Dashboard;
