/* eslint-disable react/function-component-definition */
import React from 'react';
import { Box, Typography } from '@mui/material';

const PendingInvites = ({ data }) => {
  // add pending invites list /view_invitation_by_team/teamId
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
      }}
    >
      <Typography variant="h4" color="primary" sx={{}}>
        Pending Invitations
      </Typography>
      {data?.length === 0 ? (
        <Box
          sx={{
            width: '710px',
            padding: 3,
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: '#fff',
            borderRadius: '10px',
            marginBottom: '20px'
          }}
        >
          <Typography variant="h4">No team invites found.</Typography>
        </Box>
      ) : (
        data?.map((member) => (
          <Box
            key={member?.userId?._id}
            sx={{
              width: '710px',
              padding: 2,
              marginBottom: '10px',
              marginTop: 1,
              display: 'flex',
              flexDirection: 'row',
              backgroundColor: '#fff',
              borderRadius: '10px',
              '&:hover': {
                boxShadow: '0 0 4px rgba(0, 0, 255, 1)',
                color: '#000'
              }
            }}
          >
            <Box style={{}}>
              <Typography variant="h4" color="primary">
                {member?.userId?.firstName} {member?.userId?.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {member?.userId?.branch}
              </Typography>
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
};

export default PendingInvites;
