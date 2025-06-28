import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Quotation, Policy, Claim, Task, Notification } from '../types';
import { useAuth } from './AuthContext';
import { sampleQuotations, samplePolicies, sampleClaims, sampleTasks, sampleNotifications } from '../utils/sampleData';

interface AppStateContextType {
  // Data
  quotations: Quotation[];
  policies: Policy[];
  claims: Claim[];
  tasks: Task[];
  notifications: Notification[];
  
  // UI State
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Data Actions
  addQuotation: (quotation: Omit<Quotation, 'id'>) => void;
  updateTask: (taskId: number, updates: Partial<Task>) => void;
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
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Initialize with sample data
  const [quotations, setQuotations] = useState<Quotation[]>(sampleQuotations);
  const [policies, setPolicies] = useState<Policy[]>(samplePolicies);
  const [claims, setClaims] = useState<Claim[]>(sampleClaims);
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);

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
      return ['dashboard', 'finance', 'underwriting', 'claims', 'reinsurance', 'actuarial'].includes(tab);
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

  const addQuotation = (quotationData: Omit<Quotation, 'id'>) => {
    if (user?.type !== 'intermediary') {
      console.warn('Unauthorized attempt to add quotation');
      return;
    }

    const newQuotation: Quotation = {
      ...quotationData,
      id: Date.now(),
    };
    
    setQuotations(prev => [newQuotation, ...prev]);
  };

  const updateTask = (taskId: number, updates: Partial<Task>) => {
    if (user?.type !== 'employee') {
      console.warn('Unauthorized attempt to update task');
      return;
    }

    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const value: AppStateContextType = {
    quotations,
    policies,
    claims,
    tasks,
    notifications,
    activeTab,
    setActiveTab: secureSetActiveTab,
    addQuotation,
    updateTask,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};