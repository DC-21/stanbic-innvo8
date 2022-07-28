/* eslint-disable react/function-component-definition */
import * as React from 'react';
import MUIDataTable from 'mui-datatables';
import { useQuery } from 'react-query';
import { Chip } from '@mui/material';
import axios from '../../../clientProvider/baseConfig';
import Loading from '../../../components/Loading';

const getSubmissions = async (): Promise<any[]> => {
  const { data } = await axios.get('/Innovation/view_innovations');
  return data.Innovations;
};

const AllSubmissions: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { data, isLoading } = useQuery(['submissions'], getSubmissions);

  if (isLoading) {
    return <Loading size={40} />;
  }

  return (
    <div>
      <MUIDataTable
        options={{
          elevation: 0,
          enableNestedDataAccess: '.',
          responsive: 'simple',
          filterType: 'dropdown',
          selectableRows: 'none'
        }}
        title="Application"
        columns={[
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
            name: 'category',
            label: 'Category',
            options: {
              filter: true,
              sort: false
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
            name: 'totalVotedJudges',
            label: 'Total Voted Judges',
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
              // eslint-disable-next-line react/no-unstable-nested-components
              customBodyRender: (value) => (
                <Chip label={value} color="primary" />
              )
            }
          }
        ]}
        data={data || []}
      />
    </div>
  );
};

export default AllSubmissions;
