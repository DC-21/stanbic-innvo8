/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/function-component-definition */
import * as React from 'react';
import { Edit as EditIcon } from 'react-feather';
import MUIDataTable, { MUIDataTableColumn } from 'mui-datatables';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { Button, IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import axios from '../../../../clientProvider/baseConfig';
import Loading from '../../../../components/Loading';
import { RootState } from '../../../../redux/reducers/rootReducer';
import { CustomModal, useModalWithData } from '../../../../components/Modal';
import AddTeamMember from './AddTeamMember';

const getUser = async (id: string | undefined): Promise<any[]> => {
  const { data } = await axios.get(`/Team/view_team_by_lead/${id}`);
  return data.data;
};

const ListTeamMembers = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  const { open, handleClickOpen, handleClose, selected, setSelected } =
    useModalWithData();
  const { data, isLoading } = useQuery(['Teams'], () => getUser(user?._id));
  console.log(data, 'data');
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
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'description',
      label: 'Description',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'leadId.firstName',
      label: 'Lead First Name',
      options: {
        filter: true,
        sort: false,
        viewColumns: false
      }
    },
    {
      name: 'leadId.lastName',
      label: 'Lead Last Name',
      options: {
        filter: true,
        sort: false,
        viewColumns: false
      }
    },
    {
      name: 'createdAt',
      label: 'Created At',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => moment(new Date(value)).format('L')
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
            <Button
              color="primary"
              onClick={() => {
                setSelected(userId);
                handleClickOpen();
              }}
              variant="contained"
              size="small"
            >
              add members
            </Button>
          );
        }
      }
    },
    {
      name: '',
      label: '',
      options: {
        filter: true,
        viewColumns: false,
        sort: false,
        customBodyRender: () => {
          return (
            <Button disabled size="small" color="primary" variant="contained">
              View
            </Button>
          );
        }
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
                onClick={() => navigate(`/app/teams/edit/${userId}`)}
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
      {selected && (
        <CustomModal
          title="Team"
          subTitle="Add team members to team"
          open={open}
          handleClose={handleClose}
        >
          <AddTeamMember handleClose={handleClose} leadId={selected} />
        </CustomModal>
      )}
      <MUIDataTable
        options={{
          elevation: 0,
          enableNestedDataAccess: '.',
          responsive: 'simple',
          filterType: 'dropdown'
        }}
        title="Team Members"
        columns={columns}
        data={data || []}
      />
    </>
  );
};

export default ListTeamMembers;
