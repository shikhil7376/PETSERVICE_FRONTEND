import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../Redux/Store';

const ProtectedRoute = () => {
  const userData = useSelector((state: RootState) => state.user.userdata);

  if (!userData) {
    return <Navigate to="/" state={{ showToast: true }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
