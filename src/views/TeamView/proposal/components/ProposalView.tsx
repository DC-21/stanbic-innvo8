import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Table,
  TableCell,
  TableRow
} from '@mui/material';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

import { axios } from '../../../../clientProvider';
import { Proposal } from './ProprosalEditView';

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
  const { data } = useQuery(['submissions', id], () => getProposal(id));
  console.log(data, 'things here');
  return (
    <Container maxWidth="lg">
      <Grid container sx={{ mt: 4 }} spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Innovation Idea"
              subheader="Submitted Innovation idea (proposal) information"
            />
            <CardContent>
              <Table size="small">
                <TableRow>
                  <TableCell variant="head">
                    What’s the title of your innovation
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
        <Grid item xs={12} md={3}>
          <Card>
            <CardHeader
              title="Team members"
              subheader="Team Lead information"
            />
            <CardContent>
              {/* <TableRow>
                <TableCell variant="head">TEAM LEAD DETAILS</TableCell>
                <TableCell />
              </TableRow> */}
              <Table size="small" sx={{ p: 1, mr: 1 }}>
                <TableRow>
                  <TableCell variant="head">First Name</TableCell>
                  <TableCell>{data?.leadId?.firstName}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell variant="head">Last Name</TableCell>
                  <TableCell>{data?.leadId?.lastName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">Email</TableCell>
                  <TableCell>{data?.leadId?.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">Branch name</TableCell>
                  <TableCell>{data?.leadId?.branch}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">Gender</TableCell>
                  <TableCell>{data?.leadId?.gender}</TableCell>
                </TableRow>
                <br />
                <br />
                <TableRow>
                  <TableCell variant="head">TEAM MEMBERS INFORMATION</TableCell>
                  <TableCell />
                </TableRow>
              </Table>
              {data?.teamId.members && data?.teamId?.members.length > 0
                ? data?.teamId.members.map((member) => (
                    <>
                      <Table size="small" key={member._id}>
                        <TableRow>
                          <TableCell variant="head">First Name</TableCell>
                          <TableCell>{member.firstName}</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell variant="head">Last Name</TableCell>
                          <TableCell>{member.lastName}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell variant="head">Email</TableCell>
                          <TableCell>{member.email}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell variant="head">Branch name</TableCell>
                          <TableCell>{member.branch}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell variant="head">Gender</TableCell>
                          <TableCell>{data?.leadId?.gender}</TableCell>
                        </TableRow>
                      </Table>
                      <br />
                      <br />
                    </>
                  ))
                : null}
            </CardContent>
          </Card>
        </Grid>
        {/* <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              title="Team Members"
              subheader="Team members information"
            />
            <CardContent>
              {data?.teamId.members && data?.teamId?.members.length > 0
                ? data?.teamId.members.map((member) => (
                    <Table size="small" key={member._id}>
                      <TableRow>
                        <TableCell variant="head">First Name</TableCell>
                        <TableCell>{member.firstName}</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell variant="head">Last Name</TableCell>
                        <TableCell>{member.lastName}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell variant="head">Email</TableCell>
                        <TableCell>{member.email}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell variant="head">Branch name</TableCell>
                        <TableCell>{member.branch}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell variant="head">Gender</TableCell>
                        <TableCell>{data?.leadId?.gender}</TableCell>
                      </TableRow>
                    </Table>
                  ))
                : null}
            </CardContent>
          </Card>
        </Grid> */}
        {/**
         * Team Name Card
         */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardHeader title="Team" subheader="Team information" />
            <CardContent>
              <Table size="small">
                <TableRow>
                  <TableCell variant="head">Team Name</TableCell>
                  <TableCell>{data?.teamId?.name}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell variant="head">Team Description</TableCell>
                  <TableCell>{data?.teamId?.description}</TableCell>
                </TableRow>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProposalView;
