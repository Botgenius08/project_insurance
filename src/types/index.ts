export interface User {
  id: string;
  username: string;
  user_type: 'intermediary' | 'employee';
  permissions: string[];
}

export interface Quotation {
  id: string;
  client_name: string;
  client_email?: string;
  product: string;
  coverage?: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  created_by: string;
}

export interface Policy {
  id: string;
  policy_number: string;
  client_name: string;
  product: string;
  premium: number;
  sum_insured?: number;
  class_of_business?: string;
  status: 'active' | 'pending' | 'expired';
  created_at: string;
  created_by: string;
}

export interface Claim {
  id: string;
  claim_number: string;
  client_name: string;
  policy_number?: string;
  class_of_business?: string;
  gross_amount?: number;
  excess_amount?: number;
  salvage_amount?: number;
  other_expense?: number;
  net_amount: number;
  status: 'submitted' | 'processing' | 'approved' | 'rejected';
  created_at: string;
  created_by: string;
}

export interface Task {
  id: string;
  type: 'underwriting' | 'finance' | 'quotation';
  title: string;
  assigned_to: string;
  priority: 'high' | 'medium' | 'low';
  due_date: string;
  status: string;
  created_at: string;
  created_by: string;
}

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  user_id: string;
  read: boolean;
  created_at: string;
}

export interface StatsCardData {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  color: string;
}

export type UserType = 'intermediary' | 'employee';
export type TabType = 'dashboard' | 'quotations' | 'policies' | 'claims' | 'tasks' | 'approvals' | 'finance' | 'underwriting' | 'reinsurance' | 'actuarial';