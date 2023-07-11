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
                      md: '7px'
                    }
                  }}
                />
              </div>

              <Typography
                variant="body2"
                sx={{ padding: '10px', textAlign: 'left', marginLeft: '60px' }}
              >
                We believe that innovation can be the driving force behind
                Stanbic Bank’s growth and success.
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
                Your contributions here have the power to shape the future of
                our organization and propel us to new heights..
              </Typography>
            </Box>
            <br />
            {/* <Box
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
            </Box> */}
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
                      md: '7px'
                    }
                  }}
                />
              </div>

              <Typography
                variant="body2"
                sx={{ padding: '10px', textAlign: 'left', marginLeft: '60px' }}
              >
                Whether you have a revolutionary product idea, a process
                improvement suggestion, or a game-changing strategy, this portal
                is the perfect space to unleash your creativity
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
                We encourage all our internal staff to participate actively, as
                your unique perspectives and expertise are invaluable to our
                progress.
              </Typography>
            </Box>
            <br />
          </Grid>
          <Box
            sx={{
              padding: '1px'
            }}
          >
            <Typography
              variant="h4"
              color="primary"
              sx={{ padding: '3px', textAlign: 'center', marginLeft: '60px' }}
            >
              Lets collaborate, innovate, and build a better future together to
              transform client experience, execute with excellence and drive
              sustainable growth & value. - Together It Can Be!”
            </Typography>
          </Box>
        </Grid>
      </Container>
    </div>
  );
}
