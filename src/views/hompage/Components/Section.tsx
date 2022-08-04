import React from 'react';
import { Typography, Grid, Container, Box } from '@mui/material';

export default function Section() {
  return (
    <div className="topPadding">
      <Container fixed id="About">
        <Grid container className="color" columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={6} className="section2" spacing={2}>
            <Typography className="heading">
              <span className="normalH">About</span>
              Project Innov8 2.0
            </Typography>
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
            <Typography className="heading">
              Innovation Challenge Outcomes
            </Typography>
            <Typography>Innovation-ready Change Makers</Typography>
            <Typography>
              Impactful new product or product improvements
            </Typography>
          </Grid>
          <Grid item xs={6} className="woman" />
        </Grid>
      </Container>
    </div>
  );
}
