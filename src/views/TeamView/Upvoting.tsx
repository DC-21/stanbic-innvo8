/* eslint-disable react/function-component-definition */
import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Badge
} from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import axios from '../../clientProvider/baseConfig';
import Loading from '../../components/Loading';

const getUser = async (): Promise<any[]> => {
  const { data: response } = await axios.get(
    '/Innovation/view_pending_innovations'
  );
  return response.Innovations;
};

const upvoteInnovation = async (innovationId: string) => {
  await axios.patch(`/Innovation/like_innovation/${innovationId}`);
};

const Upvotes: React.FC<React.PropsWithChildren<unknown>> = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(['upvoting'], getUser);
  const upvoteMutation = useMutation(upvoteInnovation, {
    onSuccess: () => {
      queryClient.invalidateQueries(['upvoting']);
    }
  });

  console.log('data', data);

  if (isLoading) {
    return <Loading size={40} />;
  }

  return (
    <div style={{ width: '100%' }}>
      {data?.map((innov) => (
        <Card
          key={innov._id}
          sx={{
            width: '100%',
            marginBottom: '16px',
            borderRadius: '15px',
            '&:hover': {
              boxShadow: '0 0 4px rgba(0, 0, 255, 1)'
            }
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              gutterBottom
              sx={{ paddingBottom: 1 }}
            >
              {innov.title}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ paddingBottom: 1 }}
            >
              Problem: {innov.problem}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ paddingBottom: 1 }}
            >
              Solution: {innov.proposedSolution}
            </Typography>

            <IconButton
              color="primary"
              size="large"
              onClick={() => upvoteMutation.mutate(innov._id)}
            >
              <Badge badgeContent={innov.likes} color="primary">
                <FavoriteBorderOutlinedIcon />
              </Badge>
            </IconButton>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Upvotes;
