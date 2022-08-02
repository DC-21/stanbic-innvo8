import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import Stanbiclogo from '../../../components/Logostanbic';
import BHlogo from '../../../components/BHlogo';

function Footer() {
  return (
    <div>
      <div className="Initiative">
        <Container maxWidth="sm">
          <Grid item xs={12}>
            <Typography className="layout"> An Initiative of</Typography>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6} className="size">
              <Stanbiclogo />
            </Grid>

            <Grid
              item
              xs={6}
              alignItems="right"
              className="size"
              justifyContent="left"
            >
              <BHlogo />
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className="footer">
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <h2 className="footerText">Project Innov8 2.0</h2>
            </Grid>
            <Grid item xs={6} />
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default Footer;
