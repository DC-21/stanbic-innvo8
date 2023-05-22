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
import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';
import axios from '../../../../clientProvider/baseConfig';
import Loading from '../../../../components/Loading';
import { Teams, User } from '../../../../types';
import { useNotify } from '../../../../redux/actions/notifications/notificationActions';

const getUsers = async (): Promise<User[]> => {
  const { data } = await axios.get('/User/view_users');
  return data?.Users;
};

const getTeam = async (id: string | undefined): Promise<Teams> => {
  const { data: res } = await axios.get(`/Team/view_team/${id}`);
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
  console.log(inviteName, 'xx');

  const { data: usersData } = useQuery(['Users'], () => getUsers());
  const { data, refetch } = useQuery(['Team-members'], () => getTeam(id));

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
      <Typography>{data?.name}</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center'
        }}
      >
        <Autocomplete
          disablePortal
          options={usersData}
          getOptionLabel={(user: User) =>
            `${user?.firstName} ${user?.lastName} (${user?.branch})`
          }
          sx={{ width: '550px' }}
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
      {isLoading && <Loading size={24} />}{' '}
      {data?.members.length === 0 ? (
        <Typography variant="body1" sx={{ paddingTop: '5%' }}>
          No team members found.
        </Typography>
      ) : (
        data?.members.map((member) => (
          <ul key={member._id}>
            <li key={member._id}>
              {member.firstName} {member.lastName}
            </li>
          </ul>
        ))
      )}
    </Box>
  );
};

export default ListTeamMembers;
