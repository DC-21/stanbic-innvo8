import React from 'react';
import { Button, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function FAQ() {
  return (
    <Button sx={{ color: '#0133A1' }}>
      <Link
        style={{ textDecoration: 'none' }}
        component={RouterLink}
        to="/faq"
        variant="h6"
      >
        <Typography className="text" variant="h6">
          FAQ
        </Typography>
      </Link>
    </Button>
  );
}

export default FAQ;
