/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/function-component-definition */
import * as React from 'react';
import MUIDataTable from 'mui-datatables';
import { Edit as EditIcon } from 'react-feather';
import { useQuery } from 'react-query';
import {
  Button,
  Chip,
  Card,
  Typography,
  CardContent,
  IconButton,
  Tooltip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { CustomModal, useModalWithData } from '../../../../components/Modal';
import { axios } from '../../../../clientProvider';
import Loading from '../../../../components/Loading';
import { RootState } from '../../../../redux/reducers/rootReducer';
import DeleteProposal from './DeleteProposal';

const getIdeasByTeamLead = async (
  id: string | undefined
): Promise<Record<any, any>> => {
  const { data: response } = await axios.get(
    `/Innovation/view_innovation_user/${id}`
  );
  return response.data;
};

const ProposalList: React.FC<React.PropsWithChildren<unknown>> = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.user);
  const { selected, setSelected } = useModalWithData();
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const { data, error, isLoading } = useQuery(['submissions'], () =>
    getIdeasByTeamLead(user?._id)
  );
  console.log(user?._id);

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
          const [innovationId] = tableMeta.rowData;
          return (
            <Tooltip title="Edit" placement="top">
              <IconButton
                onClick={() =>
                  navigate('/team/innovation-edit', {
                    state: { id: innovationId }
                  })
                }
                size="small"
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
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
          return user?.userType === 'Team Member' ? null : (
            <IconButton
              onClick={() => {
                setSelected(id);
                handleClickOpenModal();
              }}
              size="small"
              style={{
                boxShadow: '1px 1px',
                color: '#fff',
                backgroundColor: 'red'
              }}
            >
              <DeleteIcon />
            </IconButton>
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
                navigate('/team/innovation-view', { state: { id } });
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
    <>
      <CustomModal
        open={openModal}
        handleClose={handleCloseModal}
        title="Delete Innovation Idea"
      >
        {openModal ? (
          <DeleteProposal selected={selected} handleClose={handleCloseModal} />
        ) : null}
      </CustomModal>
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
        title="Innovation Ideas (proposal)"
        columns={columns}
        data={data}
      />
    </>
  );
};

export default ProposalList;
