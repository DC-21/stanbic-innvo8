/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  TextField,
  CircularProgress,
  Autocomplete,
  Grid,
  Card,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails
  // CardActionArea,
  // CardContent
} from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useDispatch, useSelector } from 'react-redux';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import GroupsIcon from '@mui/icons-material/Groups';
import { AxiosError } from 'axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from '../../../../clientProvider/baseConfig';
import Loading from '../../../../components/Loading';
import { Teams, User } from '../../../../types';
import { useNotify } from '../../../../redux/actions/notifications/notificationActions';
import { CustomModal, useModalWithData } from '../../../../components/Modal';
import LeaveTeam from '../actionButtons/LeaveTeam';
import RemoveMember from '../actionButtons/RemoveMember';
import { RootState } from '../../../../redux/reducers/rootReducer';
import TeamProposalList from './TeamProposalList';
import PendingInvites from './PendingInvitesList';
import DeleteTeam from '../actionButtons/DeleteTeam';

const getUsers = async (): Promise<User[]> => {
  const { data } = await axios.get('/User/view_users');
  return data?.Users;
};

const getTeam = async (id: string | undefined): Promise<Teams> => {
  const { data: res } = await axios.get(`/Team/view_team/${id}`);
  return res.data;
};

const getPendingInvites = async (id: string | undefined): Promise<Teams> => {
  const { data: response } = await axios.get(
    `/Invitation/view_invitation_by_team/${id}`
  );
  return response.data;
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
  const navigate = useNavigate();
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
  const { data: pending } = useQuery(['PendingInvites'], () =>
    getPendingInvites(id)
  );
  console.log(pending, 'Pending');
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
      queryClient.invalidateQueries(['Teams', id]);
      queryClient.invalidateQueries(['Users']);
      queryClient.invalidateQueries(['PendingInvites']);
    }
  });

  if (isLoading || !usersData) {
    return <Loading size={40} />;
  }
  // add pending invites list /view_invitation_by_team/teamId
  return (
    <Box>
      {/* <Typography>Team Details</Typography> */}
      {user?._id === data?.leadId?._id ? (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <DeleteTeam />
          <Button
            variant="text"
            startIcon={<BorderColorIcon />}
            onClick={() => navigate(`/team/teams-edit/${id}`)}
            sx={{ textTransform: 'capitalize' }}
          >
            Edit Team
          </Button>
        </Box>
      ) : null}
      <Grid
        container
        spacing={4}
        padding={2}
        marginTop={0}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center'
        }}
      >
        <Grid item xs={12} sm={12} md={7}>
          <TeamProposalList />
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <Card sx={{ padding: 2, borderRadius: '5px' }}>
            <Box
              key={data?.leadId?._id}
              sx={{
                // width: '710px',
                padding: 2,
                // borderBottom: '1px solid #2196F3',
                border: 1,
                borderColor: '#f3f3f3',
                marginBottom: '16px',
                marginTop: 1,
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: '#fff'
              }}
            >
              <Box style={{}}>
                <Typography variant="h5" color="primary">
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
                    borderRadius: '4px',
                    textTransform: 'capitalize'
                  }}
                  size="small"
                  variant="contained"
                  disabled
                >
                  Team Lead
                </Button>
              </Box>
            </Box>
            {user?._id === data?.leadId?._id ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Card
                  elevation={10}
                  sx={{
                    padding: 2,
                    width: '100%',
                    backgroundColor: '#0A2993',
                    borderRadius: '10px'
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Avatar
                      sx={{
                        backgroundColor: '#0A2993',
                        width: 56,
                        height: 56
                      }}
                    >
                      <GroupsIcon sx={{ fontSize: 50 }} />
                    </Avatar>
                  </Box>
                  <Autocomplete
                    fullWidth
                    disablePortal
                    options={filteredUsersData ?? []}
                    getOptionLabel={(users: User) =>
                      `${users?.firstName} ${users?.lastName} (${users?.branch})`
                    }
                    sx={{
                      backgroundColor: '#fff',
                      borderRadius: '10px',
                      marginTop: 2
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Search" />
                    )}
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
                    size="medium"
                    type="submit"
                    sx={{
                      width: '100%',
                      backgroundColor: '#00A1E0',
                      marginBottom: 2,
                      marginTop: 2,
                      textTransform: 'capitalize'
                    }}
                    onClick={() => mutate()}
                    startIcon={
                      isLoading ? (
                        <CircularProgress color="inherit" size={26} />
                      ) : null
                    }
                    endIcon={
                      <Avatar sx={{ backgroundColor: '#00A1E0' }}>
                        <RecentActorsIcon />
                      </Avatar>
                    }
                  >
                    <Typography variant="h6" sx={{ color: '#fff' }}>
                      Invite teammate
                    </Typography>
                  </Button>
                </Card>
              </Box>
            ) : null}
            {isLoading && <Loading size={24} />}
            <Accordion sx={{ margin: 1, borderRadius: '3px' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="member-list-content"
                id="member-list-header"
              >
                <Typography variant="h5" sx={{ color: '#F5B740' }}>
                  Members ({data?.members.length})
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {data?.members.length === 0 ? (
                  <Box
                    sx={{
                      // width: '710px',
                      padding: 3,
                      display: 'flex',
                      justifyContent: 'center',
                      backgroundColor: '#fff',
                      borderRadius: '10px',
                      marginBottom: '20px'
                    }}
                  >
                    <Typography variant="h5">No team members found.</Typography>
                  </Box>
                ) : (
                  data?.members?.map((member) => (
                    <Box
                      key={member?._id}
                      sx={{
                        // width: '710px',
                        padding: 2,
                        // borderBottom: '1px solid #2196F3',
                        // marginBottom: '10px',
                        marginTop: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: '#0033A1',
                        borderRadius: '10px',
                        '&:hover': {
                          boxShadow: '0 0 4px rgba(0, 0, 255, 1)',
                          color: '#000'
                        }
                      }}
                    >
                      <Box style={{}}>
                        <Typography variant="h5" color="white">
                          {member?.firstName} {member?.lastName}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#F5B740' }}>
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
                              cursor: 'pointer',
                              textTransform: 'capitalize'
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
                              cursor: 'pointer',
                              textTransform: 'capitalize'
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
              </AccordionDetails>
            </Accordion>

            <PendingInvites data={pending} />
          </Card>
        </Grid>
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
      </Grid>
    </Box>
  );
};

export default ListTeamMembers;
