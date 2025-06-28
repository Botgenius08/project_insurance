import React, { useState } from 'react';
import { Calendar, Calculator } from 'lucide-react';

export const UPRCalculation: React.FC = () => {
  const [calculations] = useState([
    {
      id: 1,
      policyNumber: 'POL-2025-0001',
      premium: 15000000,
      inceptionDate: '2025-01-01',
      expiryDate: '2025-12-31',
      uprAmount: 12500000,
      calculationDate: '2025-01-15'
    },
    {
      id: 2,
      policyNumber: 'POL-2025-0002',
      premium: 8500000,
      inceptionDate: '2025-01-01',
      expiryDate: '2025-12-31',
      uprAmount: 7083333,
      calculationDate: '2025-01-15'
    }
  ]);

  const calculateUPR = () => {
    alert('UPR calculation completed for all active policies');
  };

  return (
    <div className="space-y-6">
      {/* UPR Calculation Controls */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          UPR Calculation
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Calculation Date</label>
            <input
              type="date"
              defaultValue="2025-01-15"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class of Business</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="">All Classes</option>
              <option value="Motor">Motor</option>
              <option value="Property">Property</option>
              <option value="Marine">Marine</option>
              <option value="Aviation">Aviation</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={calculateUPR}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center"
            >
              <Calculator className="w-4 h-4 mr-2" />
              Calculate UPR
            </button>
          </div>
        </div>
      </div>

      {/* UPR Results */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">UPR Calculation Results</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Policy Number</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Premium (TZS)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Inception Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expiry Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">UPR Amount (TZS)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Calculation Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {calculations.map(calc => (
                <tr key={calc.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{calc.policyNumber}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{calc.premium.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{calc.inceptionDate}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{calc.expiryDate}</td>
                  <td className="px-4 py-3 text-sm font-medium text-green-600">{calc.uprAmount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{calc.calculationDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* UPR Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total UPR</p>
              <p className="text-2xl font-bold text-blue-600">19,583,333 TZS</p>
            </div>
            <Calculator className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Premium</p>
              <p className="text-2xl font-bold text-green-600">23,500,000 TZS</p>
            </div>
            <Calendar className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Earned Premium</p>
              <p className="text-2xl font-bold text-purple-600">3,916,667 TZS</p>
            </div>
            <Calculator className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Policies Count</p>
              <p className="text-2xl font-bold text-orange-600">2</p>
            </div>
            <Calendar className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>
    </div>
  );
};