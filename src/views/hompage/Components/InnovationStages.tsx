import React from 'react';
import { Typography, Grid, Container, Box } from '@mui/material';

export default function InnovationStages() {
  return (
    <div className="topPadding" style={{ backgroundColor: '#fff' }}>
      <Typography
        id="Stages"
        sx={{
          textAlign: 'center',
          color: '#0133a1',
          fontWeight: 'bold',
          fontSize: '2.5rem',
          //   paddingTop: '5px',
          marginBottom: '25px'
        }}
      >
        Innovation Stages
      </Typography>
      <Typography
        sx={{
          textAlign: 'center',
          color: '#000',
          fontSize: '1rem',
          marginBottom: '25px'
        }}
      >
        You can expect to develop your idea, innovation skills through coaching
        and sprints which invole
      </Typography>
      <Container fixed>
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid
            item
            xs={6}
            className="section2"
            spacing={2}
            sx={{
              display: 'inline-block'
            }}
          >
            <Typography
              variant="h2"
              sx={{
                textAlign: 'center',
                paddingTop: '50px',
                paddingBottom: '30px'
              }}
            >
              Sprint
            </Typography>

            <Box sx={{ paddingTop: '5px' }}>
              <Typography variant="h4">Objective:</Typography>
              <ul style={{ padding: '10px' }}>
                <li>
                  <Typography variant="body1">
                    Explore the potential of a business idea by validating the
                    market and testing all assumptions
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    5 day virtual sprint programmes
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    30 Stanbic Innovators (10 of 3 staff members)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">3 winners overall</Typography>
                </li>
              </ul>
            </Box>
            <br />
            <Box>
              <Typography variant="h4">Support:</Typography>

              <ul style={{ padding: '10px' }}>
                <li>
                  <Typography variant="body1">
                    4 weeks of idea development for the winning team
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    Coaching by Stanbic and external experts
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    30 Stanbic Innovators (10 of 3 staff members)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">September 2022</Typography>
                </li>
              </ul>
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
            sm={2}
            md={6}
            lg={6}
            xl={6}
            className="woman1"
            sx={{ display: { xs: 'none', sm: 'flex', md: 'flex' } }}
          />
        </Grid>
      </Container>
    </div>
  );
}
