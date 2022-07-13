import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import {
  Grid,
  Button,
  TextField,
  Link,
  Typography,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material';
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AxiosError } from 'axios';
import { axios } from '../../../clientProvider';
import { useNotify } from '../../../redux/actions/notifications/notificationActions';
import Logo from '../../../components/Logo';

const useStyles = makeStyles((theme: any) => ({
  root: {
    padding: 1,
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: '#6f91b5',
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
    flexBasis: '600px'
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
    paddingLeft: 40,
    paddingRight: 40,
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
  textField: {
    marginTop: theme.spacing(2)
  },
  policy: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  signUpButton: {
    margin: theme.spacing(2, 0)
  }
}));
export interface Data {
  email: string;
  password: string;
}

const registerAdmin = async (admin: Data) => {
  const { data: response } = await axios.patch('/Auth/set_password', admin);
  return response;
};

function CompleteSignUp() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const notification = useNotify();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Data>({
    mode: 'onChange'
  });
  const { mutate, isLoading } = useMutation(registerAdmin, {
    onSuccess: (data) => {
      const { message } = data;
      dispatch(notification({ message, options: { variant: 'success' } }));
      setTimeout(() => navigate('/'), 1500);
    },
    onError: (error: AxiosError) => {
      dispatch(
        notification({
          message: error.response?.data,
          options: { variant: 'error' }
        })
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(['registered']);
    }
  });
  const onSubmit = (data: Data) => {
    const admin = {
      ...data
    };
    mutate(admin);
  };
  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.content} xs={12} sm={8} md={4}>
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
                  variant="h2"
                  style={{ textAlign: 'center' }}
                >
                  Complete Sign Up
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  style={{ textAlign: 'center' }}
                >
                  Hey there! Lets get Started
                </Typography>

                <TextField
                  error={!!errors.email}
                  className={classes.textField}
                  fullWidth
                  label="Email address"
                  type="text"
                  variant="outlined"
                  {...register('email')}
                />
                <TextField
                  error={!!errors.password}
                  className={classes.textField}
                  fullWidth
                  label="Password"
                  variant="outlined"
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
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
                {/* <div className={classes.policy}>
                  <Checkbox
                    className={classes.policyCheckbox}
                    color="primary"
                    name="policy"
                  />
                  <Typography color="textSecondary" variant="body1">
                    I have read the{' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </div> */}

                <Button
                  className={classes.signUpButton}
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  startIcon={
                    isLoading ? (
                      <CircularProgress color="inherit" size={26} />
                    ) : null
                  }
                >
                  Sign Up
                </Button>
                <Typography color="textSecondary" variant="body1">
                  Have an account?{' '}
                  <Link component={RouterLink} to="/" variant="h6">
                    Sign in
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
        <Grid className={classes.quoteContainer} item lg={8}>
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              {/* <Typography
                className={classes.quoteText}
                variant="h1"
              >
                Welcome To Onyx Dashboard
              </Typography> */}
              {/* <div className={classes.person}>
                <Typography
                  className={classes.name}
                  variant="body1"
                >
                  Takamaru Ayako
                </Typography>
                <Typography
                  className={classes.bio}
                  variant="body2"
                >
                  Manager at inVision
                </Typography>
              </div> */}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default CompleteSignUp;
