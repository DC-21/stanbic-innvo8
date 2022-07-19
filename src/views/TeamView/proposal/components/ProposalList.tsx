/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/function-component-definition */
import * as React from 'react';
import MUIDataTable, { MUIDataTableColumn } from 'mui-datatables';
import { useQuery } from 'react-query';
import { Box, Button, Chip, Typography } from '@mui/material';

import { useLocation, useNavigate } from 'react-router-dom';
import { RemoveRedEye, AddCircleOutline } from '@mui/icons-material';
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

  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.user);

  const { data, isLoading } = useQuery(['submissions'], () =>
    getIdeasByTeamLead(user?._id)
  );
  console.log(data);
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
          const [userId] = tableMeta.rowData;
          return (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                navigate(`${location.pathname}/view/${userId}`);
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
  return (
    <>
      <Box sx={{ mt: 12 }}>
        <Typography sx={{ textTransform: 'uppercase' }} variant="h4">
          Innovation ideas(proprosal)
        </Typography>
        <Typography sx={{ fontSize: 20 }}>
          This is the place where you can add, view and edit your Innovation
          Ideas (proposal)
        </Typography>
      </Box>
      <Box sx={{ mt: 4, mb: 4 }} display="flex" justifyContent="flex-end">
        <Button
          startIcon={<AddCircleOutline />}
          color="primary"
          onClick={() => navigate(`/team/innovation-create`)}
          variant="contained"
        >
          Add New Idea
        </Button>
      </Box>
      <MUIDataTable
        options={{
          elevation: 0,
          enableNestedDataAccess: '.',
          responsive: 'simple',
          filterType: 'dropdown'
        }}
        title="Innovation Ideas (proposal)"
        columns={columns}
        data={isArray(data) ? data : [data]}
      />
    </>
  );
};

export default ProposalList;
