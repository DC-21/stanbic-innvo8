/* eslint-disable react/function-component-definition */
/* eslint-disable no-use-before-define */
import { makeStyles } from '@mui/styles';
import React, { FC } from 'react';

const useStyles = makeStyles(() => ({
  Sideimage: {}
}));

const Womanonline: FC<React.PropsWithChildren<unknown>> = (props) => {
  const classes = useStyles();
  return (
    <img
      alt="woman-online"
      src="/images/woman-having-online-class-meeting-through-e-learning-system.png"
      {...props}
      className={classes.Sideimage}
    />
  );
};

export default Womanonline;
