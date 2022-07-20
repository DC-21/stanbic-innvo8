/* eslint-disable react/function-component-definition */
import { Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { Teams } from '../../../../types';

interface Props {
  team: Teams | undefined;
}
const TeamView: React.FC<Props> = ({ team }) => {
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
            Team: <b>{team?.name}</b>
          </Typography>
          <br />
          <Typography variant="h6" color="primary">
            Description:
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
            value={team?.description}
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
          }}
        >
          <Typography variant="h5" color="primary">
            Team Lead: {team?.leadId?.firstName} {team?.leadId?.lastName}
          </Typography>
          {team?.members.map((item) => {
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

export default TeamView;
