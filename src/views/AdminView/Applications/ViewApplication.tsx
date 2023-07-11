/* eslint-disable react/function-component-definition */
import {
  Button,
  CircularProgress,
  Divider,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Tooltip,
  Typography
} from '@mui/material';
import { AxiosError } from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { useQueryClient, useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';
import { axios } from '../../../clientProvider';
import { useNotify } from '../../../redux/actions/notifications/notificationActions';
import { RootState } from '../../../redux/reducers/rootReducer';
import { Application } from '../../../types';
import Loading from '../../../components/Loading';

interface Inputs {
  score: number;
}
interface Props {
  application: Application | undefined;
}
const ViewApplication: React.FC<Props> = ({ application }) => {
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

  const disableVoting = () => {
    if (
      application?.status === 'Accepted' ||
      application?.status === 'Waiting'
    ) {
      return <div style={{ display: 'none' }} />;
    }
    return (
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
            size="large"
            startIcon={
              isLoading ? <CircularProgress color="inherit" size={26} /> : null
            }
          >
            Submit
          </Button>
        </div>
      </form>
    );
  };

  const { control, handleSubmit } = useForm<Inputs>({ mode: 'onChange' });
  const { mutate, isLoading } = useMutation(createScore, {
    onSuccess: (response) => {
      const { message } = response.data;
      dispatch(enqueueSnackbar({ message, options: { variant: 'success' } }));
      setTimeout(() => navigate('/app/applications'), 1000);
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

  if (isLoading) {
    return <Loading size={40} />;
  }

  return (
    <div
      style={{
        flexGrow: 1,
        padding: '20px',
        marginLeft: '35px',
        marginRight: '15px',
        marginTop: '5px'
      }}
    >
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          style={{
            backgroundColor: '#fff',
            flexGrow: 1,
            padding: '20px',
            marginLeft: '15px',
            marginRight: '15px',
            marginTop: '5px',
            gap: '20px',
            borderRadius: '10px'
          }}
        >
          <Typography variant="h3" color="primary">
            <b>Team: {application?.teamId?.name}</b>
          </Typography>
          <br />
          <Typography variant="h4" color="primary" sx={{ paddingTop: '4%' }}>
            1. What’s the title of your innovation?
          </Typography>
          <Typography
            style={{
              backgroundColor: '#f2f2f2',
              padding: '10px',
              marginTop: '8px'
            }}
          >
            {application?.title}
          </Typography>
          <Typography variant="h4" color="primary" sx={{ paddingTop: '4%' }}>
            2. What problem are you solving?
          </Typography>
          <Typography
            style={{
              backgroundColor: '#f2f2f2',
              padding: '10px',
              marginTop: '8px'
            }}
          >
            {application?.problem}
          </Typography>
          <Typography variant="h4" color="primary" sx={{ paddingTop: '4%' }}>
            3. What is the proposed solution?
          </Typography>
          <Typography
            style={{
              backgroundColor: '#f2f2f2',
              padding: '10px',
              marginTop: '8px'
            }}
          >
            {application?.proposedSolution}
          </Typography>
          <Typography variant="h4" color="primary" sx={{ paddingTop: '4%' }}>
            4. Which category/sector does your innovation fall under?
          </Typography>
          <Typography
            style={{
              backgroundColor: '#f2f2f2',
              padding: '10px',
              marginTop: '8px'
            }}
          >
            {/** @ts-ignore */}
            {application?.challengeStatementId?.challengeStatement}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          style={{
            backgroundColor: '#fff',
            flexGrow: 1,
            padding: '20px',
            marginLeft: '15px',
            marginRight: '15px',
            marginTop: '5px',
            gap: '20px',
            borderRadius: '10px'
            // columnCount: 2
          }}
        >
          <Typography variant="h4" color="primary">
            <b>Total Votes:</b> {application?.totalVotes}
          </Typography>
          <Typography variant="h4" color="primary">
            <b>Total Judges Who Voted:</b> {application?.totalVotedJudges}
          </Typography>
          <br />
          <Divider />
          <Typography variant="h4" color="primary" sx={{ paddingTop: '10px' }}>
            <b>Judges Who Voted:</b>
          </Typography>
          {application?.votes.map((item) => {
            return (
              <ul key={item._id} style={{ paddingLeft: '20px' }}>
                <li>
                  <Typography variant="h4" color="primary">
                    {item?.judge?.firstName} {item?.judge?.lastName}
                  </Typography>
                </li>
              </ul>
            );
          })}
          <Divider sx={{ paddingTop: '10px' }} />
          <br />
          <Typography variant="h4" color="primary">
            <b>Team Lead</b>: {application?.leadId?.firstName}{' '}
            {application?.leadId?.lastName}
          </Typography>
          {application?.teamId?.members.map((item) => {
            return (
              <Typography variant="h4" color="primary" key={item._id}>
                <b>Team Member</b>: {item?.firstName} {item?.lastName}
              </Typography>
            );
          })}
        </Grid>
        <Tooltip title="Place your vote in this section" placement="left">
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            style={{
              backgroundColor: '#fff',
              flexGrow: 1,
              padding: '20px',
              marginLeft: '15px',
              marginRight: '15px',
              marginTop: '5px',
              gap: '20px',
              borderRadius: '10px'
            }}
          >
            {disableVoting()}
          </Grid>
        </Tooltip>
      </Grid>
    </div>
  );
};

export default ViewApplication;
