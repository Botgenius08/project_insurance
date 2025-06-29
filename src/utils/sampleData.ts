import { Quotation, Policy, Claim, Task, Notification, Message } from '../types';

export const sampleQuotations: Quotation[] = [
  { 
    id: 1, 
    clientName: 'John Doe', 
    clientEmail: 'john.doe@example.com',
    product: 'Motor Insurance', 
    coverage: 'comprehensive',
    amount: 2880000, 
    status: 'pending', 
    date: '2025-01-20',
    requestNumber: 'QR-2025-001',
    intermediary: 'ABC Insurance Brokers',
    priority: 'high',
    // Motor Insurance specific fields
    coverageType: 'comprehensive',
    vehicleValue: '50000000',
    vehicleUsage: 'privateCars',
    excessBuyBack: true,
    coverageDetails: 'Comprehensive motor insurance for private vehicle with excess buy-back option'
  },
  { 
    id: 2, 
    clientName: 'Jane Smith', 
    clientEmail: 'jane.smith@example.com',
    product: 'Property & Fire Insurance', 
    coverage: 'comprehensive',
    amount: 1920000, 
    status: 'approved', 
    date: '2025-01-22',
    requestNumber: 'QR-2025-002',
    intermediary: 'XYZ Brokers',
    priority: 'medium',
    // Property Insurance specific fields
    propertyType: 'commercial',
    propertyValue: '100000000',
    propertyLocation: 'Dar es Salaam CBD',
    coverageDetails: 'Commercial property insurance for office building in CBD area'
  },
  { 
    id: 3, 
    clientName: 'Robert Johnson', 
    clientEmail: 'robert.johnson@example.com',
    product: 'Life Insurance', 
    coverage: 'term',
    amount: 5760000, 
    status: 'pending', 
    date: '2025-01-23',
    requestNumber: 'QR-2025-003',
    intermediary: 'DEF Insurance Services',
    priority: 'low',
    coverageDetails: 'Term life insurance policy for 20 years coverage'
  }
];

export const samplePolicies: Policy[] = [
  { 
    id: 1, 
    policyNumber: 'POL-2025-0001', 
    clientName: 'Alice Johnson', 
    product: 'Motor Insurance', 
    premium: 2880000, 
    sumInsured: 50000000,
    classOfBusiness: 'Motor',
    status: 'active',
    createdBy: 'intermediary',
    createdDate: '2025-01-15'
  },
  { 
    id: 2, 
    policyNumber: 'POL-2025-0002', 
    clientName: 'Bob Wilson', 
    product: 'Property & Fire Insurance', 
    premium: 4320000, 
    sumInsured: 100000000,
    classOfBusiness: 'Property',
    status: 'active',
    createdBy: 'employee',
    createdDate: '2025-01-16'
  },
  { 
    id: 3, 
    policyNumber: 'POL-2025-0003', 
    clientName: 'Carol Davis', 
    product: 'Life Insurance', 
    premium: 5760000, 
    sumInsured: 200000000,
    classOfBusiness: 'Life',
    status: 'pending',
    createdBy: 'intermediary',
    createdDate: '2025-01-17'
  }
];

export const sampleClaims: Claim[] = [
  { 
    id: 1, 
    claimNumber: 'CLM-2025-0001', 
    clientName: 'Charlie Brown', 
    policyNumber: 'POL-2025-0001',
    classOfBusiness: 'Motor',
    grossAmount: 3000000,
    excessAmount: 100000,
    salvageAmount: 0,
    otherExpense: 50000,
    netAmount: 2950000,
    amount: 2950000, 
    status: 'submitted', 
    date: '2025-01-23' 
  },
  { 
    id: 2, 
    claimNumber: 'CLM-2025-0002', 
    clientName: 'Diana Prince', 
    policyNumber: 'POL-2025-0002',
    classOfBusiness: 'Property',
    grossAmount: 8000000,
    excessAmount: 200000,
    salvageAmount: 500000,
    otherExpense: 100000,
    netAmount: 7400000,
    amount: 7400000, 
    status: 'processing', 
    date: '2025-01-21' 
  },
  { 
    id: 3, 
    claimNumber: 'CLM-2025-0003', 
    clientName: 'Edward Norton', 
    policyNumber: 'POL-2025-0003',
    classOfBusiness: 'Life',
    grossAmount: 15000000,
    excessAmount: 0,
    salvageAmount: 0,
    otherExpense: 25000,
    netAmount: 15025000,
    amount: 15025000, 
    status: 'approved', 
    date: '2025-01-19' 
  }
];

export const sampleTasks: Task[] = [
  { 
    id: 1, 
    type: 'underwriting', 
    title: 'Review High-Value Policy Application', 
    assignedTo: 'Senior Underwriter', 
    priority: 'high', 
    dueDate: '2025-01-26',
    status: 'pending'
  },
  { 
    id: 2, 
    type: 'finance', 
    title: 'Verify Payment for Policy POL-2025-0002', 
    assignedTo: 'Finance Team', 
    priority: 'medium', 
    dueDate: '2025-01-27',
    status: 'pending'
  },
  { 
    id: 3, 
    type: 'quotation', 
    title: 'Complex Commercial Insurance Quote', 
    assignedTo: 'Marine Specialist', 
    priority: 'high', 
    dueDate: '2025-01-25',
    status: 'in_progress'
  },
  { 
    id: 4, 
    type: 'underwriting', 
    title: 'Process Facultative Reinsurance Application', 
    assignedTo: 'Reinsurance Manager', 
    priority: 'medium', 
    dueDate: '2025-01-28',
    status: 'pending'
  }
];

export const sampleNotifications: Notification[] = [
  { 
    id: 1, 
    message: 'New quotation request from intermediary John Doe', 
    type: 'info', 
    time: '10 minutes ago' 
  },
  { 
    id: 2, 
    message: 'Policy POL-2025-0001 requires payment approval', 
    type: 'warning', 
    time: '1 hour ago' 
  },
  { 
    id: 3, 
    message: 'Claim CLM-2025-0003 has been approved for payment', 
    type: 'success', 
    time: '2 hours ago' 
  },
  { 
    id: 4, 
    message: 'High-priority underwriting task assigned', 
    type: 'warning', 
    time: '3 hours ago' 
  },
  { 
    id: 5, 
    message: 'Monthly actuarial report is ready for review', 
    type: 'info', 
    time: '4 hours ago' 
  }
];

export const sampleMessages: Message[] = [
  {
    id: 1,
    quotationId: 1,
    senderId: 'intermediary1',
    senderName: 'ABC Insurance Brokers',
    senderType: 'intermediary',
    message: 'Hello, I have submitted a motor insurance quotation for John Doe. The client is looking for comprehensive coverage with excess buy-back option. Please review and provide your feedback.',
    timestamp: '2025-01-20T10:30:00Z'
  },
  {
    id: 2,
    quotationId: 1,
    senderId: 'underwriter1',
    senderName: 'Senior Underwriter',
    senderType: 'employee',
    message: 'Thank you for the submission. I have reviewed the quotation details. The vehicle value seems reasonable for a comprehensive policy. Could you please provide additional information about the vehicle\'s age and usage history?',
    timestamp: '2025-01-20T14:15:00Z'
  },
  {
    id: 3,
    quotationId: 1,
    senderId: 'intermediary1',
    senderName: 'ABC Insurance Brokers',
    senderType: 'intermediary',
    message: 'The vehicle is a 2022 Toyota Camry, primarily used for personal transportation. The client has a clean driving record with no claims in the past 5 years.',
    timestamp: '2025-01-20T15:45:00Z'
  }
];