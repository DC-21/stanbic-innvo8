/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/function-component-definition */
import * as React from 'react';
import MUIDataTable, { MUIDataTableColumn } from 'mui-datatables';
import { useQuery } from 'react-query';
import { Button, Chip, Card, Typography, CardContent } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { RemoveRedEye } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { isArray } from 'lodash';
import { axios } from '../../../../clientProvider';
import Loading from '../../../../components/Loading';
import { RootState } from '../../../../redux/reducers/rootReducer';

const getIdeasByTeamLead = async (
  id: string | undefined
): Promise<Record<any, any>> => {
  const { data } = await axios.get(`/Innovation/view_innovation_lead/${id}`);
  return data.data;
};

const ProposalList: React.FC<React.PropsWithChildren<unknown>> = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.user);

  const { data, error, isLoading } = useQuery(['submissions'], () =>
    getIdeasByTeamLead(user?._id)
  );

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
      name: 'status',
      label: 'Status',
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
          const [id] = tableMeta.rowData;
          return (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                navigate('/team/innovation-view', { state: { id } });
              }}
              size="small"
              startIcon={<RemoveRedEye />}
            >
              view
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
          const [innovationId] = tableMeta.rowData;
          return (
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                navigate('/team/innovation-edit', {
                  state: { id: innovationId }
                })
              }
              size="small"
              startIcon={<RemoveRedEye />}
            >
              edit
            </Button>
          );
        }
      }
    }
  ];

  // @ts-ignore
  if (error?.response.status === 404) {
    return (
      <Card>
        <CardContent>
          <Typography>No Innovation idea Found</Typography>
          <Typography>
            To submit your Innovation idea click on add new idea button
          </Typography>
        </CardContent>
      </Card>
    );
  }
  return (
    <MUIDataTable
      options={{
        elevation: 0,
        enableNestedDataAccess: '.',
        responsive: 'simple',
        filterType: 'dropdown',
        selectableRows: 'none'
      }}
      title="Innovation Ideas (proposal)"
      columns={columns}
      data={isArray(data) ? data : [data]}
    />
  );
};

export default ProposalList;
