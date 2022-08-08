import { Container, Button, Link } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

function Header() {
  return (
    <div className="Header">
      <Container fixed>
        <div className="text-bot">
          <h1 className="headingTitle">
            Do you have an innovative <br />
            business idea that addresses <br />
            our most pressing challenges?
          </h1>
          <div>
            <div>
              <Link component={RouterLink} to="/signup" variant="h6">
                <Button size="large" variant="contained">
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Header;
