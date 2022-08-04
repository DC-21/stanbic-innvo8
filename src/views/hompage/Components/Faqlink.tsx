import React from 'react';
import { Button, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function FAQ() {
  return (
    <Link component={RouterLink} to="/faq" variant="h6">
      <Button sx={{ color: '#0133A1' }}>FAQ</Button>
    </Link>
  );
}

export default FAQ;
