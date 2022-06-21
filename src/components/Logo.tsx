/* eslint-disable react/function-component-definition */
/* eslint-disable no-use-before-define */
import { makeStyles } from '@mui/styles';
import React, { FC } from 'react';

const useStyles = makeStyles(() => ({
  logo: {
    height: 40
  }
}));

const Logo: FC<React.PropsWithChildren<unknown>> = (props) => {
  const classes = useStyles();
  return (
    <img
      alt="Logo"
      src="/images/stanbic2.png"
      {...props}
      className={classes.logo}
    />
  );
};

export default Logo;
