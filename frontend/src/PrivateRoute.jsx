import React from 'react';
import { useNavigate, Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoute({ component: Component }) {
  const { userInfo } = useSelector(state => state.auth);
  return userInfo ? <Component /> : <Navigate to='/sign-in' replace />;
}
