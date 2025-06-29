import React, { useState } from 'react';
import { QuotationList } from './QuotationList';
import { QuotationForm } from './QuotationForm';
import { QuotationDetails } from './QuotationDetails';
import { useAppState } from '../../context/AppStateContext';

export const QuotationsPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const { selectedQuotation, setSelectedQuotation } = useAppState();

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
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Quotations</h3>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by client name..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <QuotationList />
      </div>
      
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Create New Quotation
        </button>
      ) : (
        <QuotationForm onCancel={() => setShowForm(false)} />
      )}
    </div>
  );
};