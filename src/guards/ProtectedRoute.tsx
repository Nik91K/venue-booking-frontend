import React from 'react';
import { Spinner } from '@/components/ui/spinner';
import { useAppSelector } from '@/api/hooks';
import { Navigate, Outlet } from 'react-router-dom';

type ProtectedRouteProps = {
  allowedRoles?: string[];
  redirectTo?: string;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectTo = '/login',
  allowedRoles = [],
}) => {
  const { user, accessToken, loading } = useAppSelector(state => state.auth);

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
