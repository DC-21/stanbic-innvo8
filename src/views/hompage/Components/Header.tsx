import { Container, Button, Link } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

function Header() {
  return (
    <div className="Header">
      <Container>
        <div className="text-bot">
          <h1 className="headingTitle">
            Do you have an innovative business idea that addresses our most
            pressing challenges?
          </h1>
          <div>
            <div>
              <Link component={RouterLink} to="/signin" variant="h6">
                <Button size="large" variant="contained">
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>{' '}
        </div>
      </Container>
    </div>
  );
}

export default Header;
