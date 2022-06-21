/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-wrap-multilines */
import React, { FunctionComponent } from 'react';
import {
  Button,
  DialogActions,
  MenuItem,
  TextField,
  Container,
  Card,
  CardContent,
  CardHeader,
  CircularProgress
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import axios from '../../../../clientProvider/baseConfig';
// @ts-ignore
import { User } from '../../../../clientProvider/queries/UsersQueries';
import { useNotify } from '../../../../redux/actions/notifications/notificationActions';

interface Props {
  data: User;
}

const createUser = async (user: User) =>
  axios.patch(`/dashboard/employee/update/${user._id}`, { user });

const UserEdit: FunctionComponent<React.PropsWithChildren<Props>> = (props) => {
  const { data } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const enqueueSnackbar = useNotify();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<User>({
    defaultValues: data,
    mode: 'onChange'
  });

  const { mutate, isLoading } = useMutation(createUser, {
    onSuccess: (response) => {
      const { message } = response.data;
      if (response.status === 200 || response.status === 201) {
        dispatch(enqueueSnackbar({ message, options: { variant: 'success' } }));
        setTimeout(() => navigate(-1), 1000);
      }
    },
    onError: (err: any) => {
      const message = err.response.data.message || err.message;
      dispatch(
        enqueueSnackbar({
          message,
          options: { variant: 'error' }
        })
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(['AgsUser']);
    }
  });

  const onSubmit = (inputs: Omit<User, '_id'>) => {
    const user = {
      ...inputs,
      _id: data._id
    };
    mutate(user);
  };

  return (
    <Container style={{ marginTop: 28 }}>
      <Card>
        <CardHeader title="Edit User  Information" />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="First name"
              variant="outlined"
              fullWidth
              size="small"
              margin="normal"
              error={!!errors.firstname}
              {...register('firstname', { required: true })}
            />
            <TextField
              label="Last name"
              variant="outlined"
              fullWidth
              size="small"
              margin="normal"
              error={!!errors.lastname}
              {...register('lastname', { required: true })}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
              type="email"
              error={!!errors.email}
              {...register('email', { required: true })}
            />
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
              label="Phone number"
              type="phone"
              error={!!errors.phone}
              {...register('phone', { required: true })}
            />

            <Controller
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  select
                  label="Role"
                  variant="outlined"
                  size="small"
                  margin="normal"
                  fullWidth
                  helperText={error?.message}
                  error={Boolean(error?.message)}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="consultant">B2B Consultant</MenuItem>
                </TextField>
              )}
              rules={{ required: 'Role is required' }}
              name="department"
              control={control}
            />
            <DialogActions>
              <Button
                disabled={isLoading}
                variant="contained"
                color="primary"
                startIcon={
                  isLoading ? (
                    <CircularProgress color="inherit" size={24} />
                  ) : null
                }
                type="submit"
              >
                Submit
              </Button>
              <Button variant="outlined" color="primary">
                Cancel
              </Button>
            </DialogActions>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserEdit;
