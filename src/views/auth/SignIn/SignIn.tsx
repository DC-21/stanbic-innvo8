import React from 'react';
import { makeStyles } from '@mui/styles';
import {
  Grid,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Link,
  InputAdornment,
  IconButton
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import Cookies from 'js-cookie';
import * as yup from 'yup';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { axios } from '../../../clientProvider';
import { useNotify } from '../../../redux/actions/notifications/notificationActions';
// import { loginSuccess } from '../../../redux/actions/userActions/userActions';
import Logo from '../../../components/Logo';
// import { loginSuccess } from '../../../redux/actions/userActions/userActions';

const useStyles = makeStyles((theme: any) => ({
  root: {
    padding: 0,
    backgroundColor: '#ffffff',
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: '#fff',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/lady.jpeg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '1000px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    width: 100,
    marginLeft: 40,
    marginRight: 40,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
}));

const grantAccess = async (user: Inputs) => {
  const { data: response } = await axios.post('/Auth/login', user);
  return response;
};

type Inputs = { email: string; password: string };

const schema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password is too short - should be longer than 8 characters.')
    .max(32, 'Password must be less than 32 characters')
});

function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const enqueueSnackbar = useNotify();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });
  const { mutate, isLoading } = useMutation(grantAccess, {
    onSuccess: (response) => {
      const { message, data } = response;
      // dispatch(loginSuccess(response.data));
      Cookies.set('Stanbic', JSON.stringify(response.data));
      axios.defaults.headers = { token: response.data.token };
      dispatch(enqueueSnackbar({ message, options: { variant: 'success' } }));
      setTimeout(() => {
        switch (data.userType) {
          case 'Admin':
            navigate('/app/dashboard');
            break;
          case 'User':
            navigate('/team/dashboard');
            break;
          case 'Judge':
            navigate('/judge/dashboard');
            break;
          default:
            break;
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
  const onSubmit = (data: Inputs) => {
    const user = {
      ...data
    };
    mutate(user);
  };
  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid
          className={classes.content}
          item
          xs={12}
          sm={6}
          md={4}
          lg={4}
          xl={4}
        >
          <div className={classes.content}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '150px',
                paddingBottom: '1px'
              }}
            >
              <Logo />
            </div>
            <div className={classes.contentBody}>
              <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <Typography
                  className={classes.title}
                  style={{ textAlign: 'center' }}
                  variant="h2"
                >
                  Sign in
                </Typography>
                <Typography
                  color="textSecondary"
                  style={{ textAlign: 'center' }}
                  gutterBottom
                >
                  Login with email address
                </Typography>

                <TextField
                  error={!!errors.email}
                  className={classes.textField}
                  fullWidth
                  label="Email address"
                  type="text"
                  variant="outlined"
                  {...register('email')}
                  autoComplete=""
                />
                <TextField
                  error={!!errors.password}
                  fullWidth
                  className={classes.textField}
                  label="Password"
                  variant="outlined"
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <Button
                  // startIcon={<CircularProgress />}
                  className={classes.signInButton}
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                  startIcon={
                    isLoading ? (
                      <CircularProgress color="inherit" size={25} />
                    ) : null
                  }
                >
                  Sign In
                </Button>
                {/* <a href="https://innov8.demo.co.zm/api/v1/microsoft">
                  <Button
                    startIcon={
                      <FontAwesomeIcon
                        icon={faSignInAlt}
                        style={{ marginRight: '0.5rem' }}
                      />
                    }
                    variant="outlined"
                    color="primary"
                    fullWidth
                  >
                    Sign In With Microsoft
                  </Button>
                </a> */}
                <Grid container>
                  <Grid item xs={6}>
                    <Link href="/forgot-password" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  {/* <Grid item xs={6}>
                    <i>Dont have an account?</i>
                    <Link href="/signup" variant="body2">
                      <i>Sign up here as a team lead</i>
                    </Link>
                  </Grid> */}
                </Grid>
              </form>
            </div>
          </div>
        </Grid>
        <Grid
          className={classes.quoteContainer}
          item
          xs={12}
          sm={6}
          md={8}
          lg={8}
          xl={8}
        >
          <div className={classes.quote}>
            {/* <div className={classes.quoteInner}>
              <Typography
                className={classes.quoteText}
                variant="h1"
              >
                Welcome To The Admin Dashboard
              </Typography>

            </div> */}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default SignIn;
