/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-wrap-multilines */
import React, { FunctionComponent } from 'react';
import {
  Button,
  CircularProgress,
  DialogActions,
  MenuItem,
  TextField
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { useNotify } from '../../../../../redux/actions/notifications/notificationActions';
import axios from '../../../../../clientProvider/baseConfig';

interface Inputs {
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
  gender: string;
}
interface Props {
  handleClose: () => void;
}

const createUser = async (user: Inputs) => {
  const response = await axios.post('/Admin/new_admin', user);
  return response;
};

const TeamMemberForm: FunctionComponent<React.PropsWithChildren<Props>> = (
  props
) => {
  const { handleClose } = props;
  const dispatch = useDispatch();
  const enqueueSnackbar = useNotify();
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors }
  } = useForm<Inputs>({ mode: 'onChange' });

  const { mutate, isLoading } = useMutation(createUser, {
    onSuccess: (response) => {
      const { message } = response.data;
      dispatch(enqueueSnackbar({ message, options: { variant: 'success' } }));
      setTimeout(() => handleClose(), 1000);
    },
    onError: (err: any) => {
      dispatch(
        enqueueSnackbar({
          message: err?.response?.data?.message,
          options: { variant: 'error' }
        })
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(['TeamMembers']);
    }
  });

  const onSubmit = (data: Inputs) => {
    const user = {
      ...data
    };
    mutate(user);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        error={!!errors.firstName}
        label="First name"
        variant="outlined"
        fullWidth
        size="small"
        margin="normal"
        {...register('firstName')}
      />
      <TextField
        error={!!errors.lastName}
        label="Last name"
        variant="outlined"
        fullWidth
        size="small"
        margin="normal"
        {...register('lastName')}
      />
      <TextField
        error={!!errors.email}
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        size="small"
        type="email"
        {...register('email')}
      />
      <Controller
        render={({ field: { onChange, value } }) => (
          <TextField
            select
            label="Gender"
            variant="outlined"
            value={value}
            onChange={onChange}
            margin="normal"
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
        render={({ field: { onChange, value } }) => (
          <TextField
            select
            label="Role"
            variant="outlined"
            value={value}
            onChange={onChange}
            margin="normal"
            size="small"
            fullWidth
          >
            <MenuItem value="Judge">Judge</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </TextField>
        )}
        rules={{ required: true }}
        name="userType"
        control={control}
      />
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          startIcon={
            isLoading ? <CircularProgress color="inherit" size={26} /> : null
          }
        >
          Submit
        </Button>
        <Button variant="outlined" onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </form>
  );
};

export default TeamMemberForm;
