/* eslint-disable react/function-component-definition */
/* eslint-disable no-use-before-define */
import { makeStyles } from '@mui/styles';
import React, { FC } from 'react';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  logo: {
    height: 60
  }
}));

const Logo: FC<React.PropsWithChildren<unknown>> = (props) => {
  const classes = useStyles();
  return (
    <Link component={RouterLink} to="/" variant="h6">
      <img
        alt="Logo"
        src="/images/newlogo.png"
        {...props}
        className={classes.logo}
      />
    </Link>
  );
};

export default Logo;
