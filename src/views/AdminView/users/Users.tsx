import React from 'react';
import { Outlet } from 'react-router-dom';

function Users() {
  return (
    <div style={{ padding: 10 }}>
      <Outlet />
    </div>
  );
}
export default Users;
