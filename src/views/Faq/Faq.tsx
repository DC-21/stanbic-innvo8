import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Grid } from '@mui/material';
import Header from '../hompage/Components/Header';

import Footer from '../hompage/Components/Footer';
import ResponsiveFAQAppBar from './faqAppbar';

export default function FAQ() {
  return (
    <div>
      <ResponsiveFAQAppBar />
      <Header />
      <Grid item xs={12}>
        <Typography className="layout heading">
          Frequently Asked Questions (FAQs)
        </Typography>
      </Grid>
      <div className="layoutpadding">
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
              <Typography>Eligibility Criteria</Typography>

              <Typography>
                <Box sx={{ mb: 1 }}>
                  The submitting team must be Stanbic Bank Zambia members of
                  staff.
                </Box>
              </Typography>
              <Typography>
                <Box sx={{ mb: 1 }}>
                  Team members cannot belong to more than one innovation team.
                </Box>
              </Typography>
              <Typography>
                <Box sx={{ mb: 1 }}>
                  The submitting team must be based in Zambia.
                </Box>
              </Typography>
              <Typography>
                <Box sx={{ mb: 1 }}>
                  The submitted idea must be aligned with the needs of Zambians.
                </Box>
              </Typography>
              <Typography>
                <Box sx={{ mb: 1 }}>
                  The submitting team must be made up of Zambian nationals or
                  residents.
                </Box>
              </Typography>
              <Typography>
                <Box sx={{ mb: 1 }}>
                  The submitting team may be seeking support for customer,
                  product, and/or business model development;
                </Box>
              </Typography>
              <Typography>
                <Box sx={{ mb: 1 }}>
                  A maximum of 2 team members (preferably Team Leads) must be
                  able to attend the Sprint Week
                </Box>
              </Typography>
              <Typography>
                <Box sx={{ mb: 1 }}>
                  <span>
                    The winning team of the incubation programme must be able{' '}
                  </span>
                  to attend a 4-week idea development programme in September
                  2022.
                </Box>
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
              <Box sx={{ mb: 1 }}>
                One week of learning experience in building innovative
                solutions.
              </Box>
            </Typography>
            <Typography>
              <Box sx={{ mb: 1 }}>
                Personalised mentorship for all participating teams and their
                idea validation needs.
              </Box>
            </Typography>
            <Typography>
              <Box sx={{ mb: 1 }}>
                Access to legal, accounting, financial planning and tech
                support; Access to networking opportunities with fellow
                successful applicants and industry experts;
              </Box>
            </Typography>
            <Typography>
              <Box sx={{ mb: 1 }}>Up to K150, 000 in prizes</Box>
            </Typography>
            <Typography>
              <Box sx={{ mb: 1 }}>
                4-weeks of ongoing support from Stanbic Bank Zambia and a
                network of coaches and mentors to assist with go-to-market
                strategies and scaling-up for the winning team.
              </Box>
            </Typography>{' '}
            <Typography>
              <Box sx={{ mb: 1 }}>
                An opportunity to join a supportive innovators network.
              </Box>
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
              <Typography>
                <Box sx={{ mb: 1 }}>Business Objective and Context</Box>
              </Typography>

              <Typography>
                <Box sx={{ mb: 1 }}>
                  Introduction to Lean Model Canvas (with a focus on the
                  Customer Problem)
                </Box>
              </Typography>

              <Typography>
                <Box sx={{ mb: 1 }}>Customer Persona</Box>
              </Typography>

              <Typography>
                <Box sx={{ mb: 1 }}>Customer Journeys</Box>
              </Typography>

              <Typography>
                <Box sx={{ mb: 1 }}>Unique Value Proposition</Box>
              </Typography>

              <Typography>
                <Box sx={{ mb: 1 }}>An Introduction to Pitching</Box>
              </Typography>

              <Typography>
                <Box sx={{ mb: 1 }}>
                  Various thematic coaching sessions on Sprint Week modules.
                </Box>
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
              Coaching sessions are one to one meetings with inhouse and
              external coaches designed to address unique idea needs. Tailored
              sessions include;
            </Typography>

            <Typography>
              <Box sx={{ mb: 1 }}>Business Objective and Context</Box>
            </Typography>

            <Typography>
              <Box sx={{ mb: 1 }}>
                Introduction to Lean Model Canvas (with a focus on the Customer
                Problem)
              </Box>
            </Typography>

            <Typography>
              <Box sx={{ mb: 1 }}>Introduction to Interview Scripting.</Box>
            </Typography>

            <Typography>
              <Box sx={{ mb: 1 }}>Customer Persona</Box>
            </Typography>

            <Typography>
              <Box sx={{ mb: 1 }}>Customer Journeys</Box>
            </Typography>

            <Typography>
              <Box sx={{ mb: 1 }}>Unique Value Proposition</Box>
            </Typography>

            <Typography>
              <Box sx={{ mb: 1 }}>Revenue Models</Box>
            </Typography>
            <Typography>
              <Box sx={{ mb: 1 }}>An Introduction to Pitching</Box>
            </Typography>
            <Typography>
              <Box sx={{ mb: 1 }}>
                Various thematic coaching sessions on Sprint Week modules
              </Box>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <Footer />
    </div>
  );
}
