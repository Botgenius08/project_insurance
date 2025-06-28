import React, { useState } from 'react';
import { ClaimsManagement } from './ClaimsManagement';
import { NewClaimForm } from './NewClaimForm';

export const EmployeeClaimsModule: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState('management');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Claims Module</h2>
      </div>

      {/* Sub Navigation */}
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setActiveSubTab('management')}
          className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
            activeSubTab === 'management'
              ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-700'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Claims Management
        </button>
        <button
          onClick={() => setActiveSubTab('new')}
          className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
            activeSubTab === 'new'
              ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-700'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          New Claim
        </button>
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeSubTab === 'management' && <ClaimsManagement />}
        {activeSubTab === 'new' && <NewClaimForm />}
      </div>
    </div>
  );
};