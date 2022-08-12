import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLocation } from 'react-router-dom';
import Header from '../hompage/Components/Header';
import AppBar from '../hompage/Components/AppBar';

import Footer from '../hompage/Components/Footer';
// import ResponsiveFAQAppBar from './faqAppbar';

export default function FAQ() {
  const { pathname } = useLocation();
  return (
    <div>
      {/* <ResponsiveFAQAppBar /> */}
      <AppBar />
      {pathname === '/faq' ? null : <Header />}

      <div className="layoutpadding">
        <Typography
          variant="h1"
          sx={{
            marginTop: '100px',
            color: ' #0133a1',
            textAlign: 'center',
            paddingBottom: '20px'
          }}
        >
          Frequently Asked Questions (FAQs)
        </Typography>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="faq">
              Where can I access the application form?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>The application form can be accessed here</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className="faq">
              How long is the ‘Sprint’ period?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              The ‘Sprint’ period is 1 week for 10 successful teams. This will
              be followed by an idea development phase providing 4-weeks of
              ongoing support to the Top team of the ‘Sprint’ period.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className="faq">Who is eligible to apply?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Typography>
                <li style={{ marginBottom: 1 }}>Eligibility Criteria</li>
              </Typography>

              <Typography>
                <li style={{ marginBottom: 1 }}>
                  The submitting team must be Stanbic Bank Zambia members of
                  staff.
                </li>
              </Typography>
              <Typography>
                <li style={{ marginBottom: 1 }}>
                  Team members cannot belong to more than one innovation team.
                </li>
              </Typography>
              <Typography>
                <li style={{ marginBottom: 1 }}>
                  The submitting team must be based in Zambia.
                </li>
              </Typography>
              <Typography>
                <li style={{ marginBottom: 1 }}>
                  The submitted idea must be aligned with the needs of Zambians.
                </li>
              </Typography>
              <Typography>
                <li style={{ marginBottom: 1 }}>
                  The submitting team must be made up of Zambian nationals or
                  residents.
                </li>
              </Typography>
              <Typography>
                <li style={{ marginBottom: 1 }}>
                  The submitting team may be seeking support for customer,
                  product, and/or business model development;
                </li>
              </Typography>
              <Typography>
                <li style={{ marginBottom: 1 }}>
                  A maximum of 2 team members (preferably Team Leads) must be
                  able to attend the Sprint Week
                </li>
              </Typography>
              <Typography>
                <li style={{ marginBottom: 1 }}>
                  <span>
                    The winning team of the incubation programme must be able{' '}
                  </span>
                  to attend a 4-week idea development programme in September
                  2022.
                </li>
              </Typography>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="faq">
              When is the application deadline?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              The application deadline is 19th August 2022
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="faq">
              What are the benefits of applying for the Stanbic Innovation
              Challenge?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <li style={{ marginBottom: 1 }}>
                One week of learning experience in building innovative
                solutions.
              </li>
            </Typography>
            <Typography>
              <li style={{ marginBottom: 1 }}>
                Personalised mentorship for all participating teams and their
                idea validation needs.
              </li>
            </Typography>
            <Typography>
              <li style={{ marginBottom: 1 }}>
                Access to legal, accounting, financial planning and tech
                support; Access to networking opportunities with fellow
                successful applicants and industry experts;
              </li>
            </Typography>
            <Typography>
              <li style={{ marginBottom: 1 }}>Up to K150, 000 in prizes</li>
            </Typography>
            <Typography>
              <li style={{ marginBottom: 1 }}>
                4-weeks of ongoing support from Stanbic Bank Zambia and a
                network of coaches and mentors to assist with go-to-market
                strategies and scaling-up for the winning team.
              </li>
            </Typography>{' '}
            <Typography>
              <li style={{ marginBottom: 1 }}>
                An opportunity to join a supportive innovators network.
              </li>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="faq">
              When does the Challenge begin?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              The Innovation Challenge begins on 5th August 2022
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="faq">
              What specialised skills will I learn during the programme?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Typography variant="body1">
                <li style={{ marginBottom: 1 }}>
                  Business Objective and Context
                </li>
              </Typography>

              <Typography variant="body1">
                <li style={{ marginBottom: 1 }}>
                  Introduction to Lean Model Canvas (with a focus on the
                  Customer Problem)
                </li>
              </Typography>

              <Typography variant="body1">
                <li style={{ marginBottom: 1 }}>Customer Persona</li>
              </Typography>

              <Typography variant="body1">
                <li style={{ marginBottom: 1 }}>Customer Journeys</li>
              </Typography>

              <Typography variant="body1">
                <li style={{ marginBottom: 1 }}>Unique Value Proposition</li>
              </Typography>

              <Typography variant="body1">
                <li style={{ marginBottom: 1 }}>An Introduction to Pitching</li>
              </Typography>

              <Typography variant="body1">
                <li style={{ marginBottom: 1 }}>
                  Various thematic coaching sessions on Sprint Week modules.
                </li>
              </Typography>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="faq">
              What coaching sessions are available?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <li style={{ marginBottom: 1 }}>
                Coaching sessions are one to one meetings with inhouse and
                external coaches designed to address unique idea needs. Tailored
                sessions include;
              </li>
            </Typography>

            <Typography>
              <li style={{ marginBottom: 1 }}>
                Business Objective and Context
              </li>
            </Typography>

            <Typography>
              <li style={{ marginBottom: 1 }}>
                Introduction to Lean Model Canvas (with a focus on the Customer
                Problem)
              </li>
            </Typography>

            <Typography>
              <li style={{ marginBottom: 1 }}>
                Introduction to Interview Scripting.
              </li>
            </Typography>

            <Typography>
              <li style={{ marginBottom: 1 }}>Customer Persona</li>
            </Typography>

            <Typography>
              <li style={{ marginBottom: 1 }}>Customer Journeys</li>
            </Typography>

            <Typography>
              <li style={{ marginBottom: 1 }}>Unique Value Proposition</li>
            </Typography>

            <Typography>
              <li style={{ marginBottom: 1 }}>Revenue Models</li>
            </Typography>
            <Typography>
              <li style={{ marginBottom: 1 }}>An Introduction to Pitching</li>
            </Typography>
            <Typography>
              <li style={{ marginBottom: 1 }}>
                Various thematic coaching sessions on Sprint Week modules
              </li>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <Footer />
    </div>
  );
}
