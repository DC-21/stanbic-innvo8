/* eslint-disable react/function-component-definition */
/* eslint-disable no-use-before-define */
import React, { FC } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import makeStyles from '@mui/styles/makeStyles';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
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
const getTotalApplications = async (): Promise<number> => {
  const { data } = await axios.get('/Innovation/count_innovations');
  return data.Innovations;
};

const TotalApplications: FC<React.PropsWithChildren<any>> = ({
  className,
  ...rest
}) => {
  const classes = useStyles();
  const { data } = useQuery(['getTotalApplications'], getTotalApplications);
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item md={9}>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Total Applications
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {data || 0}
            </Typography>
          </Grid>
          <Grid item md={3}>
            <Avatar className={classes.avatar}>
              <LibraryBooksIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalApplications.propTypes = {
  className: PropTypes.string
};

export default TotalApplications;
