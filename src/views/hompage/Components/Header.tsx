import { Container, Button, Link } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

function Header() {
  return (
    <div className="Header">
      <Container fixed>
        <div className="text-bot">
          <h1
            className="headingTitle"
            style={{
              fontSize: 'clamp(1rem, 7vw, 4rem)',
              fontFamily: 'Roboto,Helvetica,Arial,sans-serif'
            }}
          >
            Do you have
            <br /> an innovative
            <br /> business idea?
          </h1>
          <br />
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
