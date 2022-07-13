import { TextField, Button, CircularProgress, Box } from '@mui/material';
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
      leadId: user?._id
    };
    mutate(submitData);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        error={!!errors.lastName}
        label="Team name"
        variant="outlined"
        fullWidth
        size="small"
        margin="normal"
        {...register('name')}
      />
      <TextField
        error={!!errors.lastName}
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        size="small"
        margin="normal"
        {...register('description')}
      />
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={isLoading ? <CircularProgress size={25} /> : null}
          type="submit"
        >
          Submit
        </Button>
      </Box>
    </form>
  );
}

export default AddTeam;
