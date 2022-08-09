import React from 'react';
import { makeStyles } from '@mui/styles';
import {
  Grid,
  Button,
  TextField,
  Typography,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { axios } from '../../clientProvider';
import { useNotify } from '../../redux/actions/notifications/notificationActions';
import Logo from '../../components/Logo';

const useStyles = makeStyles((theme: any) => ({
  root: {
    padding: 1,
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
    width: '100%',
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

interface Inputs {
  password: string;
  confirmPassword: string;
  resetPin: string;
}
const schema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password is too short - should be longer than 8 characters.')
    .max(32, 'Password must be less than 32 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null, ''], "Passwords don't match")
    .required('Password confirmation is required')
});
function ResetPassword() {
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
    // watch
  } = useForm<Inputs>({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const grantAccess = async (data: Inputs) => {
    const { data: response } = await axios.patch(`/Auth/reset_password`, data);
    return response;
  };
  const { mutate, isLoading } = useMutation(grantAccess, {
    onSuccess: (response) => {
      const { message } = response;
      dispatch(enqueueSnackbar({ message, options: { variant: 'success' } }));
      setTimeout(() => navigate('/signin'), 100);
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
      queryClient.invalidateQueries(['resetPassword']);
    }
  });
  const onSubmit = (data: Inputs) => {
    const reset = {
      ...data
    };
    mutate(reset);
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
                paddingTop: '200px',
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
                  {/* Forgot Password */}
                </Typography>
                <Typography
                  color="textSecondary"
                  style={{ textAlign: 'center' }}
                  gutterBottom
                >
                  <b>
                    Enter the pin you received in your email and set a new
                    password below
                  </b>
                </Typography>

                <TextField
                  error={Boolean(errors.resetPin?.message)}
                  className={classes.textField}
                  fullWidth
                  label="Verification Code"
                  type="text"
                  variant="outlined"
                  {...register('resetPin')}
                />
                <TextField
                  error={Boolean(errors.password?.message)}
                  className={classes.textField}
                  fullWidth
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
                <TextField
                  error={Boolean(errors.confirmPassword?.message)}
                  className={classes.textField}
                  fullWidth
                  label="Confirm Password"
                  variant="outlined"
                  {...register('confirmPassword')}
                  type={showPassword ? 'text' : 'password'}
                  helperText={errors.confirmPassword?.message}
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
                  Submit
                </Button>
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
                Welcome To The Onyx Dashboard
              </Typography>

            </div> */}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default ResetPassword;
