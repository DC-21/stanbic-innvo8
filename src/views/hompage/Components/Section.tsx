import React from 'react';
import { Typography, Grid, Container, Box } from '@mui/material';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

export default function Section() {
  return (
    <div className="topPadding">
      <Typography
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
      </Typography>
      <Container fixed id="About">
        <Grid container className="color" columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid
            item
            xs={6}
            className="section2"
            spacing={2}
            style={{ backgroundColor: '#fff' }}
          >
            <Typography>
              <Box sx={{ mb: 1 }}>
                Building on the first iteration in 2021, Project Innov8 2.0 is
                an opportunity for bold Stanbic staff to form cross-departmental
                teams that are determined to develop new ideas meant to address
                customer-centric challenges. The Challenge is open to all
                Stanbic staff in teams of 2 to 3 Innovators.
              </Box>
            </Typography>
            <Typography>
              During the program, Stanbic Innovators will be supported through
              the process of interrogating their ideas, developing business
              models, and pitching them to the bank. During the final pitch, a
              winning team and 2 runners up will be selected, walking away with
              up to K150, 000 in prizes.
            </Typography>
            <br />
            <Typography
              style={{ fontSize: '16px' }}
              className="heading"
              color="primary"
            >
              Innovation Challenge Outcomes
            </Typography>
            <br />
            <Box sx={{ backgroundColor: '#edf3ff', padding: '10px' }}>
              <PsychologyOutlinedIcon
                sx={{
                  float: 'left',
                  width: '50px',
                  height: '40px'
                }}
              />
              <Typography
                variant="body2"
                sx={{ padding: '10px', textAlign: 'left' }}
              >
                Innovation-ready Change Makers
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: '#edf3ff',
                marginTop: '12px',
                padding: '10px'
              }}
            >
              <Inventory2OutlinedIcon
                sx={{
                  float: 'left',
                  width: '50px',
                  height: '40px',
                  marginTop: { xs: '10px', sm: '10px', md: '3px' }
                }}
              />
              <Typography
                variant="body2"
                sx={{ padding: '10px', textAlign: 'left' }}
              >
                Impactful new product or product improvements
              </Typography>
            </Box>
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
