// eslint-disable-next-line no-unused-vars
import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { axios } from '../../../../clientProvider';
import { useNotify } from '../../../../redux/actions/notifications/notificationActions';

export interface ConfirmationDialogRawProps {
  selected: Record<string, string>;
  handleClose: () => void;
}

function RemoveMember(props: ConfirmationDialogRawProps) {
  const { handleClose, selected } = props;
  const dispatch = useDispatch();
  const notification = useNotify();
  const { teamId: IdTeam } = useParams();
  const queryClient = useQueryClient();
  const id = selected;

  const leaveTeam = async (
    userId: string | undefined,
    teamId: string | undefined
  ) => {
    const data = await axios.patch('/Team/remove_user_team/', {
      userId,
      teamId
    });
    return data;
  };

  const { mutate, isLoading } = useMutation(
    () => leaveTeam(`${id}`, `${IdTeam}`),
    {
      onSuccess: (response) => {
        const { message } = response.data;
        dispatch(notification({ message, options: { variant: 'success' } }));
        setTimeout(() => handleClose(), 100);
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
        queryClient.invalidateQueries(['Team-members']);
        queryClient.invalidateQueries(['Teams']);
      }
    }
  );

  return (
    <div>
      <DialogContentText>
        Are you sure you want to accept this invite?
      </DialogContentText>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          autoFocus
          onClick={() => mutate()}
          color="primary"
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
export default RemoveMember;
