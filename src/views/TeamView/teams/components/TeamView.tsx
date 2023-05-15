/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/function-component-definition */
import * as React from 'react';
import MUIDataTable from 'mui-datatables';
import { useQuery } from 'react-query';

import { useParams } from 'react-router-dom';
import axios from '../../../../clientProvider/baseConfig';
import Loading from '../../../../components/Loading';
import { Teams } from '../../../../types';

const getTeam = async (id: string | undefined): Promise<Teams> => {
  const { data: res } = await axios.get(`/Team/view_team/${id}`);
  return res.data.members;
};

const ListTeamMembers = () => {
  const Id = useParams();
  const { data, isLoading } = useQuery(['Team-members'], () => getTeam(Id?.id));

  if (isLoading) {
    return <Loading size={40} />;
  }

  const columns = [
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
      label: 'First Name',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'lastName',
      label: 'Last Name',
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
        sort: false,
        viewColumns: false
      }
    },
    {
      name: 'gender',
      label: 'Gender',
      options: {
        filter: true,
        sort: false,
        viewColumns: false
      }
    },
    {
      name: 'branch',
      label: 'Branch',
      options: {
        filter: true,
        sort: false,
        viewColumns: false
      }
    },
    {
      name: 'userType',
      label: 'Role',
      options: {
        filter: true,
        sort: false,
        viewColumns: false
      }
    }
  ];

  return (
    <div style={{ padding: 25 }}>
      <MUIDataTable
        options={{
          elevation: 0,
          enableNestedDataAccess: '.',
          responsive: 'simple',
          filterType: 'dropdown',
          filter: false,
          viewColumns: false,
          selectableRows: 'none',
          rowsPerPage: 20
        }}
        title="Team Members"
        columns={columns}
        data={data}
      />
    </div>
  );
};

export default ListTeamMembers;
