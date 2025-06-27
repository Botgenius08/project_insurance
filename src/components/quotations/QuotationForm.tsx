import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { INSURANCE_PRODUCTS } from '../../utils/constants';
import { Quotation } from '../../types';

export const QuotationForm: React.FC = () => {
  const { addQuotation } = useAppState();
  const [quotation, setQuotation] = useState({
    clientName: '',
    clientEmail: '',
    product: '',
    coverage: '',
    amount: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newQuotation: Omit<Quotation, 'id'> = {
      ...quotation,
      amount: Number(quotation.amount),
      status: 'pending',
      date: new Date().toISOString().split('T')[0]
    };
    
    addQuotation(newQuotation);
    setQuotation({ clientName: '', clientEmail: '', product: '', coverage: '', amount: '' });
    alert('Quotation created successfully!');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Quotation</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
            <input
              type="text"
              value={quotation.clientName}
              onChange={(e) => setQuotation({...quotation, clientName: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Client Email</label>
            <input
              type="email"
              value={quotation.clientEmail}
              onChange={(e) => setQuotation({...quotation, clientEmail: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Product</label>
            <select
              value={quotation.product}
              onChange={(e) => setQuotation({...quotation, product: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Product</option>
              {INSURANCE_PRODUCTS.map(product => (
                <option key={product} value={product}>{product}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Coverage Amount</label>
            <input
              type="number"
              value={quotation.amount}
              onChange={(e) => setQuotation({...quotation, amount: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Coverage Details</label>
          <textarea
            value={quotation.coverage}
            onChange={(e) => setQuotation({...quotation, coverage: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Describe the coverage details..."
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Create Quotation
        </button>
      </form>
    </div>
  );
};