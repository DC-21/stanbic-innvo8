// eslint-disable-next-line no-unused-vars
import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { Box, CircularProgress, Dialog } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { axios } from '../../../../clientProvider';
import { useNotify } from '../../../../redux/actions/notifications/notificationActions';

function DeleteTeam() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const notification = useNotify();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  console.log(id, 'id');

  const cancelInv = async () => {
    const data = await axios.delete(`/Team/remove_team/${id}`);
    return data;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { mutate, isLoading } = useMutation(cancelInv, {
    onSuccess: (response) => {
      const { message } = response.data;
      dispatch(notification({ message, options: { variant: 'success' } }));
      setTimeout(() => navigate('/team/teams'), 2000);
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
      queryClient.invalidateQueries(['Teams']);
      queryClient.invalidateQueries(['rejectInvites']);
      queryClient.invalidateQueries(['invites']);
      queryClient.invalidateQueries(['PendingInvites']);
    }
  });

  return (
    <div>
      <Box sx={{ padding: 2 }}>
        <Button
          startIcon={<DeleteIcon />}
          variant="contained"
          onClick={handleClickOpen}
          sx={{ backgroundColor: 'red', textTransform: 'capitalize' }}
        >
          Delete Team
        </Button>
      </Box>
      <Dialog onClose={handleClose} open={open}>
        <DialogContentText sx={{ padding: 5 }}>
          Are you sure you want to delete this team?
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
      </Dialog>
    </div>
  );
}
export default DeleteTeam;
