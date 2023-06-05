/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  TextField,
  CircularProgress,
  Autocomplete
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosError } from 'axios';
import axios from '../../../../clientProvider/baseConfig';
import Loading from '../../../../components/Loading';
import { Teams, User } from '../../../../types';
import { useNotify } from '../../../../redux/actions/notifications/notificationActions';
import { CustomModal, useModalWithData } from '../../../../components/Modal';
import LeaveTeam from '../actionButtons/LeaveTeam';
import RemoveMember from '../actionButtons/RemoveMember';
import { RootState } from '../../../../redux/reducers/rootReducer';
import TeamProposalList from './TeamProposalList';

const getUsers = async (): Promise<User[]> => {
  const { data } = await axios.get('/User/view_users');
  return data?.Users;
};

const getTeam = async (id: string | undefined): Promise<Teams> => {
  const { data: res } = await axios.get(`/Team/view_team/${id}`);
  console.log('res', res.data);
  return res.data;
};

const sendInvite = async (
  inviteName: string | undefined,
  teamId: string | undefined
) => {
  const { data: response } = await axios.post('/Invitation/new_invitation', {
    userId: inviteName,
    teamId
  });
  return response;
};

const ListTeamMembers = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const notification = useNotify();
  const queryClient = useQueryClient();
  const [inviteName, setInviteName] = useState('');
  const { selected, setSelected } = useModalWithData();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const { user } = useSelector((store: RootState) => store.user);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { data: usersData } = useQuery(['Users'], () => getUsers());
  const { data, refetch } = useQuery(['Team-members'], () => getTeam(id));

  // @ts-ignore
  const filteredUsersData = usersData?.filter(
    (filteredUser: User) => filteredUser?._id !== user?._id
  );

  const { mutate, isLoading } = useMutation(() => sendInvite(inviteName, id), {
    onSuccess: (response) => {
      const { message } = response;
      dispatch(notification({ message, options: { variant: 'success' } }));
      refetch();
      setInviteName('');
      // setTimeout(() => handleClose(), 1000);
    },
    onError: (error: AxiosError) => {
      dispatch(
        notification({
          message: error.response?.data,
          options: { variant: 'error' }
        })
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(['acceptInvites']);
      queryClient.invalidateQueries(['Teams']);
      queryClient.invalidateQueries(['Users']);
    }
  });

  if (isLoading || !usersData) {
    return <Loading size={40} />;
  }
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
      {user?._id === data?.leadId?._id ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <Autocomplete
            disablePortal
            options={filteredUsersData ?? []}
            getOptionLabel={(users: User) =>
              `${users?.firstName} ${users?.lastName} (${users?.branch})`
            }
            sx={{ width: '550px', backgroundColor: '#fff' }}
            renderInput={(params) => <TextField {...params} label="Search" />}
            onChange={(event, value: User | null) => {
              if (value) {
                setInviteName(value._id);
              } else {
                setInviteName('');
              }
            }}
          />
          <Button
            variant="contained"
            sx={{ width: '150px', marginLeft: 1 }}
            type="submit"
            onClick={() => mutate()}
            startIcon={
              isLoading ? <CircularProgress color="inherit" size={26} /> : null
            }
          >
            Invite
          </Button>
        </Box>
      ) : null}
      {isLoading && <Loading size={24} />}{' '}
      <Typography variant="h4" color="primary" sx={{ paddingTop: '5%' }}>
        Team members
      </Typography>
      <Box
        key={data?.leadId?._id}
        sx={{
          width: '710px',
          padding: 2,
          // borderBottom: '1px solid #2196F3',
          marginBottom: '16px',
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
            {data?.leadId?.firstName} {data?.leadId?.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data?.leadId?.branch}
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
              backgroundColor: '#21A809',
              color: 'white',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '4px'
            }}
            size="small"
            variant="contained"
          >
            Team Lead
          </Button>
        </Box>
      </Box>
      {data?.members.length === 0 ? (
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
          <Typography variant="h4">No team members found.</Typography>
        </Box>
      ) : (
        data?.members?.map((member) => (
          <Box
            key={member?._id}
            sx={{
              width: '710px',
              padding: 3,
              // borderBottom: '1px solid #2196F3',
              marginBottom: '16px',
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
                {member?.firstName} {member?.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {member?.branch}
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
              {user?._id !== data?.leadId?._id ? (
                // Show the "Leave" button only if the current user is not the lead
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
                  Leave
                </Button>
              ) : (
                // Show the "Remove" button only if the current user is the lead
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
                    setSelected(member?._id);
                    handleClickOpenModal();
                  }}
                >
                  Remove
                </Button>
              )}
            </Box>
          </Box>
        ))
      )}
      <TeamProposalList />
      <CustomModal open={open} handleClose={handleClose} title="Leave Team">
        {open ? (
          <LeaveTeam selected={selected} handleClose={handleClose} />
        ) : null}
      </CustomModal>
      <CustomModal
        open={openModal}
        handleClose={handleCloseModal}
        title="Remove Member"
      >
        {openModal ? (
          <RemoveMember selected={selected} handleClose={handleCloseModal} />
        ) : null}
      </CustomModal>
    </Box>
  );
};

export default ListTeamMembers;
