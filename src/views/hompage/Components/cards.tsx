import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

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
            <Card className="cardheight" sx={{ maxWidth: 350, margin: 'auto' }}>
              <CardContent>
                <Typography
                  gutterBottom
                  align="center"
                  variant="h3"
                  component="div"
                >
                  Challenge Benefits
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card className="cardheight" sx={{ maxWidth: 300, margin: 'auto' }}>
              <CardContent>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Icon1 />
                </Box>
                <Typography variant="body2">
                  One week of learning experience in building innovative
                  solutions.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card className="cardheight" sx={{ maxWidth: 300 }}>
              <CardContent>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Icon2 />
                </Box>

                <Typography variant="body2">
                  Personalised mentorship for all participating teams and their
                  idea validation needs.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card className="cardheight" sx={{ maxWidth: 300 }}>
              <CardContent>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Icon3 />
                </Box>
                <Typography variant="body2">
                  Access to legal, accounting, financial planning and tech
                  support;
                </Typography>
              </CardContent>
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
            <Card className="cardheight" sx={{ maxWidth: 300 }}>
              <CardContent>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Icon4 />
                </Box>
                <Typography variant="body2">
                  Access to legal, accounting, financial planning and tech
                  support;
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card className="cardheight" sx={{ maxWidth: 300 }}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Icon7 />
              </Box>
              <CardContent>
                <Typography variant="body2">
                  Up to K150, 000 in prizes.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card className="cardheight" sx={{ maxWidth: 300 }}>
              <CardContent>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Icon5 />
                </Box>
                <Typography variant="body2">
                  4-weeks of ongoing support from Stanbic Bank Zambia and a
                  network of coaches and mentors to assist with go-to-market
                  strategies and scaling-up for the winning team.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card className="cardheight" sx={{ maxWidth: 300 }}>
              <CardContent>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Icon6 />
                </Box>
                <Typography variant="body2">
                  An opportunity to join a supportive innovators network.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
