export const USER_TYPES = {
  INTERMEDIARY: 'intermediary' as const,
  EMPLOYEE: 'employee' as const,
};

export const QUOTATION_STATUS = {
  PENDING: 'pending' as const,
  APPROVED: 'approved' as const,
  REJECTED: 'rejected' as const,
};

export const POLICY_STATUS = {
  ACTIVE: 'active' as const,
  PENDING: 'pending' as const,
  EXPIRED: 'expired' as const,
};

export const CLAIM_STATUS = {
  SUBMITTED: 'submitted' as const,
  PROCESSING: 'processing' as const,
  APPROVED: 'approved' as const,
  REJECTED: 'rejected' as const,
};

export const TASK_TYPES = {
  UNDERWRITING: 'underwriting' as const,
  FINANCE: 'finance' as const,
  QUOTATION: 'quotation' as const,
};

export const TASK_PRIORITIES = {
  HIGH: 'high' as const,
  MEDIUM: 'medium' as const,
  LOW: 'low' as const,
};

export const INSURANCE_PRODUCTS = [
  'Motor Insurance',
  'Home Insurance',
  'Life Insurance',
  'Health Insurance',
  'Travel Insurance',
  'Business Insurance',
];

export const NOTIFICATION_TYPES = {
  INFO: 'info' as const,
  WARNING: 'warning' as const,
  ERROR: 'error' as const,
  SUCCESS: 'success' as const,
};