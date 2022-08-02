import React from 'react';

import { Container, Grid, Typography } from '@mui/material';

function Footer() {
  return (
    <div>
      <div className="Initiative">
        <Container fixed>
          <Grid item xs={12}>
            <Typography className="layout"> An Initiative of</Typography>
          </Grid>
        </Container>
      </div>

      <div className="footer">
        <Container fixed>
          <Grid container spacing={3}>
            <Grid item xs>
              <h2 className="footerText">Project Innov8 2.0</h2>
            </Grid>
            <Grid item xs={6} />
            <Grid item xs />
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default Footer;
