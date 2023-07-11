/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/function-component-definition */
import * as React from 'react';
import MUIDataTable from 'mui-datatables';
import { useQuery } from 'react-query';
import { Button, Chip, Card, Typography, CardContent } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { axios } from '../../../../clientProvider';
import Loading from '../../../../components/Loading';
import Page from '../../../../components/Page';

const getIdeasByTeamLead = async (
  id: string | undefined
): Promise<Record<any, any>> => {
  const { data: response } = await axios.get(
    `/Innovation/view_innovation_team/${id}`
  );
  return response.data;
};

const TeamProposalList: React.FC<React.PropsWithChildren<unknown>> = () => {
  const navigate = useNavigate();
  const { id: Id } = useParams();
  const { data, error, isLoading } = useQuery(['Team-proposal'], () =>
    getIdeasByTeamLead(Id)
  );

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
      name: 'title',
      label: 'Title',
      options: {
        filter: true,
        sort: true
      }
    },
    // {
    //   name: 'challengeStatementId.challengeStatement',
    //   label: 'Category',
    //   options: {
    //     filter: true,
    //     sort: false,
    //     customBodyRender: (tableMeta) => {
    //       return `${tableMeta.slice(0, 50)}...`;
    //     }
    //   }
    // },
    // {
    //   name: 'teamId.name',
    //   label: 'Team',
    //   options: {
    //     filter: true,
    //     sort: false,
    //     viewColumns: false
    //   }
    // },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          let chipColor = '';
          let chipTextColor = '';
          if (value === 'Accepted') {
            chipColor = 'green';
            chipTextColor = 'white';
          } else if (value === 'Reviewed') {
            chipColor = '#0133a1';
            chipTextColor = 'white';
          } else if (value === 'Waiting') {
            chipColor = 'orange';
          }
          return (
            <Chip
              label={value}
              style={{ backgroundColor: chipColor, color: chipTextColor }}
            />
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
          const [id] = tableMeta.rowData;
          return (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                navigate('/team/team-innovation-view', { state: { id } });
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
    <Page title="Innovation">
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
        title="Innovation Ideas"
        columns={columns}
        data={data}
      />
    </Page>
  );
};

export default TeamProposalList;
