/* eslint-disable react/function-component-definition */
import { ExpandMore } from '@mui/icons-material';
import {
  Collapse,
  List,
  ListItemIcon,
  MenuItem,
  Theme,
  Tooltip,
  Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import * as React from 'react';
import { FC, ReactElement } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  icon: { minWidth: theme.spacing(2), marginRight: theme.spacing(1) },
  sidebarIsOpen: {
    '& a': {
      paddingLeft: theme.spacing(4),
      transition: 'padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms'
    }
  },
  sidebarIsClosed: {
    '& a': {
      paddingLeft: theme.spacing(2),
      transition: 'padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms'
    }
  }
}));

interface Props {
  dense: boolean;
  handleToggle: () => void;
  icon: ReactElement;
  isOpen: boolean;
  name: string;
}

const SubMenu: FC<React.PropsWithChildren<Props>> = ({
  handleToggle,
  isOpen,
  name,
  icon,
  children,
  dense
}) => {
  const classes = useStyles();

  const header = (
    <MenuItem dense={dense} onClick={handleToggle}>
      <ListItemIcon className={classes.icon}>
        {isOpen ? <ExpandMore /> : icon}
      </ListItemIcon>
      <Typography variant="inherit" color="textSecondary">
        {name}
      </Typography>
    </MenuItem>
  );

  return (
    <>
      {isOpen ? (
        header
      ) : (
        <Tooltip title={name} placement="right">
          {header}
        </Tooltip>
      )}
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List
          dense={dense}
          component="div"
          disablePadding
          className={classes.sidebarIsClosed}
        >
          {children}
        </List>
      </Collapse>
    </>
  );
};

export default SubMenu;
