import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { axios } from '../../../clientProvider';
import { Application } from '../../../types';
import Loading from '../../../components/Loading';
import ViewApplication from './ViewApplication';

const getApplicationById = async (
  id: string | undefined
): Promise<Application> => {
  const { data } = await axios.get(`/Innovation/view_innovation/${id}`);
  return data.data;
};
function ApplicationViewDetails() {
  const { id } = useParams();
  const { data, status } = useQuery(['application', id], () =>
    getApplicationById(id)
  );
  if (status === 'loading') {
    return <Loading size={45} />;
  }
  if (!data) return null;
  return (
    <div>
      <ViewApplication application={data} />
    </div>
  );
}

export default ApplicationViewDetails;
