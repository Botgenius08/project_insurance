import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Quotation, Policy, Claim, Task, Notification } from '../types';
import { sampleQuotations, samplePolicies, sampleClaims, sampleTasks, sampleNotifications } from '../utils/sampleData';
import { useAuth } from './AuthContext';

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
  setQuotations: React.Dispatch<React.SetStateAction<Quotation[]>>;
  setPolicies: React.Dispatch<React.SetStateAction<Policy[]>>;
  setClaims: React.Dispatch<React.SetStateAction<Claim[]>>;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
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
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Initialize sample data
  useEffect(() => {
    setQuotations(sampleQuotations);
    setPolicies(samplePolicies);
    setClaims(sampleClaims);
    setTasks(sampleTasks);
    setNotifications(sampleNotifications);
  }, []);

  // Security: Reset to dashboard when user type changes or unauthorized access
  useEffect(() => {
    if (user) {
      // Validate current tab access based on user role
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
      return ['dashboard', 'tasks', 'approvals'].includes(tab);
    }
    return false;
  };

  const secureSetActiveTab = (tab: string) => {
    if (user && validateTabAccess(tab, user.type)) {
      setActiveTab(tab);
    } else {
      // Unauthorized access attempt - redirect to dashboard
      setActiveTab('dashboard');
    }
  };

  const addQuotation = (quotationData: Omit<Quotation, 'id'>) => {
    // Security: Only intermediaries can add quotations
    if (user?.type !== 'intermediary') {
      console.warn('Unauthorized attempt to add quotation');
      return;
    }
    
    const newQuotation: Quotation = {
      ...quotationData,
      id: quotations.length + 1,
    };
    setQuotations(prev => [...prev, newQuotation]);
  };

  const updateTask = (taskId: number, updates: Partial<Task>) => {
    // Security: Only employees can update tasks
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
    setQuotations,
    setPolicies,
    setClaims,
    setTasks,
    setNotifications,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};