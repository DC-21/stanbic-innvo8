import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { axios } from '../../../../clientProvider';
import Loading from '../../../../components/Loading';
import { User } from '../../../../types';
import UserEdit from './UserEdit';

const getAdminById = async (userId: string | undefined): Promise<User> => {
  const { data } = await axios.get(`/Admin/view_admin/${userId}`);
  return data.data;
};

function UserEditView() {
  const params = useParams();
  console.log('userId', params);
  const { isLoading, data } = useQuery(['admin', params.id], () =>
    getAdminById(params.id)
  );

  if (isLoading) return <Loading size={40} />;
  if (!data) return null;
  return <UserEdit data={data} />;
}

export default UserEditView;
