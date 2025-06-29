export interface User {
  id: string;
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
  // Motor Insurance specific fields
  coverageType?: string;
  vehicleValue?: string;
  vehicleUsage?: string;
  excessBuyBack?: boolean;
  truck?: boolean;
  trailer?: boolean;
  numberOfSeats?: string;
  passengerServiceType?: string;
  // Property Insurance specific fields
  propertyType?: string;
  propertyValue?: string;
  propertyLocation?: string;
  // Additional details
  coverageDetails?: string;
  requestNumber?: string;
  intermediary?: string;
  priority?: 'high' | 'medium' | 'low';
}

export interface Policy {
  id: number;
  policyNumber: string;
  clientName: string;
  product: string;
  premium: number;
  sumInsured?: number;
  classOfBusiness?: string;
  status: 'active' | 'pending' | 'expired';
  createdBy: string;
  createdDate: string;
}

export interface Claim {
  id: number;
  claimNumber: string;
  clientName: string;
  policyNumber?: string;
  classOfBusiness?: string;
  grossAmount?: number;
  excessAmount?: number;
  salvageAmount?: number;
  otherExpense?: number;
  netAmount?: number;
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
  status: string;
}

export interface Notification {
  id: number;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  time: string;
}

export interface Message {
  id: number;
  quotationId: number;
  senderId: string;
  senderName: string;
  senderType: 'intermediary' | 'employee';
  message: string;
  timestamp: string;
  attachments?: Attachment[];
}

export interface Attachment {
  id: number;
  name: string;
  type: string;
  url: string;
}

export interface StatsCardData {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  color: string;
}

export type UserType = 'intermediary' | 'employee';
export type TabType = 'dashboard' | 'quotations' | 'policies' | 'claims' | 'tasks' | 'approvals' | 'finance' | 'underwriting' | 'reinsurance' | 'actuarial';