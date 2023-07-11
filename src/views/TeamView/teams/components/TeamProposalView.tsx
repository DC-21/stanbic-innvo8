import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

import { axios } from '../../../../clientProvider';
import Loading from '../../../../components/Loading';
import { Proposal } from '../../proposal/components/ProprosalEditView';

export interface TeamId {
  _id: string;
  name: string;
  description: string;
  leadId: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  members: any[];
  id: string;
}
export interface LeadId {
  _id: string;
  userType: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  branch: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

type Props = Omit<Proposal, 'teamId'> & { teamId: TeamId; leadId: LeadId };

const getProposal = async (id: string): Promise<Props> => {
  const { data } = await axios.get(`/Innovation/view_innovation/${id}`);
  return data?.data;
};

function TeamProposalView() {
  const {
    // @ts-ignore
    state: { id }
  } = useLocation();
  const { data, isLoading } = useQuery(['submissions', id], () =>
    getProposal(id)
  );

  if (isLoading) {
    return <Loading size={40} />;
  }
  return (
    <Container maxWidth="lg">
      <Grid container sx={{ mt: 1 }} spacing={2}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          style={{
            backgroundColor: '#fff',
            flexGrow: 1,
            padding: '20px',
            marginLeft: '15px',
            marginRight: '15px',
            marginTop: '5px',
            gap: '20px',
            borderRadius: '10px',
            marginBottom: '10px'
          }}
        >
          <br />
          <Typography variant="h4" color="primary" sx={{ paddingTop: '4%' }}>
            1. What’s the title of your innovation?
          </Typography>
          <Typography
            style={{
              backgroundColor: '#f2f2f2',
              padding: '10px',
              marginTop: '8px'
            }}
          >
            {data?.title}
          </Typography>
          <Typography variant="h4" color="primary" sx={{ paddingTop: '4%' }}>
            2. What problem are you solving?
          </Typography>
          <Typography
            style={{
              backgroundColor: '#f2f2f2',
              padding: '10px',
              marginTop: '8px'
            }}
          >
            {data?.problem}
          </Typography>
          <Typography variant="h4" color="primary" sx={{ paddingTop: '4%' }}>
            3. What is the proposed solution?
          </Typography>
          <Typography
            style={{
              backgroundColor: '#f2f2f2',
              padding: '10px',
              marginTop: '8px'
            }}
          >
            {data?.proposedSolution}
          </Typography>
          <Typography variant="h4" color="primary" sx={{ paddingTop: '4%' }}>
            4. Which category/sector does your innovation fall under?
          </Typography>
          <Typography
            style={{
              backgroundColor: '#f2f2f2',
              padding: '10px',
              marginTop: '8px'
            }}
          >
            {/** @ts-ignore */}
            {data?.challengeStatementId?.challengeStatement}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default TeamProposalView;
