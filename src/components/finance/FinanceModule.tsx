import React, { useState } from 'react';
import { PolicyManagement } from './PolicyManagement';
import { AccountingFeatures } from './AccountingFeatures';

export const FinanceModule: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState('policies');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Finance Module</h2>
      </div>

      {/* Sub Navigation */}
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setActiveSubTab('policies')}
          className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
            activeSubTab === 'policies'
              ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-700'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Policy Management
        </button>
        <button
          onClick={() => setActiveSubTab('accounting')}
          className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
            activeSubTab === 'accounting'
              ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-700'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Accounting Features
        </button>
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeSubTab === 'policies' && <PolicyManagement />}
        {activeSubTab === 'accounting' && <AccountingFeatures />}
      </div>
    </div>
  );
};