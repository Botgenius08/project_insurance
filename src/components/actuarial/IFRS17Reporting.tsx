import React, { useState } from 'react';
import { FileText, BarChart3, TrendingUp } from 'lucide-react';

export const IFRS17Reporting: React.FC = () => {
  const [activeModel, setActiveModel] = useState('PAA');
  
  const [ifrsData] = useState([
    {
      id: 1,
      contractGroup: 'Motor Insurance 2025',
      measurementModel: 'PAA',
      liabilityCoverage: 150000000,
      liabilityRemaining: 125000000,
      contractualServiceMargin: 0,
      riskAdjustment: 7500000,
      reportingDate: '2025-01-15'
    },
    {
      id: 2,
      contractGroup: 'Property Insurance 2025',
      measurementModel: 'GMM',
      liabilityCoverage: 300000000,
      liabilityRemaining: 280000000,
      contractualServiceMargin: 15000000,
      riskAdjustment: 14000000,
      reportingDate: '2025-01-15'
    }
  ]);

  const generateIFRSReport = () => {
    alert(`Generating IFRS 17 ${activeModel} report...`);
  };

  return (
    <div className="space-y-6">
      {/* Model Selection */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          IFRS 17 Reporting
        </h3>
        
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setActiveModel('PAA')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeModel === 'PAA'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            PAA (Premium Allocation Approach)
          </button>
          <button
            onClick={() => setActiveModel('GMM')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeModel === 'GMM'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            GMM (General Measurement Model)
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reporting Period</label>
            <input
              type="month"
              defaultValue="2025-01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contract Group</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="">All Groups</option>
              <option value="Motor">Motor Insurance 2025</option>
              <option value="Property">Property Insurance 2025</option>
              <option value="Marine">Marine Insurance 2025</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={generateIFRSReport}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* IFRS 17 Data Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Contract Groups Summary</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contract Group</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Model</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Liability Coverage (TZS)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Liability Remaining (TZS)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">CSM (TZS)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Risk Adjustment (TZS)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reporting Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ifrsData.filter(data => activeModel === 'ALL' || data.measurementModel === activeModel).map(data => (
                <tr key={data.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{data.contractGroup}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      data.measurementModel === 'PAA' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {data.measurementModel}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{data.liabilityCoverage.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{data.liabilityRemaining.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{data.contractualServiceMargin.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{data.riskAdjustment.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{data.reportingDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Liability Coverage</p>
              <p className="text-2xl font-bold text-blue-600">450,000,000 TZS</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Liability Remaining</p>
              <p className="text-2xl font-bold text-green-600">405,000,000 TZS</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total CSM</p>
              <p className="text-2xl font-bold text-purple-600">15,000,000 TZS</p>
            </div>
            <FileText className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Risk Adjustment</p>
              <p className="text-2xl font-bold text-orange-600">21,500,000 TZS</p>
            </div>
            <BarChart3 className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>
    </div>
  );
};