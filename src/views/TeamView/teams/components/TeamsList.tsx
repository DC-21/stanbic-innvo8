/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reducers/rootReducer';
import { axios } from '../../../../clientProvider';
import Loading from '../../../../components/Loading';
import TeamInvites from './TeamInvites';

const getTeam = async (id: string | undefined): Promise<any[]> => {
  const { data: res } = await axios.get(`/Team/view_team_by_user/${id}`);
  return res.data;
};

const TeamList = () => {
  const { user } = useSelector((store: RootState) => store.user);
  const [selectedTeamId, setSelectedTeamId] = useState<string | undefined>('');
  const navigate = useNavigate();

  const {
    data: teams,
    isError,
    isLoading
  } = useQuery(['Teams'], () => getTeam(user?._id));

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
          <a
            key={team.id}
            href={`/team/teams/${team._id}`}
            style={{ textDecoration: 'none' }} // Optional: Remove underline style
          >
            <Card
              sx={{
                minWidth: 200,
                borderBottom: '2px solid #2196F3',
                margin: '0 8px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'row',
                overflow: 'hidden',
                borderRadius: '15px',
                '&:hover': {
                  boxShadow: '0 0 4px rgba(0, 0, 255, 1)',
                  color: '#000' // Set text color to white
                },
                padding: 2,
                gap: '10px'
              }}
              onClick={() => {
                // @ts-ignore
                setSelectedTeamId(team._id);
                // @ts-ignore
                setTimeout(
                  () => navigate(`/team/teams/${selectedTeamId}`),
                  100
                );
                // navigate(`/team/teams/${selectedTeamId}`);
              }}
            >
              <CardContent>
                <Typography variant="h4">{team.name}</Typography>
              </CardContent>
            </Card>
          </a>
        ))}
      </Box>
      <Typography variant="h4" sx={{ paddingTop: 3 }}>
        Team Invites
      </Typography>
      <TeamInvites />
    </div>
  );
};

export default TeamList;
