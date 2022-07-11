/* eslint-disable react/function-component-definition */
/* eslint-disable no-use-before-define */
import React from 'react';
import clsx from 'clsx';
import { Box, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { AddCircleOutline } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  root: { marginTop: 22, marginBottom: 22 },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

interface ToolbarProps {
  className?: string;
  handleClickOpen: () => void;
}

const Toolbar = ({ className, handleClickOpen, ...rest }: ToolbarProps) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          startIcon={<AddCircleOutline />}
          onClick={handleClickOpen}
          color="primary"
          variant="contained"
        >
          Team
        </Button>
      </Box>
    </div>
  );
};

export default Toolbar;
