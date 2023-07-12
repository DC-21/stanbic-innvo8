import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardActionArea
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
      <Box sx={{ mt: 5, mb: 2 }}>
        <Card sx={{ bgcolor: `#0A2240`, color: '#ffffff' }}>
          <CardContent>
            <Typography
              sx={{
                textTransform: 'uppercase',
                color: '#00A1E0',
                fontWeight: 400,
                fontSize: '20px'
              }}
            >
              Idea submission
            </Typography>
            <Typography sx={{ fontSize: 15 }}>
              Here you can add, view and edit your Innovation Ideas. Then Our
              team of experts will carefully review each submission, providing
              feedback and support to refine and implement the most promising
              concepts.
            </Typography>
          </CardContent>
          <CardActionArea>
            <Box sx={{ mb: 2 }} display="flex" justifyContent="flex-start">
              <Button
                sx={{
                  marginLeft: 2,
                  backgroundColor: '#F5B740',
                  color: '#fff',
                  fontStyle: 'bold'
                }}
                disabled={user?.userType === 'Team Member'}
                startIcon={<AddCircleOutline sx={{ color: '#fff' }} />}
                onClick={() => navigate(`/team/innovation-create`)}
                variant="contained"
                size="large"
              >
                New Idea
              </Button>
            </Box>
          </CardActionArea>
        </Card>
      </Box>

      <ProposalList />
    </Container>
  );
}

export default InnovationProposal;
