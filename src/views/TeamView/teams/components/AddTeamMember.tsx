import React from 'react';
import {
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  DialogActions
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import { useMutation } from 'react-query';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';
import branch from '../../../../components/branch';
import { axios } from '../../../../clientProvider';

type Props = {
  handleClose: () => void;
  leadId: any;
};

export interface FormData {
  userType: string;
  teamId: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  branch: string;
}

function AddTeamMember({ handleClose, leadId }: Props) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const { enqueueSnackbar } = useSnackbar();
  const { mutate, isLoading } = useMutation(
    async (data: FormData) => axios.post('/User/new_user ', data),
    {
      onSuccess: (response) => {
        const { message } = response.data;
        enqueueSnackbar(message, { variant: 'success' });
        setTimeout(() => handleClose(), 1500);
      },
      onError: (error: AxiosError) => {
        enqueueSnackbar(error.response?.data, { variant: 'error' });
      }
    }
  );

  const onSubmit = (data: any) => {
    const submitData = {
      ...data,
      teamId: leadId,
      userType: 'Team Member'
    };

    mutate(submitData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        error={!!errors.firstName}
        fullWidth
        size="small"
        margin="normal"
        label="First Name"
        type="text"
        variant="outlined"
        {...register('firstName', { required: true })}
      />
      <TextField
        error={!!errors.lastName}
        fullWidth
        size="small"
        margin="normal"
        label="Last Name"
        type="text"
        variant="outlined"
        {...register('lastName', { required: true })}
      />
      <TextField
        error={!!errors.email}
        fullWidth
        size="small"
        margin="normal"
        label="Email address"
        type="text"
        variant="outlined"
        {...register('email', { required: true })}
      />

      <Controller
        render={({ field }) => (
          <TextField
            select
            label="Gender"
            variant="outlined"
            margin="normal"
            {...field}
            size="small"
            fullWidth
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </TextField>
        )}
        rules={{ required: true }}
        name="gender"
        control={control}
      />
      <Controller
        render={({ field }) => (
          <TextField
            select
            label="Location"
            variant="outlined"
            {...field}
            margin="normal"
            size="small"
            fullWidth
          >
            {branch.map((item) => {
              return (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </TextField>
        )}
        rules={{ required: true }}
        name="branch"
        control={control}
      />
      <DialogActions>
        <Button
          color="primary"
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          startIcon={
            isLoading ? <CircularProgress color="inherit" size={26} /> : null
          }
        >
          Submit
        </Button>
        <Button
          color="primary"
          fullWidth
          size="large"
          variant="outlined"
          type="submit"
          onClick={handleClose}
        >
          Cancel
        </Button>
      </DialogActions>
    </form>
  );
}

export default AddTeamMember;
