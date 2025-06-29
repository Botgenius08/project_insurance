import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { dataService } from '../services/dataService';
import { Database } from '../types/database';

type Quotation = Database['public']['Tables']['quotations']['Row'];
type Policy = Database['public']['Tables']['policies']['Row'];
type Claim = Database['public']['Tables']['claims']['Row'];
type Task = Database['public']['Tables']['tasks']['Row'];
type Notification = Database['public']['Tables']['notifications']['Row'];

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
  addQuotation: (quotation: Database['public']['Tables']['quotations']['Insert']) => Promise<void>;
  updateTask: (taskId: string, updates: Database['public']['Tables']['tasks']['Update']) => Promise<void>;
  refreshData: () => Promise<void>;
  
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
      const isValidTab = validateTabAccess(activeTab, user.user_type);
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
    if (user && validateTabAccess(tab, user.user_type)) {
      setActiveTab(tab);
    } else {
      setActiveTab('dashboard');
    }
  };

  const refreshData = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    try {
      const [quotationsData, policiesData, claimsData, tasksData, notificationsData] = await Promise.all([
        dataService.getQuotations(),
        dataService.getPolicies(),
        dataService.getClaims(),
        dataService.getTasks(),
        dataService.getNotifications()
      ]);

      setQuotations(quotationsData);
      setPolicies(policiesData);
      setClaims(claimsData);
      setTasks(tasksData);
      setNotifications(notificationsData);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addQuotation = async (quotationData: Database['public']['Tables']['quotations']['Insert']) => {
    if (user?.user_type !== 'intermediary') {
      console.warn('Unauthorized attempt to add quotation');
      return;
    }

    const success = await dataService.createQuotation(quotationData);
    if (success) {
      await refreshData(); // Refresh to get the latest data
    }
  };

  const updateTask = async (taskId: string, updates: Database['public']['Tables']['tasks']['Update']) => {
    if (user?.user_type !== 'employee') {
      console.warn('Unauthorized attempt to update task');
      return;
    }

    const success = await dataService.updateTask(taskId, updates);
    if (success) {
      await refreshData(); // Refresh to get the latest data
    }
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