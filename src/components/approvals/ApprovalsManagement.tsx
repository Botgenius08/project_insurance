import React from 'react';

export const ApprovalsManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Approvals Required</h3>
      
      <div className="grid gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="font-medium text-gray-800 mb-4">Payment Approvals</h4>
          <div className="space-y-4">
            {[
              { id: 1, type: 'Claim Payment', client: 'John Doe', amount: 5000, description: 'Motor vehicle accident claim' },
              { id: 2, type: 'Premium Refund', client: 'Jane Smith', amount: 1200, description: 'Policy cancellation refund' }
            ].map(approval => (
              <div key={approval.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h5 className="font-medium text-gray-800">{approval.type}</h5>
                  <p className="text-sm text-gray-600">Client: {approval.client}</p>
                  <p className="text-sm text-gray-600">{approval.description}</p>
                  <p className="text-sm font-medium text-gray-800">Amount: ${approval.amount.toLocaleString()}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition duration-200">
                    Reject
                  </button>
                  <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition duration-200">
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="font-medium text-gray-800 mb-4">Policy Approvals</h4>
          <div className="space-y-4">
            {[
              { id: 1, type: 'High Value Policy', client: 'Robert Johnson', amount: 500000, product: 'Commercial Property Insurance' },
              { id: 2, type: 'Special Risk Policy', client: 'Corporate Client Ltd', amount: 1000000, product: 'Directors & Officers Insurance' }
            ].map(approval => (
              <div key={approval.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h5 className="font-medium text-gray-800">{approval.type}</h5>
                  <p className="text-sm text-gray-600">Client: {approval.client}</p>
                  <p className="text-sm text-gray-600">Product: {approval.product}</p>
                  <p className="text-sm font-medium text-gray-800">Coverage: ${approval.amount.toLocaleString()}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700 transition duration-200">
                    Review
                  </button>
                  <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition duration-200">
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};