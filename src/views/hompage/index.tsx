import React from 'react';
import './App.css';
import { Container } from '@mui/material';
import AppBar from './Components/AppBar';

function Homepage() {
  return (
    <Container maxWidth="lg">
      <AppBar />
      <h1>hello</h1>
    </Container>
  );
}

export default Homepage;
