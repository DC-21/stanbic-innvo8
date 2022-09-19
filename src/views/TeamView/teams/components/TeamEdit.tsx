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
  CircularProgress
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../../../clientProvider/baseConfig';
// @ts-ignore
import { Teams } from '../../../../types';
import { useNotify } from '../../../../redux/actions/notifications/notificationActions';
// import branch from '../../../../components/branch';

interface Props {
  data: Teams;
}

const createUser = async (user: Teams) =>
  axios.put(`/Team/edit_team/${user._id}`, user);

const TeamEdit: FunctionComponent<React.PropsWithChildren<Props>> = (props) => {
  const { data } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const enqueueSnackbar = useNotify();
  const params = useParams();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    // control,
    formState: { errors }
  } = useForm<Teams>({
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
      queryClient.invalidateQueries(['Teams']);
      queryClient.invalidateQueries(['team', params.id]);
    }
  });

  const onSubmit = (inputs: Omit<Teams, '_id'>) => {
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
              error={!!errors.name}
              fullWidth
              size="small"
              label="Name"
              type="text"
              variant="outlined"
              {...register('name')}
              sx={{ paddingBottom: '15px' }}
            />
            <TextField
              error={!!errors.description}
              fullWidth
              size="small"
              label="Description"
              type="text"
              variant="outlined"
              {...register('description')}
              sx={{ paddingBottom: '15px' }}
            />
            <TextField
              error={!!errors.createdAt}
              fullWidth
              size="small"
              label="Created At"
              type="text"
              variant="outlined"
              {...register('createdAt')}
              disabled
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

export default TeamEdit;
