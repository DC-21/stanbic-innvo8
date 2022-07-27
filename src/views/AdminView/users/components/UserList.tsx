/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/function-component-definition */
import * as React from 'react';
import { Edit as EditIcon } from 'react-feather';
import MUIDataTable, { MUIDataTableColumn } from 'mui-datatables';
import { useQuery } from 'react-query';
import { Button, Chip, IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Toolbar from './Toolbar';
import {
  CustomModal,
  useModal,
  useModalWithData
} from '../../../../components/Modal';
import UserForm from './UserForm';
import axios from '../../../../clientProvider/baseConfig';
import Loading from '../../../../components/Loading';
import DeleteAdmin from '../DeleteAdmin';

const getUser = async (): Promise<any[]> => {
  const { data } = await axios.get('/Admin/view_admins');
  return data.admins;
};

const UserList: React.FC<React.PropsWithChildren<unknown>> = () => {
  const navigate = useNavigate();
  const { open, handleClose, handleClickOpen } = useModal();
  const { data, isLoading } = useQuery(['AdminUser'], getUser);
  const { selected, setSelected } = useModalWithData();
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
      name: 'firstName',
      label: 'First name',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'lastName',
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
      name: 'gender',
      label: 'Gender',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'userType',
      label: 'Role',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => (
          <Chip variant="outlined" color="primary" label={value} />
        )
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
                onClick={() => navigate(`/app/users/edit/${userId}`)}
                size="large"
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          );
        }
      }
    },
    {
      name: '',
      label: '',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const [id] = tableMeta.rowData;
          return (
            <Button
              onClick={() => {
                setSelected(id);
                handleClickOpenModal();
              }}
              variant="contained"
              size="small"
              style={{
                boxShadow: '1px 1px',
                color: '#fff',
                backgroundColor: 'red'
              }}
            >
              Delete
            </Button>
          );
        }
      }
    }
  ];
  return (
    <>
      <Toolbar handleClickOpen={handleClickOpen} />

      <CustomModal
        title="Add Admin/Judge"
        subTitle="Add a new Admin/Judge to the dashboard"
        open={open}
        maxWidth="sm"
        handleClose={handleClose}
      >
        <UserForm handleClose={handleClose} />
      </CustomModal>
      <CustomModal
        open={openModal}
        handleClose={handleCloseModal}
        title="Delete Admin/Judge"
      >
        {openModal ? (
          <DeleteAdmin selected={selected} handleClose={handleCloseModal} />
        ) : null}
      </CustomModal>

      <MUIDataTable
        options={{ elevation: 0, selectableRows: 'none' }}
        title="users"
        columns={columns}
        data={data || []}
      />
    </>
  );
};

export default UserList;
