import React from 'react';
import {
  Typography,
  Grid,
  Container,
  Card,
  CardMedia,
  CardContent
} from '@mui/material';

export default function InnoationStages() {
  return (
    <div className="topPadding2">
      <Container fixed id="Stages">
        <Grid item xs={12}>
          <Typography className="layout heading">Innovation Stages</Typography>
          <Typography className="layout ">
            You can expect to develop your idea and innovation skills through
            coaching and sprints which involve:
          </Typography>
        </Grid>

        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={6}>
            <Card sx={{ pb: 3, maxWidth: 500 }}>
              <CardMedia
                component="img"
                height="200"
                image="/images/Group23.png"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Sprint
                </Typography>
                <Typography variant="body2">
                  Objective: Explore the potential of a business idea by
                  validating the market and testing all assumptions.
                  <Typography variant="body2">
                    • 5 day virtual sprint programmes
                  </Typography>
                  • 30 Stanbic Innovators (10 of 3 staff members)
                  <Typography variant="body2">• 3 winners (overall)</Typography>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ pb: 3, maxWidth: 500 }}>
              <CardMedia
                component="img"
                height="200"
                image="/images/Group238.png"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Support
                </Typography>
                <Typography variant="body2">
                  • 4 weeks of idea development support for the winning team.
                </Typography>
                <Typography variant="body2">
                  • Coaching by Stanbic and external experts.
                </Typography>
                <Typography variant="body2">• September 2022 .</Typography>
                <Typography variant="body2">
                  <br />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
