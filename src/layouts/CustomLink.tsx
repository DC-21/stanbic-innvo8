import { ListItem } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import React from 'react';

import {
  useResolvedPath,
  LinkProps,
  Link as RouterLink,
  useMatch,
  useLocation
} from 'react-router-dom';
import { NavItemProps } from './DashboardLayout/NavBar/NavItem';

const useStyles = makeStyles((theme) => ({
  active: {
    borderRadius: '15px',
    color: theme.palette.primary.main,
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium
    },
    '& $icon': {
      color: theme.palette.primary.main
    }
  }
}));

interface Props extends LinkProps {
  index: number;
  nestedItems?: NavItemProps[];
  // eslint-disable-next-line no-unused-vars
  handleClickIndex: (index: number) => void;
}

function CustomLink({
  children,
  nestedItems,
  handleClickIndex,
  className,
  index,
  to
}: Props) {
  const classes = useStyles();
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });
  const location = useLocation();
  const isActive = match && location.pathname === resolved.pathname;

  return (
    <ListItem
      className={clsx(className, isActive && classes.active)}
      component={nestedItems ? 'div' : RouterLink}
      button
      onClick={() => {
        // eslint-disable-next-line no-unused-expressions
        nestedItems ? handleClickIndex(index) : null;
      }}
      to={to}
      selected={location.pathname === resolved.pathname}
    >
      {children}
    </ListItem>
  );
}

export default CustomLink;
