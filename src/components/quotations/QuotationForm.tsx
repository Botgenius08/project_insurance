import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { INSURANCE_PRODUCTS } from '../../utils/constants';
import { Quotation } from '../../types';
import Step2Motor from './Step2Motor';
import Step2Property from './Step2Property';
import Step2Health from './Step2Health';

export const QuotationForm: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const { addQuotation } = useAppState();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    product: '',
    coverageType: '',
    vehicleValue: '',
    vehicleUsage: '',
    propertyType: '',
    propertyValue: '',
    propertyLocation: '',
    coverageDetails: '',
    amount: '',
    // Health Insurance fields
    whoIsThisFor: '',
    numberOfPeople: '',
    ageRange: '',
    existingConditions: '',
    coverageLevel: '',
    companyName: '',
    numberOfEmployees: '',
    industryType: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newQuotation: Omit<Quotation, 'id'> = {
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      product: formData.product,
      coverage: formData.coverageType,
      amount: Number(formData.amount),
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      // Motor Insurance specific fields
      coverageType: formData.coverageType,
      vehicleValue: formData.vehicleValue,
      vehicleUsage: formData.vehicleUsage,
      // Property Insurance specific fields
      propertyType: formData.propertyType,
      propertyValue: formData.propertyValue,
      propertyLocation: formData.propertyLocation,
      // Health Insurance specific fields
      whoIsThisFor: formData.whoIsThisFor,
      numberOfPeople: formData.numberOfPeople,
      ageRange: formData.ageRange,
      existingConditions: formData.existingConditions,
      coverageLevel: formData.coverageLevel,
      companyName: formData.companyName,
      numberOfEmployees: formData.numberOfEmployees,
      industryType: formData.industryType,
      // Additional details
      coverageDetails: formData.coverageDetails
    };
    
    addQuotation(newQuotation);
    setFormData({
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      product: '',
      coverageType: '',
      vehicleValue: '',
      vehicleUsage: '',
      propertyType: '',
      propertyValue: '',
      propertyLocation: '',
      coverageDetails: '',
      amount: '',
      whoIsThisFor: '',
      numberOfPeople: '',
      ageRange: '',
      existingConditions: '',
      coverageLevel: '',
      companyName: '',
      numberOfEmployees: '',
      industryType: ''
    });
    setStep(1);
    onCancel();
    alert('Quotation created successfully!');
  };

  if (step === 1) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quotation Details</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
              <input
                type="text"
                value={formData.clientName}
                onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Email</label>
              <input
                type="email"
                value={formData.clientEmail}
                onChange={(e) => setFormData({...formData, clientEmail: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Phone</label>
              <input
                type="tel"
                value={formData.clientPhone}
                onChange={(e) => setFormData({...formData, clientPhone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Product</label>
              <select
                value={formData.product}
                onChange={(e) => setFormData({...formData, product: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Product</option>
                {INSURANCE_PRODUCTS.map(product => (
                  <option key={product} value={product}>{product}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Next Step
            </button>
          </div>
        </form>
      </div>
    );
  } else if (step === 2) {
    if (formData.product === 'Motor Insurance') {
      return <Step2Motor formData={formData} setFormData={setFormData} setStep={setStep} />;
    } else if (formData.product === 'Property & Fire Insurance') {
      return <Step2Property formData={formData} setFormData={setFormData} setStep={setStep} />;
    } else if (formData.product === 'Health Insurance') {
      return <Step2Health formData={formData} setFormData={setFormData} setStep={setStep} />;
    } else {
      // For other insurance types, skip to step 3
      setStep(3);
      return null;
    }
  } else {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Coverage Details</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Coverage Description</label>
            <textarea
              value={formData.coverageDetails}
              onChange={(e) => setFormData({...formData, coverageDetails: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Describe the coverage details..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Coverage Amount (TZS)</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-200"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Create Quotation
            </button>
          </div>
        </form>
      </div>
    );
  }
};