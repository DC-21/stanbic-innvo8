import React from 'react';
import { makeStyles } from '@mui/styles';
import {
  Grid,
  Button,
  TextField,
  Typography,
  CircularProgress
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { axios } from '../../clientProvider';
import { useNotify } from '../../redux/actions/notifications/notificationActions';
// import { loginSuccess } from '../../redux/actions/userActions/userActions';

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
    paddingLeft: 100,
    paddingRight: 10,
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
const grantAccess = async (data: Inputs) => {
  const { data: response } = await axios.patch('/Admin/forgotpassword', data);
  return response;
};
interface Inputs {
  email: string;
}
const emailRegExp = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,3}$/i;
const schema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegExp, 'Enter a valid email')
    .required('Email is required')
});
function ForgotPassword() {
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
      const { message, status } = response;
      if (status === 200 || status === 201 || status === 202) {
        dispatch(enqueueSnackbar({ message, options: { variant: 'success' } }));
        setTimeout(() => navigate('/'), 1000);
      }
      if (status >= 400 || status <= 500) {
        dispatch(enqueueSnackbar({ message, options: { variant: 'error' } }));
      }
    },
    onError: (error: AxiosError) => {
      dispatch(
        enqueueSnackbar({
          message: error.response?.data.error,
          options: { variant: 'error' }
        })
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(['forgotPassword']);
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
        <Grid className={classes.quoteContainer} item lg={6}>
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
        <Grid className={classes.content} item xs={12} sm={8} md={5}>
          <div className={classes.content}>
            <div className={classes.contentBody}>
              <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <Typography
                  className={classes.title}
                  style={{ textAlign: 'center' }}
                  variant="h2"
                >
                  Forgot Password
                </Typography>
                <Typography
                  color="textSecondary"
                  style={{ textAlign: 'center' }}
                  gutterBottom
                >
                  Enter your email address Below
                </Typography>

                <TextField
                  error={Boolean(errors.email?.message)}
                  className={classes.textField}
                  helperText={errors.email?.message}
                  fullWidth
                  label="Email address"
                  type="email"
                  variant="outlined"
                  id="email"
                  {...register('email')}
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
      </Grid>
    </div>
  );
}

export default ForgotPassword;
