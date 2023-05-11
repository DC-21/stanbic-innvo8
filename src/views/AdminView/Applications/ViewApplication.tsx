/* eslint-disable react/function-component-definition */
import { Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { Application } from '../../../types';

interface Props {
  application: Application | undefined;
}
const ViewApplication: React.FC<Props> = ({ application }) => {
  return (
    <div
      style={{
        flexGrow: 1,
        padding: '20px',
        marginLeft: '35px',
        marginRight: '15px',
        marginTop: '5px'
      }}
    >
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          style={{
            backgroundColor: '#fff',
            flexGrow: 1,
            padding: '20px',
            marginLeft: '15px',
            marginRight: '15px',
            marginTop: '5px',
            gap: '20px',
            borderRadius: '10px'
          }}
        >
          <Typography variant="h3" color="primary">
            <b>Team: {application?.teamId.name}</b>
          </Typography>
          <br />
          <Typography variant="h4" color="primary" sx={{ paddingTop: '4%' }}>
            1. What’s the title of your innovation?
          </Typography>
          <Typography
            style={{
              backgroundColor: '#f2f2f2',
              padding: '10px',
              marginTop: '8px'
            }}
          >
            {application?.title}
          </Typography>
          <Typography variant="h4" color="primary" sx={{ paddingTop: '4%' }}>
            2. What problem are you solving?
          </Typography>
          <Typography
            style={{
              backgroundColor: '#f2f2f2',
              padding: '10px',
              marginTop: '8px'
            }}
          >
            {application?.problem}
          </Typography>
          <Typography variant="h4" color="primary" sx={{ paddingTop: '4%' }}>
            3. What is the proposed solution?
          </Typography>
          <Typography
            style={{
              backgroundColor: '#f2f2f2',
              padding: '10px',
              marginTop: '8px'
            }}
          >
            {application?.proposedSolution}
          </Typography>
          <Typography variant="h4" color="primary" sx={{ paddingTop: '4%' }}>
            4. Which category/sector does your innovation fall under?
          </Typography>
          <Typography
            style={{
              backgroundColor: '#f2f2f2',
              padding: '10px',
              marginTop: '8px'
            }}
          >
            {/** @ts-ignore */}
            {application?.challengeStatementId.challengeStatement}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          style={{
            backgroundColor: '#fff',
            flexGrow: 1,
            padding: '20px',
            marginLeft: '15px',
            marginRight: '15px',
            marginTop: '5px',
            gap: '20px',
            borderRadius: '10px'
            // columnCount: 2
          }}
        >
          <Typography variant="h4" color="primary">
            <b>Total Votes:</b> {application?.totalVotes}
          </Typography>
          <Typography variant="h4" color="primary">
            <b>Total Judges Who Voted:</b> {application?.totalVotedJudges}
          </Typography>
          <br />
          <Divider />
          <Typography variant="h4" color="primary" sx={{ paddingTop: '10px' }}>
            <b>Judges Who Voted:</b>
          </Typography>
          {application?.votes.map((item) => {
            return (
              <ul key={item._id} style={{ paddingLeft: '20px' }}>
                <li>
                  <Typography variant="h4" color="primary">
                    {item?.judge?.firstName} {item?.judge?.lastName}
                  </Typography>
                </li>
              </ul>
            );
          })}
          <Divider sx={{ paddingTop: '10px' }} />
          <br />
          <Typography variant="h4" color="primary">
            <b>Team Lead</b>: {application?.leadId?.firstName}{' '}
            {application?.leadId?.lastName}
          </Typography>
          {application?.teamId.members.map((item) => {
            return (
              <Typography variant="h4" color="primary" key={item._id}>
                <b>Team Member</b>: {item?.firstName} {item?.lastName}
              </Typography>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};

export default ViewApplication;
