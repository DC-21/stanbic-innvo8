import {
  TextField,
  Button,
  CircularProgress,
  Box,
  Typography,
  Card
} from '@mui/material';
import { AxiosError } from 'axios';

import { useSnackbar } from 'notistack';
import React from 'react';

import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { axios } from '../../../../clientProvider';
import { RootState } from '../../../../redux/reducers/rootReducer';

interface Props {
  handleClose: () => void;
}

function AddTeam({ handleClose }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: 'onChange' });
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useSelector((state: RootState) => state.user);
  const { mutate, isLoading } = useMutation(
    async (data: any) => axios.post('/Team/new_team', data),
    {
      onSuccess: (response) => {
        const { message } = response.data;
        enqueueSnackbar(message, { variant: 'success' });
        setTimeout(() => handleClose(), 1500);
      },

      onError: (error: AxiosError) => {
        enqueueSnackbar(error.response?.data, { variant: 'error' });
      },

      onSettled: () => queryClient.invalidateQueries(['Teams'])
    }
  );

  const onSubmit = (data: any) => {
    const submitData = {
      ...data,
      leadId: user?._id,
      description: 'Team'
    };
    mutate(submitData);
  };
  return (
    <Box
      sx={{
        padding: 2,
        marginTop: 1,
        borderRadius: '5px'
      }}
    >
      <Card sx={{ backgroundColor: '#fff', padding: 2 }} elevation={3}>
        <Typography display="flex" justifyContent="center">
          Create Team
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            error={!!errors.name}
            label="Team name"
            variant="outlined"
            fullWidth
            size="small"
            margin="normal"
            {...register('name')}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={isLoading ? <CircularProgress size={25} /> : null}
              type="submit"
              fullWidth
            >
              Submit
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
}

export default AddTeam;
