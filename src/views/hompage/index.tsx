import React from 'react';
import './App.css';
import AppBar from './Components/AppBar';
import Header from './Components/Header';
import Section from './Components/Section';
import Eligibilitysection from './Components/Eligibilitysection';

function Homepage() {
  return (
    <div>
      <AppBar />
      <Header />
      <Section />
      <Eligibilitysection />
    </div>
  );
}

export default Homepage;
