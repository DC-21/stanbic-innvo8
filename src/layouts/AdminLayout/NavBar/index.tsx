/* eslint-disable react/function-component-definition */
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CampaignIcon from '@mui/icons-material/Campaign';
import GroupsIcon from '@mui/icons-material/Groups';
import { Box, Divider, Drawer, Hidden } from '@mui/material';
// import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import makeStyles from '@mui/styles/makeStyles';
import NavItem from './NavItem';

export const items = [
  {
    href: '/app/dashboard',
    icon: DashboardOutlinedIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/applications',
    icon: LibraryBooksIcon,
    title: 'Applications'
  },
  {
    href: '/app/users',
    icon: SupervisorAccountOutlinedIcon,
    title: 'Admins'
  },
  {
    href: '/app/teams',
    icon: GroupsIcon,
    title: 'Teams'
  },
  {
    href: '/app/challenges',
    icon: CampaignIcon,
    title: 'Challenges'
  },
  {
    href: '/app/account',
    icon: AccountCircleOutlinedIcon,
    title: 'Account'
  }
];

const logout = [
  {
    href: '/logout',
    icon: ExitToAppOutlinedIcon,
    title: 'Logout'
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 68,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

interface Props {
  onMobileClose: () => void;
  openMobile: boolean;
}

const NavBar: React.FC<Props> = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      sx={{ backgroundColor: '#FAFAFA', border: 'none' }}
    >
      <Box p={2}>
        <NavItem items={items} />
      </Box>
      <br />
      <br />
      <br />
      <br />
      <Divider />
      <Box p={2}>
        <NavItem items={logout} />
      </Box>
      {/* <Button
        size="small"
        sx={{ margin: '10px' }}
        variant="outlined"
        startIcon={<MailOutlinedIcon />}
      >
        <a href="mailto:support@stanbicinnov8.raiseaticket.com">
          Contact Support
        </a>
      </Button> */}
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

export default NavBar;
