import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Container, Grid } from '@mui/material';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';

export default function Cards() {
  return (
    <div
      style={{
        paddingTop: '50px',
        paddingBottom: '50px',
        backgroundColor: '#fff'
      }}
      id="Benefits"
    >
      <Typography
        sx={{
          textAlign: 'center',
          color: '#0133a1',
          fontWeight: 'bold',
          fontSize: '2.5rem',
          marginBottom: '25px'
        }}
      >
        Why We Do This!
      </Typography>
      <Container fixed>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Box
              sx={{
                backgroundColor: '#F7F7F7',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px'
              }}
            >
              <TaskAltOutlinedIcon
                sx={{
                  width: '40px',
                  height: '50px',
                  color: '#EC008C',
                  marginRight: '10px'
                }}
              />
              <Typography variant="body2">
                We believe that innovation can be the driving force behind
                Stanbic Bank’s growth and success.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Box
              sx={{
                backgroundColor: '#F7F7F7',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px'
              }}
            >
              <TaskAltOutlinedIcon
                sx={{
                  width: '40px',
                  height: '50px',
                  color: '#EC008C',
                  marginRight: '10px'
                }}
              />
              <Typography variant="body2">
                Your contributions here have the power to shape the future of
                our organization and propel us to new heights.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Box
              sx={{
                backgroundColor: '#F7F7F7',
                padding: '20px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <TaskAltOutlinedIcon
                sx={{
                  width: '40px',
                  height: '50px',
                  color: '#EC008C',
                  marginRight: '10px'
                }}
              />
              <Typography variant="body2">
                Whether you have a revolutionary product idea, a process
                improvement suggestion, or a game-changing strategy, this portal
                is the perfect space to unleash your creativity.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Box
              sx={{
                backgroundColor: '#F7F7F7',
                padding: '20px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <TaskAltOutlinedIcon
                sx={{
                  width: '40px',
                  height: '50px',
                  color: '#EC008C',
                  marginRight: '10px'
                }}
              />
              <Typography variant="body2">
                We encourage all our internal staff to participate actively, as
                your unique perspectives and expertise are invaluable to our
                progress.
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Typography
          variant="h4"
          color="primary"
          sx={{
            padding: '3px',
            textAlign: 'center',
            marginLeft: '60px',
            marginTop: '20px'
          }}
        >
          Lets collaborate, innovate, and build a better future together to
          transform client experience, execute with excellence, and drive
          sustainable growth & value - Together It Can Be!
        </Typography>
      </Container>
    </div>
  );
}
