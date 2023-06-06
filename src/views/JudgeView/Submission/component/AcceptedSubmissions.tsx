/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/function-component-definition */
import * as React from 'react';
import MUIDataTable from 'mui-datatables';
import { useQuery } from 'react-query';
import { Button, Chip, Container } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { RemoveRedEye } from '@mui/icons-material';
import axios from '../../../../clientProvider/baseConfig';
import Loading from '../../../../components/Loading';
import { CustomModal, useModalWithData } from '../../../../components/Modal';
import WaitingButton from '../actionButtons/WaitingButton';

const getSubmissions = async (): Promise<any[]> => {
  const { data } = await axios.get('/Innovation/view_accepted_innovations');
  return data.Innovations;
};

const AcceptedSubmissions: React.FC<React.PropsWithChildren<unknown>> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading } = useQuery(['AcceptedSubmissions'], getSubmissions);

  const { selected, setSelected, open, handleClose, handleClickOpen } =
    useModalWithData();
  if (isLoading) {
    return <Loading size={40} />;
  }

  return (
    <Container style={{ marginTop: 28 }}>
      <CustomModal
        open={open}
        handleClose={handleClose}
        title="Put submission on waiting list"
      >
        {open ? (
          <WaitingButton selected={selected} handleClose={handleClose} />
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
        title="Accepted submissions"
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
            name: 'totalVotedJudges',
            label: 'Total Voted Judges',
            options: {
              filter: true,
              sort: false,
              viewColumns: false
            }
          },
          {
            name: 'likes',
            label: 'Upvotes',
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
                <Chip
                  label={value}
                  sx={{ backgroundColor: 'green', color: 'white' }}
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
                return (
                  <Button
                    variant="outlined"
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
              sort: false,
              customBodyRender: (value, tableMeta) => {
                const [id] = tableMeta.rowData;
                return (
                  <Button
                    onClick={() => {
                      setSelected(id);
                      handleClickOpen();
                    }}
                    variant="contained"
                    size="small"
                    style={{ boxShadow: '1px 1px', color: 'primary.main' }}
                  >
                    Waiting
                  </Button>
                );
              }
            }
          }
        ]}
        data={data || []}
      />
    </Container>
  );
};

export default AcceptedSubmissions;
