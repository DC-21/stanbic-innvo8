import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Link, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Logo from '../../../components/Logo';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'white',
    marginBottom: '5px'
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar classes={{ root: classes.root }}>
          <Logo />

          <Typography
            className="text"
            variant="body2"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            About
          </Typography>
          <Typography
            className="text"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Eligibility Criteria
          </Typography>
          <Typography
            className="text"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Benefits
          </Typography>
          <Typography
            className="text"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Stages
          </Typography>
          <Typography
            className="text"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            FAQ
          </Typography>
          <Typography
            className="text"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Contacts
          </Typography>
          <Link component={RouterLink} to="/signin" variant="h6">
            <Button variant="contained">Login</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
