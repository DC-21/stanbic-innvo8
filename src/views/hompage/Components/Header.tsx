import { Container, Button, Link } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

function Header() {
  return (
    <div className="Header">
      <Container>
        <div className="headingPosition ">
          <h1 className="headingTitle">
            <span className="normalH"> Do you have an </span> innovative
            business
            <span className="normalH">
              idea that addresses our most pressing
            </span>
            challenges?
          </h1>
          <div>
            <Link component={RouterLink} to="/signin" variant="h6">
              <Button size="large" variant="contained">
                Apply Now
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Header;
