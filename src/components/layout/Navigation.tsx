import React from 'react';
import { Home, FileText, Shield, DollarSign, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppState } from '../../context/AppStateContext';

interface NavigationProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ isMobile = false, onItemClick = () => {} }) => {
  const { user } = useAuth();
  const { activeTab, setActiveTab } = useAppState();
  
  if (!user) return null;

  const isIntermediary = user.type === 'intermediary';
  const itemClass = isMobile ? 'text-red-600 hover:text-red-800' : 'text-gray-700 hover:bg-gray-100';
  
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onItemClick();
  };

  return (
    <>
      <button
        onClick={() => handleTabClick('dashboard')}
        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
          activeTab === 'dashboard' ? 'bg-blue-100 text-blue-700' : itemClass
        }`}
      >
        <Home className="w-5 h-5" />
        <span>Dashboard</span>
      </button>
      
      {isIntermediary ? (
        <>
          <button
            onClick={() => handleTabClick('quotations')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === 'quotations' ? 'bg-blue-100 text-blue-700' : itemClass
            }`}
          >
            <FileText className="w-5 h-5" />
            <span>Quotations</span>
          </button>
          <button
            onClick={() => handleTabClick('policies')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === 'policies' ? 'bg-blue-100 text-blue-700' : itemClass
            }`}
          >
            <Shield className="w-5 h-5" />
            <span>Policies</span>
          </button>
          <button
            onClick={() => handleTabClick('claims')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === 'claims' ? 'bg-blue-100 text-blue-700' : itemClass
            }`}
          >
            <DollarSign className="w-5 h-5" />
            <span>Claims</span>
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => handleTabClick('tasks')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === 'tasks' ? 'bg-blue-100 text-blue-700' : itemClass
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            <span>Tasks</span>
          </button>
          <button
            onClick={() => handleTabClick('approvals')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === 'approvals' ? 'bg-blue-100 text-blue-700' : itemClass
            }`}
          >
            <Clock className="w-5 h-5" />
            <span>Approvals</span>
          </button>
        </>
      )}
    </>
  );
};