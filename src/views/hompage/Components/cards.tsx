import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import { Container, Grid } from '@mui/material';

export default function Cards() {
  return (
    <div className="spacing topPaddingGradient">
      <Container maxWidth={false} id="Benefits">
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6} sm={3}>
            <Card className="cardheight" sx={{ maxWidth: 300 }}>
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
            <Card className="cardheight" sx={{ maxWidth: 300 }}>
              <CardContent>
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
                <Typography variant="body2">
                  Access to legal, accounting, financial planning and tech
                  support;
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card className="cardheight" sx={{ maxWidth: 300 }}>
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
