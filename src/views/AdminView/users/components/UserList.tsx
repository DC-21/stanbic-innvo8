/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/function-component-definition */
import * as React from 'react';
import { Edit as EditIcon } from 'react-feather';
import MUIDataTable, { MUIDataTableColumn } from 'mui-datatables';
import { useQuery } from 'react-query';

import { Chip, IconButton, Tooltip } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import Toolbar from './Toolbar';
import { CustomModal, useModal } from '../../../../components/Modal';
import UserForm from './UserForm';
import axios from '../../../../clientProvider/baseConfig';
import Loading from '../../../../components/Loading';

const getUser = async (): Promise<any[]> => {
  const { data } = await axios.get('/dashboard/employee/list');
  return data.employees;
};

const UserList: React.FC<React.PropsWithChildren<unknown>> = () => {
  const navigate = useNavigate();
  const { open, handleClose, handleClickOpen } = useModal();
  const { data, isLoading } = useQuery(['AgsUser'], getUser);

  if (isLoading) {
    return <Loading size={40} />;
  }

  const columns: MUIDataTableColumn[] = [
    {
      name: '_id',
      label: 'ID',
      options: {
        filter: false,
        display: 'false'
      }
    },
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
    },
    {
      name: '',
      label: '',
      options: {
        filter: true,
        viewColumns: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const [userId] = tableMeta.rowData;

          return (
            <Tooltip title="Edit">
              <IconButton
                onClick={() => navigate(`/app/customers/edit/${userId}`)}
                size="large"
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          );
        }
      }
    }
  ];
  return (
    <>
      <Toolbar handleClickOpen={handleClickOpen} />

      <CustomModal
        title="ADD AGS USER"
        subTitle="Add a new user to the dashboard"
        open={open}
        maxWidth="sm"
        handleClose={handleClose}
      >
        <UserForm handleClose={handleClose} />
      </CustomModal>

      <MUIDataTable
        options={{ elevation: 0 }}
        title="AGS users"
        columns={columns}
        data={data || []}
      />
    </>
  );
};

export default UserList;
