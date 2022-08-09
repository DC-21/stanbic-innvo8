import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Box, Container, Grid } from '@mui/material';
import Icon1 from '../../../components/svgs/icon1';
import Icon2 from '../../../components/svgs/icon2';
import Icon3 from '../../../components/svgs/icon3';
import Icon4 from '../../../components/svgs/icon4';
import Icon5 from '../../../components/svgs/icon5';
import Icon6 from '../../../components/svgs/icon6';
import Icon7 from '../../../components/svgs/icon7';

export default function Cards() {
  return (
    <div className="spacing topPaddingGradient">
      <Container fixed id="Benefits">
        <Grid
          container
          className="spacing"
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={6} sm={3}>
            <Card className="cardheight">
              <div
                style={{
                  verticalAlign: 'middle',
                  lineHeight: '400px',
                  marginTop: '50px',
                  padding: '20px'
                }}
              >
                <Typography
                  gutterBottom
                  align="center"
                  variant="h3"
                  color="primary"
                >
                  Challenge Benefits
                </Typography>
              </div>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card className="cardheight">
              <div style={{ padding: '15px', verticalAlign: 'middle' }}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Icon1 />
                </Box>
                <Typography variant="h6" style={{ textAlign: 'center' }}>
                  One week of learning experience in building innovative
                  solutions.
                </Typography>
              </div>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card className="cardheight">
              <div style={{ padding: '15px', verticalAlign: 'middle' }}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Icon2 />
                </Box>

                <Typography variant="h6" style={{ textAlign: 'center' }}>
                  Personalised mentorship for all participating teams and their
                  idea validation needs.
                </Typography>
              </div>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card className="cardheight" sx={{ maxWidth: 300 }}>
              <div style={{ padding: '20px', verticalAlign: 'middle' }}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Icon3 />
                </Box>
                <Typography variant="h6" style={{ textAlign: 'center' }}>
                  Access to legal, accounting, financial planning and tech
                  support;
                </Typography>
              </div>
            </Card>
          </Grid>
        </Grid>
        <Grid
          container
          className="spacing"
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={6} sm={3}>
            <Card className="cardheight">
              <div style={{ padding: '15px', verticalAlign: 'middle' }}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Icon4 />
                </Box>
                <Typography variant="h6" style={{ textAlign: 'center' }}>
                  Access to legal, accounting, financial planning and tech
                  support;
                </Typography>
              </div>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card className="cardheight">
              <div style={{ padding: '15px', verticalAlign: 'middle' }}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Icon7 />
                </Box>
                <Typography style={{ textAlign: 'center' }} variant="h6">
                  Up to K150, 000 in prizes.
                </Typography>
              </div>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card className="cardheight">
              <div style={{ padding: '15px', verticalAlign: 'middle' }}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Icon5 />
                </Box>
                <Typography
                  gutterBottom
                  variant="h6"
                  style={{ textAlign: 'center' }}
                >
                  4-weeks of ongoing support from Stanbic Bank Zambia and a
                  network of coaches and mentors to assist with go-to-market
                  strategies and scaling-up for the winning team.
                </Typography>
              </div>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card className="cardheight" sx={{ maxWidth: 300 }}>
              <div style={{ padding: '15px', verticalAlign: 'middle' }}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Icon6 />
                </Box>
                <Typography variant="h6" style={{ textAlign: 'center' }}>
                  An opportunity to join a supportive innovators network.
                </Typography>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
