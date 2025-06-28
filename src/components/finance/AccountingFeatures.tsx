import React, { useState } from 'react';
import { FileText, Download, Calendar } from 'lucide-react';

export const AccountingFeatures: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('2025-01');

  const generateBordereau = (type: 'premium' | 'claim') => {
    alert(`Generating ${type} bordereau for ${selectedPeriod}...`);
  };

  const generateRevenueAccount = () => {
    alert(`Generating revenue account for ${selectedPeriod}...`);
  };

  return (
    <div className="space-y-6">
      {/* Period Selection */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Reporting Period</h3>
        <div className="flex items-center space-x-4">
          <Calendar className="w-5 h-5 text-gray-500" />
          <input
            type="month"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Bordereau Generation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Premium Bordereau</h3>
          <p className="text-gray-600 mb-4">Generate detailed premium statements for reinsurers and regulatory reporting.</p>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Total Policies:</span>
              <span className="font-medium">156</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Total Premium:</span>
              <span className="font-medium">450,000,000 TZS</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Commission:</span>
              <span className="font-medium">67,500,000 TZS</span>
            </div>
          </div>
          
          <button
            onClick={() => generateBordereau('premium')}
            className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Generate Premium Bordereau
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Claims Bordereau</h3>
          <p className="text-gray-600 mb-4">Generate detailed claims statements for reinsurers and regulatory reporting.</p>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Total Claims:</span>
              <span className="font-medium">23</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Gross Claims:</span>
              <span className="font-medium">125,000,000 TZS</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Net Claims:</span>
              <span className="font-medium">89,500,000 TZS</span>
            </div>
          </div>
          
          <button
            onClick={() => generateBordereau('claim')}
            className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200 flex items-center justify-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Generate Claims Bordereau
          </button>
        </div>
      </div>

      {/* Revenue Accounts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Accounts</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Income Statement Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Gross Premium Written:</span>
                <span className="font-medium">450,000,000 TZS</span>
              </div>
              <div className="flex justify-between">
                <span>Reinsurance Premium:</span>
                <span className="font-medium">(180,000,000) TZS</span>
              </div>
              <div className="flex justify-between">
                <span>Net Premium Written:</span>
                <span className="font-medium">270,000,000 TZS</span>
              </div>
              <div className="flex justify-between">
                <span>Claims Incurred:</span>
                <span className="font-medium">(89,500,000) TZS</span>
              </div>
              <div className="flex justify-between">
                <span>Commission Expense:</span>
                <span className="font-medium">(67,500,000) TZS</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-medium">
                <span>Net Underwriting Result:</span>
                <span className="text-green-600">113,000,000 TZS</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Key Ratios</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Loss Ratio:</span>
                <span className="font-medium">33.1%</span>
              </div>
              <div className="flex justify-between">
                <span>Commission Ratio:</span>
                <span className="font-medium">25.0%</span>
              </div>
              <div className="flex justify-between">
                <span>Combined Ratio:</span>
                <span className="font-medium">58.1%</span>
              </div>
              <div className="flex justify-between">
                <span>Retention Ratio:</span>
                <span className="font-medium">60.0%</span>
              </div>
            </div>
          </div>
        </div>
        
        <button
          onClick={generateRevenueAccount}
          className="w-full mt-6 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200 flex items-center justify-center"
        >
          <FileText className="w-4 h-4 mr-2" />
          Generate Revenue Account
        </button>
      </div>
    </div>
  );
};