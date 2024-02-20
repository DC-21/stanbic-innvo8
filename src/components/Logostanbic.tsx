/* eslint-disable react/function-component-definition */
/* eslint-disable no-use-before-define */
import { makeStyles } from '@mui/styles';
import React, { FC } from 'react';

const useStyles = makeStyles(() => ({
  logo: {
    height: 50,
    width: '100%',
    objectFit: 'contain'
  }
}));

const Stanbiclogo: FC<React.PropsWithChildren<unknown>> = (props) => {
  const classes = useStyles();
  return (
    <img
      alt="Stanbic Logo"
      src="/images/newlogo.png"
      {...props}
      className={classes.logo}
    />
  );
};

export default Stanbiclogo;
