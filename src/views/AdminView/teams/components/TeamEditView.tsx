import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { axios } from '../../../../clientProvider';
import Loading from '../../../../components/Loading';
import { Teams } from '../../../../types';
import TeamEdit from './TeamEdit';

const getAdminById = async (userId: string | undefined): Promise<Teams> => {
  const { data } = await axios.get(`/Team/view_team/${userId}`);
  return data.data;
};

function TeamEditView() {
  const params = useParams();
  console.log('userId', params);
  const { isLoading, data } = useQuery(['team', params.id], () =>
    getAdminById(params.id)
  );

  if (isLoading) return <Loading size={40} />;
  if (!data) return null;
  return <TeamEdit data={data} />;
}

export default TeamEditView;
