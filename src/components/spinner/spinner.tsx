import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

export default function Spinner() {
  return (
    <CircularProgress
      disableShrink
      size={100}
      style={{
        position: 'absolute',
        left: '40%',
        top: '50%'
      }}
    />
  );
}
