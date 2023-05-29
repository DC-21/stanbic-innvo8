import React from 'react';
import { Grid, Typography, CircularProgress } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { axios } from '../../clientProvider';
import { useNotify } from '../../redux/actions/notifications/notificationActions';
import { loginSuccess } from '../../redux/actions/userActions/userActions';
import Logo from '../../components/Logo';

const autoLogin = async (ssoToken: string | undefined) => {
  const { data: response } = await axios.post(`/Auth/ssoLogin/${ssoToken}`);
  return response;
};

function AutoLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const enqueueSnackbar = useNotify();
  const queryClient = useQueryClient();
  const { ssoToken } = useParams();

  const { mutate, isLoading } = useMutation(autoLogin, {
    onSuccess: (response) => {
      const { message, data } = response;
      dispatch(loginSuccess(response.data));
      axios.defaults.headers = { ssoToken };
      dispatch(enqueueSnackbar({ message, options: { variant: 'success' } }));
      setTimeout(() => {
        if (data.userType === 'Admin') {
          navigate('/app/dashboard');
        }
        if (data.userType === 'Team Lead') {
          navigate('/team/dashboard');
        }
        if (data.userType === 'Team Member') {
          navigate('/team/dashboard');
        }
        if (data.userType === 'Judge') {
          navigate('/judge/dashboard');
        }
      }, 1500);
    },
    onError: (error: AxiosError) => {
      dispatch(
        enqueueSnackbar({
          message: error.response?.data,
          options: { variant: 'error' }
        })
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(['login']);
    }
  });

  React.useEffect(() => {
    mutate(ssoToken);
  }, [ssoToken]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
      }}
    >
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center'
        }}
      >
        <Grid item xs={12} sm={12} md={12}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center'
            }}
          >
            <div
              style={{
                paddingTop: '10%'
              }}
            >
              <Typography sx={{ marginBottom: '5%' }} variant="h1">
                Welcome to our platform!
              </Typography>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center'
                }}
              >
                <Logo />
              </div>
            </div>
          </div>
        </Grid>
        <Typography variant="h3" sx={{ padding: '2%' }}>
          Authenticating....
        </Typography>
        <Grid item xs={12} sm={12} md={12}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center'
            }}
          >
            <div
              style={{
                paddingTop: '10%'
              }}
            >
              {isLoading ? (
                <CircularProgress color="primary" size={150} />
              ) : null}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default AutoLogin;
