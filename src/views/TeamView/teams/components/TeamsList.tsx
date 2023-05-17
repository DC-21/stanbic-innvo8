/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reducers/rootReducer';
import { axios } from '../../../../clientProvider';

const getTeam = async (id: string | undefined): Promise<any[]> => {
  const { data: res } = await axios.get(`/Team/view_team_by_user/${id}`);
  console.log('res', res);
  return res.data;
};

const TeamList = () => {
  const { user } = useSelector((store: RootState) => store.user);
  const [selectedTeamId, setSelectedTeamId] = useState<string | undefined>('');
  console.log('teamId', selectedTeamId);
  const navigate = useNavigate();

  const {
    data: teams,
    isError,
    isLoading
  } = useQuery(['Teams'], () => getTeam(user?._id));

  if (isLoading) {
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
              Loading teams...
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
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

  if (teams?.length === 0) {
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
              No teams found.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <div>
      <Typography variant="h4">Teams</Typography>
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          width: '100%',
          padding: 2
        }}
      >
        {teams?.map((team) => (
          <Card
            key={team.id}
            sx={{
              minWidth: 200,
              margin: '0 8px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'row',
              overflow: 'hidden',
              borderRadius: '15px',
              '&:hover': {
                boxShadow: '0 0 4px rgba(0, 0, 255, 1)'
              },
              padding: 2,
              gap: '10px'
            }}
            onClick={() => {
              // @ts-ignore
              setSelectedTeamId(team._id);
              // @ts-ignore
              navigate(`/team/teams/${selectedTeamId}`);
            }}
          >
            <CardContent>
              <Typography variant="h4">{team.name}</Typography>
              <Typography variant="h5" color="text.secondary">
                {team.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Typography variant="h4" sx={{ paddingTop: 3 }}>
        Team Invites:
      </Typography>
    </div>
  );
};

export default TeamList;
