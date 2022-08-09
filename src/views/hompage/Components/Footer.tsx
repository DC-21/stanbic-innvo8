import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import Stanbiclogo from '../../../components/Logostanbic';
import BHlogo from '../../../components/BHlogo';

function Footer() {
  return (
    <div>
      <div className="Initiative" id="Contacts">
        <Container maxWidth="sm">
          <Grid item xs={12}>
            <Typography className="layout"> An Initiative of</Typography>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid
              item
              xs={6}
              alignItems="right"
              className="size"
              justifyContent="right"
            >
              <Stanbiclogo />
            </Grid>

            <Grid
              item
              xs={6}
              alignItems="left"
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
            <Grid item xs={6} alignItems="left">
              <Typography className="footerText">Project Innov8 2.0</Typography>
              <br />
            </Grid>
            <Grid item xs={6}>
              <Typography className="footerText">Contact Info</Typography>
              <Typography className="footerText">
                Call: +26 095 301 7526
                <br /> Email: info@projectinnov8.co.zm
              </Typography>
              <Typography className="footerText">
                STANBIC BANK ZAMBIA PLC <br />
                Addis Ababa Drive, Lusaka, Zambia 10101
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default Footer;
