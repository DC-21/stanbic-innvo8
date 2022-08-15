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
        Challenge Benefits
      </Typography>
      <Container fixed>
        <Grid container>
          <div className="challenge" style={{ marginBottom: '20px' }} />
          <Grid
            item
            sm={12}
            md={6}
            lg={6}
            xl={6}
            sx={{ paddingRight: { xs: 0, sm: 0, md: '10px' } }}
          >
            <Box
              sx={{
                backgroundColor: '#F7F7F7',
                padding: '20px'
              }}
            >
              <div style={{ marginRight: '10px' }}>
                <TaskAltOutlinedIcon
                  sx={{
                    float: 'left',
                    width: '40px',
                    height: '50px',
                    color: '#EC008C',
                    paddingRight: '3px',
                    marginTop: {
                      xs: '6px',
                      sm: '10px',
                      md: '-7px'
                    }
                  }}
                />
              </div>

              <Typography
                variant="body2"
                sx={{ padding: '10px', textAlign: 'left', marginLeft: '60px' }}
              >
                One week of learning experience in building innovative
                solutions.
              </Typography>
            </Box>
            <br />
            <Box
              sx={{
                backgroundColor: '#F7F7F7',
                padding: '20px',
                paddingBottom: '30px'
              }}
            >
              <div style={{ marginRight: '10px' }}>
                <TaskAltOutlinedIcon
                  sx={{
                    float: 'left',
                    width: '40px',
                    height: '50px',
                    color: '#EC008C',
                    paddingRight: '3px',
                    marginTop: {
                      xs: '15px',
                      sm: '10px',
                      md: '5px'
                    }
                  }}
                />
              </div>

              <Typography
                variant="body2"
                sx={{ padding: '10px', textAlign: 'left', marginLeft: '60px' }}
              >
                Personalised mentorship for all participating teams and their
                idea validation needs.
              </Typography>
            </Box>
            <br />
            <Box
              sx={{
                backgroundColor: '#F7F7F7',
                padding: '20px'
              }}
            >
              <div style={{ marginRight: '10px' }}>
                <TaskAltOutlinedIcon
                  sx={{
                    float: 'left',
                    width: '40px',
                    height: '50px',
                    color: '#EC008C',
                    paddingRight: '2px',
                    marginTop: {
                      xs: '2px',
                      sm: '10px',
                      md: '-10px'
                    }
                  }}
                />
              </div>

              <Typography
                variant="body2"
                sx={{ padding: '5px', textAlign: 'left', marginLeft: '60px' }}
              >
                Access to legal, accounting, financial planning and tech
                support.
              </Typography>
            </Box>
            <br />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Box
              sx={{
                backgroundColor: '#F7F7F7',
                padding: '20px'
              }}
            >
              <div style={{ marginRight: '10px' }}>
                <TaskAltOutlinedIcon
                  sx={{
                    float: 'left',
                    width: '40px',
                    height: '50px',
                    color: '#EC008C',
                    paddingRight: '3px',
                    marginTop: {
                      xs: '-4px',
                      sm: '10px',
                      md: '-7px'
                    }
                  }}
                />
              </div>

              <Typography
                variant="body2"
                sx={{ padding: '10px', textAlign: 'left', marginLeft: '60px' }}
              >
                Up to K150, 000 in prizes.
              </Typography>
            </Box>
            <br />
            <Box
              sx={{
                backgroundColor: '#F7F7F7',
                padding: '20px'
              }}
            >
              <div style={{ marginRight: '10px' }}>
                <TaskAltOutlinedIcon
                  sx={{
                    float: 'left',
                    width: '40px',
                    height: '50px',
                    color: '#EC008C',
                    paddingRight: '3px',
                    marginTop: {
                      xs: '35px',
                      sm: '10px',
                      md: '10px',
                      lg: '10px',
                      xl: '10px'
                    }
                  }}
                />
              </div>
              <Typography
                variant="body2"
                sx={{
                  padding: '5px',
                  textAlign: 'left',
                  marginLeft: '60px'
                }}
              >
                4-weeks of ongoing support from Stanbic Bank Zambia and a<br />
                network of coaches and mentors to assist with go-to-market
                <br />
                strategies and scaling-up for the winning team.
              </Typography>
            </Box>
            <br />
            <Box
              sx={{
                backgroundColor: '#F7F7F7',
                padding: '20px'
              }}
            >
              <div style={{ marginRight: '10px' }}>
                <TaskAltOutlinedIcon
                  sx={{
                    float: 'left',
                    width: '40px',
                    height: '50px',
                    color: '#EC008C',
                    paddingRight: '5px',
                    marginTop: {
                      xs: '3px',
                      sm: '5px',
                      md: '-10px'
                    }
                  }}
                />
              </div>

              <Typography
                variant="body2"
                sx={{ padding: '5px', textAlign: 'left', marginLeft: '60px' }}
              >
                An opportunity to join a supportive innovators network.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
