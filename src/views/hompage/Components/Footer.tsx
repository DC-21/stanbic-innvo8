import React from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
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
          <Grid container sx={{ paddingRight: '10px' }} spacing={1}>
            {/* <Grid item xs={12} sm={6} md={6} lg={6} xl={6} alignItems="left">
              <Typography className="footerText">Project Innov8 2.0</Typography>
              <br />
            </Grid> */}
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} alignItems="right">
              <Typography className="footerText">Contact Info</Typography>
              <Typography className="footerText">
                Call: +26 0960505050
                <br /> Email: zambiainnovationcomms@standardbank.co.za
              </Typography>
              <Typography className="footerText">
                STANBIC BANK ZAMBIA PLC <br />
                Addis Ababa Drive, Lusaka, Zambia 10101
              </Typography>
              <Button
                sx={{ paddingLeft: '2px' }}
                variant="text"
                startIcon={<MailOutlinedIcon sx={{ color: '#fff' }} />}
              >
                <a href="mailto:support@stanbicinnov8.raiseaticket.com">
                  <Typography className="footerText">
                    Contact Support
                  </Typography>
                </a>
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default Footer;
