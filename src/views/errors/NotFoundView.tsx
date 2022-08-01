/* eslint-disable no-use-before-define */
/* eslint-disable import/extensions */
import { Box, Container, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import * as React from 'react';
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
            404: Page Not Found
          </Typography>
          <Box textAlign="center">
            <img
              alt="Under development"
              className={classes.image}
              src="/images/undraw_page_not_found_re_e9o6.png"
            />
          </Box>
        </Container>
      </Box>
    </Page>
  );
}

export default NotFoundView;
