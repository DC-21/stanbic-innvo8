import React from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { axios } from '../../../clientProvider';
import Loading from '../../../components/Loading';
import { RootState } from '../../../redux/reducers/rootReducer';
import { User } from '../../../types';
import ProfileDetails from './ProfileDetails';

function Profile() {
  const { user } = useSelector((store: RootState) => store.user);
  const id = user?._id;
  const getAdminById = async (): Promise<User> => {
    const { data } = await axios.get(`/User/view_user/${id}`);
    return data.data;
  };
  const { isLoading, data } = useQuery(['Teams', id], () => getAdminById());

  if (isLoading) return <Loading size={40} />;
  if (!data) return null;
  return <ProfileDetails data={data} />;
}

export default Profile;
