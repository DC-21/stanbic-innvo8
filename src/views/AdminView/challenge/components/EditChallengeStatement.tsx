/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-wrap-multilines */
import React, { FunctionComponent } from 'react';
import {
  Button,
  DialogActions,
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
import { useNavigate } from 'react-router-dom';
import axios from '../../../../clientProvider/baseConfig';
// @ts-ignore
import { ChallengeStatement } from '../../../../types';
import { useNotify } from '../../../../redux/actions/notifications/notificationActions';
// import branch from '../../../../components/branch';

interface Props {
  data: ChallengeStatement;
}

const createUser = async (user: ChallengeStatement) =>
  axios.put(`/Challenge/edit_challenge/${user._id}`, user);

const EditChallengeStatement: FunctionComponent<
  React.PropsWithChildren<Props>
> = (props) => {
  const { data } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const enqueueSnackbar = useNotify();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ChallengeStatement>({
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
      const message = err.response?.data;
      dispatch(
        enqueueSnackbar({
          message,
          options: { variant: 'error' }
        })
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(['Challenge']);
    }
  });

  const onSubmit = (inputs: Omit<ChallengeStatement, '_id'>) => {
    const challengeState = {
      ...inputs,
      _id: data._id
    };
    mutate(challengeState);
  };

  return (
    <Container style={{ marginTop: 28 }}>
      <Card>
        <CardHeader title="Edit Challenge Statement" />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <TextField
              error={!!errors.theme}
              label="Theme"
              variant="outlined"
              fullWidth
              size="small"
              margin="normal"
              {...register('theme')}
            /> */}
            <TextField
              error={!!errors.problem}
              label="Problem"
              variant="outlined"
              fullWidth
              size="small"
              margin="normal"
              {...register('problem')}
            />
            <TextField
              error={!!errors.problemStatement}
              label="Problem Statement"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              size="small"
              type="text"
              {...register('problemStatement')}
            />
            <TextField
              error={!!errors.challengeStatement}
              label="Challenge Statement"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              size="small"
              type="text"
              {...register('challengeStatement')}
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

export default EditChallengeStatement;
