import { Chip } from '@mui/material';
import { MUIDataTableColumn } from 'mui-datatables';
import React from 'react';

const columns: MUIDataTableColumn[] = [
  {
    name: 'firstname',
    label: 'First name',
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: 'lastname',
    label: 'Last name',
    options: {
      filter: true,
      sort: false
    }
  },
  {
    name: 'email',
    label: 'Email',
    options: {
      filter: true,
      sort: false
    }
  },
  {
    name: 'phone',
    label: 'Phone',
    options: {
      filter: true,
      sort: false
    }
  },
  {
    name: 'department',
    label: 'Role',
    options: {
      filter: true,
      sort: false,
      customBodyRender: (value) => <Chip label={value} />
    }
  }
];
export default columns;
