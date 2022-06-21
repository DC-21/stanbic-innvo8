/* eslint-disable react/function-component-definition */
import React from 'react';
import clsx from 'clsx';
import { AppBar, Toolbar } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../../components/Logo';

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
    <AppBar
      className={clsx(classes.root, className)}
      elevation={1}
      {...rest}
      sx={{ backgroundColor: '#fff' }}
    >
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/app/dashoard">
          <Logo />
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
