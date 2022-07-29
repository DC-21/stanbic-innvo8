/* eslint-disable react/function-component-definition */
import { Grid, TextField, Typography } from '@mui/material';
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
          <Typography variant="h6" color="primary">
            1. What’s the title of your innovation?
          </Typography>
          <TextField
            aria-readonly
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            type="text"
            value={application?.title}
          />
          <Typography variant="h6" color="primary">
            2. What problem are you solving?
          </Typography>
          <TextField
            multiline
            rows={4}
            aria-readonly
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            type="text"
            value={application?.problem}
          />
          <Typography variant="h6" color="primary">
            3. What is the proposed solution?
          </Typography>
          <TextField
            multiline
            rows={6}
            aria-readonly
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            type="text"
            value={application?.proposedSolution}
          />
          <Typography variant="h6" color="primary">
            4. Which category/sector does your innovation fall under?
          </Typography>
          <TextField
            aria-readonly
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            type="text"
            value={application?.category}
          />
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
          <Typography variant="h5" color="primary">
            Total Judges Who Voted: {application?.totalVotedJudges}
          </Typography>

          <Typography variant="h5" color="primary">
            Total Votes: {application?.totalVotes}
          </Typography>
          <Typography variant="h5" color="primary">
            Team Lead: {application?.leadId?.firstName}{' '}
            {application?.leadId?.lastName}
          </Typography>
          {application?.teamId.members.map((item) => {
            console.log(item);
            return (
              <Typography variant="h5" color="primary" key={item._id}>
                Team Member: {item.firstName} {item.lastName}
              </Typography>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};

export default ViewApplication;
