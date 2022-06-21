import React from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
// import Pusher from 'pusher-js';
import { useNotify } from '../../redux/actions/notifications/notificationActions';
import { logOut } from '../../redux/actions/userActions/userActions';

function Logout() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const notification = useNotify();

  dispatch(logOut());
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  setTimeout(() => window.location.reload(), 1);
  dispatch(
    notification({
      message: 'You have been logged out, please login',
      options: { variant: 'warning' }
    })
  );

  return (
    <div>
      <Navigate to="/" />
    </div>
  );
}
export default Logout;
