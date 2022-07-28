/* eslint-disable react/function-component-definition */
/* eslint-disable no-use-before-define */
import React, { FC } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import { yellow } from '@mui/material/colors';
import makeStyles from '@mui/styles/makeStyles';
import GroupsIcon from '@mui/icons-material/Groups';
import { useQuery } from 'react-query';
import { axios } from '../../../clientProvider';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: yellow[600],
    height: 46,
    width: 46
  }
}));
const getZambianBusinesses = async (): Promise<number> => {
  const { data } = await axios.get('/Team/count_teams');
  return data.Teams;
};

const TotalTeams: FC<React.PropsWithChildren<any>> = ({
  className,
  ...rest
}) => {
  const classes = useStyles();
  const { data } = useQuery(['zambianBusinessesCount'], getZambianBusinesses);
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item md={9}>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Total Teams
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {data || 0}
            </Typography>
          </Grid>
          <Grid item md={3}>
            <Avatar className={classes.avatar}>
              <GroupsIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalTeams.propTypes = {
  className: PropTypes.string
};

export default TotalTeams;
