/* eslint-disable react/function-component-definition */
import { CircularProgress } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { FC } from 'react';

const useStyles = makeStyles(() => ({
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 300,
    margin: 'auto'
  }
}));
interface Props {
  size: number;
}
const Loading: FC<React.PropsWithChildren<Props>> = ({ size }) => {
  const classes = useStyles();
  return (
    <div className={classes.spinner}>
      <CircularProgress size={size} />
    </div>
  );
};

export default Loading;
