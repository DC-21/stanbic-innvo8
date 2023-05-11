import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent
} from '@mui/material';
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
      <Box sx={{ mt: 5 }}>
        <Card sx={{ bgcolor: `#0133a1`, color: '#ffffff' }}>
          <CardContent>
            <Typography variant="h4" sx={{ textTransform: 'uppercase' }}>
              Innovation ideas(proprosal)
            </Typography>
            <Typography sx={{ fontSize: 20 }}>
              This is the place where you can add, view and edit your Innovation
              Ideas (proposal)
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ mt: 4, mb: 4 }} display="flex" justifyContent="flex-end">
        <Button
          disabled={user?.userType === 'Team Member'}
          startIcon={<AddCircleOutline />}
          color="primary"
          onClick={() => navigate(`/team/innovation-create`)}
          variant="contained"
          size="large"
        >
          New Idea
        </Button>
      </Box>
      <ProposalList />
    </Container>
  );
}

export default InnovationProposal;
