/* eslint-disable react/function-component-definition */
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
// import { useSelector } from 'react-redux';
import {
  AppBar,
  Avatar,
  Box,
  Hidden,
  IconButton,
  Theme,
  Toolbar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import makeStyles from '@mui/styles/makeStyles';
// import { RootState } from '../../redux/reducers/rootReducer';
import Logo from '../../components/Logo';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  avatar: {
    width: 65,
    height: 65
  },
  menu: {
    marginLeft: '0 auto',
    gap: '0 auto'
  },
  bell: {
    marginLeft: 'auto',
    [theme.breakpoints.down('xs')]: {
      marginLeft: '70%'
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: '0 auto'
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: '0 auto'
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: '0 auto'
    }
  },
  avatarIcon: {
    cursor: 'pointer',
    width: 54,
    height: 54
  }
}));

interface Props {
  className?: string;
  onMobileNavOpen?: () => void;
}

const TopBar: React.FC<Props> = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  //   const { notifyList } = useSelector((store: RootState) => store.notifyList);
  //   const { user } = useSelector((store: RootState) => store.user);
  // //   const isAuthenticated = user;
  //   const filteredNotifyList = notifyList.filter(
  //     (element, index) =>
  //       index ===
  //       notifyList.findIndex(
  //         (e) => e.key === element.key && e.key === element.key
  //       )
  //   );
  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={3}
      {...rest}
      sx={{ backgroundColor: '#fff' }}
    >
      <Toolbar>
        <RouterLink to="/app/dashboard">
          <Logo />
        </RouterLink>
        <Box style={{ marginLeft: 'auto', flex: 1 }}>
          <Avatar
            className={classes.avatarIcon}
            component={RouterLink}
            // src={user.avatar}
            to="/app/account"
            style={{ marginLeft: 'auto', flex: 1 }}
          />
        </Box>
        <Hidden lgUp>
          <div className={classes.menu}>
            <IconButton
              color="inherit"
              onClick={onMobileNavOpen}
              sx={{ color: 'primary.main' }}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
