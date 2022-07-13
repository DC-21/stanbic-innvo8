/* eslint-disable react/function-component-definition */
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from '@mui/material';
import React from 'react';
import { Application } from '../../../types';

interface Props {
  application: Application | undefined;
}
const ViewApplication: React.FC<Props> = ({ application }) => {
  return (
    <div style={{ flexGrow: 1, padding: 20 }}>
      <Typography variant="h3" color="primary">
        <b>Team: {application?.teamId.name}</b>
      </Typography>
      <Table sx={{ backgroundColor: '#fff' }}>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography variant="h6" color="primary">
                Title
              </Typography>
            </TableCell>
            <TableCell>:{application?.title}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="h6" color="primary">
                Category
              </Typography>
            </TableCell>
            <TableCell>:{application?.category}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="h6" color="primary">
                Problem
              </Typography>
            </TableCell>
            <TableCell>:{application?.problem}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="h6" color="primary">
                Proposed Solution
              </Typography>
            </TableCell>
            <TableCell>:{application?.proposedSolution}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="h6" color="primary">
                Total Votes
              </Typography>
            </TableCell>
            <TableCell>:{application?.totalVotes}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ViewApplication;
