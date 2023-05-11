/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/function-component-definition */
import * as React from 'react';
import MUIDataTable, { MUIDataTableColumn } from 'mui-datatables';
import { useQuery } from 'react-query';
import { Button, Chip } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../../clientProvider/baseConfig';
import Loading from '../../../components/Loading';

const getUser = async (): Promise<any[]> => {
  const { data } = await axios.get('/Innovation/view_accepted_innovations');
  return data.Innovations;
};

const AcceptedApplications: React.FC<React.PropsWithChildren<unknown>> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading } = useQuery(['AcceptedSubmissions'], getUser);

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
      name: 'title',
      label: 'Title',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'challengeStatementId.challengeStatement',
      label: 'Category',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (tableMeta) => {
          return `${tableMeta.slice(0, 50)}...`;
        }
      }
    },
    {
      name: 'teamId.name',
      label: 'Team',
      options: {
        filter: true,
        sort: false,
        viewColumns: false
      }
    },
    {
      name: 'totalVotes',
      label: 'Total Votes',
      options: {
        filter: true,
        sort: false,
        viewColumns: false
      }
    },
    {
      name: 'status',
      label: 'Status',
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
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                navigate(`${location.pathname}/view/${userId}`);
              }}
              size="small"
            >
              view
            </Button>
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
        filterType: 'dropdown',
        selectableRows: 'none'
      }}
      title="Applications"
      columns={columns}
      data={data || []}
    />
  );
};

export default AcceptedApplications;
