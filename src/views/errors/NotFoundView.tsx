/* eslint-disable no-use-before-define */
/* eslint-disable import/extensions */
import { Box, Button, Container, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Page from '../../components/Page';

const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  }
}));

function NotFoundView() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Page title="404">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <Typography align="center" color="textPrimary" variant="h1">
            404: The page you are looking for isn’t here
          </Typography>
          <Button
            variant="text"
            onClick={() => navigate('/')}
            sx={{ color: 'red', marginLeft: '200px' }}
          >
            <h2>Click Here to go back to login</h2>
          </Button>
          <Box textAlign="center">
            <img
              alt="Under development"
              className={classes.image}
              src="/images/undraw_page_not_found_re_e9o6.svg"
            />
          </Box>
        </Container>
      </Box>
    </Page>
  );
}

export default NotFoundView;
