import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';

// import Tooltip from '@mui/material/Tooltip';
import { Link, animateScroll as scroll } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';

import makeStyles from '@mui/styles/makeStyles';
import { Button, Typography, IconButton, Theme, MenuItem } from '@mui/material';
import Login from '../hompage/Components/login';
import FAQ from '../hompage/Components/Faqlink';
import Logo from '../../components/Logo';

// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: 'white',
    marginBottom: '3px',
    alignItems: 'center'
  },

  nav: {
    paddingLeft: 20,

    [theme.breakpoints.down('xs')]: {}
  }
}));

function ResponsiveFAQAppBar() {
  const classes = useStyles();
  const scrollToTop = () => {
    scroll.scrollToTop();
  };
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  //   const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
  //     null
  //  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  //   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
  //     setAnchorElUser(event.currentTarget);
  //   };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  //   const handleCloseUserMenu = () => {
  //     setAnchorElUser(null);
  //   };
  return (
    <AppBar classes={{ root: classes.root }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters onClick={scrollToTop}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              display: { xs: 'none', md: 'grid' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            <Logo />
          </Typography>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            <Logo />
          </Typography>
          <Box
            sx={{
              flexGrow: 0,
              ml: 'auto',
              display: { xs: 'none', md: 'flex' }
            }}
          >
            <Button sx={{ color: '#0133A1' }}>
              <Typography
                className="text"
                variant="h6"
                to="#"
                component={RouterLink}
                sx={{ cursor: 'pointer' }}
              >
                <Link
                  activeClass="active"
                  to="Contacts"
                  spy
                  smooth
                  offset={-70}
                  duration={500}
                >
                  Contacts
                </Link>
              </Typography>
            </Button>
            <FAQ />
            <Login />
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              ml: 'auto',
              display: { xs: 'grid', md: 'none' }
            }}
          >
            <IconButton
              /// make this blue or black
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              <MenuItem>
                <Button sx={{ color: '#0133A1' }}>
                  <Typography
                    className="text"
                    variant="h6"
                    to="#"
                    component={RouterLink}
                    sx={{ cursor: 'pointer' }}
                  >
                    <Link
                      activeClass="active"
                      to="Contacts"
                      spy
                      smooth
                      offset={-70}
                      duration={500}
                      onClick={handleCloseNavMenu}
                    >
                      Contacts
                    </Link>
                  </Typography>
                </Button>
              </MenuItem>
              <MenuItem>
                <FAQ />
              </MenuItem>
              <MenuItem>
                <Login />
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveFAQAppBar;
