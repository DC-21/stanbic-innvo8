/* eslint-disable no-unused-vars */
import React from 'react';
import { Typography, Button, Theme } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Warning } from '@mui/icons-material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: 160,
    textAlign: 'center'
  },
  button: {
    marginTop: 12
  },
  errorIcon: {
    color: 'red',
    fontSize: 80
  }
}));

function AsyncErrorFallBack({ error }) {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <div className={classes.root}>
      <Warning className={classes.errorIcon} />
      <Typography variant="h4">Something went wrong</Typography>
      <br />
      <Typography variant="h6">
        There was a problem, please try again later.
      </Typography>
      <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
      <Button
        className={classes.button}
        startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
        color="secondary"
        variant="contained"
        onClick={() => {
          navigate('/app/dashboard');
        }}
      >
        go back home
      </Button>
    </div>
  );
}

export default AsyncErrorFallBack;
