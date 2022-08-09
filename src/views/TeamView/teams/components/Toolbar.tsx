/* eslint-disable react/function-component-definition */
/* eslint-disable no-use-before-define */
import React from 'react';
import clsx from 'clsx';
import { Box, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { AddCircleOutline } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reducers/rootReducer';

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
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box sx={{ mt: 6, mb: 6 }} display="flex" justifyContent="flex-end">
        {user?.userType !== 'Team Member' ? (
          <Button
            // disabled={user?.userType === 'Team Member'}
            startIcon={<AddCircleOutline />}
            onClick={handleClickOpen}
            color="primary"
            variant="contained"
          >
            Create New Team
          </Button>
        ) : (
          <div style={{ display: 'none' }} />
        )}
      </Box>
    </div>
  );
};

export default Toolbar;
