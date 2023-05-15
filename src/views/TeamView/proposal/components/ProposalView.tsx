import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

import { axios } from '../../../../clientProvider';
import { Proposal } from './ProprosalEditView';
import Loading from '../../../../components/Loading';

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
  return data.data;
};

function ProposalView() {
  const {
    // @ts-ignore
    state: { id }
  } = useLocation();
  const { data, isLoading } = useQuery(['submissions', id], () =>
    getProposal(id)
  );

  const members = data?.teamId.members || [];
  if (data?.leadId) {
    members.push(data.leadId);
  }

  if (isLoading) {
    return <Loading size={40} />;
  }
  return (
    <Container maxWidth="lg">
      <Card sx={{ marginTop: 2, padding: 2 }}>
        <Typography variant="h2" color="primary" fontWeight="bold">
          Team: {data?.teamId?.name}
        </Typography>
      </Card>

      <Grid container sx={{ mt: 1 }} spacing={2}>
        <Grid item xs={12} md={12}>
          <Card>
            <CardHeader
              title="Innovation Idea"
              subheader="Submitted Innovation idea (proposal) information"
              fontWeight="bold"
            />
            <CardContent>
              <Table>
                <TableRow>
                  <TableCell variant="head">
                    What’s the title of your innovation?
                  </TableCell>
                  <TableCell>{data?.title}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell variant="head">
                    What problem are you solving?
                  </TableCell>
                  <TableCell>{data?.problem}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">
                    What is the proposed solution?
                  </TableCell>
                  <TableCell>{data?.proposedSolution}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">
                    What Challenge Statement Does Your solution address?
                  </TableCell>
                  <TableCell>
                    {/** @ts-ignore */}
                    {data?.challengeStatementId?.challengeStatement}
                  </TableCell>
                </TableRow>
              </Table>
            </CardContent>
          </Card>
        </Grid>
        {/**
         * Team Leaner Card
         */}

        <Grid item xs={12} md={12} sx={{ paddingBottom: '5%', mt: 1 }}>
          <Card>
            <CardHeader title="Team Members" fontWeight="bold" />
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Branch name</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Role</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {members &&
                    members.map((member) => (
                      <TableRow key={member._id}>
                        <TableCell>{member.firstName}</TableCell>
                        <TableCell>{member.lastName}</TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>{member.branch}</TableCell>
                        <TableCell>{member.gender}</TableCell>
                        <TableCell>{member.userType}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProposalView;
