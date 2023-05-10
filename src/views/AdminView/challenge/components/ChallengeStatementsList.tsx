/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/function-component-definition */
import * as React from 'react';
import { Edit as EditIcon } from 'react-feather';
import MUIDataTable, { MUIDataTableColumn } from 'mui-datatables';
import { useQuery } from 'react-query';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import Toolbar from './Toolbar';
import {
  CustomModal,
  useModal,
  useModalWithData
} from '../../../../components/Modal';
import ChallengeStatementsForm from './ChallengeStatementsForm';
import axios from '../../../../clientProvider/baseConfig';
import Loading from '../../../../components/Loading';
import DeleteAdmin from '../DeleteChallengeStatement';

const getChallenges = async (): Promise<any[]> => {
  const { data } = await axios.get('/Challenge/view_challenges');
  return data.ChallengeStatements;
};

const ChallengeStatementsList: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const navigate = useNavigate();
  const { open, handleClose, handleClickOpen } = useModal();
  const { data, isLoading } = useQuery(['Challenge'], getChallenges);
  const { selected, setSelected } = useModalWithData();
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
      name: 'theme',
      label: 'Theme',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'problem',
      label: 'Problem',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'problemStatement',
      label: 'Problem Statement',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'challengeStatement',
      label: 'Challenge Statement',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (tableMeta) => {
          return `${tableMeta.slice(0, 50)}...`;
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
                onClick={() => navigate(`/app/challenges/edit/${userId}`)}
                size="large"
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
          return (
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
    }
  ];
  return (
    <>
      <Toolbar handleClickOpen={handleClickOpen} />

      <CustomModal
        title="Challenge Statement"
        subTitle="add a Challenge Statement"
        open={open}
        maxWidth="sm"
        handleClose={handleClose}
      >
        <ChallengeStatementsForm handleClose={handleClose} />
      </CustomModal>
      <CustomModal
        open={openModal}
        handleClose={handleCloseModal}
        title="Delete Challenge Statement"
      >
        {openModal ? (
          <DeleteAdmin selected={selected} handleClose={handleCloseModal} />
        ) : null}
      </CustomModal>

      <MUIDataTable
        options={{ elevation: 0, selectableRows: 'none' }}
        title="Challenge Statements"
        columns={columns}
        data={data || []}
      />
    </>
  );
};

export default ChallengeStatementsList;
