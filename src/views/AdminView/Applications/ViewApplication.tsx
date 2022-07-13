/* eslint-disable react/function-component-definition */
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import React from 'react';
import { Application } from '../../../types';

interface Props {
  application: Application | undefined;
}
const ViewApplication: React.FC<Props> = ({ application }) => {
  return (
    <div
      style={{
        backgroundColor: '#fff',
        flexGrow: 1,
        padding: '20px',
        marginLeft: '15px',
        marginRight: '15px',
        marginTop: '5px'
      }}
    >
      <Typography variant="h3" color="primary">
        <b>Team: {application?.teamId.name}</b>
      </Typography>
      <br />
      <Typography variant="h6" color="primary">
        1. What’s the title of your innovation?
      </Typography>
      <TextField
        aria-readonly
        variant="outlined"
        fullWidth
        margin="normal"
        size="small"
        type="text"
        value={application?.title}
      />
      <Typography variant="h6" color="primary">
        2. What problem are you solving?
      </Typography>
      <TextField
        aria-readonly
        variant="outlined"
        fullWidth
        margin="normal"
        size="small"
        type="text"
        value={application?.problem}
      />
      <Typography variant="h6" color="primary">
        3. What is the proposed solution?
      </Typography>
      <TextField
        multiline
        aria-readonly
        variant="outlined"
        fullWidth
        margin="normal"
        size="small"
        type="text"
        value={application?.proposedSolution}
      />
      <Typography variant="h6" color="primary">
        4. Which category/sector does your innovation fall under?
      </Typography>
      <TextField
        aria-readonly
        variant="outlined"
        fullWidth
        margin="normal"
        size="small"
        type="text"
        value={application?.category}
      />
      <Card style={{ flexGrow: 1, padding: 20 }}>
        <Table sx={{ backgroundColor: '#fff' }}>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography variant="h6" color="primary">
                  Total Judges Who Voted
                </Typography>
              </TableCell>
              <TableCell>:{application?.totalVotedJudges}</TableCell>
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
      </Card>
    </div>
  );
};

export default ViewApplication;
