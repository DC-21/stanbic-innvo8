// eslint-disable-next-line no-unused-vars
import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { CircularProgress } from '@mui/material';
import { axios } from '../../../clientProvider';
import { useNotify } from '../../../redux/actions/notifications/notificationActions';

export interface ConfirmationDialogRawProps {
  selected: Record<string, string>;
  handleClose: () => void;
}

function DeleteChallengeStatement(props: ConfirmationDialogRawProps) {
  const { handleClose, selected } = props;
  const dispatch = useDispatch();
  const notification = useNotify();
  const queryClient = useQueryClient();
  const id = selected;

  const removeChallenge = async () => {
    const data = await axios.delete(`/Challenge/remove_challenge/${id}`);
    return data;
  };

  const { mutate, isLoading } = useMutation(removeChallenge, {
    onSuccess: (response) => {
      const { message } = response.data;
      dispatch(notification({ message, options: { variant: 'success' } }));
      setTimeout(() => handleClose(), 1000);
    },
    onError: (error: AxiosError) => {
      dispatch(
        notification({
          message: error.response?.data,
          options: { variant: 'error' }
        })
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(['Challenge']);
      queryClient.invalidateQueries(['Teams']);
      queryClient.invalidateQueries(['TeamMembers']);
    }
  });

  return (
    <div>
      <DialogContentText>
        Are you sure you want to delete this challenge statement?
      </DialogContentText>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          autoFocus
          onClick={() => mutate()}
          sx={{ color: 'white', backgroundColor: 'red' }}
          variant="contained"
          disabled={isLoading}
          startIcon={
            isLoading ? <CircularProgress color="inherit" size={25} /> : null
          }
        >
          Submit
        </Button>
      </DialogActions>
    </div>
  );
}
export default DeleteChallengeStatement;
