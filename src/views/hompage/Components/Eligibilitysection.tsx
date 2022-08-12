import React from 'react';
import { Typography, Grid, Container, Box } from '@mui/material';

export default function Eligibilitysection() {
  return (
    <div className="topPadding2">
      <Container fixed id="EligibilityCriteria">
        <Grid container className="color" columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid
            item
            xs={6}
            sm={2}
            md={6}
            lg={6}
            xl={6}
            className="african-man"
            sx={{ display: { xs: 'none', sm: 'flex', md: 'flex' } }}
          />
          <Grid item xs={6} className="section3">
            <Typography className="heading">Eligibility Criteria</Typography>

            <Typography>
              <Box sx={{ mb: 1 }}>
                The submitting team must be Stanbic Bank Zambia members of
                staff.
              </Box>
            </Typography>
            <Typography>
              <Box sx={{ mb: 1 }}>
                Team members cannot belong to more than one innovation team.
              </Box>
            </Typography>
            <Typography>
              <Box sx={{ mb: 1 }}>
                The submitting team must be based in Zambia.
              </Box>
            </Typography>
            <Typography>
              <Box sx={{ mb: 1 }}>
                The submitted idea must be aligned with the needs of Zambians.
              </Box>
            </Typography>
            <Typography>
              <Box sx={{ mb: 1 }}>
                The submitting team must be made up of Zambian nationals or
                residents.
              </Box>
            </Typography>
            <Typography>
              <Box sx={{ mb: 1 }}>
                The submitting team may be seeking support for customer,
                product, and/or business model development;
              </Box>
            </Typography>
            <Typography>
              <Box sx={{ mb: 1 }}>
                A maximum of 2 team members (preferably Team Leads) must be able
                to attend the Sprint Week
              </Box>
            </Typography>
            <Typography>
              <Box sx={{ mb: 1 }}>
                <span>
                  The winning team of the incubation programme must be able{' '}
                </span>
                to attend a 4-week idea development programme in September 2022.
              </Box>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
