import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Section from './Components/Section';
import dummyText from './DummyText';

function Homepage() {
  return (
    <div className="App">
      <Navbar />
      <Section
        title="About Project Innov8 2.0"
        subtitle="Building on the first iteration in 2021, Project Innov8 2.0 is an opportunity for bold Stanbic staff to form cross-departmental teams that are determined to develop new ideas meant to address customer-centric challenges. 
        The Challenge is open to all Stanbic staff in teams of 2 to 3 Innovators.
        During the program, Stanbic Innovators will be supported through the process of interrogating their ideas, developing business models, and pitching them to the bank.
        During the final pitch, a winning team and 2 runners up will be selected, walking away with up to K150, 000 in prizes.
        
        Innovation Challenge Outcomes 
        Innovation-ready Change Makers
        Impactful new product or product improvements"
        dark
        id="section1"
      />
      <Section
        title="Eligibility Criteria"
        subtitle="
        The submitting team must be Stanbic Bank Zambia members of staff.
        Team members cannot belong to more than one innovation team.
        The submitting team must be based in Zambia.
        The submitted idea must be aligned with the needs of Zambians.
        The submitting team must be made up of Zambian nationals or residents.
        The submitting team may be seeking support for customer, product, and/or business model development;
        A maximum of 2 team members (preferably Team Leads) must be able to attend the Sprint Week (include link to page in portal); and
        The winning team of the incubation programme must be able to attend a 4-week idea development programme in September 2022.
        "
        dark={false}
        id="section2"
      />
      <Section title="Section 3" subtitle={dummyText} dark id="section3" />
      <Section
        title="Section 4"
        subtitle={dummyText}
        dark={false}
        id="section4"
      />
      <Section title="Section 5" subtitle={dummyText} dark id="section5" />
    </div>
  );
}

export default Homepage;
