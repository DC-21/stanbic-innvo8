import { Container, Grid } from '@mui/material';
import React from 'react';

function Footer() {
  return (
    <div className="footer">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs>
            <h1>Project Innov8 2.0</h1>
          </Grid>
          <Grid item xs={6}>
            <h1>Project Innov8 2.0</h1>
          </Grid>
          <Grid item xs>
            <h1>Project Innov8 2.0</h1>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Footer;
