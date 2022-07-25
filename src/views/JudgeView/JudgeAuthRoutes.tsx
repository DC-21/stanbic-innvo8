/* eslint-disable react/function-component-definition */
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../redux/reducers/rootReducer';

interface Props {
  component: React.ElementType;
}
const JudgeAuthRoutes: FC<Props> = ({ component: Component }) => {
  const { user } = useSelector((store: RootState) => store.user);
  const isAuthenticated = user;

  if (isAuthenticated && user?.userType === 'Judge') {
    return <Component />;
  }
  return <Navigate to="/logout" />;
};

export default JudgeAuthRoutes;
