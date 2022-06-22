/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-wrap-multilines */
import React, { FunctionComponent } from 'react';
import { Button, DialogActions, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { useNotify } from '../../../../redux/actions/notifications/notificationActions';
import axios from '../../../../clientProvider/baseConfig';

interface Inputs {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  role?: string;
  department: string;
}
interface Props {
  handleClose: () => void;
}

const createUser = async (user: Inputs) => {
  const response = await axios.post('/dashboard/employee/create', { user });
  return response;
};

const UserForm: FunctionComponent<React.PropsWithChildren<Props>> = (props) => {
  const { handleClose } = props;
  const dispatch = useDispatch();
  const enqueueSnackbar = useNotify();
  const queryClient = useQueryClient();
  const { handleSubmit } = useForm<Inputs>({ mode: 'onChange' });

  const { mutate } = useMutation(createUser, {
    onSuccess: (response) => {
      const { message } = response.data;
      if (response.status === 200 || response.status === 201) {
        dispatch(enqueueSnackbar({ message, options: { variant: 'success' } }));
        setTimeout(() => handleClose(), 1000);
      }
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
      queryClient.invalidateQueries(['AgsUser']);
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
        label="First name"
        variant="outlined"
        fullWidth
        size="small"
        name="firstname"
        margin="normal"
      />
      <TextField
        label="Last name"
        variant="outlined"
        fullWidth
        size="small"
        margin="normal"
        name="lastname"
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        name="email"
        margin="normal"
        size="small"
        type="email"
      />
      <TextField
        variant="outlined"
        fullWidth
        margin="normal"
        size="small"
        label="Phone number"
        type="phone"
        name="phone"
      />

      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          // startIcon={
          //   isLoading ? <CircularProgress color="inherit" size={24} /> : null
          // }
          type="submit"
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

export default UserForm;
