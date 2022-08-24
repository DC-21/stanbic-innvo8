/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/function-component-definition */
import * as React from 'react';
import { Edit as EditIcon } from 'react-feather';
import MUIDataTable, { MUIDataTableColumn } from 'mui-datatables';
import { useQuery } from 'react-query';
import { Button, Chip, IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import Toolbar from './Toolbar';
import {
  CustomModal,
  useModal,
  useModalWithData
} from '../../../../../components/Modal';
import TeamMemberForm from './TeamMemberForm';
import axios from '../../../../../clientProvider/baseConfig';
import Loading from '../../../../../components/Loading';
import DeleteUser from '../../DeleteUser';

const UserList = () => {
  const navigate = useNavigate();
  const { open, handleClose } = useModal();
  const { selected, setSelected } = useModalWithData();
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const getUser = async (): Promise<any[]> => {
    const { data } = await axios.get('/User/view_users');
    return data.Users;
  };

  const { data, isLoading } = useQuery(['TeamMembers'], getUser);

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
      name: 'branch',
      label: 'Branch',
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
                onClick={() =>
                  navigate(`/app/users/team_member/edit/${userId}`)
                }
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
      {/* <Toolbar handleClickOpen={handleClickOpen} /> */}

      <CustomModal
        title="ADD USER"
        subTitle="Add a new user to the dashboard"
        open={open}
        maxWidth="sm"
        handleClose={handleClose}
      >
        <TeamMemberForm handleClose={handleClose} />
      </CustomModal>
      <CustomModal
        open={openModal}
        handleClose={handleCloseModal}
        title="Delete user"
      >
        {openModal ? (
          <DeleteUser selected={selected} handleClose={handleCloseModal} />
        ) : null}
      </CustomModal>

      <MUIDataTable
        options={{
          elevation: 0,
          enableNestedDataAccess: '.',
          responsive: 'simple',
          filterType: 'dropdown',
          selectableRows: 'none'
        }}
        title="users"
        columns={columns}
        data={data || []}
      />
    </>
  );
};

export default UserList;
