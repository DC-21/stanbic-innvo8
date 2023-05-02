import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { axios } from '../../../../clientProvider';
import Loading from '../../../../components/Loading';
import { ChallengeStatement } from '../../../../types';
import EditChallengeStatement from './EditChallengeStatement';

const getChallengeById = async (
  userId: string | undefined
): Promise<ChallengeStatement> => {
  const { data } = await axios.get(`/Challenge/view_challenge/${userId}`);
  return data.data;
};

function EditViewChallenge() {
  const params = useParams();
  const { isLoading, data } = useQuery(['Challenge', params.id], () =>
    getChallengeById(params.id)
  );

  if (isLoading) return <Loading size={40} />;
  if (!data) return null;
  return <EditChallengeStatement data={data} />;
}

export default EditViewChallenge;
