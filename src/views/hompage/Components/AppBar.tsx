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
import AdbIcon from '@mui/icons-material/Adb';
import makeStyles from '@mui/styles/makeStyles';
import { Button, Typography, IconButton, Theme } from '@mui/material';
import Logo from '../../../components/Logo';
import Login from './login';

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

function ResponsiveAppBar() {
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
    <AppBar>
      <Container maxWidth="xl" classes={{ root: classes.root }}>
        <Toolbar disableGutters onClick={scrollToTop}>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
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
            <Login />
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
                  to="About"
                  spy
                  smooth
                  offset={-70}
                  duration={500}
                >
                  About
                </Link>
              </Typography>
            </Button>
            <Button sx={{ color: '#0133A1' }}>
              <Typography
                className="text"
                variant="h6"
                to="#"
                component={RouterLink}
                sx={{ p: '2', cursor: 'pointer' }}
              >
                <Link
                  activeClass="active"
                  to="EligibilityCriteria"
                  spy
                  smooth
                  offset={-70}
                  duration={500}
                >
                  Eligibility Criteria
                </Link>
              </Typography>
            </Button>
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
                  to="Benefits"
                  spy
                  smooth
                  offset={-70}
                  duration={500}
                >
                  Benefits
                </Link>
              </Typography>
            </Button>
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
                  to="Stages"
                  spy
                  smooth
                  offset={-70}
                  duration={500}
                >
                  Stages
                </Link>
              </Typography>
            </Button>

            <Button sx={{ color: '#0133A1' }}>
              <Typography
                className="text"
                variant="h6"
                to="#"
                component={RouterLink}
              >
                Contacts
              </Typography>
            </Button>
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
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
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
                      to="About"
                      spy
                      smooth
                      offset={-70}
                      duration={500}
                    >
                      About
                    </Link>
                  </Typography>
                </Button>
                <Button sx={{ color: '#0133A1' }}>
                  <Typography
                    className="text"
                    variant="h6"
                    to="#"
                    component={RouterLink}
                    sx={{ p: '2', cursor: 'pointer' }}
                  >
                    <Link
                      activeClass="active"
                      to="EligibilityCriteria"
                      spy
                      smooth
                      offset={-70}
                      duration={500}
                    >
                      Eligibility Criteria
                    </Link>
                  </Typography>
                </Button>
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
                      to="Benefits"
                      spy
                      smooth
                      offset={-70}
                      duration={500}
                    >
                      Benefits
                    </Link>
                  </Typography>
                </Button>
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
                      to="Stages"
                      spy
                      smooth
                      offset={-70}
                      duration={500}
                    >
                      Stages
                    </Link>
                  </Typography>
                </Button>

                <Button sx={{ color: '#0133A1' }}>
                  <Typography
                    className="text"
                    variant="h6"
                    to="#"
                    component={RouterLink}
                  >
                    Contacts
                  </Typography>
                </Button>
                <Login />
              </Box>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
