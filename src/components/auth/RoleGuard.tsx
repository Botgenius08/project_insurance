import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { hasPermission } from '../../utils/rolePermissions';

interface RoleGuardProps {
  children: React.ReactNode;
  permission?: string;
  userType?: 'intermediary' | 'employee';
  fallback?: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ 
  children, 
  permission, 
  userType, 
  fallback = null 
}) => {
  const { user } = useAuth();

  if (!user) {
    return <>{fallback}</>;
  }

  if (userType && user.type !== userType) {
    return <>{fallback}</>;
  }

  if (permission && !hasPermission(user, permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};