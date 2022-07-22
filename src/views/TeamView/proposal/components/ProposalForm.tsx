/* eslint-disable react/function-component-definition */
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup
} from '@mui/material';

import { AxiosError } from 'axios';
import { isEmpty } from 'lodash';
import { useSnackbar } from 'notistack';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { axios } from '../../../../clientProvider';
import Loading from '../../../../components/Loading';
import { RootState } from '../../../../redux/reducers/rootReducer';

export type ProposalFormInputs = {
  title: string;
  category: string;
  problem: string;
  proposedSolution: string;
  teamId: string | undefined;
};

const getTeam = async (
  id: string | undefined
): Promise<Record<string, string>> => {
  const { data } = await axios.get(`/Team/view_team_by_lead/${id}`);
  return data.data;
};

export const challengeStatements = [
  { label: 'Theme: Financial Inclusion', value: 'Theme:Financial Inclusion' },
  {
    label: 'Theme: (Processes) Product Validation',
    value: 'Theme: (Processes) Product Validation'
  },
  {
    label: 'Theme:  (Processes) Digitization',
    value: 'Theme:  (Processes) Digitization'
  },
  {
    label: 'Theme: (Processes) Digital Transformation',
    value: 'Theme: (Processes) Digital Transformation'
  },
  {
    label: 'Theme: Knowledge Gap (Internal)',
    value: 'Theme: Knowledge Gap (Internal)'
  },
  {
    label: 'Theme: Knowledge gap (External)',
    value: 'Theme: Knowledge Gap (External)'
  },
  {
    label: 'Theme: Organizational  Culture',
    value: 'Theme: Organizational  Culture'
  }
];
const ProposalForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { user } = useSelector((state: RootState) => state.user);
  const {
    data: teamData,
    isLoading: isLoadingTeam,
    isError
  } = useQuery(['team', user?._id], () => getTeam(user?._id));
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<ProposalFormInputs>({
    mode: 'onChange'
  });
  const { mutate, isLoading } = useMutation(
    async (data: ProposalFormInputs) =>
      axios.post('/Innovation/new_innovation', data),
    {
      onSuccess: (response) => {
        const { message } = response.data;
        enqueueSnackbar(message, { variant: 'success' });
        setTimeout(() => navigate('/team/dashboard'), 1500);
      },
      onError: (error: AxiosError) => {
        enqueueSnackbar(error.response?.data, { variant: 'error' });
      },

      onSettled: () => {
        queryClient.invalidateQueries(['AdminUser']);
      }
    }
  );
  const onSubmit = (data: ProposalFormInputs) => {
    const formData = {
      ...data,
      leadId: user?._id,
      teamId: teamData?._id
    };
    mutate(formData);
  };

  if (isLoadingTeam) return <Loading size={45} />;
  if (isError) return <div>Error</div>;
  if (isEmpty(teamData)) {
    return (
      <Container sx={{ mt: 15 }} maxWidth="md">
        <Card sx={{ m: 'auto' }}>
          <CardContent>
            <Typography sx={{ textTransform: 'uppercase' }} variant="h2">
              No team found
            </Typography>
            <Typography variant="h4">
              You are not a member of any team. Please contact your lead to join
              a team.
            </Typography>
          </CardContent>
          <CardActionArea>
            <CardActions sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Button
                onClick={() => navigate('/team/teams')}
                variant="contained"
                color="primary"
              >
                Create Team
              </Button>
            </CardActions>
          </CardActionArea>
        </Card>
      </Container>
    );
  }

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" color="primary">
          1. What’s the title of your innovation?
        </Typography>
        <TextField
          error={Boolean(errors.title)}
          variant="outlined"
          fullWidth
          {...register('title', { required: true })}
          margin="normal"
          size="small"
          type="text"
        />
        <Typography variant="h5" color="primary">
          2. What problem are you solving?
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          error={Boolean(errors.problem)}
          {...register('problem', { required: true })}
          margin="normal"
          size="small"
          type="text"
        />
        <Typography variant="h5" color="primary">
          3. What is the proposed solution?
        </Typography>
        <TextField
          multiline
          rows={4}
          error={Boolean(errors.proposedSolution)}
          variant="outlined"
          fullWidth
          {...register('proposedSolution', { required: true })}
          margin="normal"
          size="small"
          type="text"
        />
        <Typography variant="h5" color="primary">
          4. What Challenge Statement Does Your solution address?
        </Typography>

        <Controller
          render={({ field }) => (
            <RadioGroup aria-label="score" {...field}>
              {challengeStatements.map((challengeStatement) => (
                <FormControlLabel
                  key={challengeStatement.value}
                  value={challengeStatement.value}
                  control={<Radio />}
                  label={challengeStatement.label}
                />
              ))}
            </RadioGroup>
          )}
          rules={{ required: true }}
          name="category"
          control={control}
        />

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

export default ProposalForm;
