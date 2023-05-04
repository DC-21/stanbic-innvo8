/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-wrap-multilines */
import React, { FunctionComponent } from 'react';
import {
  Button,
  CircularProgress,
  DialogActions,
  TextField
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { useNotify } from '../../../../redux/actions/notifications/notificationActions';
import axios from '../../../../clientProvider/baseConfig';
import { ChallengeStatement } from '../../../../types';

interface Props {
  handleClose: () => void;
}

const createChallenge = async (user: ChallengeStatement) => {
  const response = await axios.post('/Challenge/new_challenge', user);
  return response;
};

const ChallengeStatementForm: FunctionComponent<
  React.PropsWithChildren<Props>
> = (props) => {
  const { handleClose } = props;
  const dispatch = useDispatch();
  const enqueueSnackbar = useNotify();
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<ChallengeStatement>({ mode: 'onChange' });

  const { mutate, isLoading } = useMutation(createChallenge, {
    onSuccess: (response) => {
      const { message } = response.data;
      dispatch(enqueueSnackbar({ message, options: { variant: 'success' } }));
      setTimeout(() => handleClose(), 1000);
    },
    onError: (err: any) => {
      dispatch(
        enqueueSnackbar({
          message: err?.response?.data,
          options: { variant: 'error' }
        })
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(['Challenge']);
      queryClient.invalidateQueries(['team']);
    }
  });

  const onSubmit = (data: ChallengeStatement) => {
    const user = {
      ...data
    };
    mutate(user);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        error={!!errors.theme}
        label="Theme"
        variant="outlined"
        fullWidth
        size="small"
        margin="normal"
        {...register('theme')}
      />
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
        rows={4}
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
        rows={4}
        size="small"
        type="text"
        {...register('challengeStatement')}
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

export default ChallengeStatementForm;
