import React, { useState } from 'react';
import { CheckCircle, Clock, DollarSign } from 'lucide-react';

export const PolicyManagement: React.FC = () => {
  const [policies] = useState([
    {
      id: 1,
      policyNumber: 'PENDING-001',
      clientName: 'ABC Corporation',
      product: 'Commercial Property',
      premium: 15000000,
      sumInsured: 500000000,
      status: 'pending_payment',
      submittedBy: 'Intermediary A',
      submissionDate: '2025-01-15'
    },
    {
      id: 2,
      policyNumber: 'PENDING-002',
      clientName: 'XYZ Limited',
      product: 'Motor Fleet',
      premium: 8500000,
      sumInsured: 200000000,
      status: 'pending_payment',
      submittedBy: 'Intermediary B',
      submissionDate: '2025-01-14'
    }
  ]);

  const generatePolicyNumber = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `POL-${year}-${random}`;
  };

  const handleApprovePayment = (policyId: number) => {
    const policyNumber = generatePolicyNumber();
    alert(`Payment approved! Policy activated with number: ${policyNumber}`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Pending Payment Approvals</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Policy Ref</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Premium (TZS)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sum Insured (TZS)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted By</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {policies.map(policy => (
                <tr key={policy.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{policy.policyNumber}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{policy.clientName}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{policy.product}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{policy.premium.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{policy.sumInsured.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{policy.submittedBy}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      Pending Payment
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApprovePayment(policy.id)}
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition duration-200 flex items-center"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Approve & Activate
                      </button>
                      <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition duration-200">
                        View Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Payments</p>
              <p className="text-2xl font-bold text-yellow-600">2</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Premium Value</p>
              <p className="text-2xl font-bold text-blue-600">23,500,000 TZS</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approved Today</p>
              <p className="text-2xl font-bold text-green-600">0</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>
    </div>
  );
};