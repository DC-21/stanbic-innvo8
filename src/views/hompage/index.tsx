import React from 'react';
import './App.css';
import AppBar from './Components/AppBar';
import Header from './Components/Header';
import Section from './Components/Section';
import Eligibilitysection from './Components/Eligibilitysection';
import Cards from './Components/cards';
import InnoationStages from './Components/InnovationStages';
import Footer from './Components/Footer';

function Homepage() {
  return (
    <div>
      <AppBar />
      <Header />
      <Section />
      <Eligibilitysection />
      <Cards />
      <InnoationStages />
      <Footer />
    </div>
  );
}

export default Homepage;
