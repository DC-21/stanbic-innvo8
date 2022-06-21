import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../redux/reducers/rootReducer';

interface Props {
  component: React.ElementType;
}
const ProtectedRoutes: FC<Props> = ({ component: Component }) => {
  const { user } = useSelector((store: RootState) => store.user);

  const isAuthenticated = user;

  if (isAuthenticated && user?.sysRole === 'Admin') {
    return <Component />;
  }
  if (isAuthenticated && user?.sysRole === 'Basic') {
    return <Component />;
  }
  return <Navigate to="/" />;
};

export default ProtectedRoutes;
