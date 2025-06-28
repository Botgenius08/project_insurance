import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useAppState } from '../context/AppStateContext';
import { LoginForm } from './auth/LoginForm';
import { MainLayout } from './layout/MainLayout';
import { Dashboard } from './dashboard/Dashboard';
import { QuotationsPage } from './quotations/QuotationsPage';
import { PoliciesManagement } from './policies/PoliciesManagement';
import { ClaimsManagement } from './claims/ClaimsManagement';
import { TaskManagement } from './tasks/TaskManagement';
import { ApprovalsManagement } from './approvals/ApprovalsManagement';

const InsurancePlatform: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { activeTab } = useAppState();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const renderContent = () => {
    // Security check: Ensure only employees can access tasks and approvals
    if ((activeTab === 'tasks' || activeTab === 'approvals') && user?.type !== 'employee') {
      return <Dashboard />; // Redirect to dashboard if unauthorized access attempt
    }

    // Security check: Ensure only intermediaries can access quotations, policies, claims
    if ((activeTab === 'quotations' || activeTab === 'policies' || activeTab === 'claims') && user?.type !== 'intermediary') {
      return <Dashboard />; // Redirect to dashboard if unauthorized access attempt
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'quotations':
        return user?.type === 'intermediary' ? <QuotationsPage /> : <Dashboard />;
      case 'policies':
        return user?.type === 'intermediary' ? <PoliciesManagement /> : <Dashboard />;
      case 'claims':
        return user?.type === 'intermediary' ? <ClaimsManagement /> : <Dashboard />;
      case 'tasks':
        return user?.type === 'employee' ? <TaskManagement /> : <Dashboard />;
      case 'approvals':
        return user?.type === 'employee' ? <ApprovalsManagement /> : <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <MainLayout>
      {renderContent()}
    </MainLayout>
  );
};

export default InsurancePlatform;