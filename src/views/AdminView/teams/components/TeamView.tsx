/* eslint-disable react/function-component-definition */
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Table,
  TableCell,
  TableRow,
  Typography
} from '@mui/material';
import React from 'react';
import { Teams } from '../../../../types';

interface Props {
  team: Teams | undefined;
}
const TeamView: React.FC<Props> = ({ team }) => {
  return (
    <Container maxWidth="lg">
      <Grid container sx={{ mt: 1 }} spacing={4}>
        {/**
         * Team Leaner Card
         */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title={<Typography color="primary">Team members</Typography>}
              subheader={
                <Typography color="primary">Team Lead information</Typography>
              }
            />
            <CardContent>
              <Table size="small">
                <TableRow>
                  <TableCell variant="head">First Name</TableCell>
                  <TableCell>{team?.leadId?.firstName}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell variant="head">Last Name</TableCell>
                  <TableCell>{team?.leadId?.lastName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">Email</TableCell>
                  <TableCell>{team?.leadId?.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">Branch name</TableCell>
                  <TableCell>{team?.leadId?.branch}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">Gender</TableCell>
                  <TableCell>{team?.leadId?.gender}</TableCell>
                </TableRow>
                <br />
                <br />
                <TableRow>
                  <TableCell variant="head">
                    <Typography color="primary">
                      Team Member Information
                    </Typography>
                  </TableCell>
                  <TableCell />
                </TableRow>
              </Table>
              {team?.members && team?.members.length > 0
                ? team?.members.map((member) => (
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
                        <TableCell>{team?.leadId?.gender}</TableCell>
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
            <CardHeader
              title={<Typography color="primary">Team</Typography>}
              subheader={
                <Typography color="primary">Team information</Typography>
              }
            />
            <CardContent>
              <Table size="small">
                <TableRow>
                  <TableCell variant="head">Team Name</TableCell>
                  <TableCell>{team?.name}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell variant="head">Team Description</TableCell>
                  <TableCell>{team?.description}</TableCell>
                </TableRow>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TeamView;
