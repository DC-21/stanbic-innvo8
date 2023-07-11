/* eslint-disable react/function-component-definition */
import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PendingInvites = ({ data }) => {
  // add pending invites list /view_invitation_by_team/teamId
  return (
    <Accordion sx={{ margin: 1, borderRadius: '5px' }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="pending-invites-content"
        id="pending-invites-header"
      >
        <Typography variant="h5" sx={{ color: '#F5B740' }}>
          Pending Invitations
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {data?.length === 0 ? (
          <Box
            sx={{
              width: '100%',
              // padding: 1,
              display: 'flex',
              // justifyContent: 'center',
              backgroundColor: '#fff',
              borderRadius: '10px',
              marginBottom: '10px'
            }}
          >
            <Typography variant="h5">No team invites found.</Typography>
          </Box>
        ) : (
          data?.map((member) => (
            <Box
              key={member?.userId?._id}
              sx={{
                width: '100%',
                padding: 2,
                // marginBottom: '10px',
                marginTop: 1,
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: '#EEEEEE',
                borderRadius: '10px',
                '&:hover': {
                  boxShadow: '0 0 4px rgba(0, 0, 255, 1)',
                  color: '#000'
                }
              }}
            >
              <Box style={{}}>
                <Typography variant="h5" color="primary">
                  {member?.userId?.firstName} {member?.userId?.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {member?.userId?.branch}
                </Typography>
              </Box>
            </Box>
          ))
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default PendingInvites;
