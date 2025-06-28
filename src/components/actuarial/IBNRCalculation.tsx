import React, { useState } from 'react';
import { Calculator, TrendingUp } from 'lucide-react';

export const IBNRCalculation: React.FC = () => {
  const [formData, setFormData] = useState({
    classOfBusiness: '',
    developmentFactor: '',
    paidLoss: '',
    reportingPeriod: ''
  });

  const [calculations] = useState([
    {
      id: 1,
      classOfBusiness: 'Motor',
      developmentFactor: 1.25,
      ultimateLoss: 125000000,
      paidLoss: 100000000,
      ibnrReserve: 25000000,
      calculationDate: '2025-01-15'
    },
    {
      id: 2,
      classOfBusiness: 'Property',
      developmentFactor: 1.15,
      ultimateLoss: 230000000,
      paidLoss: 200000000,
      ibnrReserve: 30000000,
      calculationDate: '2025-01-15'
    }
  ]);

  const calculateIBNR = () => {
    const paidLoss = parseFloat(formData.paidLoss) || 0;
    const developmentFactor = parseFloat(formData.developmentFactor) || 1;
    const ultimateLoss = paidLoss * developmentFactor;
    const ibnrReserve = ultimateLoss - paidLoss;
    
    alert(`IBNR Calculation Result:
    Ultimate Loss: ${ultimateLoss.toLocaleString()} TZS
    IBNR Reserve: ${ibnrReserve.toLocaleString()} TZS`);
  };

  return (
    <div className="space-y-6">
      {/* IBNR Calculation Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Calculator className="w-5 h-5 mr-2" />
          IBNR Calculation
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class of Business</label>
            <select
              value={formData.classOfBusiness}
              onChange={(e) => setFormData({...formData, classOfBusiness: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Class</option>
              <option value="Motor">Motor</option>
              <option value="Property">Property</option>
              <option value="Marine">Marine</option>
              <option value="Aviation">Aviation</option>
              <option value="Liability">Liability</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Development Factor</label>
            <input
              type="number"
              step="0.01"
              value={formData.developmentFactor}
              onChange={(e) => setFormData({...formData, developmentFactor: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 1.25"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Paid Loss (TZS)</label>
            <input
              type="number"
              value={formData.paidLoss}
              onChange={(e) => setFormData({...formData, paidLoss: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reporting Period</label>
            <input
              type="month"
              value={formData.reportingPeriod}
              onChange={(e) => setFormData({...formData, reportingPeriod: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <button
          onClick={calculateIBNR}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center"
        >
          <Calculator className="w-4 h-4 mr-2" />
          Calculate IBNR
        </button>
      </div>

      {/* Historical Calculations */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Historical IBNR Calculations</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class of Business</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Development Factor</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ultimate Loss (TZS)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paid Loss (TZS)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">IBNR Reserve (TZS)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {calculations.map(calc => (
                <tr key={calc.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{calc.classOfBusiness}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{calc.developmentFactor}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{calc.ultimateLoss.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{calc.paidLoss.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm font-medium text-green-600">{calc.ibnrReserve.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{calc.calculationDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total IBNR Reserve</p>
              <p className="text-2xl font-bold text-blue-600">55,000,000 TZS</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Development Factor</p>
              <p className="text-2xl font-bold text-green-600">1.20</p>
            </div>
            <Calculator className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Classes Analyzed</p>
              <p className="text-2xl font-bold text-purple-600">2</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );
};