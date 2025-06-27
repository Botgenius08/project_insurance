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
  const { isAuthenticated } = useAuth();
  const { activeTab } = useAppState();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'quotations':
        return <QuotationsPage />;
      case 'policies':
        return <PoliciesManagement />;
      case 'claims':
        return <ClaimsManagement />;
      case 'tasks':
        return <TaskManagement />;
      case 'approvals':
        return <ApprovalsManagement />;
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