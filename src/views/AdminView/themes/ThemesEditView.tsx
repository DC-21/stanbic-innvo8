import { Grid } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { axios } from '../../../clientProvider';
import Loading from '../../../components/Loading';
import ThemeEdit from './ThemeEdit';
// import TeamMemberList from './TeamMember/TeamMemberList';

export interface Themes {
  _id?: string;
  name: string;
  description: string;
}

const getThemeById = async (userId: string | undefined): Promise<Themes> => {
  const { data } = await axios.get(`/Theme/view_theme/${userId}`);
  return data.data;
};

function ThemesEditView() {
  const params = useParams();
  const { isLoading, data } = useQuery(['Themes', params.id], () =>
    getThemeById(params.id)
  );
  if (isLoading) return <Loading size={40} />;
  if (!data) return null;
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ThemeEdit data={data} />{' '}
        </Grid>
      </Grid>
    </div>
  );
}
export default ThemesEditView;
