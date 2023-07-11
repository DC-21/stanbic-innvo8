import React from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { axios } from '../../../../clientProvider';
import Loading from '../../../../components/Loading';
import ProposalEdit from './ProposalEdit';

export interface ChallengeId {
  challengeStatement: string;
  _id: string;
  themeId: string;
}

export interface Proposal {
  _id?: string;
  title: string;
  category: string;
  challengeStatementId: ChallengeId;
  problem: string;
  proposedSolution: string;
  status: string;
  teamId: string | undefined;
}

const getInnovationProposal = async (id: any): Promise<Proposal> => {
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

  if (isError) {
    return <div>Error</div>;
  }
  return <ProposalEdit proposal={data} />;
}
export default ProposalEditView;
