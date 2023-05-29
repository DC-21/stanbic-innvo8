import { TextField, Button, CircularProgress, Box } from '@mui/material';
import { AxiosError } from 'axios';

import { useSnackbar } from 'notistack';
import React from 'react';

import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { axios } from '../../../clientProvider';

interface Props {
  handleClose: () => void;
}

function AddTheme({ handleClose }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: 'onChange' });
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { mutate, isLoading } = useMutation(
    async (data: any) => axios.post('/Theme/new_theme', data),
    {
      onSuccess: (response) => {
        const { message } = response.data;
        enqueueSnackbar(message, { variant: 'success' });
        setTimeout(() => handleClose(), 1500);
      },

      onError: (error: AxiosError) => {
        enqueueSnackbar(error.response?.data, { variant: 'error' });
      },

      onSettled: () => queryClient.invalidateQueries(['Themes'])
    }
  );

  const onSubmit = (data: any) => {
    const submitData = {
      ...data
    };
    mutate(submitData);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        error={!!errors.name}
        label="Name"
        variant="outlined"
        fullWidth
        size="small"
        margin="normal"
        {...register('name')}
      />
      <TextField
        error={!!errors.description}
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

export default AddTheme;
