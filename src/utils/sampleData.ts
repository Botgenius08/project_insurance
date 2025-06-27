import { Quotation, Policy, Claim, Task, Notification } from '../types';

export const sampleQuotations: Quotation[] = [
  { 
    id: 1, 
    clientName: 'John Doe', 
    product: 'Car Insurance', 
    amount: 1200, 
    status: 'pending', 
    date: '2025-06-20' 
  },
  { 
    id: 2, 
    clientName: 'Jane Smith', 
    product: 'Home Insurance', 
    amount: 800, 
    status: 'approved', 
    date: '2025-06-22' 
  }
];

export const samplePolicies: Policy[] = [
  { 
    id: 1, 
    policyNumber: 'POL001', 
    clientName: 'Alice Johnson', 
    product: 'Life Insurance', 
    premium: 2400, 
    status: 'active' 
  },
  { 
    id: 2, 
    policyNumber: 'POL002', 
    clientName: 'Bob Wilson', 
    product: 'Health Insurance', 
    premium: 1800, 
    status: 'pending' 
  }
];

export const sampleClaims: Claim[] = [
  { 
    id: 1, 
    claimNumber: 'CLM001', 
    clientName: 'Charlie Brown', 
    amount: 5000, 
    status: 'submitted', 
    date: '2025-06-23' 
  },
  { 
    id: 2, 
    claimNumber: 'CLM002', 
    clientName: 'Diana Prince', 
    amount: 3200, 
    status: 'processing', 
    date: '2025-06-21' 
  }
];

export const sampleTasks: Task[] = [
  { 
    id: 1, 
    type: 'underwriting', 
    title: 'Review High-Value Policy Application', 
    assignedTo: 'underwriter', 
    priority: 'high', 
    dueDate: '2025-06-26' 
  },
  { 
    id: 2, 
    type: 'finance', 
    title: 'Verify Payment for Policy POL002', 
    assignedTo: 'finance', 
    priority: 'medium', 
    dueDate: '2025-06-27' 
  },
  { 
    id: 3, 
    type: 'quotation', 
    title: 'Complex Commercial Insurance Quote', 
    assignedTo: 'underwriter', 
    priority: 'high', 
    dueDate: '2025-06-25' 
  }
];

export const sampleNotifications: Notification[] = [
  { 
    id: 1, 
    message: 'New quotation request from intermediary', 
    type: 'info', 
    time: '10 minutes ago' 
  },
  { 
    id: 2, 
    message: 'Policy POL001 requires approval', 
    type: 'warning', 
    time: '1 hour ago' 
  }
];