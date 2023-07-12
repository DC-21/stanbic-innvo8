/* eslint-disable react/function-component-definition */
import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CustomModal, useModalWithData } from '../../../../components/Modal';
import CancelInvite from '../actionButtons/CancelInvite';

const PendingInvites = ({ data }) => {
  const { selected, setSelected } = useModalWithData();
  const [open, setOpen] = React.useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // add pending invites list /view_invitation_by_team/teamId
  return (
    <Accordion sx={{ margin: 1, borderRadius: '5px' }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="pending-invites-content"
        id="pending-invites-header"
      >
        <Typography variant="h5" sx={{ color: '#F5B740' }}>
          Pending Invitations ({data?.length})
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
              <Box
                style={{
                  marginLeft: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '8px'
                }}
              >
                <Button
                  style={{
                    marginRight: '8px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                  variant="contained"
                  onClick={() => {
                    setSelected(member?._id);
                    handleClickOpen();
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          ))
        )}
        <CustomModal
          open={open}
          handleClose={handleClose}
          title="Cancel Invite"
        >
          {open ? (
            <CancelInvite selected={selected} handleClose={handleClose} />
          ) : null}
        </CustomModal>
      </AccordionDetails>
    </Accordion>
  );
};

export default PendingInvites;
