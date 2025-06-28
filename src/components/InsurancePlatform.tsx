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
import { FinanceModule } from './finance/FinanceModule';
import { UnderwritingModule } from './underwriting/UnderwritingModule';
import { EmployeeClaimsModule } from './claims/EmployeeClaimsModule';
import { ReinsuranceModule } from './reinsurance/ReinsuranceModule';
import { ActuarialModule } from './actuarial/ActuarialModule';

const InsurancePlatform: React.FC = () => {
  const { isAuthenticated, user, loading } = useAuth();
  const { activeTab } = useAppState();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const renderContent = () => {
    // Security check: Ensure only employees can access employee modules
    if (['finance', 'underwriting', 'reinsurance', 'actuarial'].includes(activeTab) && user?.type !== 'employee') {
      return <Dashboard />; // Redirect to dashboard if unauthorized access attempt
    }

    // Security check: Ensure only intermediaries can access intermediary modules
    if (['quotations', 'policies'].includes(activeTab) && user?.type !== 'intermediary') {
      return <Dashboard />; // Redirect to dashboard if unauthorized access attempt
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      
      // Intermediary modules
      case 'quotations':
        return user?.type === 'intermediary' ? <QuotationsPage /> : <Dashboard />;
      case 'policies':
        return user?.type === 'intermediary' ? <PoliciesManagement /> : <Dashboard />;
      
      // Shared modules (different views for different user types)
      case 'claims':
        return user?.type === 'employee' ? <EmployeeClaimsModule /> : <ClaimsManagement />;
      
      // Employee-only modules
      case 'finance':
        return user?.type === 'employee' ? <FinanceModule /> : <Dashboard />;
      case 'underwriting':
        return user?.type === 'employee' ? <UnderwritingModule /> : <Dashboard />;
      case 'reinsurance':
        return user?.type === 'employee' ? <ReinsuranceModule /> : <Dashboard />;
      case 'actuarial':
        return user?.type === 'employee' ? <ActuarialModule /> : <Dashboard />;
      
      // Legacy employee modules (kept for backward compatibility)
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