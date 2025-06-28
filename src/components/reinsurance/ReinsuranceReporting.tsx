import React from 'react';
import { Download, FileText } from 'lucide-react';

export const ReinsuranceReporting: React.FC = () => {
  const generateReport = (type: string) => {
    alert(`Generating ${type} report...`);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Reinsurance Reporting</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="font-medium text-gray-800 mb-4">Premium Bordereaux</h4>
          <p className="text-gray-600 mb-4">Generate premium statements for reinsurers by treaty and period.</p>
          
          <button
            onClick={() => generateReport('Premium Bordereau')}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Generate Premium Bordereau
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="font-medium text-gray-800 mb-4">Claims Bordereaux</h4>
          <p className="text-gray-600 mb-4">Generate claims statements for reinsurers by treaty and period.</p>
          
          <button
            onClick={() => generateReport('Claims Bordereau')}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200 flex items-center justify-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Generate Claims Bordereau
          </button>
        </div>
      </div>
    </div>
  );
};