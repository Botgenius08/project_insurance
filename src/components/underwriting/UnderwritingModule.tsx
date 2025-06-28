import React, { useState } from 'react';
import { QuoteManagement } from './QuoteManagement';
import { InwardFacultative } from './InwardFacultative';

export const UnderwritingModule: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState('quotes');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Underwriting Module</h2>
      </div>

      {/* Sub Navigation */}
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setActiveSubTab('quotes')}
          className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
            activeSubTab === 'quotes'
              ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-700'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Quote Management
        </button>
        <button
          onClick={() => setActiveSubTab('facultative')}
          className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
            activeSubTab === 'facultative'
              ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-700'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Inward Facultative
        </button>
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeSubTab === 'quotes' && <QuoteManagement />}
        {activeSubTab === 'facultative' && <InwardFacultative />}
      </div>
    </div>
  );
};