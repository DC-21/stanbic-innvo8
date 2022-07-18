import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
// import { useSelector } from 'react-redux';
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Hidden,
  IconButton,
  Theme,
  Toolbar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import makeStyles from '@mui/styles/makeStyles';
// import { RootState } from '../../redux/reducers/rootReducer';
import { useSelector } from 'react-redux';
import Logo from '../../components/Logo';
import { RootState } from '../../redux/reducers/rootReducer';

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
    width: 50,
    height: 50,
    backgroundColor: '#0133A1'
  }
}));

interface Props {
  className?: string;
  onMobileNavOpen?: () => void;
}
function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#0133A1';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name)
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
  };
}

function TopBar({ className, onMobileNavOpen, ...rest }: Props) {
  const classes = useStyles();
  const { user } = useSelector((store: RootState) => store.user);

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={1}
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
            {...stringAvatar(`${user?.firstName} ${user?.lastName}`)}
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
      <Divider variant="fullWidth" sx={{ backgroundColor: '#0133A1' }} />
    </AppBar>
  );
}

export default TopBar;
