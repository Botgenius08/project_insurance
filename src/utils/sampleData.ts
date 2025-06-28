import { Quotation, Policy, Claim, Task, Notification } from '../types';

export const sampleQuotations: Quotation[] = [
  { 
    id: 1, 
    clientName: 'John Doe', 
    clientEmail: 'john.doe@example.com',
    product: 'Motor Insurance', 
    coverage: 'comprehensive',
    amount: 2880000, 
    status: 'pending', 
    date: '2025-01-20' 
  },
  { 
    id: 2, 
    clientName: 'Jane Smith', 
    clientEmail: 'jane.smith@example.com',
    product: 'Property & Fire Insurance', 
    coverage: 'comprehensive',
    amount: 1920000, 
    status: 'approved', 
    date: '2025-01-22' 
  },
  { 
    id: 3, 
    clientName: 'Robert Johnson', 
    clientEmail: 'robert.johnson@example.com',
    product: 'Life Insurance', 
    coverage: 'term',
    amount: 5760000, 
    status: 'pending', 
    date: '2025-01-23' 
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