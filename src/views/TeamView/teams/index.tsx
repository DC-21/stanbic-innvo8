import { Container } from '@mui/material';
import React from 'react';
import { useModal, CustomModal } from '../../../components/Modal';
import ListTeamMembers from './components/TeamsList';
import Toolbar from './components/Toolbar';
import AddTeam from './components/AddTeam';

function TeamsView() {
  const { open, handleClickOpen, handleClose } = useModal();
  return (
    <Container maxWidth="lg">
      <Toolbar handleClickOpen={handleClickOpen} />
      <CustomModal
        title="Team"
        subTitle="Add a team"
        open={open}
        handleClose={handleClose}
      >
        <AddTeam handleClose={handleClose} />
      </CustomModal>
      <ListTeamMembers />
    </Container>
  );
}

export default TeamsView;
