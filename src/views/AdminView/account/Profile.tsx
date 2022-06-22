/* eslint-disable react/function-component-definition */
import React from 'react';
import clsx from 'clsx';
// import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import { useSelector } from 'react-redux';
import makeStyles from '@mui/styles/makeStyles';
import { RootState } from '../../../redux/reducers/rootReducer';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

interface Props {
  className?: string;
}
const Profile: React.FC<Props> = ({ className, ...rest }) => {
  const { user } = useSelector((store: RootState) => store.user);
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Avatar className={classes.avatar} />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {user?.firstname}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`${user?.lastname}`}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`${user?.email}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

export default Profile;
