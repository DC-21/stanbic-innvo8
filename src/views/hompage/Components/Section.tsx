import React from 'react';
import { Typography, Grid, Container, Box } from '@mui/material';
// import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
// import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

export default function Section() {
  return (
    <div className="topPadding">
      {/* <Typography
        sx={{
          textAlign: 'center',
          color: '#0133a1',
          fontWeight: 'bold',
          fontSize: '2.5rem',
          //   paddingTop: '5px',
          marginBottom: '25px'
        }}
      >
        Project Innov8 2.0
      </Typography> */}
      <Container fixed id="About">
        <Grid container className="color" columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid
            item
            xs={6}
            className="section2"
            spacing={2}
            style={{
              backgroundColor: '#fff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              textAlign: 'left'
            }}
          >
            <Typography variant="body1" style={{ wordSpacing: 'normal' }}>
              <Box sx={{ mb: 1 }}>
                As Stanbic Bank drives the Nayo Nayo strategy, innovation can be
                catalyst needed for growth and success. Introducing the Project
                Innov8 ideation portal, a platform for you to share brilliant
                ideas, innovative solutions, and disruptive concepts.
              </Box>
            </Typography>
            <Typography variant="body1" style={{ wordSpacing: 'normal' }}>
              Whether you have a revolutionary product idea, a process
              improvement suggestion, or a game-changing strategy, this portal
              is the perfect space to unleash your creativity. Your innovative
              ideas have the power to transform our clients’ experience, allow
              us to execute with excellence and to sustainably drive value and
              growth.
            </Typography>
            <br />
            <Typography
              style={{ fontSize: '16px', textAlign: 'left' }}
              color="primary"
            >
              Lets create, innovate, and disrupt! It Can Be!
            </Typography>
            <br />
          </Grid>
          <Grid
            item
            xs={6}
            sm={2}
            md={6}
            lg={6}
            xl={6}
            className="woman"
            sx={{ display: { xs: 'none', sm: 'flex', md: 'flex' } }}
          />
        </Grid>
      </Container>
    </div>
  );
}
