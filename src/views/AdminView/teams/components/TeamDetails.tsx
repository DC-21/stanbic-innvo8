import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { axios } from '../../../../clientProvider';
import { Teams } from '../../../../types';
import Loading from '../../../../components/Loading';
import TeamView from './TeamView';

const getTeamById = async (id: string | undefined): Promise<Teams> => {
  const { data } = await axios.get(`/Team/view_team/${id}`);
  return data.data;
};
function TeamDetails() {
  const { id } = useParams();
  const { data, status } = useQuery(['application', id], () => getTeamById(id));
  if (status === 'loading') {
    return <Loading size={45} />;
  }
  if (!data) return null;
  return (
    <div>
      <TeamView team={data} />
    </div>
  );
}

export default TeamDetails;
