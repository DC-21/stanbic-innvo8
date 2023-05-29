import React from 'react';
import { Paper } from '@mui/material';
import Page from '../../../components/Page';
import Upvoting from '../Upvoting';

function Dashboard() {
  return (
    <Page title="Dashboard">
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
          marginTop: '9%'
        }}
      >
        <Upvoting />
      </Paper>
    </Page>
  );
}

export default Dashboard;
