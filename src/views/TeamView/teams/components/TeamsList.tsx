/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/function-component-definition */
import * as React from 'react';
import { Edit as EditIcon } from 'react-feather';
import MUIDataTable, { MUIDataTableColumn } from 'mui-datatables';
import { useQuery } from 'react-query';
import { IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import axios from '../../../../clientProvider/baseConfig';
import Loading from '../../../../components/Loading';

const getUser = async (): Promise<any[]> => {
  const { data } = await axios.get('/Team/view_teams');
  return data.Teams;
};

const ListTeamMembers = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(['Teams'], getUser);

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
          console.log(userId);

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
  );
};

export default ListTeamMembers;
