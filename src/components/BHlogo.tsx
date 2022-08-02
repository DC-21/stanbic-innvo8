/* eslint-disable react/function-component-definition */
/* eslint-disable no-use-before-define */
import { makeStyles } from '@mui/styles';
import React, { FC } from 'react';

const useStyles = makeStyles(() => ({
  logo: {
    height: 60,
    width: '100%',
    objectFit: 'contain'
  }
}));

const BHlogo: FC<React.PropsWithChildren<unknown>> = (props) => {
  const classes = useStyles();
  return (
    <img
      alt="BongoHiveLogo"
      src="/images/BH_logo.png"
      {...props}
      className={classes.logo}
    />
  );
};

export default BHlogo;
