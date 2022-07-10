/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/function-component-definition */
import * as React from 'react';
import { Edit as EditIcon } from 'react-feather';
import MUIDataTable, { MUIDataTableColumn } from 'mui-datatables';
import { useQuery } from 'react-query';
import { Chip, IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import Toolbar from './Toolbar';
import { CustomModal, useModal } from '../../../../../components/Modal';
import TeamMemberForm from './TeamMemberForm';
import axios from '../../../../../clientProvider/baseConfig';
import Loading from '../../../../../components/Loading';

const UserList = () => {
  const navigate = useNavigate();
  const { open, handleClose } = useModal();

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
          <Chip
            sx={{ backgroundColor: '#0133a1', color: '#fff' }}
            label={value}
          />
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
          console.log(userId);

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

      <MUIDataTable
        options={{
          elevation: 0,
          enableNestedDataAccess: '.',
          responsive: 'simple',
          filterType: 'dropdown'
        }}
        title="users"
        columns={columns}
        data={data || []}
      />
    </>
  );
};

export default UserList;
