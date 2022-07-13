import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { axios } from '../../../clientProvider';
import { Application } from '../../../types';
import Loading from '../../../components/Loading';
import ViewSubmission from './ViewSubmission';

const getSubmissionsById = async (
  id: string | undefined
): Promise<Application> => {
  const { data } = await axios.get(`/Innovation/view_innovation/${id}`);
  return data.data;
};
function SubmissionViewDetails() {
  const { id } = useParams();
  const { data, status } = useQuery(['application', id], () =>
    getSubmissionsById(id)
  );
  if (status === 'loading') {
    return <Loading size={45} />;
  }
  if (!data) return null;
  return (
    <div>
      <ViewSubmission application={data} />
    </div>
  );
}

export default SubmissionViewDetails;
