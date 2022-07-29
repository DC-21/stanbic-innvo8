/* eslint-disable react/function-component-definition */
/* eslint-disable no-use-before-define */
import { makeStyles } from '@mui/styles';
import React, { FC } from 'react';

const useStyles = makeStyles(() => ({
  Headerimage: {
    backgroundSize: 'cover'
  }
}));

const Homeheader: FC<React.PropsWithChildren<unknown>> = (props) => {
  const classes = useStyles();
  return (
    <img
      alt="woman-online"
      src="/images/Innov8header.jpg"
      {...props}
      className={classes.Headerimage}
    />
  );
};

export default Homeheader;
