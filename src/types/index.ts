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
  sumInsured?: number;
  classOfBusiness?: string;
  leaderInsurer?: string;
  facultativeShare?: number;
  createdBy?: 'intermediary' | 'employee';
  createdDate?: string;
}

export interface Claim {
  id: number;
  claimNumber: string;
  clientName: string;
  amount: number;
  status: 'submitted' | 'processing' | 'approved' | 'rejected';
  date: string;
  policyNumber?: string;
  classOfBusiness?: string;
  grossAmount?: number;
  excessAmount?: number;
  salvageAmount?: number;
  otherExpense?: number;
  netAmount?: number;
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

export interface Reinsurer {
  id: number;
  code: string;
  name: string;
  country: string;
  rating: string;
}

export interface Broker {
  id: number;
  code: string;
  name: string;
  country: string;
}

export interface TreatyConfig {
  id: number;
  type: 'quota_share' | 'excess_of_loss' | 'surplus' | 'facultative_obligatory';
  name: string;
  classOfBusiness: string[];
  grossRetention: number;
  capacity: number;
  reinsurers: { reinsurerCode: string; share: number }[];
  brokerCode?: string;
  effectiveDate: string;
  expiryDate: string;
}

export interface ExcessOfLoss {
  id: number;
  name: string;
  netRetention: number;
  layers: { from: number; to: number; rate: number; reinstatements: number }[];
  annualAggregateLimit: number;
  classOfBusiness: string[];
}

export interface FacultativePolicy {
  id: number;
  policyNumber: string;
  insuredName: string;
  sumInsured: number;
  facultativeShare: number;
  reinsurers: { reinsurerCode: string; share: number }[];
  brokerCode?: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface IBNRCalculation {
  id: number;
  classOfBusiness: string;
  developmentFactor: number;
  ultimateLoss: number;
  paidLoss: number;
  ibnrReserve: number;
  calculationDate: string;
}

export interface UPRCalculation {
  id: number;
  policyNumber: string;
  premium: number;
  inceptionDate: string;
  expiryDate: string;
  uprAmount: number;
  calculationDate: string;
}

export interface IFRS17Data {
  id: number;
  contractGroup: string;
  measurementModel: 'PAA' | 'GMM';
  liabilityCoverage: number;
  liabilityRemaining: number;
  contractualServiceMargin: number;
  riskAdjustment: number;
  reportingDate: string;
}

export type UserType = 'intermediary' | 'employee';
export type TabType = 'dashboard' | 'quotations' | 'policies' | 'claims' | 'tasks' | 'approvals' | 'finance' | 'underwriting' | 'reinsurance' | 'actuarial';