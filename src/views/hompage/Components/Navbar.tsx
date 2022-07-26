import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-scroll';
import Logo from '../../../components/Logo';

function Navbar() {
  return (
    <nav className="nav" id="navbar">
      <div className="nav-content">
        <Logo />
        <ul className="nav-items">
          <li className="nav-item">
            <Link
              activeClass="active"
              to="section1"
              spy
              smooth
              offset={-70}
              duration={500}
            >
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link
              activeClass="active"
              to="section2"
              spy
              smooth
              offset={-70}
              duration={500}
            >
              Eligibility Criteria
            </Link>
          </li>
          <li className="nav-item">
            <Link
              activeClass="active"
              to="section3"
              spy
              smooth
              offset={-70}
              duration={500}
            >
              Benefits
            </Link>
          </li>
          <li className="nav-item">
            <Link
              activeClass="active"
              to="section4"
              spy
              smooth
              offset={-70}
              duration={500}
            >
              Stages
            </Link>
          </li>
          <li className="nav-item">
            <Link
              activeClass="active"
              to="section5"
              spy
              smooth
              offset={-70}
              duration={500}
            >
              FAQ
            </Link>
          </li>
          <li className="nav-item">
            <Link
              activeClass="active"
              to="section5"
              spy
              smooth
              offset={-70}
              duration={500}
            >
              Contacts
            </Link>
          </li>
        </ul>

        <Button variant="outlined" color="primary">
          Sign Up
        </Button>
      </div>
    </nav>
  );
}
export default Navbar;
