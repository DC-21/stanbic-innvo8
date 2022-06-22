/* eslint-disable react/function-component-definition */
import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  CircularProgress
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import makeStyles from '@mui/styles/makeStyles';
import { RootState } from '../../../redux/reducers/rootReducer';
import { axios } from '../../../clientProvider';
import { useNotify } from '../../../redux/actions/notifications/notificationActions';
import { updateDetails } from '../../../redux/actions/userActions/userActions';

const useStyles = makeStyles(() => ({
  root: {}
}));

interface Props {
  className?: string;
}

interface User {
  firstname: string;
  lastname: string;
  email: string;
  contact: string;
  userId: string;
}
const emailRegExp = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,3}$/i;
const contactRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const alphabetRegExp = /^[A-Za-z]+$/i;
const schema = yup.object().shape({
  firstname: yup
    .string()
    .matches(alphabetRegExp, 'First name is not valid')
    .required('First name is required'),
  lastname: yup
    .string()
    .matches(alphabetRegExp, 'Last name is not valid')
    .required('Last name is required'),
  email: yup
    .string()
    .matches(emailRegExp, 'Enter a valid email')
    .required('Email is required'),
  contact: yup
    .string()
    .length(10)
    .matches(contactRegExp, 'Contact is not valid')
    .required('Contact is required')
});
// eslint-disable-next-line react/prop-types
const ProfileDetails: React.FC<Props> = ({ className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const queryClient = useQueryClient();
  const notification = useNotify();
  const { user } = useSelector((store: RootState) => store.user);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<User>({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const userId = user?._id;

  const updateProfile = async (newAdmin: User) => {
    const { data } = await axios.put(`Admin/updateprofile/${userId}`, newAdmin);
    return data.data;
  };
  const { mutate, isLoading } = useMutation(updateProfile, {
    onSuccess: (data) => {
      const message = 'Successfully updated profile';
      dispatch(updateDetails(data));
      dispatch(notification({ message, options: { variant: 'success' } }));
    },
    onError: () => {
      dispatch(
        notification({
          message: 'There was error, please try again',
          options: { variant: 'error' }
        })
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(['updateProfile']);
    }
  });
  const onSubmit = (data: User) => {
    const newAdmin = {
      ...data
    };
    mutate(newAdmin);
  };
  return (
    <div>
      <form autoComplete="on" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Card {...rest} className={classes.root}>
          <CardHeader
            subheader="The information can be edited"
            title="Profile"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(errors.firstname)}
                  {...register('firstname')}
                  fullWidth
                  helperText={errors.firstname?.message}
                  label="First name"
                  name="firstname"
                  // onChange={handleChange}
                  required
                  defaultValue={user?.firstname}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(errors.lastname)}
                  {...register('lastname')}
                  helperText={errors.lastname?.message}
                  fullWidth
                  label="Last name"
                  name="lastname"
                  // onChange={handleChange}
                  required
                  defaultValue={user?.lastname}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(errors.email)}
                  {...register('email')}
                  helperText={errors.email?.message}
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  // disabled={disabledInput()}
                  // onChange={handleChange}
                  defaultValue={user?.email}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(errors.contact)}
                  {...register('contact')}
                  helperText={errors.contact?.message}
                  fullWidth
                  label="Contact"
                  name="contact"
                  // onChange={handleChange}
                  type="phone"
                  defaultValue={user?.contact}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box display="flex" justifyContent="flex-end" p={2}>
            <Button
              color="primary"
              type="submit"
              variant="contained"
              startIcon={
                isLoading ? (
                  <CircularProgress color="inherit" size={25} />
                ) : null
              }
            >
              Save details
            </Button>
          </Box>
        </Card>
      </form>
    </div>
  );
};

export default ProfileDetails;
