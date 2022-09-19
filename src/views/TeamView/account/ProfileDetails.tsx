/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-wrap-multilines */
import React, { FunctionComponent } from 'react';
import {
  Button,
  MenuItem,
  TextField,
  Container,
  Card,
  CardContent,
  CardHeader,
  CircularProgress
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import axios from '../../../clientProvider/baseConfig';
import { User } from '../../../types';
import { useNotify } from '../../../redux/actions/notifications/notificationActions';
import { RootState } from '../../../redux/reducers/rootReducer';
import { updateDetails } from '../../../redux/actions/userActions/userActions';

interface Props {
  data: User;
}

const ProfileDetails: FunctionComponent<React.PropsWithChildren<Props>> = (
  props
) => {
  const { data } = props;

  const dispatch = useDispatch();
  const enqueueSnackbar = useNotify();
  const queryClient = useQueryClient();
  const { user } = useSelector((store: RootState) => store.user);
  const id = user?._id;
  const editUser = async (admin: User) =>
    axios.put(`/User/edit_user/${user?._id}`, admin);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<User>({
    defaultValues: data,
    mode: 'onChange'
  });

  const { mutate, isLoading } = useMutation(editUser, {
    onSuccess: (response) => {
      const { message } = response.data;
      dispatch(updateDetails(response.data.data));
      dispatch(enqueueSnackbar({ message, options: { variant: 'success' } }));
    },
    onError: (err: any) => {
      const message = err.response?.data;
      dispatch(
        enqueueSnackbar({
          message,
          options: { variant: 'error' }
        })
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(['AdminUser']);
      queryClient.invalidateQueries(['Teams', id]);
    }
  });

  const onSubmit = (inputs: Omit<User, '_id'>) => {
    const admin = {
      ...inputs,
      _id: data._id
    };
    mutate(admin);
  };

  return (
    <Container style={{ marginTop: 28 }}>
      <Card>
        <CardHeader title="Edit User  Information" />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              error={!!errors.firstName}
              defaultValue={user?.firstName}
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
              defaultValue={user?.lastName}
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
              defaultValue={user?.email}
              fullWidth
              size="small"
              label="Email address"
              type="text"
              variant="outlined"
              {...register('email')}
              sx={{ paddingBottom: '10px' }}
            />
            <Controller
              render={({ field: { onChange, value } }) => (
                <TextField
                  select
                  label="Gender"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  defaultValue={user?.gender}
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
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfileDetails;
