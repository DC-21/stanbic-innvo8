/* eslint-disable react/function-component-definition */
import { CardHeader, IconButton, Typography } from '@mui/material';
import MuiDialogTitle from '@mui/material/DialogTitle';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
}));

interface ModalTitleProps {
  subheader: string;
  handleClose?: () => void;
}

const ModalTitle: React.FC<React.PropsWithChildren<ModalTitleProps>> = (
  props
) => {
  const classes = useStyles();
  const { children, subheader, handleClose, ...other } = props;

  return (
    <MuiDialogTitle className={classes.root} {...other}>
      <CardHeader
        title={<Typography variant="h4">{children}</Typography>}
        subheader={subheader}
      />

      {handleClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

export default ModalTitle;
