import { Container, Grid } from '@mui/material';
import React from 'react';

function Footer() {
  return (
    <div className="footer">
      <Container>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={4}>
            <h1>Project Innov8 2.0</h1>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <h1>Project Innov8 2.0</h1>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <h1>Project Innov8 2.0</h1>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Footer;
