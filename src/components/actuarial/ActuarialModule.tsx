import React, { useState } from 'react';
import { IBNRCalculation } from './IBNRCalculation';
import { UPRCalculation } from './UPRCalculation';
import { IFRS17Reporting } from './IFRS17Reporting';

export const ActuarialModule: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState('ibnr');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Actuarial Module</h2>
      </div>

      {/* Sub Navigation */}
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setActiveSubTab('ibnr')}
          className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
            activeSubTab === 'ibnr'
              ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-700'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          IBNR Calculation
        </button>
        <button
          onClick={() => setActiveSubTab('upr')}
          className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
            activeSubTab === 'upr'
              ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-700'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          UPR Calculation
        </button>
        <button
          onClick={() => setActiveSubTab('ifrs17')}
          className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
            activeSubTab === 'ifrs17'
              ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-700'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          IFRS 17 Reporting
        </button>
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeSubTab === 'ibnr' && <IBNRCalculation />}
        {activeSubTab === 'upr' && <UPRCalculation />}
        {activeSubTab === 'ifrs17' && <IFRS17Reporting />}
      </div>
    </div>
  );
};