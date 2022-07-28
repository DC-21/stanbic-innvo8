import React from 'react';
import './App.css';
import AppBar from './Components/AppBar';
import Header from './Components/Header';
import Section from './Components/Section';
import Eligibilitysection from './Components/Eligibilitysection';
import Cards from './Components/cards';

function Homepage() {
  return (
    <div>
      <AppBar />
      <Header />
      <Section />
      <Eligibilitysection />
      <Cards />
    </div>
  );
}

export default Homepage;
