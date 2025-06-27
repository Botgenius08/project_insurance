import { User, UserType } from '../types';

export const PERMISSIONS = {
  // Intermediary permissions
  VIEW_QUOTATIONS: 'view_quotations',
  CREATE_QUOTATIONS: 'create_quotations',
  MANAGE_QUOTATIONS: 'manage_quotations',
  VIEW_POLICIES: 'view_policies',
  MANAGE_POLICIES: 'manage_policies',
  VIEW_CLAIMS: 'view_claims',
  LODGE_CLAIMS: 'lodge_claims',
  
  // Employee permissions
  VIEW_TASKS: 'view_tasks',
  MANAGE_TASKS: 'manage_tasks',
  VIEW_APPROVALS: 'view_approvals',
  PROCESS_APPROVALS: 'process_approvals',
  UNDERWRITING: 'underwriting',
  FINANCE_OPERATIONS: 'finance_operations',
} as const;

export const ROLE_PERMISSIONS: Record<UserType, string[]> = {
  intermediary: [
    PERMISSIONS.VIEW_QUOTATIONS,
    PERMISSIONS.CREATE_QUOTATIONS,
    PERMISSIONS.MANAGE_QUOTATIONS,
    PERMISSIONS.VIEW_POLICIES,
    PERMISSIONS.MANAGE_POLICIES,
    PERMISSIONS.VIEW_CLAIMS,
    PERMISSIONS.LODGE_CLAIMS,
  ],
  employee: [
    PERMISSIONS.VIEW_TASKS,
    PERMISSIONS.MANAGE_TASKS,
    PERMISSIONS.VIEW_APPROVALS,
    PERMISSIONS.PROCESS_APPROVALS,
    PERMISSIONS.UNDERWRITING,
    PERMISSIONS.FINANCE_OPERATIONS,
  ],
};

export const getUserPermissions = (userType: UserType): string[] => {
  return ROLE_PERMISSIONS[userType] || [];
};

export const hasPermission = (user: User | null, permission: string): boolean => {
  if (!user) return false;
  return user.permissions.includes(permission);
};

export const canAccessModule = (user: User | null, module: string): boolean => {
  if (!user) return false;
  
  const modulePermissions: Record<string, string[]> = {
    quotations: [PERMISSIONS.VIEW_QUOTATIONS],
    policies: [PERMISSIONS.VIEW_POLICIES],
    claims: [PERMISSIONS.VIEW_CLAIMS],
    tasks: [PERMISSIONS.VIEW_TASKS],
    approvals: [PERMISSIONS.VIEW_APPROVALS],
  };
  
  const requiredPermissions = modulePermissions[module] || [];
  return requiredPermissions.some(permission => hasPermission(user, permission));
};