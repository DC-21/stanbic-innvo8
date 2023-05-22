import React from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { axios } from '../../../../clientProvider';
import { RootState } from '../../../../redux/reducers/rootReducer';
import Loading from '../../../../components/Loading';
import {
  CustomModal,
  useModal,
  useModalWithData
} from '../../../../components/Modal';
import AcceptInvite from '../actionButtons/AcceptInvite';
import RejectInvite from '../actionButtons/RejectInvite';

function TeamInvites() {
  const { user } = useSelector((store: RootState) => store.user);
  const { open, handleClose, handleClickOpen } = useModal();
  const { selected, setSelected } = useModalWithData();
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const getTeamInvites = async (): Promise<any[]> => {
    const { data: response } = await axios.get(
      `/Invitation/view_invitation_by_user/${user?._id}`
    );
    console.log(response.data);
    return response.data;
  };

  const { data, isLoading, isError } = useQuery(['invites'], () =>
    getTeamInvites()
  );

  if (isLoading) {
    return <Loading size={40} />;
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Card variant="outlined">
          <CardContent>
            <Typography
              display="flex"
              justifyContent="center"
              alignItems="center"
              variant="h3"
            >
              Error fetching teams.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  if (data?.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Card variant="outlined" sx={{ width: '100%' }}>
          <CardContent>
            <Typography
              display="flex"
              justifyContent="center"
              alignItems="center"
              variant="h3"
            >
              No Invites Found.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box>
      {data &&
        data.map((invite) => (
          <Box
            key={invite?._id}
            sx={{
              padding: '16px',
              borderBottom: '1px solid #2196F3',
              marginBottom: '16px',
              display: 'flex',
              flexDirection: 'row',
              backgroundColor: '#fff',
              borderRadius: '15px',
              '&:hover': {
                boxShadow: '0 0 4px rgba(0, 0, 255, 1)',
                color: '#000'
              }
            }}
          >
            <Box style={{}}>
              <Typography variant="h3">{invite?.teamId?.name}</Typography>
              <Typography variant="body2">
                from: {invite?.userId?.firstName} {invite?.userId?.lastName}
              </Typography>
              <p>Branch: {invite?.userId?.branch}</p>
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
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                variant="contained"
                onClick={() => {
                  setSelected(invite._id);
                  handleClickOpen();
                }}
              >
                Accept
              </Button>
              <Button
                style={{
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                variant="contained"
                onClick={() => {
                  setSelected(invite._id);
                  handleClickOpenModal();
                }}
              >
                Reject
              </Button>
            </Box>
          </Box>
        ))}
      <CustomModal
        open={open}
        handleClose={handleClose}
        title="Delete Innovation Idea"
      >
        {open ? (
          <AcceptInvite selected={selected} handleClose={handleCloseModal} />
        ) : null}
      </CustomModal>
      <CustomModal
        open={openModal}
        handleClose={handleCloseModal}
        title="Delete Innovation Idea"
      >
        {openModal ? (
          <RejectInvite selected={selected} handleClose={handleCloseModal} />
        ) : null}
      </CustomModal>
    </Box>
  );
}

export default TeamInvites;
