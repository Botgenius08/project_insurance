import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { sampleQuotations, samplePolicies, sampleClaims, sampleTasks, sampleNotifications } from '../utils/sampleData';
import { Quotation, Policy, Claim, Task, Notification } from '../types';

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
  refreshData: () => void;
  
  // Loading states
  loading: boolean;
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
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  
  // Data state
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Load data when user authenticates
  useEffect(() => {
    if (isAuthenticated && user) {
      refreshData();
    } else {
      // Clear data when user logs out
      setQuotations([]);
      setPolicies([]);
      setClaims([]);
      setTasks([]);
      setNotifications([]);
    }
  }, [isAuthenticated, user]);

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

  const refreshData = () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    try {
      // Load sample data
      setQuotations(sampleQuotations);
      setPolicies(samplePolicies);
      setClaims(sampleClaims);
      setTasks(sampleTasks);
      setNotifications(sampleNotifications);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addQuotation = (quotationData: Omit<Quotation, 'id'>) => {
    if (user?.type !== 'intermediary') {
      console.warn('Unauthorized attempt to add quotation');
      return;
    }

    const newQuotation: Quotation = {
      ...quotationData,
      id: Date.now() // Simple ID generation for local storage
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
    refreshData,
    loading,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};