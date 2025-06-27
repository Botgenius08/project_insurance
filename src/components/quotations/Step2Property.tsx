// Step2Property.tsx
import React from 'react';

interface Step2PropertyProps {
  formData: any;
  setFormData: (data: any) => void;
  setStep: (number) => void;
}

export const Step2Property: React.FC<Step2PropertyProps> = ({ formData, setFormData, setStep }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Property & Fire Insurance Details</h3>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
            <select
              value={formData.propertyType}
              onChange={(e) => setFormData({...formData, propertyType: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Property Type</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Property Value (TZS)</label>
            <input
              type="number"
              value={formData.propertyValue}
              onChange={(e) => setFormData({...formData, propertyValue: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Location</label>
            <input
              type="text"
              value={formData.propertyLocation}
              onChange={(e) => setFormData({...formData, propertyLocation: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Coverage Type</label>
            <select
              value={formData.coverageType}
              onChange={(e) => setFormData({...formData, coverageType: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Coverage Type</option>
              <option value="fire">Fire</option>
              <option value="comprehensive">Comprehensive</option>
            </select>
          </div>
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
            type="button"
            onClick={() => setStep(3)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
};