import React from 'react';
import { Paper, Typography } from '@mui/material';
import Page from '../../../components/Page';
import Upvoting from '../Upvoting';

function Dashboard() {
  return (
    <Page title="Dashboard">
      <Typography
        variant="h2"
        sx={{ display: 'flex', justifyContent: 'center', paddingTop: 5 }}
      >
        Innovation Feed
      </Typography>
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 2,
          margin: 'auto',
          width: '97%',
          flexGrow: 1,
          backgroundColor: 'transparent',
          border: 'none',
          boxShadow: 'none',
          borderColor: 'none',
          marginTop: '5%'
        }}
      >
        <Upvoting />
      </Paper>
    </Page>
  );
}

export default Dashboard;
