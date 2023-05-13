/* eslint-disable react/function-component-definition */
import {
  Button,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material';

import { AxiosError } from 'axios';

import { useSnackbar } from 'notistack';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { axios } from '../../../../clientProvider';

import { RootState } from '../../../../redux/reducers/rootReducer';
import { Proposal } from './ProprosalEditView';
import { ChallengeStatement } from '../../../../types';
import Loading from '../../../../components/Loading';

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
  const { data } = await axios.get(`/Team/view_team_by_lead/${id}`);
  return data.data;
};

interface ProposalEditProps {
  proposal: Omit<Proposal, 'status'>;
}

const ProposalEdit = ({ proposal }: ProposalEditProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [teamId, setTeamId] = React.useState<string | undefined>(
    // @ts-ignore
    proposal?.teamId?._id || ''
  );
  console.log('team', teamId);
  const [challengeStatementId, setChallengeStatementId] = React.useState(
    proposal?.challengeStatementId?._id || ''
  );
  console.log('cha', challengeStatementId);
  const [challengeStatements, setChallengeStatements] = React.useState<
    ChallengeStatement[]
  >([]);
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
    mode: 'onChange',
    defaultValues: {
      ...proposal
    }
  });

  React.useEffect(() => {
    const fetchChallengeStatements = async () => {
      try {
        const response = await axios.get('/Challenge/view_challenges');
        console.log(response.data.ChallengeStatements);
        setChallengeStatements(response.data.ChallengeStatements);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChallengeStatements();
  }, []);
  const { mutate, isLoading } = useMutation(
    async (data: ProposalFormInputs) =>
      axios.put(`/Innovation/edit_innovation/${proposal._id}`, data),
    {
      onSuccess: (response) => {
        console.log('response', response);
        const { message } = response.data;
        enqueueSnackbar(message, { variant: 'success' });
        setTimeout(() => navigate(-1), 1500);
      },
      onError: (error: AxiosError) => {
        enqueueSnackbar(error.response?.data, { variant: 'error' });
      },

      onSettled: () => {
        queryClient.invalidateQueries(['submissions']);
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
    console.log('formdata', formData);
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
        Edit Idea:
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
          sx={{ paddingBottom: '4%' }}
          margin="normal"
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
          sx={{ paddingBottom: '4%' }}
          margin="normal"
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
              value={challengeStatementId}
              onChange={(e) => {
                const selectedChallengeStatement = challengeStatements.find(
                  (statement) => statement.challengeStatement === e.target.value
                );
                if (selectedChallengeStatement) {
                  setChallengeStatementId(selectedChallengeStatement._id);
                }
              }}
              sx={{ paddingBottom: '4%' }}
            >
              {challengeStatements?.map((challengeStatement) => (
                <FormControlLabel
                  sx={{ padding: 1 }}
                  key={challengeStatement._id}
                  value={challengeStatement._id}
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
          5. Select team you are submitting for?
        </Typography>
        <Controller
          render={({ field }) => (
            <RadioGroup
              aria-label="score"
              defaultValue="outlined"
              {...field}
              value={teamId}
              onChange={(e) => {
                // @ts-ignore
                const selectedTeamId = teamData.find(
                  (team) => team.name === e.target.value
                );
                if (selectedTeamId) {
                  setTeamId(selectedTeamId._id);
                }
              }}
              sx={{ paddingBottom: '2%' }}
            >
              {/** @ts-ignore */}
              {teamData?.map((team) => (
                <FormControlLabel
                  sx={{ padding: 1 }}
                  key={team._id}
                  value={team._id}
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

export default ProposalEdit;
