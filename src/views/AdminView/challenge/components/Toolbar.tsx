/* eslint-disable react/function-component-definition */
/* eslint-disable no-use-before-define */
import React, { FC } from 'react';
import clsx from 'clsx';
import { Box, Button, Tooltip } from '@mui/material';
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

const Toolbar: FC<React.PropsWithChildren<ToolbarProps>> = ({
  className,
  handleClickOpen,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <Tooltip title="Add a judge" placement="top-start">
          <Button
            startIcon={<AddCircleOutline />}
            onClick={handleClickOpen}
            color="primary"
            variant="contained"
            size="large"
          >
            Challenge Statement
          </Button>
        </Tooltip>
      </Box>
    </div>
  );
};

export default Toolbar;
