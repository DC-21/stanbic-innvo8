/* eslint-disable react/function-component-definition */
import React, { FC } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import { orange } from '@mui/material/colors';
import makeStyles from '@mui/styles/makeStyles';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';
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

const getCohorts = async (): Promise<number> => {
  const data = await axios.get('#');
  return data.data?.cohortsCount;
};

const TotalCohorts: FC<React.PropsWithChildren<Props>> = ({
  className,
  ...rest
}) => {
  const classes = useStyles();
  const { data } = useQuery(['cohortCount'], getCohorts);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item md={9}>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Incomplete
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {data || 0}
            </Typography>
          </Grid>
          <Grid item md={3}>
            <Avatar className={classes.avatar}>
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalCohorts.propTypes = {
  className: PropTypes.string
};

export default TotalCohorts;
