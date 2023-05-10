import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { axios } from '../../../../clientProvider';
import Loading from '../../../../components/Loading';

import TeamEdit from './TeamEdit';
import { Teams } from '../../../../types';

const getTeamById = async (Id: string | undefined): Promise<Teams> => {
  const { data } = await axios.get(`/Team/view_team/${Id}`);
  return data.data;
};

function TeamEditView() {
  const params = useParams();
  const { isLoading, data } = useQuery(['question', params.id], () =>
    getTeamById(params.id)
  );
  if (isLoading) return <Loading size={40} />;
  if (!data) return null;
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TeamEdit data={data} />{' '}
        </Grid>
      </Grid>
    </div>
  );
}
export default TeamEditView;
