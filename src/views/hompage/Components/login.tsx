import React from 'react';
import { Button, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Login() {
  return (
    <Link component={RouterLink} to="/signin" variant="h6">
      <Button sx={{ m: 1 }} variant="contained">
        Login
      </Button>
    </Link>
  );
}

export default Login;
