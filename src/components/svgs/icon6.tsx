/* eslint-disable react/function-component-definition */
/* eslint-disable no-use-before-define */
import { makeStyles } from '@mui/styles';
import React, { FC } from 'react';

const useStyles = makeStyles(() => ({
  logo: {
    padding: 4,
    height: 50,
    width: '100%',
    objectFit: 'contain'
  }
}));

const Icon6: FC<React.PropsWithChildren<unknown>> = (props) => {
  const classes = useStyles();
  return (
    <img
      alt="icons"
      src="/images/svg/iconsQ7.svg"
      {...props}
      className={classes.logo}
    />
  );
};

export default Icon6;
