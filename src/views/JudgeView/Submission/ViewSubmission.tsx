/* eslint-disable react/function-component-definition */
import {
  Button,
  Card,
  CircularProgress,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { AxiosError } from 'axios';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQueryClient, useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
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
  const navigate = useNavigate();
  const enqueueSnackbar = useNotify();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const createScore = async (submission: any) => {
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
      setTimeout(() => navigate('/judge/submissions'), 1000);
    },
    onError: (err: AxiosError) => {
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
      votes: [{ judge: user?._id, score: +data.score }]
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
      <Typography variant="h3" color="primary">
        <b>Team: {application?.teamId.name}</b>
      </Typography>
      <br />
      <Typography variant="h6" color="primary">
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
      <Typography variant="h6" color="primary">
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
      <Typography variant="h6" color="primary">
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
      <Typography variant="h6" color="primary">
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
      <Card style={{ flexGrow: 1, padding: 20 }}>
        <Table sx={{ backgroundColor: '#fff' }}>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography variant="h6" color="primary">
                  Total Judges Who Voted
                </Typography>
              </TableCell>
              <TableCell>:{application?.totalVotedJudges}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="h6" color="primary">
                  Total Votes
                </Typography>
              </TableCell>
              <TableCell>:{application?.totalVotes}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ paddingTop: '15px', paddingBottom: '10px' }}>
          <FormLabel
            id="demo-controlled-radio-buttons-group"
            sx={{ color: '#0133a1' }}
          >
            <b>Vote Here</b>
          </FormLabel>
          <Controller
            render={({ field: { onChange, value } }) => (
              <RadioGroup
                row
                aria-label="score"
                value={value}
                onChange={onChange}
              >
                <FormControlLabel
                  labelPlacement="bottom"
                  value={1}
                  control={<Radio />}
                  label="1"
                />
                <FormControlLabel
                  labelPlacement="bottom"
                  value={2}
                  control={<Radio />}
                  label="2"
                />
                <FormControlLabel
                  labelPlacement="bottom"
                  value={3}
                  control={<Radio />}
                  label="3"
                />
                <FormControlLabel
                  labelPlacement="bottom"
                  value={4}
                  control={<Radio />}
                  label="4"
                />
                <FormControlLabel
                  labelPlacement="bottom"
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
        <div style={{ paddingTop: '15px', gap: '2px' }}>
          <Button
            sx={{ gap: '2px', marginRight: '10px' }}
            variant="contained"
            color="primary"
            type="submit"
            startIcon={
              isLoading ? <CircularProgress color="inherit" size={26} /> : null
            }
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ViewSubmission;
