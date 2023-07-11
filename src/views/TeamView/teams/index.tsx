import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useModal } from '../../../components/Modal';
import ListTeamMembers from './components/TeamsList';
// import Toolbar from './components/Toolbar';
import AddTeam from './components/AddTeam';
import TeamInvites from './components/TeamInvites';

function TeamsListView() {
  const { handleClose } = useModal();
  return (
    <Box padding="30px">
      <Grid spacing={2} container>
        <Grid item xs={12} sm={12} md={12}>
          <ListTeamMembers />
        </Grid>
        <Grid item md={8}>
          <Typography variant="h4" sx={{ paddingTop: 3, paddingBottom: 2 }}>
            Team Invites
          </Typography>
          <TeamInvites />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <AddTeam handleClose={handleClose} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default TeamsListView;
