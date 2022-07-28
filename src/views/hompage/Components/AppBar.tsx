import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Link,
  Typography,
  IconButton,
  Hidden,
  Drawer
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import Logo from '../../../components/Logo';
import DrawerComponent from './Drawer';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'white',
    marginBottom: '5px'
  }
}));

export default function ButtonAppBar() {
  const [isMobileNavOpen, setMobileNavOpen] = React.useState(false);
  const classes = useStyles();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar classes={{ root: classes.root }}>
          <Box sx={{ ml: 0, display: 'flex' }}>
            <Logo />
          </Box>
          {/* <Box sx={{ display: 'flex', alignItems: 'flex-end' }}> */}
          <Hidden mdDown>
            <Typography
              className="text"
              variant="body2"
              to="#"
              component={RouterLink}
              sx={{ flexGrow: 1 }}
            >
              About
            </Typography>
            <Typography
              className="text"
              variant="h6"
              to="#"
              component={RouterLink}
              sx={{ flexGrow: 1 }}
            >
              Eligibility Criteria
            </Typography>
            <Typography
              className="text"
              variant="h6"
              to="#"
              component={RouterLink}
              sx={{ flexGrow: 1 }}
            >
              Benefits
            </Typography>
            <Typography
              className="text"
              variant="h6"
              to="#"
              component={RouterLink}
              sx={{ flexGrow: 1 }}
            >
              Stages
            </Typography>
            <Typography
              className="text"
              variant="h6"
              to="#"
              component={RouterLink}
              sx={{ flexGrow: 1 }}
            >
              FAQ
            </Typography>
            <Typography
              className="text"
              variant="h6"
              to="#"
              component={RouterLink}
              sx={{ flexGrow: 1 }}
            >
              Contacts
            </Typography>
            <Link component={RouterLink} to="/signin" variant="h6">
              <Button variant="contained">Login</Button>
            </Link>
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
          {/* </Box> */}
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
