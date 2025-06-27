export interface User {
  id: number;
  name: string;
  type: 'intermediary' | 'employee';
  permissions: string[];
}

export interface Quotation {
  id: number;
  clientName: string;
  clientEmail?: string;
  product: string;
  coverage?: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

export interface Policy {
  id: number;
  policyNumber: string;
  clientName: string;
  product: string;
  premium: number;
  status: 'active' | 'pending' | 'expired';
}

export interface Claim {
  id: number;
  claimNumber: string;
  clientName: string;
  amount: number;
  status: 'submitted' | 'processing' | 'approved' | 'rejected';
  date: string;
}

export interface Task {
  id: number;
  type: 'underwriting' | 'finance' | 'quotation';
  title: string;
  assignedTo: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  status?: string;
}

export interface Notification {
  id: number;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  time: string;
}

export interface StatsCardData {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  color: string;
}

export type UserType = 'intermediary' | 'employee';
export type TabType = 'dashboard' | 'quotations' | 'policies' | 'claims' | 'tasks' | 'approvals';