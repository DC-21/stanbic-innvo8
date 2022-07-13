/* eslint-disable react/function-component-definition */
import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useForm } from 'react-hook-form';
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
      teamId: teamData?._id
    };
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
          4. Which category/sector does your innovation fall under?
        </Typography>
        <TextField
          error={Boolean(errors.category)}
          variant="outlined"
          fullWidth
          {...register('category', { required: true })}
          margin="normal"
          size="small"
          type="text"
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