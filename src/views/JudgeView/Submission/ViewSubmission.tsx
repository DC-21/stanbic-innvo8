/* eslint-disable react/function-component-definition */
import {
  Button,
  CircularProgress,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQueryClient, useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { axios } from '../../../clientProvider';
import { useNotify } from '../../../redux/actions/notifications/notificationActions';
import { RootState } from '../../../redux/reducers/rootReducer';
import { Application } from '../../../types';

interface Inputs {
  score: number;
}

interface Props {
  application: Application | undefined;
}
const ViewSubmission: React.FC<Props> = ({ application }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const enqueueSnackbar = useNotify();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const createScore = async (submission: Inputs) => {
    const response = await axios.post(
      `/Innovation/vote_innovation/${id}`,
      submission
    );
    return response;
  };

  const { control, handleSubmit } = useForm<Inputs>({ mode: 'onChange' });
  const { mutate, isLoading } = useMutation(createScore, {
    onSuccess: (response) => {
      const { message } = response.data;
      dispatch(enqueueSnackbar({ message, options: { variant: 'success' } }));
      // setTimeout(() => handleClose(), 1000);
    },
    onError: (err: any) => {
      dispatch(
        enqueueSnackbar({
          message: err.response?.data,
          options: { variant: 'error' }
        })
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(['submissions']);
    }
  });
  const onSubmit = (data: Inputs) => {
    const submission = {
      ...data,
      judge: user?._id
    };
    mutate(submission);
  };
  return (
    <div
      style={{
        backgroundColor: '#fff',
        flexGrow: 1,
        padding: '20px',
        marginLeft: '15px',
        marginRight: '15px',
        marginTop: '5px'
      }}
    >
      <Typography variant="h5" color="primary">
        1. What’s the title of your innovation?
      </Typography>
      <TextField
        aria-readonly
        variant="outlined"
        fullWidth
        margin="normal"
        size="small"
        type="text"
        value={application?.title}
      />
      <Typography variant="h5" color="primary">
        2. What problem are you solving?
      </Typography>
      <TextField
        aria-readonly
        variant="outlined"
        fullWidth
        margin="normal"
        size="small"
        type="text"
        value={application?.problem}
      />
      <Typography variant="h5" color="primary">
        3. What is the proposed solution?
      </Typography>
      <TextField
        multiline
        aria-readonly
        variant="outlined"
        fullWidth
        margin="normal"
        size="small"
        type="text"
        value={application?.proposedSolution}
      />
      <Typography variant="h5" color="primary">
        4. Which category/sector does your innovation fall under?
      </Typography>
      <TextField
        aria-readonly
        variant="outlined"
        fullWidth
        margin="normal"
        size="small"
        type="text"
        value={application?.category}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <FormLabel id="demo-controlled-radio-buttons-group">
            Vote Here
          </FormLabel>
          <Controller
            render={({ field: { onChange, value } }) => (
              <RadioGroup aria-label="score" value={value} onChange={onChange}>
                <FormControlLabel
                  labelPlacement="end"
                  value={1}
                  control={<Radio />}
                  label="1"
                />
                <FormControlLabel
                  labelPlacement="end"
                  value={2}
                  control={<Radio />}
                  label="2"
                />
                <FormControlLabel
                  labelPlacement="end"
                  value={3}
                  control={<Radio />}
                  label="3"
                />
                <FormControlLabel
                  labelPlacement="end"
                  value={4}
                  control={<Radio />}
                  label="4"
                />
                <FormControlLabel
                  labelPlacement="end"
                  value={5}
                  control={<Radio />}
                  label="5"
                />
              </RadioGroup>
            )}
            rules={{ required: true }}
            name="score"
            control={control}
          />
        </div>
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
        <Button variant="outlined" color="primary">
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default ViewSubmission;
