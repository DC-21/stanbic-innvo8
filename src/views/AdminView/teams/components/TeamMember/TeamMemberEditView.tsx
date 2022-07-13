import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { axios } from '../../../../../clientProvider';
import Loading from '../../../../../components/Loading';
import { Teams } from '../../../../../types';
import TeamMemberEdit from './TeamMemberEdit';

const getAdminById = async (userId: string | undefined): Promise<Teams> => {
  const { data } = await axios.get(`/User/view_user/${userId}`);
  return data.data;
};

function TeamMemberEditView() {
  const params = useParams();
  const { isLoading, data } = useQuery(['TeamMembers', params.id], () =>
    getAdminById(params.id)
  );

  if (isLoading) return <Loading size={40} />;
  if (!data) return null;
  return <TeamMemberEdit data={data} />;
}

export default TeamMemberEditView;
