import React from 'react';
import { Typography, Grid, Container } from '@mui/material';

export default function Eligibilitysection() {
  return (
    <div className="topPadding2">
      <Container fixed id="EligibilityCriteria">
        <Grid container className="color">
          <Grid item xs={6} className="african-man" />
          <Grid item xs={6} className="section3">
            <Typography className="heading">
              <span className="normalH">Eligibility</span> Criteria
            </Typography>
            <Typography>
              The submitting team must be Stanbic Bank Zambia members of staff.
            </Typography>
            <Typography>
              Team members cannot belong to more than one innovation team.
            </Typography>
            <Typography>
              The submitting team must be based in Zambia.
            </Typography>
            <Typography>
              The submitted idea must be aligned with the needs of Zambians.
            </Typography>
            <Typography>
              The submitting team must be made up of Zambian nationals or
              residents.
            </Typography>
            <Typography>
              The submitting team may be seeking support for customer, product,
              and/or business model development;
            </Typography>
            <Typography>
              A maximum of 2 team members (preferably Team Leads) must be able
              to attend the Sprint Week
            </Typography>
            <Typography>
              <span>
                The winning team of the incubation programme must be able{' '}
              </span>
              to attend a 4-week idea development programme in September 2022.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
