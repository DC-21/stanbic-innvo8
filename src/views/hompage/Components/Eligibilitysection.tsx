import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Box, Container, Grid } from '@mui/material';
// import AlignHorizontalRightIcon from '@mui/icons-material/AlignHorizontalRight';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import ArticleIcon from '@mui/icons-material/Article';
// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import GroupsIcon from '@mui/icons-material/Groups';
// import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import ZambiaIcon from '../../../components/CardSvG/ZambiaIcon';
import AvatarIcon from '../../../components/CardSvG/AvatarIcon';
import CompleteTask from '../../../components/CardSvG/CompleteTask';
import PathIcon from '../../../components/CardSvG/PathIcon';
import Hand from '../../../components/CardSvG/Hand';
import MemberIcon from '../../../components/CardSvG/MemberIcon';
import TrainingIcon from '../../../components/CardSvG/TrainingIcon';
import Group from '../../../components/CardSvG/Group';

export default function Eligibilitysection() {
  return (
    <div
      id="EligibilityCriteria"
      style={{
        paddingTop: '50px',
        paddingBottom: '50px',
        backgroundColor: '#fff'
      }}
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
        Eligibility Criteria
      </Typography>
      <Container fixed>
        <Grid
          container
          className="spacing"
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={6} sm={3}>
            <Card className="cardheight" elevation={0}>
              <div
                style={{
                  padding: '15px',
                  verticalAlign: 'middle',
                  paddingTop: '50px',
                  paddingBottom: '50px'
                }}
              >
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Group />
                </Box>
                <Typography
                  variant="h6"
                  style={{ textAlign: 'center', marginTop: '15px' }}
                >
                  The submitting team must be Stanbic Bank Zambia members of
                  staff.
                </Typography>
              </div>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card className="cardheight" elevation={0}>
              <div
                style={{
                  padding: '15px',
                  verticalAlign: 'middle',
                  paddingTop: '50px',
                  paddingBottom: '50px'
                }}
              >
                <Box display="flex" justifyContent="center" alignItems="center">
                  <AvatarIcon />
                </Box>
                <Typography
                  variant="h6"
                  style={{ textAlign: 'center', marginTop: '15px' }}
                >
                  Team members cannot belong to more than one innovation team.
                </Typography>
              </div>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card className="cardheight" elevation={0}>
              <div
                style={{
                  padding: '15px',
                  verticalAlign: 'middle',
                  paddingTop: '50px',
                  paddingBottom: '50px'
                }}
              >
                <Box display="flex" justifyContent="center" alignItems="center">
                  <ZambiaIcon />
                </Box>

                <Typography
                  variant="h6"
                  style={{ textAlign: 'center', marginTop: '15px' }}
                >
                  The submitting team must be based in Zambia.
                </Typography>
              </div>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card className="cardheight" sx={{ maxWidth: 300 }} elevation={0}>
              <div
                style={{
                  padding: '20px',
                  verticalAlign: 'middle',
                  paddingTop: '50px',
                  paddingBottom: '50px'
                }}
              >
                <Box display="flex" justifyContent="center" alignItems="center">
                  <CompleteTask />
                </Box>
                <Typography
                  variant="h6"
                  style={{ textAlign: 'center', marginTop: '15px' }}
                >
                  The submitted idea must be aligned with the needs of Zambians.
                </Typography>
              </div>
            </Card>
          </Grid>
        </Grid>
        <Grid
          container
          className="spacing"
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={6} sm={3}>
            <Card className="cardheight" elevation={0}>
              <div
                style={{
                  padding: '15px',
                  verticalAlign: 'middle',
                  paddingTop: '30px',
                  paddingBottom: '30px'
                }}
              >
                <Box display="flex" justifyContent="center" alignItems="center">
                  <PathIcon />
                </Box>
                <Typography
                  variant="h6"
                  style={{ textAlign: 'center', marginTop: '45px' }}
                >
                  The submitting team must be made up of Zambian nationals or
                  residents.
                </Typography>
              </div>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card className="cardheight" elevation={0}>
              <div
                style={{
                  padding: '15px',
                  verticalAlign: 'middle',
                  paddingTop: '30px',
                  paddingBottom: '30px'
                }}
              >
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Hand />
                </Box>
                <Typography
                  style={{ textAlign: 'center', marginTop: '25px' }}
                  variant="h6"
                >
                  The submitting team may be seeking support for customer,
                  product, and/or business model development;
                </Typography>
              </div>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card className="cardheight" elevation={0}>
              <div
                style={{
                  padding: '15px',
                  verticalAlign: 'middle',
                  paddingTop: '30px',
                  paddingBottom: '30px'
                }}
              >
                <Box display="flex" justifyContent="center" alignItems="center">
                  <MemberIcon />
                </Box>
                <Typography
                  gutterBottom
                  variant="h6"
                  style={{ textAlign: 'center', marginTop: '25px' }}
                >
                  A maximum of 2 team members (preferably Team Leads) must be
                  able to attend the Sprint Week
                </Typography>
              </div>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card className="cardheight" elevation={0}>
              <div
                style={{
                  padding: '15px',
                  verticalAlign: 'middle',
                  paddingTop: '30px',
                  paddingBottom: '30px'
                }}
              >
                <Box display="flex" justifyContent="center" alignItems="center">
                  <TrainingIcon />
                </Box>
                <Typography
                  variant="h6"
                  style={{ textAlign: 'center', marginTop: '25px' }}
                >
                  The winning team of the incubation programme must be able to
                  attend a 4-week idea development programme in September 2022.
                </Typography>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
