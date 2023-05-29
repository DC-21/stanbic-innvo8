/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { useQuery } from 'react-query';
// import { useNavigate } from 'react-router-dom';
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
  // const navigate = useNavigate();

  const {
    data: teams,
    // isError,
    isLoading
    // error
  } = useQuery(['Teams'], () => getTeam(user?._id));

  if (isLoading) {
    return <Loading size={40} />;
  }

  //   if (error) {
  //     return (
  //       <Box display="flex" justifyContent="center" alignItems="center">
  //         <Card variant="outlined">
  //           <CardContent>
  //             <Typography
  //               display="flex"
  //               justifyContent="center"
  //               alignItems="center"
  //               variant="h3"
  //             >
  //               Error fetching teams.
  //             </Typography>
  //           </CardContent>
  //         </Card>
  //       </Box>
  //     );
  //   }

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
        {!teams || teams.length <= 0 ? (
          <Box
            sx={{
              width: '710px',
              padding: 3,
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: '#fff',
              borderRadius: '10px'
            }}
          >
            <Typography variant="h3">No teams found.</Typography>
          </Box>
        ) : (
          teams?.map((team) => (
            <a
              key={team._id}
              href={`/team/teams/${selectedTeamId}`}
              style={{ textDecoration: 'none' }} // Optional: Remove underline style
            >
              <Card
                elevation={1}
                sx={{
                  minWidth: 200,
                  // borderBottom: '2px solid #2196F3',
                  margin: '0 8px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'row',
                  overflow: 'hidden',
                  borderRadius: '10px',
                  backgroundColor: '#fff',
                  '&:hover': {
                    boxShadow: '0 0 4px rgba(0, 0, 255, 1)',
                    color: '#000' // Set text color to white
                  },
                  padding: 3,
                  border: 'none'
                }}
                onClick={() => {
                  // @ts-ignore
                  setSelectedTeamId(team._id);
                }}
              >
                <CardContent>
                  <Typography variant="h3" color="primary">
                    {team.name}
                  </Typography>
                </CardContent>
              </Card>
            </a>
          ))
        )}
      </Box>
      <Typography variant="h4" sx={{ paddingTop: 3, paddingBottom: 2 }}>
        Team Invites
      </Typography>
      <TeamInvites />
    </div>
  );
};

export default TeamList;
