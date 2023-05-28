import { Container } from '@mui/material';
import React from 'react';
import { useModal, CustomModal } from '../../../components/Modal';
import Toolbar from './Toolbar';
import AddTheme from './AddTheme';
import ThemesList from './ThemesList';

function Themes() {
  const { open, handleClickOpen, handleClose } = useModal();
  return (
    <Container maxWidth="lg">
      <Toolbar handleClickOpen={handleClickOpen} />
      <CustomModal
        title="Themes"
        subTitle="Add a Theme"
        open={open}
        handleClose={handleClose}
      >
        <AddTheme handleClose={handleClose} />
      </CustomModal>
      <ThemesList />
    </Container>
  );
}

export default Themes;
