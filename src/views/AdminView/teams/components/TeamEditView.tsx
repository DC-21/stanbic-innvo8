import { Grid } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { axios } from '../../../../clientProvider';
import Loading from '../../../../components/Loading';
import { Teams } from '../../../../types';
import TeamEdit from './TeamEdit';
// import TeamMemberList from './TeamMember/TeamMemberList';

const getAdminById = async (userId: string | undefined): Promise<Teams> => {
  const { data } = await axios.get(`/Team/view_team/${userId}`);
  return data.data;
};

function TeamEditView() {
  const params = useParams();
  const { isLoading, data } = useQuery(['team', params.id], () =>
    getAdminById(params.id)
  );

  if (isLoading) return <Loading size={40} />;
  if (!data) return null;
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TeamEdit data={data} />
        </Grid>
        {/* <Grid item xs={12}>
          <TeamMemberList teamId={params.id} />
        </Grid> */}
      </Grid>
    </div>
  );
}

export default TeamEditView;
