/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-wrap-multilines */
import React, { FunctionComponent } from 'react';
import {
  Button,
  DialogActions,
  // MenuItem,
  TextField,
  Container,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  MenuItem
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import axios from '../../../../../clientProvider/baseConfig';
// @ts-ignore
import { User } from '../../../../types';
import { useNotify } from '../../../../../redux/actions/notifications/notificationActions';
// import branch from '../../../../components/branch';

interface Props {
  data: User;
}

const createUser = async (user: User) =>
  axios.put(`/User/edit_user/${user._id}`, user);

const TeamMemberEdit: FunctionComponent<React.PropsWithChildren<Props>> = (
  props
) => {
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
      dispatch(enqueueSnackbar({ message, options: { variant: 'success' } }));
      setTimeout(() => navigate(-1), 1000);
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
      queryClient.invalidateQueries(['TeamMembers']);
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
              error={!!errors.firstName}
              fullWidth
              size="small"
              label="First Name"
              type="text"
              variant="outlined"
              {...register('firstName')}
              sx={{ paddingBottom: '15px' }}
            />
            <TextField
              error={!!errors.lastName}
              fullWidth
              size="small"
              label="Last Name"
              type="text"
              variant="outlined"
              {...register('lastName')}
              sx={{ paddingBottom: '15px' }}
            />
            <TextField
              error={!!errors.email}
              fullWidth
              size="small"
              label="Email address"
              type="text"
              variant="outlined"
              {...register('email')}
              sx={{ paddingBottom: '15px' }}
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
                  <MenuItem value="Team Lead">Team Lead</MenuItem>
                  <MenuItem value="Team Member">Team Member</MenuItem>
                </TextField>
              )}
              rules={{ required: true }}
              name="userType"
              control={control}
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
            </DialogActions>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default TeamMemberEdit;
