/* eslint-disable react/function-component-definition */
import React from 'react';
import clsx from 'clsx';
import { AppBar, Toolbar } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
  root: {},
  toolbar: {
    height: 64
  }
});

interface Props {
  className?: string;
}
const TopBar: React.FC<Props> = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar className={classes.toolbar}>
        {/* <RouterLink to="/">
          <Logo />
        </RouterLink> */}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
