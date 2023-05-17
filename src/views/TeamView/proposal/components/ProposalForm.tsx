/* eslint-disable react/function-component-definition */
import {
  Button,
  CircularProgress,
  TextField,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup
} from '@mui/material';

import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { axios } from '../../../../clientProvider';
import Loading from '../../../../components/Loading';
import { RootState } from '../../../../redux/reducers/rootReducer';
import { ChallengeStatement } from '../../../../types';

export type ProposalFormInputs = {
  title: string;
  category: string;
  problem: string;
  proposedSolution: string;
  teamId: string | undefined;
};

const getTeam = async (
  id: string | undefined
): Promise<Record<string, undefined>> => {
  const { data } = await axios.get(`/Team/view_team_by_user/${id}`);
  return data.data;
};

const ProposalForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [teamId, setTeamId] = useState<string | undefined>();
  console.log('teamId', teamId);
  const [challengeStatements, setChallengeStatements] = React.useState<
    ChallengeStatement[]
  >([]);
  const [challengeStatementId, setChallengeStatementId] = React.useState('');
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

  React.useEffect(() => {
    const fetchChallengeStatements = async () => {
      try {
        const response = await axios.get('/Challenge/view_challenges');
        setChallengeStatements(response.data.ChallengeStatements);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChallengeStatements();
  }, []);

  const { mutate, isLoading } = useMutation(
    async (data: ProposalFormInputs) =>
      axios.post('/Innovation/new_innovation', data),
    {
      onSuccess: (response) => {
        const { message } = response.data;
        enqueueSnackbar(message, { variant: 'success' });
        setTimeout(() => navigate('/team/innovation-idea'), 1500);
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
      teamId,
      challengeStatementId
    };
    console.log(formData);
    mutate(formData);
  };

  if (isLoadingTeam) return <Loading size={45} />;
  if (isError) return <div>Error</div>;

  return (
    <div
      style={{
        backgroundColor: '#fff',
        flexGrow: 1,
        padding: '20px',
        marginLeft: '15px',
        marginRight: '15px',
        marginTop: '20px'
      }}
    >
      <Typography variant="h1" color="primary" fontWeight="bold">
        Create Idea:
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" color="primary" sx={{ paddingTop: '4%' }}>
          1. What’s the title of your innovation?
        </Typography>
        <TextField
          error={Boolean(errors.title)}
          variant="outlined"
          fullWidth
          {...register('title', { required: true })}
          margin="normal"
          sx={{ paddingBottom: '4%' }}
          size="small"
          type="text"
        />
        <Typography variant="h4" color="primary">
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
          sx={{ paddingBottom: '4%' }}
          size="small"
          type="text"
        />
        <Typography variant="h4" color="primary">
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
          sx={{ paddingBottom: '4%' }}
          size="small"
          type="text"
        />
        <Typography variant="h4" color="primary">
          4. What Challenge Statement Does Your solution address?
        </Typography>

        <Controller
          render={({ field }) => (
            <RadioGroup
              aria-label="score"
              {...field}
              sx={{ paddingBottom: '4%' }}
            >
              {challengeStatements.map((challengeStatement) => (
                <FormControlLabel
                  sx={{ padding: 1 }}
                  key={challengeStatement._id}
                  value={challengeStatement.challengeStatement}
                  control={<Radio />}
                  label={challengeStatement.challengeStatement}
                  onClick={() =>
                    setChallengeStatementId(challengeStatement._id)
                  }
                />
              ))}
            </RadioGroup>
          )}
          rules={{ required: false }}
          name="category"
          control={control}
        />
        <Typography variant="h4" color="primary">
          5. Select team your submitting for?
        </Typography>
        <Controller
          render={({ field }) => (
            <RadioGroup
              aria-label="score"
              {...field}
              sx={{ paddingBottom: '4%' }}
            >
              {/** @ts-ignore */}
              {teamData?.map((team) => (
                <FormControlLabel
                  sx={{ padding: 1 }}
                  key={team._id}
                  value={team.name}
                  control={<Radio />}
                  label={team.name}
                  onClick={() => setTeamId(team?._id)}
                />
              ))}
            </RadioGroup>
          )}
          rules={{ required: false }}
          name="teamId"
          control={control}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ margin: 1 }}
          size="large"
          startIcon={
            isLoading ? <CircularProgress color="inherit" size={26} /> : null
          }
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => navigate('/team/innovation-idea')}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default ProposalForm;
