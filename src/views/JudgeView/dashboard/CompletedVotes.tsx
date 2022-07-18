/* eslint-disable react/function-component-definition */
import React, { FC } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import { orange } from '@mui/material/colors';
import makeStyles from '@mui/styles/makeStyles';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useQuery } from 'react-query';
import { axios } from '../../../clientProvider';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: orange[600],
    height: 46,
    width: 46
  }
}));
interface Props {
  className?: string;
}

const getCompletedVotes = async (): Promise<number> => {
  const data = await axios.get('/Innovation/count_accepted_innovations');
  return data.data?.Innovations;
};

const CompletedVotes: FC<React.PropsWithChildren<Props>> = ({
  className,
  ...rest
}) => {
  const classes = useStyles();
  const { data } = useQuery(['CompletedVotes'], getCompletedVotes);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item md={9}>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Completed Votes
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {data || 0}
            </Typography>
          </Grid>
          <Grid item md={3}>
            <Avatar className={classes.avatar}>
              <DoneAllIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

CompletedVotes.propTypes = {
  className: PropTypes.string
};

export default CompletedVotes;
