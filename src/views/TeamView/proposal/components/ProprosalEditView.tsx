import React from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { axios } from '../../../../clientProvider';
import Loading from '../../../../components/Loading';
import ProposalEdit from './ProposalEdit';

const getInnovationProposal = async (id: any): Promise<Record<any, any>> => {
  // eslint-disable-next-line no-shadow
  const { data } = await axios.get(
    // @ts-ignore
    `/Innovation/view_innovation/${id}`
  );
  return data.data;
};

function ProposalEditView() {
  const {
    // @ts-ignore
    state: { id }
  } = useLocation();

  const { data, isError, isLoading } = useQuery(['submissions', id], () =>
    // @ts-ignore
    getInnovationProposal(id)
  );
  if (isLoading) {
    return <Loading size={40} />;
  }
  console.log(data, 'proposal edit view');
  if (isError) {
    return <div>Error</div>;
  }
  return <ProposalEdit />;
}
export default ProposalEditView;
