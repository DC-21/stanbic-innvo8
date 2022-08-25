/* eslint-disable react/jsx-key */
/* eslint-disable react/function-component-definition */
// eslint-disable-next-line no-unused-vars
import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import {
  CircularProgress,
  Dialog,
  DialogContent,
  FormControlLabel,
  Radio,
  RadioGroup
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { axios } from '../../../clientProvider';
import { useNotify } from '../../../redux/actions/notifications/notificationActions';
import { Teams } from '../../../types';

interface Props {
  team: Teams | undefined;
}

const UpdateTeamLeadRole: React.FC<Props> = ({ team }) => {
  const [selected, setSelected] = React.useState<string | undefined>();
  const { id: teamId } = useParams();
  const dispatch = useDispatch();
  const notification = useNotify();
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);
  const id = selected;
  console.log('Selected', selected);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateUser = async () => {
    const data = await axios.post(`/Auth/change_lead/${id}`);
    return data;
  };

  const { mutate, isLoading } = useMutation(updateUser, {
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
      queryClient.invalidateQueries(['AdminUser']);
      queryClient.invalidateQueries(['Teams']);
      queryClient.invalidateQueries(['TeamMembers']);
      queryClient.invalidateQueries(['application', teamId]);
    }
  });
  return (
    <div style={{ paddingTop: '10px' }}>
      <Button variant="contained" onClick={handleClickOpen}>
        Change Team Lead
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogContentText sx={{ padding: '10px' }}>
          Are you sure you want to update the role of this team member?
        </DialogContentText>
        <DialogContent>
          <RadioGroup aria-label="ringtone" name="userType">
            {team?.members.map((member) => (
              <FormControlLabel
                value={member.firstName}
                key={member._id}
                control={<Radio />}
                onClick={() => setSelected(member._id)}
                label={`${member.firstName} ${member.lastName}`}
              />
            ))}
          </RadioGroup>
        </DialogContent>
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
};
export default UpdateTeamLeadRole;
