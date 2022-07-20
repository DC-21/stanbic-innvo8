import {
  Container,
  Card,
  CardHeader,
  CardContent,
  TableRow,
  TableCell,
  Grid,
  Table
} from '@mui/material';
import React from 'react';

import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { axios } from '../../../../clientProvider';
import Loading from '../../../../components/Loading';

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

export interface Member {
  _id: string;
  userType: string;
  teamId: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  branch: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Team {
  _id: string;
  name: string;
  description: string;
  leadId: LeadId;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  members: Member[];
  id: string;
}

const getTeam = async (id: string): Promise<Team> => {
  const { data } = await axios.get(`/Team/view_team/${id}`);
  return data.data;
};

function TeamView() {
  const {
    // @ts-ignore
    state: { id }
  } = useLocation();
  const { data, isLoading, isError } = useQuery(['submissions', id], () =>
    getTeam(id)
  );

  console.log(data, 'data');
  if (isError) return <div>Error</div>;

  if (isLoading) return <Loading size={40} />;
  return (
    <Container maxWidth="lg">
      <Grid container sx={{ mt: 4 }} spacing={4}>
        {/**
         * Team Leaner Card
         */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Team members"
              subheader="Team Lead information"
            />
            <CardContent>
              <Table size="small">
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
              {data?.members && data?.members.length > 0
                ? data?.members.map((member) => (
                    <Table size="small" key={member._id}>
                      {/* <Table size="small" key={member._id}> */}
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
                      {/* </Table> */}
                      <br />
                      <br />
                    </Table>
                  ))
                : null}
            </CardContent>
          </Card>
        </Grid>

        {/**
         * Team Name Card
         */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Team" subheader="Team information" />
            <CardContent>
              <Table size="small">
                <TableRow>
                  <TableCell variant="head">Team Name</TableCell>
                  <TableCell>{data?.name}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell variant="head">Team Description</TableCell>
                  <TableCell>{data?.description}</TableCell>
                </TableRow>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
export default TeamView;
