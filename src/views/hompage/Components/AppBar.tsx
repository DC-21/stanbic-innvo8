import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Typography,
  IconButton,
  Hidden,
  Drawer,
  Theme
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Link, animateScroll as scroll } from 'react-scroll';
import Logo from '../../../components/Logo';
import DrawerComponent from './Drawer';
import Login from './login';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: 'white',
    marginBottom: '3px',
    alignItems: 'center'
  },
  logo: {
    justifyContent: 'left',
    paddingLeft: 0,
    cursor: 'pointer',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0
    }
  },
  nav: {
    paddingLeft: 20,

    [theme.breakpoints.down('xs')]: {
      paddingLeft: 28
    }
  }
}));

export default function ButtonAppBar() {
  const [isMobileNavOpen, setMobileNavOpen] = React.useState(false);
  const classes = useStyles();
  const scrollToTop = () => {
    scroll.scrollToTop();
  };
  return (
    <Box component="nav" sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar classes={{ root: classes.root }}>
          <Box
            className={classes.logo}
            sx={{ ml: 0, display: 'flex' }}
            onClick={scrollToTop}
          >
            <Logo />
          </Box>
          <Box className={classes.nav}>
            <Hidden mdDown>
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
                    FAQ
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
            </Hidden>

            <Hidden mdUp>
              <Box sx={{ ml: 'auto' }}>
                <IconButton
                  color="inherit"
                  onClick={() => setMobileNavOpen((state) => !state)}
                  sx={{ color: 'primary.main' }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Hidden>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={isMobileNavOpen}
        onClick={() => setMobileNavOpen((state) => !state)}
      >
        <DrawerComponent setMobileNavOpen={setMobileNavOpen} />
      </Drawer>
    </Box>
  );
}
