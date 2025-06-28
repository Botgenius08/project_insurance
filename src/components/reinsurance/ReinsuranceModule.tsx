import React, { useState } from 'react';
import { TreatyManagement } from './TreatyManagement';
import { ExcessOfLossManagement } from './ExcessOfLossManagement';
import { FacultativeManagement } from './FacultativeManagement';
import { ReinsuranceReporting } from './ReinsuranceReporting';

export const ReinsuranceModule: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState('treaty');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Reinsurance Module</h2>
      </div>

      {/* Sub Navigation */}
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setActiveSubTab('treaty')}
          className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
            activeSubTab === 'treaty'
              ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-700'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Treaty Management
        </button>
        <button
          onClick={() => setActiveSubTab('excess')}
          className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
            activeSubTab === 'excess'
              ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-700'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Excess of Loss
        </button>
        <button
          onClick={() => setActiveSubTab('facultative')}
          className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
            activeSubTab === 'facultative'
              ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-700'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Facultative
        </button>
        <button
          onClick={() => setActiveSubTab('reporting')}
          className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
            activeSubTab === 'reporting'
              ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-700'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Reporting
        </button>
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeSubTab === 'treaty' && <TreatyManagement />}
        {activeSubTab === 'excess' && <ExcessOfLossManagement />}
        {activeSubTab === 'facultative' && <FacultativeManagement />}
        {activeSubTab === 'reporting' && <ReinsuranceReporting />}
      </div>
    </div>
  );
};