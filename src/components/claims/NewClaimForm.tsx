import React, { useState, useEffect } from 'react';
import { Save, Calculator } from 'lucide-react';

export const NewClaimForm: React.FC = () => {
  const [formData, setFormData] = useState({
    policyNumber: '',
    insuredName: '',
    classOfBusiness: '',
    grossClaimAmount: '',
    excessAmount: '',
    salvageAmount: '',
    otherExpense: '',
    netClaimAmount: '',
    claimDescription: '',
    dateOfLoss: '',
    dateReported: ''
  });

  const [livePolicies] = useState([
    { policyNumber: 'POL-2025-0001', insuredName: 'Tech Solutions Ltd', classOfBusiness: 'Professional Indemnity' },
    { policyNumber: 'POL-2025-0002', insuredName: 'Retail Chain Ltd', classOfBusiness: 'Commercial Property' },
    { policyNumber: 'POL-2025-0003', insuredName: 'Transport Co Ltd', classOfBusiness: 'Motor Fleet' }
  ]);

  // Auto-populate fields when policy is selected
  useEffect(() => {
    if (formData.policyNumber) {
      const selectedPolicy = livePolicies.find(p => p.policyNumber === formData.policyNumber);
      if (selectedPolicy) {
        setFormData(prev => ({
          ...prev,
          insuredName: selectedPolicy.insuredName,
          classOfBusiness: selectedPolicy.classOfBusiness
        }));
      }
    }
  }, [formData.policyNumber, livePolicies]);

  // Auto-calculate net claim amount
  useEffect(() => {
    const gross = parseFloat(formData.grossClaimAmount) || 0;
    const excess = parseFloat(formData.excessAmount) || 0;
    const salvage = parseFloat(formData.salvageAmount) || 0;
    const otherExp = parseFloat(formData.otherExpense) || 0;
    
    const netAmount = gross - excess - salvage + otherExp;
    setFormData(prev => ({
      ...prev,
      netClaimAmount: netAmount.toString()
    }));
  }, [formData.grossClaimAmount, formData.excessAmount, formData.salvageAmount, formData.otherExpense]);

  const generateClaimNumber = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `CLM-${year}-${random}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const claimNumber = generateClaimNumber();
    alert(`Claim created successfully with number: ${claimNumber}`);
    
    // Reset form
    setFormData({
      policyNumber: '',
      insuredName: '',
      classOfBusiness: '',
      grossClaimAmount: '',
      excessAmount: '',
      salvageAmount: '',
      otherExpense: '',
      netClaimAmount: '',
      claimDescription: '',
      dateOfLoss: '',
      dateReported: ''
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Create New Claim</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Policy Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Policy Number</label>
            <select
              value={formData.policyNumber}
              onChange={(e) => setFormData({...formData, policyNumber: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Policy</option>
              {livePolicies.map(policy => (
                <option key={policy.policyNumber} value={policy.policyNumber}>
                  {policy.policyNumber}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Insured Name</label>
            <input
              type="text"
              value={formData.insuredName}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
              readOnly
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class of Business</label>
            <input
              type="text"
              value={formData.classOfBusiness}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
              readOnly
            />
          </div>
        </div>

        {/* Claim Amounts */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-md font-medium text-gray-800 mb-4 flex items-center">
            <Calculator className="w-4 h-4 mr-2" />
            Claim Amount Calculation
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gross Claim Amount (TZS)</label>
              <input
                type="number"
                value={formData.grossClaimAmount}
                onChange={(e) => setFormData({...formData, grossClaimAmount: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Excess Amount (TZS)</label>
              <input
                type="number"
                value={formData.excessAmount}
                onChange={(e) => setFormData({...formData, excessAmount: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salvage Amount (TZS)</label>
              <input
                type="number"
                value={formData.salvageAmount}
                onChange={(e) => setFormData({...formData, salvageAmount: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Other Expense (TZS)</label>
              <input
                type="number"
                value={formData.otherExpense}
                onChange={(e) => setFormData({...formData, otherExpense: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-blue-800">Net Claim Amount:</span>
              <span className="text-lg font-bold text-blue-900">
                {parseFloat(formData.netClaimAmount || '0').toLocaleString()} TZS
              </span>
            </div>
            <p className="text-xs text-blue-600 mt-1">
              Formula: Gross Amount - Excess - Salvage + Other Expense
            </p>
          </div>
        </div>

        {/* Claim Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Loss</label>
            <input
              type="date"
              value={formData.dateOfLoss}
              onChange={(e) => setFormData({...formData, dateOfLoss: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Reported</label>
            <input
              type="date"
              value={formData.dateReported}
              onChange={(e) => setFormData({...formData, dateReported: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Claim Description</label>
          <textarea
            value={formData.claimDescription}
            onChange={(e) => setFormData({...formData, claimDescription: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Describe the circumstances of the claim..."
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Create Claim
          </button>
        </div>
      </form>
    </div>
  );
};