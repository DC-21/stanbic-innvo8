/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/function-component-definition */
import * as React from 'react';
import { Edit as EditIcon } from 'react-feather';
import MUIDataTable, { MUIDataTableColumn } from 'mui-datatables';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { Button, IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AddCircleOutline } from '@mui/icons-material';
import axios from '../../../clientProvider/baseConfig';
import Loading from '../../../components/Loading';
import { RootState } from '../../../redux/reducers/rootReducer';
import { CustomModal, useModalWithData } from '../../../components/Modal';
import DeleteTeam from './DeleteTeam';
import Page from '../../../components/Page';
import ChallengeStatementForm from '../challenge/components/ChallengeStatementsForm';

const getThemes = async (): Promise<any[]> => {
  const { data: res } = await axios.get('/Theme/view_themes');
  return res.Themes;
};

const ThemesList = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  const { open, handleClickOpen, handleClose, selected, setSelected } =
    useModalWithData();
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const { data, isLoading } = useQuery(['Themes'], () => getThemes());

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
      name: '',
      label: '',
      options: {
        filter: true,
        viewColumns: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const [userId] = tableMeta.rowData;

          return user?.userType === 'User' ? null : (
            <Button
              color="primary"
              onClick={() => {
                setSelected(userId);
                handleClickOpen();
              }}
              variant="outlined"
              size="small"
              startIcon={<AddCircleOutline />}
            >
              Challenge
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
          const [userId] = tableMeta.rowData;

          return (
            <Tooltip title="Edit">
              <IconButton
                onClick={() => navigate(`/app/themes/edit/${userId}`)}
                size="large"
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          );
        }
      }
    },
    // {
    //   name: '',
    //   label: '',
    //   options: {
    //     filter: true,
    //     sort: false,
    //     customBodyRender: (value, tableMeta) => {
    //       const [id] = tableMeta.rowData;
    //       return user?.userType === 'Team Member' ? null : (
    //         <IconButton
    //           onClick={() => {
    //             setSelected(id);
    //             handleClickOpenModal();
    //           }}
    //           size="small"
    //           style={{
    //             boxShadow: '1px 1px',
    //             color: '#fff',
    //             backgroundColor: 'red'
    //           }}
    //         >
    //           <DeleteIcon />
    //         </IconButton>
    //       );
    //     }
    //   }
    // },
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
              onClick={() =>
                navigate(`/app/themes/view/${id}`, { state: { id } })
              }
              size="small"
              color="primary"
              variant="contained"
            >
              View
            </Button>
          );
        }
      }
    }
  ];

  return (
    <Page title="Themes">
      {selected && (
        <CustomModal
          title="Challenge Statement"
          subTitle="Add Challenge"
          open={open}
          handleClose={handleClose}
        >
          <ChallengeStatementForm
            handleClose={handleClose}
            themeId={selected}
          />
        </CustomModal>
      )}
      <CustomModal
        open={openModal}
        handleClose={handleCloseModal}
        title="Delete Team"
      >
        {openModal ? (
          <DeleteTeam selected={selected} handleClose={handleCloseModal} />
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
        title="Themes"
        columns={columns}
        data={data}
      />
    </Page>
  );
};

export default ThemesList;
