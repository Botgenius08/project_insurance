import React from 'react';
import { useAppState } from '../../context/AppStateContext';

export const QuotationList: React.FC = () => {
  const { quotations } = useAppState();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Quotations</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount (TZS)</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {quotations.map(quote => (
              <tr key={quote.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-700">{quote.clientName}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{quote.product}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{quote.amount.toLocaleString()} TZS</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    quote.status === 'approved' ? 'bg-green-100 text-green-700' :
                    quote.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {quote.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{quote.date}</td>
                <td className="px-4 py-3 text-sm">
                  <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                  <button className="text-green-600 hover:text-green-800">Convert</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};