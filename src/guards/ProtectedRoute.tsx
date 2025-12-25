import React, { useEffect } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { useAppSelector, useAppDispatch } from '@/api/hooks';
import { Navigate, Outlet } from 'react-router-dom';
import { getCurrentUser } from '@/api/slices/authSlice';

type ProtectedRouteProps = {
  allowedRoles?: string[];
  redirectTo?: string;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectTo = '/login',
  allowedRoles = [],
}) => {
  const dispatch = useAppDispatch();
  const { user, accessToken, loading } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (accessToken && !user && !loading) {
      dispatch(getCurrentUser());
    }
  }, [accessToken, user, loading, dispatch]);

  if (loading) {
    return <Spinner />;
  }

  if (!user || !accessToken) {
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
