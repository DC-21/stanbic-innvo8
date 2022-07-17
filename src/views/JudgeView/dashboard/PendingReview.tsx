/* eslint-disable react/function-component-definition */
/* eslint-disable no-use-before-define */
import React, { FC } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import makeStyles from '@mui/styles/makeStyles';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { useQuery } from 'react-query';
import { axios } from '../../../clientProvider';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: green[600],
    height: 46,
    width: 46
  }
}));
const getPendingReview = async (): Promise<number> => {
  const data = await axios.get('/Innovation/count_pending_innovations');
  return data.data?.Innovations;
};

const PendingReview: FC<React.PropsWithChildren<any>> = ({
  className,
  ...rest
}) => {
  const classes = useStyles();
  const { data } = useQuery(['zambianBusinessesCount'], getPendingReview);
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item md={9}>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Pending Review
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {data || 0}
            </Typography>
          </Grid>
          <Grid item md={3}>
            <Avatar className={classes.avatar}>
              <PendingActionsIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

PendingReview.propTypes = {
  className: PropTypes.string
};

export default PendingReview;
