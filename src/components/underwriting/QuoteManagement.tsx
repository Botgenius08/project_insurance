import React, { useState } from 'react';
import { FileText, Send, Eye, Download, MessageCircle } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { QuotationDetails } from '../quotations/QuotationDetails';

export const QuoteManagement: React.FC = () => {
  const { quotations, setSelectedQuotation, selectedQuotation } = useAppState();
  
  const [livePolicies] = useState([
    {
      id: 1,
      policyNumber: 'POL-2025-0001',
      insuredName: 'Tech Solutions Ltd',
      classOfBusiness: 'Professional Indemnity',
      sumInsured: 200000000,
      premium: 8500000,
      inceptionDate: '2025-01-01',
      expiryDate: '2025-12-31',
      status: 'active'
    },
    {
      id: 2,
      policyNumber: 'POL-2025-0002',
      insuredName: 'Retail Chain Ltd',
      classOfBusiness: 'Commercial Property',
      sumInsured: 500000000,
      premium: 15000000,
      inceptionDate: '2025-01-01',
      expiryDate: '2025-12-31',
      status: 'active'
    }
  ]);

  const handleSendQuote = (requestId: number) => {
    alert(`Sending quote for request ${requestId} to intermediary...`);
  };

  const handleAttachPDF = (requestId: number) => {
    alert(`Attaching PDF quote for request ${requestId}...`);
  };

  const handleViewQuotation = (quotation: any) => {
    setSelectedQuotation(quotation);
  };

  if (selectedQuotation) {
    return (
      <QuotationDetails 
        quotation={selectedQuotation} 
        onBack={() => setSelectedQuotation(null)} 
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Quote Requests */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Intermediary Quote Requests</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Request #</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Intermediary</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class of Business</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sum Insured (TZS)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {quotations.map(request => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{request.requestNumber || `QR-${request.id}`}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{request.intermediary || 'Unknown Intermediary'}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{request.clientName}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{request.product}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{request.amount.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      request.priority === 'high' ? 'bg-red-100 text-red-700' :
                      request.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {request.priority || 'medium'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      request.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewQuotation(request)}
                        className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition duration-200 flex items-center"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </button>
                      <button
                        onClick={() => handleAttachPDF(request.id)}
                        className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition duration-200 flex items-center"
                      >
                        <FileText className="w-3 h-3 mr-1" />
                        PDF
                      </button>
                      <button
                        onClick={() => handleSendQuote(request.id)}
                        className="px-2 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700 transition duration-200 flex items-center"
                      >
                        <Send className="w-3 h-3 mr-1" />
                        Send
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Policies */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Live Policies</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Policy #</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Insured</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class of Business</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sum Insured (TZS)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Premium (TZS)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expiry Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {livePolicies.map(policy => (
                <tr key={policy.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{policy.policyNumber}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{policy.insuredName}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{policy.classOfBusiness}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{policy.sumInsured.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{policy.premium.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{policy.expiryDate}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex space-x-2">
                      <button className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition duration-200 flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </button>
                      <button className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition duration-200 flex items-center">
                        <Download className="w-3 h-3 mr-1" />
                        Certificate
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};