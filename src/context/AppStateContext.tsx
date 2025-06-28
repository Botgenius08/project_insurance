import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Quotation, Policy, Claim, Task, Notification } from '../types';
import { useAuth } from './AuthContext';
import { useSupabaseData, useSupabaseInsert, useSupabaseUpdate } from '../hooks/useSupabaseData';
import { supabase } from '../lib/supabase';

interface AppStateContextType {
  // Data
  quotations: Quotation[];
  policies: Policy[];
  claims: Claim[];
  tasks: Task[];
  notifications: Notification[];
  
  // Loading states
  loading: {
    quotations: boolean;
    policies: boolean;
    claims: boolean;
    tasks: boolean;
    notifications: boolean;
  };
  
  // UI State
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Data Actions
  addQuotation: (quotation: Omit<Quotation, 'id'>) => Promise<void>;
  updateTask: (taskId: string, updates: Partial<Task>) => Promise<void>;
  refetchData: () => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};

interface AppStateProviderProps {
  children: ReactNode;
}

export const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {
  const { user, session } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Fetch data using custom hooks
  const { data: quotationsData, loading: quotationsLoading, refetch: refetchQuotations } = useSupabaseData<any>('quotations');
  const { data: policiesData, loading: policiesLoading, refetch: refetchPolicies } = useSupabaseData<any>('policies');
  const { data: claimsData, loading: claimsLoading, refetch: refetchClaims } = useSupabaseData<any>('claims');
  const { data: tasksData, loading: tasksLoading, refetch: refetchTasks } = useSupabaseData<any>('tasks');
  const { data: notificationsData, loading: notificationsLoading, refetch: refetchNotifications } = useSupabaseData<any>('notifications');

  // Insert hooks
  const { insert: insertQuotation } = useSupabaseInsert('quotations');
  const { update: updateTaskInDb } = useSupabaseUpdate('tasks');

  // Transform database data to match frontend types
  const quotations: Quotation[] = quotationsData.map(q => ({
    id: parseInt(q.id) || 0,
    clientName: q.client_name,
    clientEmail: q.client_email,
    product: q.product,
    coverage: q.coverage_type,
    amount: q.amount,
    status: q.status,
    date: q.date
  }));

  const policies: Policy[] = policiesData.map(p => ({
    id: parseInt(p.id) || 0,
    policyNumber: p.policy_number,
    clientName: p.client_name,
    product: p.product,
    premium: p.premium,
    status: p.status,
    sumInsured: p.sum_insured,
    classOfBusiness: p.class_of_business,
    leaderInsurer: p.leader_insurer,
    facultativeShare: p.facultative_share,
    createdBy: p.created_by,
    createdDate: p.created_date
  }));

  const claims: Claim[] = claimsData.map(c => ({
    id: parseInt(c.id) || 0,
    claimNumber: c.claim_number,
    clientName: c.client_name,
    amount: c.amount,
    status: c.status,
    date: c.date,
    policyNumber: c.policy_number,
    classOfBusiness: c.class_of_business,
    grossAmount: c.gross_amount,
    excessAmount: c.excess_amount,
    salvageAmount: c.salvage_amount,
    otherExpense: c.other_expense,
    netAmount: c.net_amount
  }));

  const tasks: Task[] = tasksData.map(t => ({
    id: parseInt(t.id) || 0,
    type: t.type,
    title: t.title,
    assignedTo: t.assigned_to,
    priority: t.priority,
    dueDate: t.due_date,
    status: t.status
  }));

  const notifications: Notification[] = notificationsData.map(n => ({
    id: parseInt(n.id) || 0,
    message: n.message,
    type: n.type,
    time: n.time
  }));

  // Security: Reset to dashboard when user type changes or unauthorized access
  useEffect(() => {
    if (user) {
      const isValidTab = validateTabAccess(activeTab, user.type);
      if (!isValidTab) {
        setActiveTab('dashboard');
      }
    }
  }, [user, activeTab]);

  const validateTabAccess = (tab: string, userType: 'intermediary' | 'employee'): boolean => {
    if (userType === 'intermediary') {
      return ['dashboard', 'quotations', 'policies', 'claims'].includes(tab);
    }
    if (userType === 'employee') {
      return ['dashboard', 'finance', 'underwriting', 'claims', 'reinsurance', 'actuarial', 'tasks', 'approvals'].includes(tab);
    }
    return false;
  };

  const secureSetActiveTab = (tab: string) => {
    if (user && validateTabAccess(tab, user.type)) {
      setActiveTab(tab);
    } else {
      setActiveTab('dashboard');
    }
  };

  const addQuotation = async (quotationData: Omit<Quotation, 'id'>) => {
    if (user?.type !== 'intermediary') {
      console.warn('Unauthorized attempt to add quotation');
      return;
    }

    try {
      const dbData = {
        client_name: quotationData.clientName,
        client_email: quotationData.clientEmail,
        product: quotationData.product,
        coverage_type: quotationData.coverage,
        amount: quotationData.amount,
        status: quotationData.status || 'pending',
        date: quotationData.date
      };

      await insertQuotation(dbData);
      refetchQuotations();
    } catch (error) {
      console.error('Error adding quotation:', error);
    }
  };

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    if (user?.type !== 'employee') {
      console.warn('Unauthorized attempt to update task');
      return;
    }

    try {
      const dbUpdates = {
        type: updates.type,
        title: updates.title,
        assigned_to: updates.assignedTo,
        priority: updates.priority,
        due_date: updates.dueDate,
        status: updates.status
      };

      await updateTaskInDb(taskId, dbUpdates);
      refetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const refetchData = () => {
    refetchQuotations();
    refetchPolicies();
    refetchClaims();
    refetchTasks();
    refetchNotifications();
  };

  const value: AppStateContextType = {
    quotations,
    policies,
    claims,
    tasks,
    notifications,
    loading: {
      quotations: quotationsLoading,
      policies: policiesLoading,
      claims: claimsLoading,
      tasks: tasksLoading,
      notifications: notificationsLoading,
    },
    activeTab,
    setActiveTab: secureSetActiveTab,
    addQuotation,
    updateTask,
    refetchData,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};