/* eslint-disable react/function-component-definition */
import {
  Button,
  CircularProgress,
  TextField,
  Typography,
  MenuItem
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

const getTeam = async (id: string | undefined): Promise<any[]> => {
  const { data } = await axios.get(`/Team/view_team_by_user/${id}`);
  return data.data;
};

const getThemes = async (): Promise<any[]> => {
  const { data: res } = await axios.get('/Theme/view_themes');
  return res.Themes;
};

const ProposalForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [teamId, setTeamId] = useState<string | undefined>();
  const [challengeStatements, setChallengeStatements] = React.useState<
    ChallengeStatement[]
  >([]);
  const [challengeStatementId, setChallengeStatementId] = React.useState('');
  const [themeId, setThemeId] = React.useState('');
  const { user } = useSelector((state: RootState) => state.user);

  const { data: teamData, isLoading: isLoadingTeam } = useQuery(
    ['team', user?._id],
    () => getTeam(user?._id)
  );
  const { data: themeData } = useQuery(['Theme'], () => getThemes());

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
        const response = await axios.get(
          `/Challenge/view_challenge_by_theme/${themeId}`
        );
        setChallengeStatements(response?.data?.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (themeId) {
      fetchChallengeStatements();
    }
  }, [themeId]);

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
        queryClient.invalidateQueries(['Team-proposal']);
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
    mutate(formData);
  };

  if (isLoadingTeam) return <Loading size={45} />;

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
      <Typography
        variant="h1"
        fontWeight="bold"
        sx={{ color: '#00A1E0', textTransform: 'capitalize' }}
      >
        idea submission
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
          2. Select a theme you are solving for?
        </Typography>
        {/* <TextField
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
        /> */}
        <Controller
          render={({ field: { onChange, value } }) => (
            <TextField
              select
              label="Problem"
              variant="outlined"
              value={value}
              onChange={onChange}
              margin="normal"
              size="small"
              fullWidth
              sx={{ paddingBottom: '4%' }}
            >
              {themeData?.map((theme) => (
                <MenuItem
                  value={theme?.name}
                  key={theme._id}
                  onClick={() => setThemeId(theme._id)}
                >
                  {theme?.name}
                </MenuItem>
              ))}
            </TextField>
          )}
          rules={{ required: true }}
          name="problem"
          control={control}
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

        {challengeStatements?.length > 0 ? (
          <Controller
            render={({ field: { onChange, value } }) => (
              <TextField
                select
                label="Challenge Statements"
                variant="outlined"
                value={value}
                onChange={onChange}
                margin="normal"
                size="small"
                fullWidth
                sx={{ paddingBottom: '4%' }}
              >
                {challengeStatements?.map((challengeStatement) => (
                  <MenuItem
                    key={challengeStatement?._id}
                    value={challengeStatement?._id}
                    onClick={() =>
                      setChallengeStatementId(challengeStatement?._id)
                    }
                  >
                    {challengeStatement?.challengeStatement}
                  </MenuItem>
                ))}
              </TextField>
            )}
            rules={{ required: false }}
            name="category"
            control={control}
          />
        ) : (
          <Typography
            variant="body1"
            color="error"
            sx={{
              padding: 2,
              backgroundColor: '#f2f2f1',
              marginBottom: 2,
              marginTop: 2
            }}
          >
            Please select a theme in question 2
          </Typography>
        )}

        <Typography variant="h4" color="primary">
          5. Select team your submitting for?
        </Typography>
        <Controller
          render={({ field: { onChange, value } }) => (
            <TextField
              select
              label="Teams"
              variant="outlined"
              value={value}
              onChange={onChange}
              margin="normal"
              size="small"
              fullWidth
              sx={{ paddingBottom: '4%' }}
            >
              {teamData?.map((team) => (
                <MenuItem
                  key={team?._id}
                  value={team?._id}
                  onClick={() => setTeamId(team?._id)}
                >
                  {team?.name}
                </MenuItem>
              ))}
            </TextField>
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
