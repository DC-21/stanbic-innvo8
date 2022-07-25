import { Container, Typography, Box, Button } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import ProposalForm from './components/ProposalForm';
import { useSelector } from 'react-redux';
import ProposalList from './components/ProposalList';
import { RootState } from '../../../redux/reducers/rootReducer';

function InnovationProposal() {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <Container>
      <Box sx={{ mt: 12 }}>
        <Typography sx={{ textTransform: 'uppercase' }} variant="h4">
          Innovation ideas(proprosal)
        </Typography>
        <Typography sx={{ fontSize: 20 }}>
          This is the place where you can add, view and edit your Innovation
          Ideas (proposal)
        </Typography>
      </Box>
      <Box sx={{ mt: 4, mb: 4 }} display="flex" justifyContent="flex-end">
        <Button
          disabled={user?.userType === 'Team Member'}
          startIcon={<AddCircleOutline />}
          color="primary"
          onClick={() => navigate(`/team/innovation-create`)}
          variant="contained"
        >
          Add New Idea
        </Button>
      </Box>
      <ProposalList />
      {/* <ProposalForm /> */}
    </Container>
  );
}

export default InnovationProposal;
